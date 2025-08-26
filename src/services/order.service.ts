import {
  OrderModel,
  OrderGroupModel,
  OrderItemModel,
  OrderDetailModel,
  OrderShipmentModel,
  OrderStatusModel,
  ShopModel,
  ShopAddressModel,
  GiftModel,
} from "../models/index";
import { OrderAttributes } from "../models/order.model";
import { sequelize } from "../database/connection";
import {
  CreateOrderDTO,
  UpdateOrderDTO,
  OrderQueryDTO,
  CreateOrderGroupDTO,
  CreateOrderItemDTO,
  CreateOrderShipmentDTO,
  UpdateOrderShipmentDTO,
  SingleOrderDTO,
} from "../dtos/order.dto";
import { paginationHelper } from "../utils/response";
import { Op, Transaction, UUIDV4, WhereOptions } from "sequelize";
import generateOrderId from "../helper/order/generateOrderId";
import { OrderItemCreationAttributes } from "../models/orderItem.model";
import { OrderShipmentCreationAttributes } from "../models/orderShipment.model";
import { UserClient } from "../integrations/user.client";
import { RecipientClient } from "../integrations/recipient.client";

export class OrderService {
  async getAllOrders(queryParams: OrderQueryDTO) {
    const {
      page = 1,
      limit = 10,
      search,
      order_group_id,
      shop_id,
      order_status,
      date_from,
      date_to,
      sort_by = "createdAt",
      sort_order = "DESC",
    } = queryParams;

    const { offset, pagination } = paginationHelper(page, limit, 0);

    // Build where condition
    const whereCondition: WhereOptions = {};

    if (search) {
      (whereCondition as any)[Op.or] = [
        { id: { [Op.like]: `%${search}%` } },
        { order_number: { [Op.like]: `%${search}%` } },
      ];
    }

    if (order_group_id) {
      whereCondition.order_group_id = order_group_id;
    }

    if (shop_id) {
      whereCondition.shop_id = shop_id;
    }

    if (order_status) {
      whereCondition.order_status = order_status;
    }

    if (date_from || date_to) {
      const dateCondition: any = {};
      if (date_from) dateCondition[Op.gte] = new Date(date_from);
      if (date_to) dateCondition[Op.lte] = new Date(date_to);
      whereCondition.createdAt = dateCondition;
    }

    const { count, rows } = await OrderModel.findAndCountAll({
      where: whereCondition,
      include: [
        { model: OrderGroupModel, as: "orderGroup" },
        { model: OrderItemModel, as: "items" },
        { model: OrderShipmentModel, as: "shipment" },
      ],
      offset,
      limit,
      // order: [[sort_by, sort_order]],
    });

    return {
      orders: rows,
      pagination: {
        ...pagination,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async getOrderById(id: string) {
    const order = await OrderModel.findByPk(id, {
      include: [
        { model: OrderGroupModel, as: "orderGroup" },
        { model: OrderItemModel, as: "items" },
        { model: OrderDetailModel, as: "details" },
        { model: OrderShipmentModel, as: "shipment" },
        { model: OrderStatusModel, as: "statuses" },
      ],
    });

    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  }

  async createOrder(orderGroupData: CreateOrderDTO) {
    if (
      !orderGroupData ||
      !Array.isArray(orderGroupData.orders) ||
      orderGroupData.orders.length === 0
    ) {
      throw new Error("No orders provided");
    }

    const t = await sequelize.transaction();
    try {
      // Fetch user and recipient details
      const buyer = await UserClient.fetchUserDetails(orderGroupData.buyer_id);
      let recipient = null;

      if (orderGroupData.receiver_id) {
        try {
          recipient = await RecipientClient.fetchRecipientDetails(
            orderGroupData.receiver_id
          );
        } catch (error) {
          console.warn(
            `Could not fetch recipient details for ID ${orderGroupData.receiver_id}:`,
            error
          );
        }
      }

      // Create order group
      const orderGroup = await OrderGroupModel.create(
        {
          buyer_id: buyer.id,
          receiver_id: orderGroupData.receiver_id ?? null,
          is_gift: orderGroupData.is_gift ? 1 : 0,
          is_surprise: orderGroupData.is_surprise ? 1 : 0,
          is_hidden: orderGroupData.is_hidden ? 1 : 0,
          reference_code: UUIDV4(),
        } as any,
        { transaction: t }
      );

      // Prepare shops and products used in all orders
      const shopIds: number[] = Array.from(
        new Set(orderGroupData.orders.map((o: SingleOrderDTO) => o.shopId))
      );

      const productIds: number[] = [];
      for (const order of orderGroupData.orders) {
        for (const item of order.package.items) {
          productIds.push(item.id);
        }
      }

      // Fetch shops with addresses
      const shops = await ShopModel.findAll({
        where: { id: shopIds },
        include: [
          {
            model: ShopAddressModel,
            as: "addresses",
          },
        ],
        transaction: t,
      });

      const gifts = await GiftModel.findAll({
        where: { id: productIds },
        transaction: t,
      });

      // Process each order request
      const results = [];
      const errors = [];

      for (const orderRequest of orderGroupData.orders) {
        const [orderErrors, orderResult] = await this.processOrderRequest(
          t,
          orderGroup.id,
          shops,
          gifts,
          recipient,
          orderRequest
        );

        errors.push(...orderErrors);

        if (orderResult) {
          results.push({
            data: orderResult,
            order: orderRequest,
          });
        }
      }

      if (errors.length > 0) {
        await t.rollback();
        const responseData = errors.map((e) => ({
          message: e.data,
          orderDetail: e.order,
          orderGroupId: orderGroup.id,
        }));

        return {
          statusCode: 400,
          errors: responseData,
          orderGroup: null,
          orders: [],
        };
      }

      await t.commit();

      const responseData = results.map((e) => ({
        message: "Order created successfully",
        orderDetail: e.order,
        orderGroupId: orderGroup.id,
        orderId: e.data.id,
      }));

      return {
        statusCode: 201,
        errors: [],
        orderGroup,
        orders: results.map((r) => r.data),
        response: responseData,
      };
    } catch (error) {
      await t.rollback();
      console.error("Error creating orders:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Failed to create orders: ${errorMessage}`);
    }
  }

  /**
   * Process individual order request (similar to process_order_request in orders.js)
   */
  private async processOrderRequest(
    t: Transaction,
    orderGroupId: number,
    shops: any[],
    gifts: any[],
    recipient: any,
    orderRequest: SingleOrderDTO
  ): Promise<[any[], any]> {
    const errors: any[] = [];

    // Find shop
    const shop = shops.find((s) => (s as any).id === orderRequest.shopId);
    if (!shop) {
      errors.push({
        error: true,
        data: `Didn't find shop with ID ${orderRequest.shopId}`,
        order: orderRequest,
      });
      return [errors, null];
    }

    // Check shop addresses
    const addresses = (shop as any).addresses || [];
    if (addresses.length === 0) {
      errors.push({
        error: true,
        data: `Shop ${
          (shop as any).name
        } has no address. We can't deliver from a shop without address.`,
        order: orderRequest,
      });
      return [errors, null];
    }

    const senderAddress = addresses[0];

    // Calculate totals and validate products
    let totalWeight = 0;
    let totalPrice = 0;
    let totalLength = 0;
    let totalHeight = 0;
    let totalWidth = 0;

    const badProducts: any[] = [];
    const acceptedProducts: any[] = [];

    for (const item of orderRequest.package.items) {
      const product = gifts.find((g) => (g as any).id === item.id);

      if (!product) {
        badProducts.push({
          id: item.id,
          data: "Product not found",
        });
        continue;
      }

      const productShopId = (product as any).shop_id;
      if (String(productShopId) !== String(orderRequest.shopId)) {
        badProducts.push({
          id: item.id,
          data: `Product has mismatched shop id. Expected ${orderRequest.shopId} but got ${productShopId}`,
        });
        continue;
      }

      const qty = Number(item.qty);
      totalWeight += Number((product as any).weight || 0) * qty;
      totalPrice += Number((product as any).price || 0) * qty;
      totalLength += Number((product as any).length || 0) * qty;
      totalHeight += Number((product as any).height || 0) * qty;
      totalWidth += Number((product as any).width || 0) * qty;

      const feePercent = Number((shop as any).fee_percent || 0);
      const price = Number((product as any).price || 0);
      const vendorFee = (price * qty * feePercent) / 100;

      acceptedProducts.push({
        order_id: "", // Will be set later
        name: (product as any).name,
        price: price,
        vendor_fee: vendorFee,
        qty: qty,
        note: item.note || null,
        photo: (product as any).photo || "",
        gift_id: (product as any).id,
      });
    }

    // If there are invalid products, return error
    if (badProducts.length > 0) {
      errors.push({
        error: true,
        data: "There are several invalid products",
        order: orderRequest,
        extra: badProducts,
      });
      return [errors, null];
    }

    // Convert weight from grams to kg
    totalWeight = totalWeight / 1000;

    // Determine destination details
    let destLat = orderRequest.shipment.dest.lat;
    let destLng = orderRequest.shipment.dest.lng;
    let destAddress = orderRequest.shipment.dest.address;
    let destDescription = orderRequest.shipment.dest.description || null;
    let destArea = orderRequest.shipment.dest.areaId;
    let receiverName = orderRequest.receiver.name;
    let receiverPhone = orderRequest.receiver.phoneNo;

    // Use recipient data if available
    if (recipient) {
      destLat = recipient.lat;
      destLng = recipient.lng;
      destAddress = `${recipient.address}, ${recipient.kelurahan}, ${recipient.kecamatan}, ${recipient.city}, ${recipient.province}, ${recipient.postal_code}`;
      destDescription = recipient.description;
      destArea = recipient.area_id;
      receiverName = recipient.name;
      receiverPhone = recipient.phone;
    }

    // Create order
    const orderId = await generateOrderId();
    const orderInstance = await OrderModel.create(
      {
        id: orderId,
        shop_id: orderRequest.shopId,
        order_group_id: orderGroupId,
        confirmation_deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
        date_ordered_for: orderRequest.dateOrderedFor,
        shipper_id: null,
        total_amount: totalPrice,
        grand_total: totalPrice + (orderRequest.shipment.price || 0),
      } as any,
      { transaction: t }
    );

    if (!orderInstance) {
      errors.push({
        error: true,
        data: "Failed creating a new order",
        order: orderRequest,
      });
      return [errors, null];
    }

    // Create shipment
    await OrderShipmentModel.create(
      {
        order_id: (orderInstance as any).id,
        receiver_name: receiverName,
        receiver_phone: receiverPhone,
        sender_name: (shop as any).name,
        sender_phone: (shop as any).phone,
        origin_lat: senderAddress.lat,
        origin_lng: senderAddress.lng,
        origin_address: [
          senderAddress.address,
          senderAddress.kelurahan,
          senderAddress.kecamatan,
          senderAddress.city,
        ]
          .filter(Boolean)
          .join(", "),
        origin_description: senderAddress.address_description,
        origin_area: Number(senderAddress.area_id) || 0,
        dest_lat: destLat,
        dest_lng: destLng,
        dest_address: destAddress,
        dest_description: destDescription,
        dest_area: Number(destArea) || 0,
        rate_id: Number(orderRequest.shipment.rateId) || 0,
        use_insurance: orderRequest.shipment.useInsurance || false,
        package_heigth: totalHeight,
        package_length: totalLength,
        package_weight: totalWeight,
        package_width: totalWidth,
        package_type: orderRequest.package.type,
        package_price: totalPrice.toString(),
        delivery_logistic_name: orderRequest.shipment.logisticName,
        delivery_method: orderRequest.shipment.method,
        delivery_min_day: orderRequest.shipment.minDay,
        delivery_max_day: orderRequest.shipment.maxDay,
        delivery_price: orderRequest.shipment.price,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any,
      { transaction: t }
    );

    // Create order items
    for (const product of acceptedProducts) {
      product.order_id = (orderInstance as any).id;
    }

    await OrderItemModel.bulkCreate(acceptedProducts as any[], {
      transaction: t,
    });

    return [errors, orderInstance];
  }

  async updateOrder(id: string, orderData: UpdateOrderDTO) {
    const order = await OrderModel.findByPk(id);
    if (!order) {
      throw new Error("Order not found");
    }

    await order.update(orderData);
    return order;
  }

  async deleteOrder(id: string) {
    const order = await OrderModel.findByPk(id);
    if (!order) {
      throw new Error("Order not found");
    }

    await order.destroy();
    return { message: "Order deleted successfully" };
  }

  // OrderGroup methods
  // async createOrderGroup(orderGroupData: CreateOrderGroupDTO) {
  //   const orderGroup = await OrderGroupModel.create({
  //     ...orderGroupData,
  //     payment_status: orderGroupData.payment_status ?? "pending",
  //   });
  //   return orderGroup;
  // }

  async getOrderGroupById(id: number) {
    const orderGroup = await OrderGroupModel.findByPk(id, {
      include: [{ model: OrderModel, as: "orders" }],
    });

    if (!orderGroup) {
      throw new Error("Order group not found");
    }
    return orderGroup;
  }

  // OrderItem methods
  async addOrderItem(orderItemData: CreateOrderItemDTO) {
    const orderItem = await OrderItemModel.create(orderItemData);
    return orderItem;
  }

  async getOrderItems(orderId: string) {
    const orderItems = await OrderItemModel.findAll({
      where: { order_id: orderId },
    });
    return orderItems;
  }

  // OrderShipment methods
  async createOrderShipment(shipmentData: CreateOrderShipmentDTO) {
    const shipment = await OrderShipmentModel.create({
      ...shipmentData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return shipment;
  }

  async updateOrderShipment(id: number, shipmentData: UpdateOrderShipmentDTO) {
    const shipment = await OrderShipmentModel.findByPk(id);
    if (!shipment) {
      throw new Error("Order shipment not found");
    }

    await shipment.update(shipmentData);
    return shipment;
  }

  async getOrderShipment(orderId: string) {
    const shipment = await OrderShipmentModel.findOne({
      where: { order_id: orderId },
    });
    return shipment;
  }

  // OrderStatus methods
  async updateOrderStatus(
    orderId: string,
    statusNameId: number,
    description?: string
  ) {
    const orderStatus = await OrderStatusModel.create({
      order_id: orderId,
      status_name_id: statusNameId,
      description: description,
    });

    return orderStatus;
  }

  async getOrderStatuses(orderId: string) {
    const statuses = await OrderStatusModel.findAll({
      where: { order_id: orderId },
      order: [["id", "DESC"]],
    });
    return statuses;
  }

  async getOrdersByShopId(shopId: number) {
    const orders = await OrderModel.findAll({
      where: { shop_id: shopId },
      include: [
        { model: OrderGroupModel, as: "orderGroup" },
        { model: OrderItemModel, as: "items" },
      ],
      // order by date_ordered_for since this table doesn't have created_at timestamps
      order: [["date_ordered_for", "DESC"]],
    });
    return orders;
  }
}

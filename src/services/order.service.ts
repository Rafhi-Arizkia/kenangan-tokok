import { OrderModel, OrderGroupModel, OrderItemModel, OrderDetailModel, OrderShipmentModel, OrderStatusModel } from '../models';
import { 
  CreateOrderDTO, 
  UpdateOrderDTO, 
  OrderQueryDTO, 
  CreateOrderGroupDTO, 
  CreateOrderItemDTO, 
  CreateOrderShipmentDTO,
  UpdateOrderShipmentDTO 
} from '../dtos/order.dto';
import { paginationHelper } from '../utils/response';
import { Op, WhereOptions } from 'sequelize';

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
      sort_by = 'created_at',
      sort_order = 'DESC'
    } = queryParams;
    
    const { offset, pagination } = paginationHelper(page, limit, 0);

    // Build where condition
    const whereCondition: WhereOptions = {};

    if (search) {
      (whereCondition as any)[Op.or] = [
        { id: { [Op.like]: `%${search}%` } },
        { order_number: { [Op.like]: `%${search}%` } }
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
      whereCondition.created_at = dateCondition;
    }

    const { count, rows } = await OrderModel.findAndCountAll({
      where: whereCondition,
      include: [
        { model: OrderGroupModel, as: 'orderGroup' },
        { model: OrderItemModel, as: 'items' },
        { model: OrderShipmentModel, as: 'shipment' }
      ],
      offset,
      limit,
      order: [[sort_by, sort_order]],
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
        { model: OrderGroupModel, as: 'orderGroup' },
        { model: OrderItemModel, as: 'items' },
        { model: OrderDetailModel, as: 'details' },
        { model: OrderShipmentModel, as: 'shipment' },
        { model: OrderStatusModel, as: 'statuses' }
      ]
    });
    
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  async createOrder(orderData: CreateOrderDTO) {
    const order = await OrderModel.create({
      ...orderData,
      order_status: orderData.order_status ?? 'pending'
    });
    return order;
  }

  async updateOrder(id: string, orderData: UpdateOrderDTO) {
    const order = await OrderModel.findByPk(id);
    if (!order) {
      throw new Error('Order not found');
    }

    await order.update(orderData);
    return order;
  }

  async deleteOrder(id: string) {
    const order = await OrderModel.findByPk(id);
    if (!order) {
      throw new Error('Order not found');
    }

    await order.destroy();
    return { message: 'Order deleted successfully' };
  }

  // OrderGroup methods
  async createOrderGroup(orderGroupData: CreateOrderGroupDTO) {
    const orderGroup = await OrderGroupModel.create({
      ...orderGroupData,
      payment_status: orderGroupData.payment_status ?? 'pending'
    });
    return orderGroup;
  }

  async getOrderGroupById(id: number) {
    const orderGroup = await OrderGroupModel.findByPk(id, {
      include: [{ model: OrderModel, as: 'orders' }]
    });
    
    if (!orderGroup) {
      throw new Error('Order group not found');
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
      where: { order_id: orderId }
    });
    return orderItems;
  }

  // OrderShipment methods
  async createOrderShipment(shipmentData: CreateOrderShipmentDTO) {
    const shipment = await OrderShipmentModel.create(shipmentData);
    return shipment;
  }

  async updateOrderShipment(id: number, shipmentData: UpdateOrderShipmentDTO) {
    const shipment = await OrderShipmentModel.findByPk(id);
    if (!shipment) {
      throw new Error('Order shipment not found');
    }

    await shipment.update(shipmentData);
    return shipment;
  }

  async getOrderShipment(orderId: string) {
    const shipment = await OrderShipmentModel.findOne({
      where: { order_id: orderId }
    });
    return shipment;
  }

  // OrderStatus methods
  async updateOrderStatus(orderId: string, status: string, notes?: string, changedBy?: number) {
    const orderStatus = await OrderStatusModel.create({
      order_id: orderId,
      status_name: status,
      notes,
      changed_by: changedBy
    });

    // Update order status as well
    await OrderModel.update(
      { order_status: status },
      { where: { id: orderId } }
    );

    return orderStatus;
  }

  async getOrderStatuses(orderId: string) {
    const statuses = await OrderStatusModel.findAll({
      where: { order_id: orderId },
      order: [['created_at', 'DESC']]
    });
    return statuses;
  }

  async getOrdersByShopId(shopId: number) {
    const orders = await OrderModel.findAll({
      where: { shop_id: shopId },
      include: [
        { model: OrderGroupModel, as: 'orderGroup' },
        { model: OrderItemModel, as: 'items' }
      ],
      order: [['created_at', 'DESC']],
    });
    return orders;
  }
}

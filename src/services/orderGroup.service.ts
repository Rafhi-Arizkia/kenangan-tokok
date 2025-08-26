import { OrderGroupModel } from "../models/index";
import type { OrderGroupAttributes } from "../models/orderGroup.model";
import {
  CreateOrderGroupDTO,
  UpdateOrderGroupDTO,
  OrderGroupQueryDTO,
} from "../dtos/orderGroup.dto";
import { paginationHelper } from "../utils/response";
import { Op, WhereOptions } from "sequelize";
import { UserClient, UserDetail } from "../integrations/user.client";

export class OrderGroupService {
  async getAllOrderGroups(queryParams: OrderGroupQueryDTO): Promise<{
    orderGroups: OrderGroupModel[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const {
      page = 1,
      limit = 10,
      buyer_id,
      receiver_id,
      payment_method,
    } = queryParams;
    const { offset, pagination } = paginationHelper(page, limit, 0);

    const whereCondition: WhereOptions = {};
    if (buyer_id) whereCondition["buyer_id"] = buyer_id;
    if (receiver_id) whereCondition["receiver_id"] = receiver_id;
    if (payment_method) whereCondition["payment_method"] = payment_method;

    const { count, rows } = await OrderGroupModel.findAndCountAll({
      where: whereCondition,
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    return {
      orderGroups: rows,
      pagination: {
        ...pagination,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async getOrderGroupById(id: number): Promise<OrderGroupModel> {
    const orderGroup = await OrderGroupModel.findByPk(id, {
      include: [{ association: "orders" } as any],
    });

    if (!orderGroup) {
      throw new Error("Order group not found");
    }
    return orderGroup;
  }

  async createOrderGroup(data: CreateOrderGroupDTO): Promise<OrderGroupModel> {
    const buyer: UserDetail | null = await UserClient.fetchUserDetails(
      data.buyer_id as number
    );
    if (!buyer) throw new Error("Invalid buyer ID");

    let receiver: UserDetail | null = null;
    if (data.receiver_id) {
      receiver = await UserClient.fetchUserDetails(data.receiver_id as number);
      if (!receiver) throw new Error("Invalid receiver ID");
    }

    const payload: Partial<OrderGroupAttributes> = {
      buyer_id: buyer.id,
      receiver_id: receiver ? receiver.id : null,
      is_gift: data.is_gift
        ? typeof data.is_gift === "number"
          ? data.is_gift
          : data.is_gift
          ? 1
          : 0
        : 0,
      is_surprise: data.is_surprise
        ? typeof data.is_surprise === "number"
          ? data.is_surprise
          : data.is_surprise
          ? 1
          : 0
        : 0,
      is_hidden: data.is_hidden
        ? typeof data.is_hidden === "number"
          ? data.is_hidden
          : data.is_hidden
          ? 1
          : 0
        : 0,
      reference_code: data.reference_code ?? undefined,
      payment_gateway_fee: data.payment_gateway_fee ?? 0,
      targeted_receiver_name: data.targeted_receiver_name ?? null,
      type_device: data.type_device ?? "MOBILE",
      service_fee: data.service_fee ?? 0,
      message: data.message ?? null,
      receiver_message: data.receiver_message ?? null,
      confirm_gift_by: data.confirm_gift_by ?? null,
    };

    const created = await OrderGroupModel.create(
      payload as OrderGroupAttributes
    );

    return created;
  }

  async updateOrderGroup(id: number, data: UpdateOrderGroupDTO): Promise<OrderGroupModel> {
    const orderGroup = await OrderGroupModel.findByPk(id);
    if (!orderGroup) throw new Error("Order group not found");

    await orderGroup.update(data as any);
    return orderGroup;
  }

  async deleteOrderGroup(id: number): Promise<{ message: string }> {
    const orderGroup = await OrderGroupModel.findByPk(id);
    if (!orderGroup) throw new Error("Order group not found");

    await orderGroup.destroy();
    return { message: "Order group deleted successfully" };
  }
}

export default new OrderGroupService();

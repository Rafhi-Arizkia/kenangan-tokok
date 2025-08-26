// Update the import path below if your ShopModel is located elsewhere, e.g. '../models/shop.model'
import { ShopModel } from "../models/shop.model";
import { CreateShopDTO, UpdateShopDTO, ShopQueryDTO } from "../dtos/shop.dto";
import { paginationHelper } from "../utils/response";
import { Op, WhereOptions } from "sequelize";

export class ShopService {
  async getAllShops(queryParams: ShopQueryDTO) {
    const { page = 1, limit = 10, search, city, province } = queryParams;
    const { offset, pagination } = paginationHelper(page, limit, 0);

    // Build where condition
    const whereCondition: WhereOptions = {};

    if (search) {
      (whereCondition as any)[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    if (city) {
      whereCondition.city = { [Op.like]: `%${city}%` };
    }

    if (province) {
      whereCondition.province = { [Op.like]: `%${province}%` };
    }

    const { count, rows } = await ShopModel.findAndCountAll({
      // where: whereCondition,
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    return {
      shops: rows,
      pagination: {
        ...pagination,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async getShopById(id: number) {
    const shop = await ShopModel.findByPk(id);
    if (!shop) {
      throw new Error("Shop not found");
    }
    return shop;
  }

  async createShop(shopData: CreateShopDTO) {
    const shop = await ShopModel.create({
      ...shopData,
      is_can_claim: 0,
      is_claimed: 0,
    });
    return shop;
  }

  async updateShop(id: number, shopData: UpdateShopDTO) {
    const shop = await ShopModel.findByPk(id);
    if (!shop) {
      throw new Error("Shop not found");
    }

    await shop.update(shopData);
    return shop;
  }

  async deleteShop(id: number) {
    const shop = await ShopModel.findByPk(id);
    if (!shop) {
      throw new Error("Shop not found");
    }

    await shop.destroy();
    return { message: "Shop deleted successfully" };
  }

  async getShopsByUserId(userId: number) {
    const shops = await ShopModel.findAll({
      where: { user_id: userId },
      order: [["createdAt", "DESC"]],
    });
    return shops;
  }
}

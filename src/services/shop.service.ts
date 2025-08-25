import { ShopModel } from '../models';
import { CreateShopDTO, UpdateShopDTO, ShopQueryDTO } from '../dtos/shop.dto';
import { paginationHelper } from '../utils/response';
import { Op, WhereOptions } from 'sequelize';

export class ShopService {
  async getAllShops(queryParams: ShopQueryDTO) {
    const { page = 1, limit = 10, search, is_active, is_verified, city, province } = queryParams;
    const { offset, pagination } = paginationHelper(page, limit, 0);

    // Build where condition
    const whereCondition: WhereOptions = {};

    if (search) {
      (whereCondition as any)[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ];
    }

    if (is_active !== undefined) {
      whereCondition.is_active = is_active;
    }

    if (is_verified !== undefined) {
      whereCondition.is_verified = is_verified;
    }

    if (city) {
      whereCondition.city = { [Op.like]: `%${city}%` };
    }

    if (province) {
      whereCondition.province = { [Op.like]: `%${province}%` };
    }

    const { count, rows } = await ShopModel.findAndCountAll({
      where: whereCondition,
      offset,
      limit,
      order: [['created_at', 'DESC']],
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
      throw new Error('Shop not found');
    }
    return shop;
  }

  async createShop(shopData: CreateShopDTO) {
    const shop = await ShopModel.create({
      ...shopData,
      is_active: shopData.is_active ?? true,
      is_verified: shopData.is_verified ?? false
    });
    return shop;
  }

  async updateShop(id: number, shopData: UpdateShopDTO) {
    const shop = await ShopModel.findByPk(id);
    if (!shop) {
      throw new Error('Shop not found');
    }

    await shop.update(shopData);
    return shop;
  }

  async deleteShop(id: number) {
    const shop = await ShopModel.findByPk(id);
    if (!shop) {
      throw new Error('Shop not found');
    }

    await shop.destroy();
    return { message: 'Shop deleted successfully' };
  }

  async getShopsByUserId(userId: number) {
    const shops = await ShopModel.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
    });
    return shops;
  }
}

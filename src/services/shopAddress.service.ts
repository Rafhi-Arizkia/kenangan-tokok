import { ShopAddressModel } from "../models/shopAddress.model";
import { CreateShopAddressDTO, UpdateShopAddressDTO, ShopAddressQueryDTO } from "../dtos/shopAddress.dto";
import { paginationHelper } from "../utils/response";
import { Op, WhereOptions } from "sequelize";
import { ShopModel } from "../models/shop.model";

export class ShopAddressService {
  async getAllShopAddresses(queryParams: ShopAddressQueryDTO): Promise<{
    addresses: ShopAddressModel[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const { page = 1, limit = 10, shop_id, city, is_open, ...filters } = queryParams;
    
    const whereClause: WhereOptions = {};
    
    if (shop_id) {
      whereClause.shop_id = shop_id;
    }
    
    if (city) {
      whereClause.city = {
        [Op.iLike]: `%${city}%`
      };
    }
    
    if (is_open !== undefined) {
      whereClause.is_open = is_open;
    }

    // Add other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        whereClause[key] = value;
      }
    });

    const { count, rows } = await ShopAddressModel.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: ShopModel,
          as: 'shop',
          attributes: ['id', 'name']
        }
      ],
      offset: (page - 1) * limit,
      limit,
      order: [['id', 'ASC']]
    });

    const { pagination } = paginationHelper(page, limit, count);

    return {
      addresses: rows,
      pagination
    };
  }

  async getShopAddressById(id: string): Promise<ShopAddressModel> {
    const address = await ShopAddressModel.findByPk(id, {
      include: [
        {
          model: ShopModel,
          as: 'shop',
          attributes: ['id', 'name']
        }
      ]
    });
    if (!address) {
      throw new Error("Shop address not found");
    }
    return address;
  }

  async getShopAddressByShopId(shopId: number): Promise<ShopAddressModel | null> {
    const address = await ShopAddressModel.findOne({
      where: { shop_id: shopId },
      include: [
        {
          model: ShopModel,
          as: 'shop',
          attributes: ['id', 'name']
        }
      ]
    });
    return address;
  }

  async createShopAddress(addressData: CreateShopAddressDTO): Promise<ShopAddressModel> {
    // Check if shop exists
    const shop = await ShopModel.findByPk(addressData.shop_id);
    if (!shop) {
      throw new Error("Shop not found");
    }

    // Check if address already exists for this shop
    const existingAddress = await ShopAddressModel.findOne({
      where: { shop_id: addressData.shop_id }
    });
    if (existingAddress) {
      throw new Error("Shop address already exists");
    }

    const address = await ShopAddressModel.create(addressData);
    return address;
  }

  async updateShopAddress(id: string, addressData: UpdateShopAddressDTO): Promise<ShopAddressModel> {
    const address = await ShopAddressModel.findByPk(id);
    if (!address) {
      throw new Error("Shop address not found");
    }

    await address.update(addressData);
    return address;
  }

  async deleteShopAddress(id: string): Promise<{ message: string }> {
    const address = await ShopAddressModel.findByPk(id);
    if (!address) {
      throw new Error("Shop address not found");
    }

    await address.destroy();
    return { message: "Shop address deleted successfully" };
  }
}

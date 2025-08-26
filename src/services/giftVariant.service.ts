import { GiftVariantModel } from "../models/giftVariant.model";
import { GiftModel } from "../models/gift.model";
import { CreateGiftVariantDTO, UpdateGiftVariantDTO, GiftVariantQueryDTO } from "../dtos/giftVariant.dto";
import { paginationHelper } from "../utils/response";
import { WhereOptions, Op } from "sequelize";

export class GiftVariantService {
  async getAllGiftVariants(queryParams: GiftVariantQueryDTO): Promise<{
    variants: GiftVariantModel[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const { page = 1, limit = 10, gift_id, variant_key1, variant_key2, ...filters } = queryParams;
    
    const whereClause: WhereOptions = {};
    
    if (gift_id) {
      whereClause.gift_id = gift_id;
    }
    
    if (variant_key1) {
      whereClause.variant_key1 = {
        [Op.iLike]: `%${variant_key1}%`
      };
    }
    
    if (variant_key2) {
      whereClause.variant_key2 = {
        [Op.iLike]: `%${variant_key2}%`
      };
    }

    // Add other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        whereClause[key] = value;
      }
    });

    const { count, rows } = await GiftVariantModel.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: GiftModel,
          as: 'gift',
          attributes: ['id', 'name']
        }
      ],
      offset: (page - 1) * limit,
      limit,
      order: [['created_at', 'DESC']]
    });

    const { pagination } = paginationHelper(page, limit, count);

    return {
      variants: rows,
      pagination
    };
  }

  async getGiftVariantById(id: number): Promise<GiftVariantModel> {
    const variant = await GiftVariantModel.findByPk(id, {
      include: [
        {
          model: GiftModel,
          as: 'gift',
          attributes: ['id', 'name']
        }
      ]
    });
    if (!variant) {
      throw new Error("Gift variant not found");
    }
    return variant;
  }

  async getGiftVariantsByGiftId(giftId: number): Promise<GiftVariantModel[]> {
    const variants = await GiftVariantModel.findAll({
      where: { gift_id: giftId },
      order: [['variant_key1', 'ASC'], ['variant_key2', 'ASC']]
    });
    return variants;
  }

  async createGiftVariant(variantData: CreateGiftVariantDTO): Promise<GiftVariantModel> {
    // Check if gift exists
    if (variantData.gift_id) {
      const gift = await GiftModel.findByPk(variantData.gift_id);
      if (!gift) {
        throw new Error("Gift not found");
      }
    }

    // Check if variant combination already exists for this gift
    if (variantData.gift_id) {
      const whereClause: WhereOptions = {
        gift_id: variantData.gift_id,
        variant_key1: variantData.variant_key1,
        variant_value1: variantData.variant_value1
      };

      if (variantData.variant_key2 && variantData.variant_value2) {
        whereClause.variant_key2 = variantData.variant_key2;
        whereClause.variant_value2 = variantData.variant_value2;
      }

      const existingVariant = await GiftVariantModel.findOne({
        where: whereClause
      });

      if (existingVariant) {
        throw new Error("Variant combination already exists for this gift");
      }
    }

    const variant = await GiftVariantModel.create(variantData);
    return variant;
  }

  async updateGiftVariant(id: number, variantData: UpdateGiftVariantDTO): Promise<GiftVariantModel> {
    const variant = await GiftVariantModel.findByPk(id);
    if (!variant) {
      throw new Error("Gift variant not found");
    }

    // Check if updated variant combination already exists for this gift (excluding current variant)
    if (variant.gift_id && (variantData.variant_key1 || variantData.variant_value1 || variantData.variant_key2 || variantData.variant_value2)) {
      const whereClause: WhereOptions = {
        gift_id: variant.gift_id,
        id: { [Op.ne]: id },
        variant_key1: variantData.variant_key1 || variant.variant_key1,
        variant_value1: variantData.variant_value1 || variant.variant_value1
      };

      const key2 = variantData.variant_key2 !== undefined ? variantData.variant_key2 : variant.variant_key2;
      const value2 = variantData.variant_value2 !== undefined ? variantData.variant_value2 : variant.variant_value2;

      if (key2 && value2) {
        whereClause.variant_key2 = key2;
        whereClause.variant_value2 = value2;
      }

      const existingVariant = await GiftVariantModel.findOne({
        where: whereClause
      });

      if (existingVariant) {
        throw new Error("Variant combination already exists for this gift");
      }
    }

    await variant.update(variantData);
    return variant;
  }

  async deleteGiftVariant(id: number): Promise<{ message: string }> {
    const variant = await GiftVariantModel.findByPk(id);
    if (!variant) {
      throw new Error("Gift variant not found");
    }

    await variant.destroy();
    return { message: "Gift variant deleted successfully" };
  }

  async getVariantKeys(giftId?: number): Promise<string[]> {
    const whereClause: WhereOptions = {};
    if (giftId) {
      whereClause.gift_id = giftId;
    }

    const variants = await GiftVariantModel.findAll({
      where: whereClause,
      attributes: ['variant_key1', 'variant_key2'],
      group: ['variant_key1', 'variant_key2']
    });

    const keys = new Set<string>();
    variants.forEach(variant => {
      keys.add(variant.variant_key1);
      if (variant.variant_key2) {
        keys.add(variant.variant_key2);
      }
    });

    return Array.from(keys);
  }

  async getVariantValuesByKey(key: string, giftId?: number): Promise<string[]> {
    const whereClause: WhereOptions = {};
    if (giftId) {
      whereClause.gift_id = giftId;
    }

    const variants = await GiftVariantModel.findAll({
      where: {
        ...whereClause,
        [Op.or]: [
          { variant_key1: key },
          { variant_key2: key }
        ]
      }
    });

    const values = new Set<string>();
    variants.forEach(variant => {
      if (variant.variant_key1 === key) {
        values.add(variant.variant_value1);
      }
      if (variant.variant_key2 === key && variant.variant_value2) {
        values.add(variant.variant_value2);
      }
    });

    return Array.from(values);
  }
}

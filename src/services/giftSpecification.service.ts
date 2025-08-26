import { GiftSpecificationModel } from "../models/giftSpecification.model";
import { GiftModel } from "../models/gift.model";
import { CreateGiftSpecificationDTO, UpdateGiftSpecificationDTO, GiftSpecificationQueryDTO } from "../dtos/giftSpecification.dto";
import { paginationHelper } from "../utils/response";
import { WhereOptions, Op } from "sequelize";

export class GiftSpecificationService {
  async getAllGiftSpecifications(queryParams: GiftSpecificationQueryDTO): Promise<{
    specifications: GiftSpecificationModel[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const { page = 1, limit = 10, gift_id, key, ...filters } = queryParams;
    
    const whereClause: WhereOptions = {};
    
    if (gift_id) {
      whereClause.gift_id = gift_id;
    }
    
    if (key) {
      whereClause.key = {
        [Op.iLike]: `%${key}%`
      };
    }

    // Add other filters
    Object.entries(filters).forEach(([filterKey, value]) => {
      if (value !== undefined) {
        whereClause[filterKey] = value;
      }
    });

    const { count, rows } = await GiftSpecificationModel.findAndCountAll({
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
      order: [['createdAt', 'DESC']]
    });

    const { pagination } = paginationHelper(page, limit, count);

    return {
      specifications: rows,
      pagination
    };
  }

  async getGiftSpecificationById(id: string): Promise<GiftSpecificationModel> {
    const specification = await GiftSpecificationModel.findByPk(id, {
      include: [
        {
          model: GiftModel,
          as: 'gift',
          attributes: ['id', 'name']
        }
      ]
    });
    if (!specification) {
      throw new Error("Gift specification not found");
    }
    return specification;
  }

  async getGiftSpecificationsByGiftId(giftId: number): Promise<GiftSpecificationModel[]> {
    const specifications = await GiftSpecificationModel.findAll({
      where: { gift_id: giftId },
      order: [['key', 'ASC']]
    });
    return specifications;
  }

  async createGiftSpecification(specificationData: CreateGiftSpecificationDTO): Promise<GiftSpecificationModel> {
    // Check if gift exists
    const gift = await GiftModel.findByPk(specificationData.gift_id);
    if (!gift) {
      throw new Error("Gift not found");
    }

    // Check if specification key already exists for this gift
    const existingSpec = await GiftSpecificationModel.findOne({
      where: {
        gift_id: specificationData.gift_id,
        key: specificationData.key
      }
    });
    if (existingSpec) {
      throw new Error("Specification key already exists for this gift");
    }

    const specification = await GiftSpecificationModel.create(specificationData);
    return specification;
  }

  async updateGiftSpecification(id: string, specificationData: UpdateGiftSpecificationDTO): Promise<GiftSpecificationModel> {
    const specification = await GiftSpecificationModel.findByPk(id);
    if (!specification) {
      throw new Error("Gift specification not found");
    }

    // If updating key, check if it already exists for the same gift
    if (specificationData.key && specificationData.key !== specification.key) {
      const existingSpec = await GiftSpecificationModel.findOne({
        where: {
          gift_id: specification.gift_id,
          key: specificationData.key,
          id: { [Op.ne]: id }
        }
      });
      if (existingSpec) {
        throw new Error("Specification key already exists for this gift");
      }
    }

    await specification.update(specificationData);
    return specification;
  }

  async deleteGiftSpecification(id: string): Promise<{ message: string }> {
    const specification = await GiftSpecificationModel.findByPk(id);
    if (!specification) {
      throw new Error("Gift specification not found");
    }

    await specification.destroy();
    return { message: "Gift specification deleted successfully" };
  }

  async bulkCreateGiftSpecifications(giftId: number, specifications: Array<{key: string, value: string}>): Promise<GiftSpecificationModel[]> {
    // Check if gift exists
    const gift = await GiftModel.findByPk(giftId);
    if (!gift) {
      throw new Error("Gift not found");
    }

    // Prepare data for bulk insert
    const specData = specifications.map(spec => ({
      gift_id: giftId,
      key: spec.key,
      value: spec.value
    }));

    const createdSpecs = await GiftSpecificationModel.bulkCreate(specData);
    return createdSpecs;
  }

  async bulkUpdateGiftSpecifications(giftId: number, specifications: Array<{key: string, value: string}>): Promise<GiftSpecificationModel[]> {
    // Delete existing specifications for this gift
    await GiftSpecificationModel.destroy({
      where: { gift_id: giftId }
    });

    // Create new specifications
    return await this.bulkCreateGiftSpecifications(giftId, specifications);
  }
}

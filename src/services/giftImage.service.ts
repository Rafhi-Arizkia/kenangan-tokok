import { GiftImageModel } from "../models/giftImage.model";
import { GiftModel } from "../models/gift.model";
import { CreateGiftImageDTO, UpdateGiftImageDTO, GiftImageQueryDTO } from "../dtos/giftImage.dto";
import { paginationHelper } from "../utils/response";
import { WhereOptions } from "sequelize";

export class GiftImageService {
  async getAllGiftImages(queryParams: GiftImageQueryDTO): Promise<{
    images: GiftImageModel[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const { page = 1, limit = 10, gift_id, ...filters } = queryParams;
    
    const whereClause: WhereOptions = {};
    
    if (gift_id) {
      whereClause.gift_id = gift_id;
    }

    // Add other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        whereClause[key] = value;
      }
    });

    const { count, rows } = await GiftImageModel.findAndCountAll({
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
      images: rows,
      pagination
    };
  }

  async getGiftImageById(id: string): Promise<GiftImageModel> {
    const image = await GiftImageModel.findByPk(id, {
      include: [
        {
          model: GiftModel,
          as: 'gift',
          attributes: ['id', 'name']
        }
      ]
    });
    if (!image) {
      throw new Error("Gift image not found");
    }
    return image;
  }

  async getGiftImagesByGiftId(giftId: number): Promise<GiftImageModel[]> {
    const images = await GiftImageModel.findAll({
      where: { gift_id: giftId },
      order: [['created_at', 'DESC']]
    });
    return images;
  }

  async createGiftImage(imageData: CreateGiftImageDTO): Promise<GiftImageModel> {
    // Check if gift exists
    const gift = await GiftModel.findByPk(imageData.gift_id);
    if (!gift) {
      throw new Error("Gift not found");
    }

    const image = await GiftImageModel.create(imageData);
    return image;
  }

  async updateGiftImage(id: string, imageData: UpdateGiftImageDTO): Promise<GiftImageModel> {
    const image = await GiftImageModel.findByPk(id);
    if (!image) {
      throw new Error("Gift image not found");
    }

    await image.update(imageData);
    return image;
  }

  async deleteGiftImage(id: string): Promise<{ message: string }> {
    const image = await GiftImageModel.findByPk(id);
    if (!image) {
      throw new Error("Gift image not found");
    }

    await image.destroy();
    return { message: "Gift image deleted successfully" };
  }
}

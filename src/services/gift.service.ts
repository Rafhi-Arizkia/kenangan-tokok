import { GiftModel } from "../models/gift.model";
import { GiftImageModel } from "../models/giftImage.model";
import { GiftReviewModel } from "../models/giftReview.model";
import { GiftSpecificationModel } from "../models/giftSpecification.model";
import {
  GiftDTO,
  CreateGiftDTO,
  UpdateGiftDTO,
  GiftQueryDTO,
} from "../dtos/gift.dto";
import { CreateGiftImageDTO } from "../dtos/giftImage.dto";
import { CreateGiftReviewDTO } from "../dtos/giftReview.dto";
import { CreateGiftSpecificationDTO } from "../dtos/giftSpecification.dto";
import { paginationHelper } from "../utils/response";
import { Op, WhereOptions } from "sequelize";

export class GiftService {
  async getAllGifts(queryParams: GiftQueryDTO): Promise<{
    gifts: GiftModel[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const {
      search,
      shop_id,
      category_id,
      is_available,
      min_price,
      max_price,
      sort_by = "createdAt",
      sort_order = "DESC",
    } = queryParams;

    // Normalize sort_by values coming from DTO/schema (some clients use snake_case)
    const sortMapping: Record<string, string> = {
      created_at: "createdAt",
      createdAt: "createdAt",
      name: "name",
      price: "price",
      rating: "rating",
      total_sold: "total_sold",
      totalSold: "total_sold",
    };

    const sortField = sortMapping[String(sort_by)] || String(sort_by || "createdAt");
    const sortOrder = String(sort_order || "DESC").toUpperCase();

    let { page = 1, limit = 10 } = queryParams;

    page = Number(page) || 1;
    limit = Number(limit) || 10;

    const { offset, pagination } = paginationHelper(page, limit, 0);

    // Build where condition
    const whereCondition: WhereOptions = {};

    if (search) {
      (whereCondition as any)[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { tags: { [Op.like]: `%${search}%` } },
      ];
    }

    if (shop_id) {
      whereCondition.shop_id = shop_id;
    }

    if (category_id) {
      whereCondition.category_id = category_id;
    }

    if (is_available !== undefined) {
      whereCondition.is_available = is_available;
    }

    if (min_price !== undefined || max_price !== undefined) {
      const priceCondition: any = {};
      if (min_price !== undefined) priceCondition[Op.gte] = min_price;
      if (max_price !== undefined) priceCondition[Op.lte] = max_price;
      whereCondition.price = priceCondition;
    }

    const { count, rows } = await GiftModel.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: GiftImageModel,
          as: "images",
          // model has `url` and doesn't store is_primary; keep optional include
          required: false,
        },
      ],
      offset,
      limit,
  order: [[sortField, sortOrder]],
    });

    return {
      gifts: rows,
      pagination: {
        ...pagination,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async getGiftById(id: number): Promise<GiftModel> {
    const gift = await GiftModel.findByPk(id, {
      include: [
        { model: GiftImageModel, as: "images" },
        { model: GiftReviewModel, as: "reviews" },
        { model: GiftSpecificationModel, as: "specifications" },
      ],
    });

    if (!gift) {
      throw new Error("Gift not found");
    }
    return gift;
  }

  async createGift(giftData: CreateGiftDTO): Promise<GiftModel> {
    const gift = await GiftModel.create(giftData as any);
    return gift;
  }

  async updateGift(id: number, giftData: UpdateGiftDTO): Promise<GiftModel> {
    const gift = await GiftModel.findByPk(id);
    if (!gift) {
      throw new Error("Gift not found");
    }

    await gift.update(giftData);
    return gift;
  }

  async deleteGift(id: number): Promise<{ message: string }> {
    const gift = await GiftModel.findByPk(id);
    if (!gift) {
      throw new Error("Gift not found");
    }

    await gift.destroy();
    return { message: "Gift deleted successfully" };
  }

  async getGiftsByShopId(shopId: number): Promise<GiftModel[]> {
    const gifts = await GiftModel.findAll({
      where: { shop_id: shopId },
      include: [
        {
          model: GiftImageModel,
          as: "images",
          // don't filter by a non-existent `is_primary` column here;
          // GiftImageModel only has `url` and timestamp fields
          required: false,
        },
      ],
      // use model attribute name (createdAt) which matches the GiftModel definition
      order: [["createdAt", "DESC"]],
    });
    return gifts;
  }

  async addGiftImage(imageData: CreateGiftImageDTO): Promise<GiftImageModel> {
    const image = await GiftImageModel.create(imageData as any);
    return image;
  }

  async addGiftReview(reviewData: CreateGiftReviewDTO): Promise<GiftReviewModel> {
    const review = await GiftReviewModel.create(reviewData as any);
    return review;
  }

  async addGiftSpecification(specData: CreateGiftSpecificationDTO): Promise<GiftSpecificationModel> {
    const specification = await GiftSpecificationModel.create(specData as any);
    return specification;
  }

  async getGiftReviews(giftId: number): Promise<GiftReviewModel[]> {
    const reviews = await GiftReviewModel.findAll({
      where: { gift_id: giftId },
      order: [["createdAt", "DESC"]],
    });
    return reviews;
  }
}

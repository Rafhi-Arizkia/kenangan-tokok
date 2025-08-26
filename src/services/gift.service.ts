// Update the import path below if your models are located elsewhere, e.g. '../models/gift.model'
import { GiftModel } from "../models/gift.model";
import { GiftImageModel } from "../models/giftImage.model";
import { GiftReviewModel } from "../models/giftReview.model";
import { GiftSpecificationModel } from "../models/giftSpecification.model";
// import { GiftVariantModel } from '../models/giftVariant.model'; // Uncomment if needed and exists
import {
  CreateGiftDTO,
  UpdateGiftDTO,
  GiftQueryDTO,
  CreateGiftImageDTO,
  CreateGiftReviewDTO,
  CreateGiftSpecificationDTO,
} from "../dtos/gift.dto";
import { paginationHelper } from "../utils/response";
import { Op, WhereOptions } from "sequelize";

export class GiftService {
  async getAllGifts(queryParams: GiftQueryDTO) {
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

  async getGiftById(id: number) {
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

  async createGift(giftData: CreateGiftDTO) {
    const payload: any = {
      ...giftData,
    };

    // ensure defaults expected by model
    if (payload.total_sold === undefined) payload.total_sold = 0;

    const gift = await GiftModel.create(payload);
    return gift;
  }

  async updateGift(id: number, giftData: UpdateGiftDTO) {
    const gift = await GiftModel.findByPk(id);
    if (!gift) {
      throw new Error("Gift not found");
    }

    await gift.update(giftData);
    return gift;
  }

  async deleteGift(id: number) {
    const gift = await GiftModel.findByPk(id);
    if (!gift) {
      throw new Error("Gift not found");
    }

    await gift.destroy();
    return { message: "Gift deleted successfully" };
  }

  async getGiftsByShopId(shopId: number) {
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

  async addGiftImage(imageData: CreateGiftImageDTO) {
    // model expects 'url' field
    const image = await GiftImageModel.create({ ...imageData } as any);
    return image;
  }

  async addGiftReview(reviewData: CreateGiftReviewDTO) {
    // model uses 'message' and doesn't have is_verified/is_approved fields
    const payload: any = {
      gift_id: reviewData.gift_id,
      order_item_id: reviewData.order_item_id,
      user_id: reviewData.user_id,
      display_name: reviewData.display_name,
      message: reviewData.message,
      rating: reviewData.rating,
      external_id: reviewData.external_id,
    };

    const review = await GiftReviewModel.create(payload);
    return review;
  }

  async addGiftSpecification(specData: CreateGiftSpecificationDTO) {
    // model uses 'key' instead of 'name'
    const specification = await GiftSpecificationModel.create({
      ...specData,
    } as any);
    return specification;
  }

  async getGiftReviews(giftId: number) {
    const reviews = await GiftReviewModel.findAll({
      where: { gift_id: giftId },
      order: [["createdAt", "DESC"]],
    });
    return reviews;
  }
}

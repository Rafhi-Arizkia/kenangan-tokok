import { GiftReviewModel } from "../models/giftReview.model";
import { GiftModel } from "../models/gift.model";
import { GiftReviewImageModel } from "../models/giftReviewImage.model";
import { CreateGiftReviewDTO, UpdateGiftReviewDTO, GiftReviewQueryDTO } from "../dtos/giftReview.dto";
import { paginationHelper } from "../utils/response";
import { WhereOptions } from "sequelize";

export class GiftReviewService {
  async getAllGiftReviews(queryParams: GiftReviewQueryDTO) {
    const { page = 1, limit = 10, gift_id, user_id, rating, ...filters } = queryParams;
    
    const whereClause: WhereOptions = {};
    
    if (gift_id) {
      whereClause.gift_id = gift_id;
    }
    
    if (user_id) {
      whereClause.user_id = user_id;
    }
    
    if (rating) {
      whereClause.rating = rating;
    }

    // Add other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        whereClause[key] = value;
      }
    });

    const { count, rows } = await GiftReviewModel.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: GiftModel,
          as: 'gift',
          attributes: ['id', 'name']
        },
        {
          model: GiftReviewImageModel,
          as: 'images',
          attributes: ['id', 'url']
        }
      ],
      offset: (page - 1) * limit,
      limit,
      order: [['createdAt', 'DESC']]
    });

    const { pagination } = paginationHelper(page, limit, count);

    return {
      reviews: rows,
      pagination
    };
  }

  async getGiftReviewById(id: string) {
    const review = await GiftReviewModel.findByPk(id, {
      include: [
        {
          model: GiftModel,
          as: 'gift',
          attributes: ['id', 'name']
        },
        {
          model: GiftReviewImageModel,
          as: 'images',
          attributes: ['id', 'url']
        }
      ]
    });
    if (!review) {
      throw new Error("Gift review not found");
    }
    return review;
  }

  async getGiftReviewsByGiftId(giftId: number, page: number = 1, limit: number = 10) {
    const { count, rows } = await GiftReviewModel.findAndCountAll({
      where: { gift_id: giftId },
      include: [
        {
          model: GiftReviewImageModel,
          as: 'images',
          attributes: ['id', 'url']
        }
      ],
      offset: (page - 1) * limit,
      limit,
      order: [['createdAt', 'DESC']]
    });

    const { pagination } = paginationHelper(page, limit, count);

    return {
      reviews: rows,
      pagination
    };
  }

  async createGiftReview(reviewData: CreateGiftReviewDTO) {
    // Check if gift exists
    const gift = await GiftModel.findByPk(reviewData.gift_id);
    if (!gift) {
      throw new Error("Gift not found");
    }

    // Validate rating
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const review = await GiftReviewModel.create(reviewData);
    return review;
  }

  async updateGiftReview(id: string, reviewData: UpdateGiftReviewDTO) {
    const review = await GiftReviewModel.findByPk(id);
    if (!review) {
      throw new Error("Gift review not found");
    }

    // Validate rating if provided
    if (reviewData.rating && (reviewData.rating < 1 || reviewData.rating > 5)) {
      throw new Error("Rating must be between 1 and 5");
    }

    await review.update(reviewData);
    return review;
  }

  async deleteGiftReview(id: string) {
    const review = await GiftReviewModel.findByPk(id);
    if (!review) {
      throw new Error("Gift review not found");
    }

    await review.destroy();
    return { message: "Gift review deleted successfully" };
  }

  async getGiftRatingStats(giftId: number) {
    const reviews = await GiftReviewModel.findAll({
      where: { gift_id: giftId },
      attributes: ['rating']
    });

    if (reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: {
          5: 0, 4: 0, 3: 0, 2: 0, 1: 0
        }
      };
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    const ratingDistribution = reviews.reduce((dist, review) => {
      dist[review.rating] = (dist[review.rating] || 0) + 1;
      return dist;
    }, {} as Record<number, number>);

    return {
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      totalReviews: reviews.length,
      ratingDistribution: {
        5: ratingDistribution[5] || 0,
        4: ratingDistribution[4] || 0,
        3: ratingDistribution[3] || 0,
        2: ratingDistribution[2] || 0,
        1: ratingDistribution[1] || 0
      }
    };
  }
}

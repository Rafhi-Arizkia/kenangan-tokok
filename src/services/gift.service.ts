import { GiftModel, GiftImageModel, GiftReviewModel, GiftSpecificationModel, GiftVariantModel } from '../models';
import { CreateGiftDTO, UpdateGiftDTO, GiftQueryDTO, CreateGiftImageDTO, CreateGiftReviewDTO, CreateGiftSpecificationDTO } from '../dtos/gift.dto';
import { paginationHelper } from '../utils/response';
import { Op, WhereOptions } from 'sequelize';

export class GiftService {
  async getAllGifts(queryParams: GiftQueryDTO) {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      shop_id, 
      category_id, 
      is_active, 
      is_featured,
      min_price,
      max_price,
      sort_by = 'created_at',
      sort_order = 'DESC'
    } = queryParams;
    
    const { offset, pagination } = paginationHelper(page, limit, 0);

    // Build where condition
    const whereCondition: WhereOptions = {};

    if (search) {
      (whereCondition as any)[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { tags: { [Op.like]: `%${search}%` } }
      ];
    }

    if (shop_id) {
      whereCondition.shop_id = shop_id;
    }

    if (category_id) {
      whereCondition.category_id = category_id;
    }

    if (is_active !== undefined) {
      whereCondition.is_active = is_active;
    }

    if (is_featured !== undefined) {
      whereCondition.is_featured = is_featured;
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
          as: 'images',
          where: { is_primary: true },
          required: false,
        }
      ],
      offset,
      limit,
      order: [[sort_by, sort_order]],
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
        { model: GiftImageModel, as: 'images' },
        { model: GiftReviewModel, as: 'reviews' },
        { model: GiftSpecificationModel, as: 'specifications' }
      ]
    });
    
    if (!gift) {
      throw new Error('Gift not found');
    }
    return gift;
  }

  async createGift(giftData: CreateGiftDTO) {
    const gift = await GiftModel.create({
      ...giftData,
      is_active: giftData.is_active ?? true,
      is_featured: giftData.is_featured ?? false
    });
    return gift;
  }

  async updateGift(id: number, giftData: UpdateGiftDTO) {
    const gift = await GiftModel.findByPk(id);
    if (!gift) {
      throw new Error('Gift not found');
    }

    await gift.update(giftData);
    return gift;
  }

  async deleteGift(id: number) {
    const gift = await GiftModel.findByPk(id);
    if (!gift) {
      throw new Error('Gift not found');
    }

    await gift.destroy();
    return { message: 'Gift deleted successfully' };
  }

  async getGiftsByShopId(shopId: number) {
    const gifts = await GiftModel.findAll({
      where: { shop_id: shopId },
      include: [
        {
          model: GiftImageModel,
          as: 'images',
          where: { is_primary: true },
          required: false,
        }
      ],
      order: [['created_at', 'DESC']],
    });
    return gifts;
  }

  async addGiftImage(imageData: CreateGiftImageDTO) {
    const image = await GiftImageModel.create(imageData);
    return image;
  }

  async addGiftReview(reviewData: CreateGiftReviewDTO) {
    const review = await GiftReviewModel.create({
      ...reviewData,
      is_verified: reviewData.is_verified ?? false,
      is_approved: reviewData.is_approved ?? false
    });
    return review;
  }

  async addGiftSpecification(specData: CreateGiftSpecificationDTO) {
    const specification = await GiftSpecificationModel.create(specData);
    return specification;
  }

  async getGiftReviews(giftId: number) {
    const reviews = await GiftReviewModel.findAll({
      where: { gift_id: giftId, is_approved: true },
      order: [['created_at', 'DESC']],
    });
    return reviews;
  }
}

import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { GiftReviewController } from '../../controllers/giftReview.controller';

const giftReviewController = new GiftReviewController();

// Schema definitions (simplified for now)
const getAllGiftReviewsSchema = {
  description: 'Get all gift reviews',
  tags: ['Gift Reviews'],
  querystring: {
    type: 'object',
    properties: {
      gift_id: { type: 'number' },
      user_id: { type: 'number' },
      rating: { type: 'number' },
      page: { type: 'number', default: 1 },
      limit: { type: 'number', default: 10 }
    }
  }
};

const createGiftReviewSchema = {
  description: 'Create new gift review',
  tags: ['Gift Reviews'],
  body: {
    type: 'object',
    required: ['gift_id', 'message', 'rating'],
    properties: {
      gift_id: { type: 'number' },
      user_id: { type: 'number' },
      order_item_id: { type: 'number' },
      display_name: { type: 'string' },
      message: { type: 'string' },
      rating: { type: 'number', minimum: 1, maximum: 5 },
      external_id: { type: 'string' }
    }
  }
};

const getGiftReviewByIdSchema = {
  description: 'Get gift review by ID',
  tags: ['Gift Reviews'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  }
};

const updateGiftReviewSchema = {
  description: 'Update gift review',
  tags: ['Gift Reviews'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  },
  body: {
    type: 'object',
    properties: {
      display_name: { type: 'string' },
      message: { type: 'string' },
      rating: { type: 'number', minimum: 1, maximum: 5 }
    }
  }
};

const deleteGiftReviewSchema = {
  description: 'Delete gift review',
  tags: ['Gift Reviews'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  }
};

const getGiftReviewsByGiftIdSchema = {
  description: 'Get gift reviews by gift ID',
  tags: ['Gift Reviews'],
  params: {
    type: 'object',
    required: ['giftId'],
    properties: {
      giftId: { type: 'string' }
    }
  },
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'number', default: 1 },
      limit: { type: 'number', default: 10 }
    }
  }
};

const getGiftRatingStatsSchema = {
  description: 'Get gift rating statistics',
  tags: ['Gift Reviews'],
  params: {
    type: 'object',
    required: ['giftId'],
    properties: {
      giftId: { type: 'string' }
    }
  }
};

async function giftReviewRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // GET /api/gift-reviews - Get all gift reviews
  fastify.get('/', {
    schema: getAllGiftReviewsSchema,
  }, giftReviewController.getAllGiftReviews.bind(giftReviewController));

  // GET /api/gift-reviews/:id - Get gift review by ID
  fastify.get('/:id', {
    schema: getGiftReviewByIdSchema,
  }, giftReviewController.getGiftReviewById.bind(giftReviewController));

  // GET /api/gift-reviews/gift/:giftId - Get gift reviews by gift ID
  fastify.get('/gift/:giftId', {
    schema: getGiftReviewsByGiftIdSchema,
  }, giftReviewController.getGiftReviewsByGiftId.bind(giftReviewController));

  // GET /api/gift-reviews/gift/:giftId/stats - Get gift rating statistics
  fastify.get('/gift/:giftId/stats', {
    schema: getGiftRatingStatsSchema,
  }, giftReviewController.getGiftRatingStats.bind(giftReviewController));

  // POST /api/gift-reviews - Create new gift review
  fastify.post('/', {
    schema: createGiftReviewSchema,
  }, giftReviewController.createGiftReview.bind(giftReviewController));

  // PUT /api/gift-reviews/:id - Update gift review
  fastify.put('/:id', {
    schema: updateGiftReviewSchema,
  }, giftReviewController.updateGiftReview.bind(giftReviewController));

  // DELETE /api/gift-reviews/:id - Delete gift review
  fastify.delete('/:id', {
    schema: deleteGiftReviewSchema,
  }, giftReviewController.deleteGiftReview.bind(giftReviewController));
}

export default giftReviewRoutes;

import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { GiftController } from '../../controllers/gift.controller';
import {
  getAllGiftsSchema,
  getGiftByIdSchema,
  createGiftSchema,
  updateGiftSchema,
  deleteGiftSchema,
  getGiftsByShopIdSchema,
  addGiftImageSchema,
  addGiftReviewSchema,
  getGiftReviewsSchema,
  addGiftSpecificationSchema,
} from '../../schemas/gift.schema';

const giftController = new GiftController();

async function giftRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // GET /api/gifts - Get all gifts with pagination and filtering
  fastify.get('/', {
    schema: getAllGiftsSchema,
  }, giftController.getAllGifts.bind(giftController));

  // GET /api/gifts/:id - Get gift by ID
  fastify.get('/:id', {
    schema: getGiftByIdSchema,
  }, giftController.getGiftById.bind(giftController));

  // POST /api/gifts - Create new gift
  fastify.post('/', {
    schema: createGiftSchema,
  }, giftController.createGift.bind(giftController));

  // PUT /api/gifts/:id - Update gift
  fastify.put('/:id', {
    schema: updateGiftSchema,
  }, giftController.updateGift.bind(giftController));

  // DELETE /api/gifts/:id - Delete gift
  fastify.delete('/:id', {
    schema: deleteGiftSchema,
  }, giftController.deleteGift.bind(giftController));

  // GET /api/gifts/shop/:shopId - Get gifts by shop ID
  fastify.get('/shop/:shopId', {
    schema: getGiftsByShopIdSchema,
  }, giftController.getGiftsByShopId.bind(giftController));

  // POST /api/gifts/images - Add gift image
  fastify.post('/images', {
    schema: addGiftImageSchema,
  }, giftController.addGiftImage.bind(giftController));

  // POST /api/gifts/reviews - Add gift review
  fastify.post('/reviews', {
    schema: addGiftReviewSchema,
  }, giftController.addGiftReview.bind(giftController));

  // GET /api/gifts/:id/reviews - Get gift reviews
  fastify.get('/:id/reviews', {
    schema: getGiftReviewsSchema,
  }, giftController.getGiftReviews.bind(giftController));

  // POST /api/gifts/specifications - Add gift specification
  fastify.post('/specifications', {
    schema: addGiftSpecificationSchema,
  }, giftController.addGiftSpecification.bind(giftController));
}

export default giftRoutes;

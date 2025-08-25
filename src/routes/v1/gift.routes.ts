import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { GiftController } from '../../controllers/gift.controller';

const giftController = new GiftController();

async function giftRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // GET /api/gifts - Get all gifts with pagination and filtering
  fastify.get('/', giftController.getAllGifts.bind(giftController));

  // GET /api/gifts/:id - Get gift by ID
  fastify.get('/:id', giftController.getGiftById.bind(giftController));

  // POST /api/gifts - Create new gift
  fastify.post('/', giftController.createGift.bind(giftController));

  // PUT /api/gifts/:id - Update gift
  fastify.put('/:id', giftController.updateGift.bind(giftController));

  // DELETE /api/gifts/:id - Delete gift
  fastify.delete('/:id', giftController.deleteGift.bind(giftController));

  // GET /api/gifts/shop/:shopId - Get gifts by shop ID
  fastify.get('/shop/:shopId', giftController.getGiftsByShopId.bind(giftController));

  // POST /api/gifts/images - Add gift image
  fastify.post('/images', giftController.addGiftImage.bind(giftController));

  // POST /api/gifts/reviews - Add gift review
  fastify.post('/reviews', giftController.addGiftReview.bind(giftController));

  // GET /api/gifts/:id/reviews - Get gift reviews
  fastify.get('/:id/reviews', giftController.getGiftReviews.bind(giftController));

  // POST /api/gifts/specifications - Add gift specification
  fastify.post('/specifications', giftController.addGiftSpecification.bind(giftController));
}

export default giftRoutes;

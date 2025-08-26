import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ShopController } from '../../controllers/shop.controller';
import {
  getAllShopsSchema,
  getShopByIdSchema,
  createShopSchema,
  updateShopSchema,
  deleteShopSchema,
  getShopsByUserIdSchema,
} from '../../schemas/shop.schema';

const shopController = new ShopController();

async function shopRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // GET /api/shops - Get all shops with pagination and filtering
  fastify.get('/', {
    schema: getAllShopsSchema,
  }, shopController.getAllShops.bind(shopController));

  // GET /api/shops/:id - Get shop by ID
  fastify.get('/:id', {
    schema: getShopByIdSchema,
  }, shopController.getShopById.bind(shopController));

  // POST /api/shops - Create new shop
  fastify.post('/', {
    schema: createShopSchema,
  }, shopController.createShop.bind(shopController));

  // PUT /api/shops/:id - Update shop
  fastify.put('/:id', {
    schema: updateShopSchema,
  }, shopController.updateShop.bind(shopController));

  // DELETE /api/shops/:id - Delete shop
  fastify.delete('/:id', {
    schema: deleteShopSchema,
  }, shopController.deleteShop.bind(shopController));

  // GET /api/shops/user/:userId - Get shops by user ID
  fastify.get('/user/:userId', {
    schema: getShopsByUserIdSchema,
  }, shopController.getShopsByUserId.bind(shopController));
}

export default shopRoutes;

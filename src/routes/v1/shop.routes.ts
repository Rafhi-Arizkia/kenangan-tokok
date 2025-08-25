import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ShopController } from '../../controllers/shop.controller';

const shopController = new ShopController();

async function shopRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // GET /api/shops - Get all shops with pagination and filtering
  fastify.get('/', shopController.getAllShops.bind(shopController));

  // GET /api/shops/:id - Get shop by ID
  fastify.get('/:id', shopController.getShopById.bind(shopController));

  // POST /api/shops - Create new shop
  fastify.post('/', shopController.createShop.bind(shopController));

  // PUT /api/shops/:id - Update shop
  fastify.put('/:id', shopController.updateShop.bind(shopController));

  // DELETE /api/shops/:id - Delete shop
  fastify.delete('/:id', shopController.deleteShop.bind(shopController));

  // GET /api/shops/user/:userId - Get shops by user ID
  fastify.get('/user/:userId', shopController.getShopsByUserId.bind(shopController));
}

export default shopRoutes;

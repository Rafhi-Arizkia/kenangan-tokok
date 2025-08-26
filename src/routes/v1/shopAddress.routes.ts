import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ShopAddressController } from '../../controllers/shopAddress.controller';
import {
  getAllShopAddressesSchema,
  getShopAddressByIdSchema,
  getShopAddressByShopIdSchema,
  createShopAddressSchema,
  updateShopAddressSchema,
  deleteShopAddressSchema,
} from '../../schemas/shopAddress.schema';

const shopAddressController = new ShopAddressController();

async function shopAddressRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // GET /api/shop-addresses - Get all shop addresses with pagination and filtering
  fastify.get('/', {
    schema: getAllShopAddressesSchema,
  }, shopAddressController.getAllShopAddresses.bind(shopAddressController));

  // GET /api/shop-addresses/:id - Get shop address by ID
  fastify.get('/:id', {
    schema: getShopAddressByIdSchema,
  }, shopAddressController.getShopAddressById.bind(shopAddressController));

  // GET /api/shop-addresses/shop/:shopId - Get shop address by shop ID
  fastify.get('/shop/:shopId', {
    schema: getShopAddressByShopIdSchema,
  }, shopAddressController.getShopAddressByShopId.bind(shopAddressController));

  // POST /api/shop-addresses - Create new shop address
  fastify.post('/', {
    schema: createShopAddressSchema,
  }, shopAddressController.createShopAddress.bind(shopAddressController));

  // PUT /api/shop-addresses/:id - Update shop address
  fastify.put('/:id', {
    schema: updateShopAddressSchema,
  }, shopAddressController.updateShopAddress.bind(shopAddressController));

  // DELETE /api/shop-addresses/:id - Delete shop address
  fastify.delete('/:id', {
    schema: deleteShopAddressSchema,
  }, shopAddressController.deleteShopAddress.bind(shopAddressController));
}

export default shopAddressRoutes;

import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import OrderGroupController from '../../controllers/orderGroup.controller';
import {
  createOrderGroupSchema,
  getOrderGroupByIdSchema,
  listOrderGroupsSchema,
  updateOrderGroupSchema,
  deleteOrderGroupSchema,
} from '../../schemas/orderGroup.schema';

async function orderGroupRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // GET /api/order-groups - list
  fastify.get('/', { schema: listOrderGroupsSchema }, OrderGroupController.list.bind(OrderGroupController));

  // POST /api/order-groups - create
  fastify.post('/', { schema: createOrderGroupSchema }, OrderGroupController.create.bind(OrderGroupController));

  // GET /api/order-groups/:id - get
  fastify.get('/:id', { schema: getOrderGroupByIdSchema }, OrderGroupController.getById.bind(OrderGroupController));

  // PUT /api/order-groups/:id - update
  fastify.put('/:id', { schema: updateOrderGroupSchema }, OrderGroupController.update.bind(OrderGroupController));

  // DELETE /api/order-groups/:id - delete
  fastify.delete('/:id', { schema: deleteOrderGroupSchema }, OrderGroupController.delete.bind(OrderGroupController));
}

export default orderGroupRoutes;

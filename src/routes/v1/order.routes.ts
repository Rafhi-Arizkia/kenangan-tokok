import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { OrderController } from '../../controllers/order.controller';
import {
  getAllOrdersSchema,
  getOrderByIdSchema,
  createOrderSchema,
  updateOrderSchema,
  deleteOrderSchema,
  getOrdersByShopIdSchema,
  createOrderGroupSchema,
  getOrderGroupByIdSchema,
  addOrderItemSchema,
  getOrderItemsSchema,
  createOrderShipmentSchema,
  updateOrderShipmentSchema,
  getOrderShipmentSchema,
  updateOrderStatusSchema,
  getOrderStatusesSchema,
} from '../../schemas/order.schema';

const orderController = new OrderController();

async function orderRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // GET /api/orders - Get all orders with pagination and filtering
  fastify.get('/', {
    schema: getAllOrdersSchema,
  }, orderController.getAllOrders.bind(orderController));

  // GET /api/orders/:id - Get order by ID
  fastify.get('/:id', {
    schema: getOrderByIdSchema,
  }, orderController.getOrderById.bind(orderController));

  // POST /api/orders - Create new order
  fastify.post('/', {
    schema: createOrderSchema,
  }, orderController.createOrder.bind(orderController));

  // PUT /api/orders/:id - Update order
  fastify.put('/:id', {
    schema: updateOrderSchema,
  }, orderController.updateOrder.bind(orderController));

  // DELETE /api/orders/:id - Delete order
  fastify.delete('/:id', {
    schema: deleteOrderSchema,
  }, orderController.deleteOrder.bind(orderController));

  // GET /api/orders/shop/:shopId - Get orders by shop ID
  fastify.get('/shop/:shopId', {
    schema: getOrdersByShopIdSchema,
  }, orderController.getOrdersByShopId.bind(orderController));

  // Order Group routes
  // POST /api/orders/groups - Create new order group
  fastify.post('/groups', {
    schema: createOrderGroupSchema,
  }, orderController.createOrderGroup.bind(orderController));

  // GET /api/orders/groups/:id - Get order group by ID
  fastify.get('/groups/:id', {
    schema: getOrderGroupByIdSchema,
  }, orderController.getOrderGroupById.bind(orderController));

  // Order Item routes
  // POST /api/orders/items - Add order item
  fastify.post('/items', {
    schema: addOrderItemSchema,
  }, orderController.addOrderItem.bind(orderController));

  // GET /api/orders/:orderId/items - Get order items
  fastify.get('/:orderId/items', {
    schema: getOrderItemsSchema,
  }, orderController.getOrderItems.bind(orderController));

  // Order Shipment routes
  // POST /api/orders/shipments - Create order shipment
  fastify.post('/shipments', {
    schema: createOrderShipmentSchema,
  }, orderController.createOrderShipment.bind(orderController));

  // PUT /api/orders/shipments/:id - Update order shipment
  fastify.put('/shipments/:id', {
    schema: updateOrderShipmentSchema,
  }, orderController.updateOrderShipment.bind(orderController));

  // GET /api/orders/:orderId/shipment - Get order shipment
  fastify.get('/:orderId/shipment', {
    schema: getOrderShipmentSchema,
  }, orderController.getOrderShipment.bind(orderController));

  // Order Status routes
  // PUT /api/orders/:orderId/status - Update order status
  fastify.put('/:orderId/status', {
    schema: updateOrderStatusSchema,
  }, orderController.updateOrderStatus.bind(orderController));

  // GET /api/orders/:orderId/statuses - Get order status history
  fastify.get('/:orderId/statuses', {
    schema: getOrderStatusesSchema,
  }, orderController.getOrderStatuses.bind(orderController));
}

export default orderRoutes;

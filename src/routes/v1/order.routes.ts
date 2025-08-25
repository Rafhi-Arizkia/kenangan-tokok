import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { OrderController } from '../../controllers/order.controller';

const orderController = new OrderController();

async function orderRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // GET /api/orders - Get all orders with pagination and filtering
  fastify.get('/', orderController.getAllOrders.bind(orderController));

  // GET /api/orders/:id - Get order by ID
  fastify.get('/:id', orderController.getOrderById.bind(orderController));

  // POST /api/orders - Create new order
  fastify.post('/', orderController.createOrder.bind(orderController));

  // PUT /api/orders/:id - Update order
  fastify.put('/:id', orderController.updateOrder.bind(orderController));

  // DELETE /api/orders/:id - Delete order
  fastify.delete('/:id', orderController.deleteOrder.bind(orderController));

  // GET /api/orders/shop/:shopId - Get orders by shop ID
  fastify.get('/shop/:shopId', orderController.getOrdersByShopId.bind(orderController));

  // Order Group routes
  // POST /api/orders/groups - Create new order group
  fastify.post('/groups', orderController.createOrderGroup.bind(orderController));

  // GET /api/orders/groups/:id - Get order group by ID
  fastify.get('/groups/:id', orderController.getOrderGroupById.bind(orderController));

  // Order Item routes
  // POST /api/orders/items - Add order item
  fastify.post('/items', orderController.addOrderItem.bind(orderController));

  // GET /api/orders/:orderId/items - Get order items
  fastify.get('/:orderId/items', orderController.getOrderItems.bind(orderController));

  // Order Shipment routes
  // POST /api/orders/shipments - Create order shipment
  fastify.post('/shipments', orderController.createOrderShipment.bind(orderController));

  // PUT /api/orders/shipments/:id - Update order shipment
  fastify.put('/shipments/:id', orderController.updateOrderShipment.bind(orderController));

  // GET /api/orders/:orderId/shipment - Get order shipment
  fastify.get('/:orderId/shipment', orderController.getOrderShipment.bind(orderController));

  // Order Status routes
  // PUT /api/orders/:orderId/status - Update order status
  fastify.put('/:orderId/status', orderController.updateOrderStatus.bind(orderController));

  // GET /api/orders/:orderId/statuses - Get order status history
  fastify.get('/:orderId/statuses', orderController.getOrderStatuses.bind(orderController));
}

export default orderRoutes;

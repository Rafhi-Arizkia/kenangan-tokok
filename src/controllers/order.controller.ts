import { FastifyRequest, FastifyReply } from 'fastify';
import { OrderService } from '../services/order.service';
import { 
  CreateOrderDTO, 
  UpdateOrderDTO, 
  OrderQueryDTO, 
  CreateOrderGroupDTO, 
  CreateOrderItemDTO, 
  CreateOrderShipmentDTO, 
  UpdateOrderShipmentDTO
} from '../dtos/order.dto';
import { ResponseHandler } from '../utils/response';

const orderService = new OrderService();

export class OrderController {
  async getAllOrders(request: FastifyRequest<{ Querystring: OrderQueryDTO }>, reply: FastifyReply) {
    try {
      const result = await orderService.getAllOrders(request.query);
      return ResponseHandler.success(reply, result.orders, 'Orders retrieved successfully', result.pagination);
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to retrieve orders', error.message);
    }
  }

  async getOrderById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const orderId = request.params.id;
      const order = await orderService.getOrderById(orderId);
      return ResponseHandler.success(reply, order, 'Order retrieved successfully');
    } catch (error: any) {
      if (error.message === 'Order not found') {
        return ResponseHandler.error(reply, 'Order not found', error.message, 404);
      }
      return ResponseHandler.error(reply, 'Failed to retrieve order', error.message);
    }
  }

  async createOrder(request: FastifyRequest<{ Body: CreateOrderDTO }>, reply: FastifyReply) {
    try {
      const result = await orderService.createOrder(request.body);
      
      // If service returned an error-like object with statusCode >= 400, forward it
      if ((result as any).statusCode && (result as any).statusCode >= 400) {
        return ResponseHandler.error(reply, 'Failed to create order', JSON.stringify((result as any).errors), 400);
      }

      return ResponseHandler.success(reply, result, 'Orders created successfully');
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to create order', error.message, 400);
    }
  }

  async updateOrder(request: FastifyRequest<{ Params: { id: string }; Body: UpdateOrderDTO }>, reply: FastifyReply) {
    try {
      const orderId = request.params.id;
      const order = await orderService.updateOrder(orderId, request.body);
      return ResponseHandler.success(reply, order, 'Order updated successfully');
    } catch (error: any) {
      if (error.message === 'Order not found') {
        return ResponseHandler.error(reply, 'Order not found', error.message, 404);
      }
      return ResponseHandler.error(reply, 'Failed to update order', error.message, 400);
    }
  }

  async deleteOrder(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const orderId = request.params.id;
      const result = await orderService.deleteOrder(orderId);
      return ResponseHandler.success(reply, result, 'Order deleted successfully');
    } catch (error: any) {
      if (error.message === 'Order not found') {
        return ResponseHandler.error(reply, 'Order not found', error.message, 404);
      }
      return ResponseHandler.error(reply, 'Failed to delete order', error.message);
    }
  }

  async getOrdersByShopId(request: FastifyRequest<{ Params: { shopId: string } }>, reply: FastifyReply) {
    try {
      const shopId = parseInt(request.params.shopId);
      const orders = await orderService.getOrdersByShopId(shopId);
      return ResponseHandler.success(reply, orders, 'Orders retrieved successfully');
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to retrieve orders', error.message);
    }
  }

  // OrderGroup endpoints
  // Note: createOrderGroup method is now handled by createOrder method
  // This method is kept for compatibility but redirects to createOrder
  async createOrderGroup(request: FastifyRequest<{ Body: CreateOrderGroupDTO }>, reply: FastifyReply) {
    try {
      return ResponseHandler.error(reply, 'Use createOrder endpoint instead', 'This endpoint is deprecated', 400);
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to create order group', error.message, 400);
    }
  }

  async getOrderGroupById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const orderGroupId = parseInt(request.params.id);
      const orderGroup = await orderService.getOrderGroupById(orderGroupId);
      return ResponseHandler.success(reply, orderGroup, 'Order group retrieved successfully');
    } catch (error: any) {
      if (error.message === 'Order group not found') {
        return ResponseHandler.error(reply, 'Order group not found', error.message, 404);
      }
      return ResponseHandler.error(reply, 'Failed to retrieve order group', error.message);
    }
  }

  // OrderItem endpoints
  async addOrderItem(request: FastifyRequest<{ Body: CreateOrderItemDTO }>, reply: FastifyReply) {
    try {
      const orderItem = await orderService.addOrderItem(request.body);
      return ResponseHandler.success(reply, orderItem, 'Order item added successfully');
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to add order item', error.message, 400);
    }
  }

  async getOrderItems(request: FastifyRequest<{ Params: { orderId: string } }>, reply: FastifyReply) {
    try {
      const orderId = request.params.orderId;
      const orderItems = await orderService.getOrderItems(orderId);
      return ResponseHandler.success(reply, orderItems, 'Order items retrieved successfully');
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to retrieve order items', error.message);
    }
  }

  // OrderShipment endpoints
  async createOrderShipment(request: FastifyRequest<{ Body: CreateOrderShipmentDTO }>, reply: FastifyReply) {
    try {
      const shipment = await orderService.createOrderShipment(request.body);
      return ResponseHandler.success(reply, shipment, 'Order shipment created successfully');
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to create order shipment', error.message, 400);
    }
  }

  async updateOrderShipment(request: FastifyRequest<{ Params: { id: string }; Body: UpdateOrderShipmentDTO }>, reply: FastifyReply) {
    try {
      const shipmentId = parseInt(request.params.id);
      const shipment = await orderService.updateOrderShipment(shipmentId, request.body);
      return ResponseHandler.success(reply, shipment, 'Order shipment updated successfully');
    } catch (error: any) {
      if (error.message === 'Order shipment not found') {
        return ResponseHandler.error(reply, 'Order shipment not found', error.message, 404);
      }
      return ResponseHandler.error(reply, 'Failed to update order shipment', error.message, 400);
    }
  }

  async getOrderShipment(request: FastifyRequest<{ Params: { orderId: string } }>, reply: FastifyReply) {
    try {
      const orderId = request.params.orderId;
      const shipment = await orderService.getOrderShipment(orderId);
      return ResponseHandler.success(reply, shipment, 'Order shipment retrieved successfully');
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to retrieve order shipment', error.message);
    }
  }

  // OrderStatus endpoints
  async updateOrderStatus(request: FastifyRequest<{ 
    Params: { orderId: string }; 
    Body: { statusNameId: number; description?: string } 
  }>, reply: FastifyReply) {
    try {
      const { orderId } = request.params;
      const { statusNameId, description } = request.body;
      const orderStatus = await orderService.updateOrderStatus(orderId, statusNameId, description);
      return ResponseHandler.success(reply, orderStatus, 'Order status updated successfully');
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to update order status', error.message, 400);
    }
  }

  async getOrderStatuses(request: FastifyRequest<{ Params: { orderId: string } }>, reply: FastifyReply) {
    try {
      const orderId = request.params.orderId;
      const statuses = await orderService.getOrderStatuses(orderId);
      return ResponseHandler.success(reply, statuses, 'Order statuses retrieved successfully');
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to retrieve order statuses', error.message);
    }
  }
}

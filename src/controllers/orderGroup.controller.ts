import { FastifyRequest, FastifyReply } from 'fastify';
import OrderGroupService from '../services/orderGroup.service';
import { CreateOrderGroupDTO, UpdateOrderGroupDTO, OrderGroupQueryDTO } from '../dtos/orderGroup.dto';
import { ResponseHandler } from '../utils/response';

export class OrderGroupController {
  async list(request: FastifyRequest<{ Querystring: OrderGroupQueryDTO }>, reply: FastifyReply) {
    try {
      const result = await OrderGroupService.getAllOrderGroups(request.query || {} as any);
      return ResponseHandler.success(reply, result, 'Order groups retrieved successfully', result.pagination);
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to retrieve order groups', error.message);
    }
  }

  async create(request: FastifyRequest<{ Body: CreateOrderGroupDTO }>, reply: FastifyReply) {
    try {
      const orderGroup = await OrderGroupService.createOrderGroup(request.body);
      return ResponseHandler.created(reply, orderGroup, 'Order group created successfully');
    } catch (error: any) {
      return ResponseHandler.badRequest(reply, 'Failed to create order group', error.message);
    }
  }

  async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const id = parseInt(request.params.id);
      const orderGroup = await OrderGroupService.getOrderGroupById(id);
      return ResponseHandler.success(reply, orderGroup, 'Order group retrieved successfully');
    } catch (error: any) {
      if (error.message === 'Order group not found') {
        return ResponseHandler.notFound(reply, 'Order group not found');
      }
      return ResponseHandler.error(reply, 'Failed to retrieve order group', error.message);
    }
  }

  async update(request: FastifyRequest<{ Params: { id: string }; Body: UpdateOrderGroupDTO }>, reply: FastifyReply) {
    try {
      const id = parseInt(request.params.id);
      const orderGroup = await OrderGroupService.updateOrderGroup(id, request.body);
      return ResponseHandler.success(reply, orderGroup, 'Order group updated successfully');
    } catch (error: any) {
      if (error.message === 'Order group not found') {
        return ResponseHandler.notFound(reply, 'Order group not found');
      }
      return ResponseHandler.badRequest(reply, 'Failed to update order group', error.message);
    }
  }

  async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const id = parseInt(request.params.id);
      const result = await OrderGroupService.deleteOrderGroup(id);
      return ResponseHandler.success(reply, result, 'Order group deleted successfully');
    } catch (error: any) {
      if (error.message === 'Order group not found') {
        return ResponseHandler.notFound(reply, 'Order group not found');
      }
      return ResponseHandler.error(reply, 'Failed to delete order group', error.message);
    }
  }
}

export default new OrderGroupController();

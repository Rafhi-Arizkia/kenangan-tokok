import { FastifyRequest, FastifyReply } from 'fastify';
import { ShopService } from '../services/shop.service';
import { CreateShopDTO, UpdateShopDTO, ShopQueryDTO } from '../dtos/shop.dto';
import { ResponseHandler } from '../utils/response';

const shopService = new ShopService();

export class ShopController {
  async getAllShops(request: FastifyRequest<{ Querystring: ShopQueryDTO }>, reply: FastifyReply) {
    try {
      const result = await shopService.getAllShops(request.query);
      return ResponseHandler.success(reply, result.shops, 'Shops retrieved successfully', result.pagination);
    } catch (error: any) {
  // Log full error for debugging
  // eslint-disable-next-line no-console
  console.error('getAllShops error:', error);
  const errMsg = (error && (error.message || error.toString())) || 'Unknown error';
  const errStack = error && error.stack ? error.stack : undefined;
  return ResponseHandler.serverError(reply, 'Failed to retrieve shops', errStack || errMsg);
    }
  }

  async getShopById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const shopId = parseInt(request.params.id);
      const shop = await shopService.getShopById(shopId);
      return ResponseHandler.success(reply, shop, 'Shop retrieved successfully');
    } catch (error: any) {
      if (error.message === 'Shop not found') {
        return ResponseHandler.notFound(reply, 'Shop not found');
      }
      return ResponseHandler.serverError(reply, 'Failed to retrieve shop', error.message);
    }
  }

  async createShop(request: FastifyRequest<{ Body: CreateShopDTO }>, reply: FastifyReply) {
    try {
      const shop = await shopService.createShop(request.body);
      return ResponseHandler.created(reply, shop, 'Shop created successfully');
    } catch (error: any) {
      return ResponseHandler.badRequest(reply, 'Failed to create shop', error.message);
    }
  }

  async updateShop(request: FastifyRequest<{ Params: { id: string }; Body: UpdateShopDTO }>, reply: FastifyReply) {
    try {
      const shopId = parseInt(request.params.id);
      const shop = await shopService.updateShop(shopId, request.body);
      return ResponseHandler.success(reply, shop, 'Shop updated successfully');
    } catch (error: any) {
      if (error.message === 'Shop not found') {
        return ResponseHandler.notFound(reply, 'Shop not found');
      }
      return ResponseHandler.badRequest(reply, 'Failed to update shop', error.message);
    }
  }

  async deleteShop(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const shopId = parseInt(request.params.id);
      const result = await shopService.deleteShop(shopId);
      return ResponseHandler.success(reply, result, 'Shop deleted successfully');
    } catch (error: any) {
      if (error.message === 'Shop not found') {
        return ResponseHandler.notFound(reply, 'Shop not found');
      }
      return ResponseHandler.serverError(reply, 'Failed to delete shop', error.message);
    }
  }

  async getShopsByUserId(request: FastifyRequest<{ Params: { userId: string } }>, reply: FastifyReply) {
    try {
      const userId = parseInt(request.params.userId);
      const shops = await shopService.getShopsByUserId(userId);
      return ResponseHandler.success(reply, shops, 'Shops retrieved successfully');
    } catch (error: any) {
      return ResponseHandler.serverError(reply, 'Failed to retrieve shops', error.message);
    }
  }
}

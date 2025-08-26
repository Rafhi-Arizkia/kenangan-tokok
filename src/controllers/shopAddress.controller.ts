import { FastifyRequest, FastifyReply } from 'fastify';
import { ShopAddressService } from '../services/shopAddress.service';
import { CreateShopAddressDTO, UpdateShopAddressDTO, ShopAddressQueryDTO } from '../dtos/shopAddress.dto';
import { ResponseHandler } from '../utils/response';

const shopAddressService = new ShopAddressService();

export class ShopAddressController {
  async getAllShopAddresses(request: FastifyRequest<{ Querystring: ShopAddressQueryDTO }>, reply: FastifyReply) {
    try {
      const result = await shopAddressService.getAllShopAddresses(request.query);
      return ResponseHandler.success(reply, result.addresses, 'Shop addresses retrieved successfully', result.pagination);
    } catch (error: any) {
      return ResponseHandler.serverError(reply, 'Failed to retrieve shop addresses', error.message);
    }
  }

  async getShopAddressById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const addressId = request.params.id;
      const address = await shopAddressService.getShopAddressById(addressId);
      return ResponseHandler.success(reply, address, 'Shop address retrieved successfully');
    } catch (error: any) {
      if (error.message === 'Shop address not found') {
        return ResponseHandler.notFound(reply, 'Shop address not found');
      }
      return ResponseHandler.serverError(reply, 'Failed to retrieve shop address', error.message);
    }
  }

  async getShopAddressByShopId(request: FastifyRequest<{ Params: { shopId: string } }>, reply: FastifyReply) {
    try {
      const shopId = parseInt(request.params.shopId);
      const address = await shopAddressService.getShopAddressByShopId(shopId);
      if (!address) {
        return ResponseHandler.notFound(reply, 'Shop address not found');
      }
      return ResponseHandler.success(reply, address, 'Shop address retrieved successfully');
    } catch (error: any) {
      return ResponseHandler.serverError(reply, 'Failed to retrieve shop address', error.message);
    }
  }

  async createShopAddress(request: FastifyRequest<{ Body: CreateShopAddressDTO }>, reply: FastifyReply) {
    try {
      const address = await shopAddressService.createShopAddress(request.body);
      return ResponseHandler.created(reply, address, 'Shop address created successfully');
    } catch (error: any) {
      if (error.message === 'Shop not found') {
        return ResponseHandler.badRequest(reply, 'Shop not found', error.message);
      }
      if (error.message === 'Shop address already exists') {
        return ResponseHandler.badRequest(reply, 'Shop address already exists', error.message);
      }
      return ResponseHandler.serverError(reply, 'Failed to create shop address', error.message);
    }
  }

  async updateShopAddress(request: FastifyRequest<{ Params: { id: string }; Body: UpdateShopAddressDTO }>, reply: FastifyReply) {
    try {
      const addressId = request.params.id;
      const address = await shopAddressService.updateShopAddress(addressId, request.body);
      return ResponseHandler.success(reply, address, 'Shop address updated successfully');
    } catch (error: any) {
      if (error.message === 'Shop address not found') {
        return ResponseHandler.notFound(reply, 'Shop address not found');
      }
      return ResponseHandler.serverError(reply, 'Failed to update shop address', error.message);
    }
  }

  async deleteShopAddress(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const addressId = request.params.id;
      const result = await shopAddressService.deleteShopAddress(addressId);
      return ResponseHandler.success(reply, result, 'Shop address deleted successfully');
    } catch (error: any) {
      if (error.message === 'Shop address not found') {
        return ResponseHandler.notFound(reply, 'Shop address not found');
      }
      return ResponseHandler.serverError(reply, 'Failed to delete shop address', error.message);
    }
  }
}

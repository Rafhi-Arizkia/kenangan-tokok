import { FastifyRequest, FastifyReply } from 'fastify';
import { GiftVariantService } from '../services/giftVariant.service';
import { CreateGiftVariantDTO, UpdateGiftVariantDTO, GiftVariantQueryDTO } from '../dtos/giftVariant.dto';
import { ResponseHandler } from '../utils/response';

const giftVariantService = new GiftVariantService();

export class GiftVariantController {
  async getAllGiftVariants(request: FastifyRequest<{ Querystring: GiftVariantQueryDTO }>, reply: FastifyReply) {
    try {
      const result = await giftVariantService.getAllGiftVariants(request.query);
      return ResponseHandler.success(reply, result, 'Gift variants retrieved successfully', result.pagination);
    } catch (error: any) {
      return ResponseHandler.serverError(reply, 'Failed to retrieve gift variants', error.message);
    }
  }

  async getGiftVariantById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const variantId = parseInt(request.params.id);
      const variant = await giftVariantService.getGiftVariantById(variantId);
      return ResponseHandler.success(reply, variant, 'Gift variant retrieved successfully');
    } catch (error: any) {
      if (error.message === 'Gift variant not found') {
        return ResponseHandler.notFound(reply, 'Gift variant not found');
      }
      return ResponseHandler.serverError(reply, 'Failed to retrieve gift variant', error.message);
    }
  }

  async getGiftVariantsByGiftId(request: FastifyRequest<{ Params: { giftId: string } }>, reply: FastifyReply) {
    try {
      const giftId = parseInt(request.params.giftId);
      const variants = await giftVariantService.getGiftVariantsByGiftId(giftId);
      return ResponseHandler.success(reply, variants, 'Gift variants retrieved successfully');
    } catch (error: any) {
      return ResponseHandler.serverError(reply, 'Failed to retrieve gift variants', error.message);
    }
  }

  async createGiftVariant(request: FastifyRequest<{ Body: CreateGiftVariantDTO }>, reply: FastifyReply) {
    try {
      const variant = await giftVariantService.createGiftVariant(request.body);
      return ResponseHandler.created(reply, variant, 'Gift variant created successfully');
    } catch (error: any) {
      if (error.message === 'Gift not found') {
        return ResponseHandler.badRequest(reply, 'Gift not found', error.message);
      }
      if (error.message === 'Variant combination already exists for this gift') {
        return ResponseHandler.badRequest(reply, 'Variant combination already exists', error.message);
      }
      return ResponseHandler.serverError(reply, 'Failed to create gift variant', error.message);
    }
  }

  async updateGiftVariant(request: FastifyRequest<{ Params: { id: string }; Body: UpdateGiftVariantDTO }>, reply: FastifyReply) {
    try {
      const variantId = parseInt(request.params.id);
      const variant = await giftVariantService.updateGiftVariant(variantId, request.body);
      return ResponseHandler.success(reply, variant, 'Gift variant updated successfully');
    } catch (error: any) {
      if (error.message === 'Gift variant not found') {
        return ResponseHandler.notFound(reply, 'Gift variant not found');
      }
      if (error.message === 'Variant combination already exists for this gift') {
        return ResponseHandler.badRequest(reply, 'Variant combination already exists', error.message);
      }
      return ResponseHandler.serverError(reply, 'Failed to update gift variant', error.message);
    }
  }

  async deleteGiftVariant(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const variantId = parseInt(request.params.id);
      const result = await giftVariantService.deleteGiftVariant(variantId);
      return ResponseHandler.success(reply, result, 'Gift variant deleted successfully');
    } catch (error: any) {
      if (error.message === 'Gift variant not found') {
        return ResponseHandler.notFound(reply, 'Gift variant not found');
      }
      return ResponseHandler.serverError(reply, 'Failed to delete gift variant', error.message);
    }
  }

  async getVariantKeys(request: FastifyRequest<{ 
    Querystring: { gift_id?: number }
  }>, reply: FastifyReply) {
    try {
      const { gift_id } = request.query;
      const keys = await giftVariantService.getVariantKeys(gift_id);
      return ResponseHandler.success(reply, keys, 'Variant keys retrieved successfully');
    } catch (error: any) {
      return ResponseHandler.serverError(reply, 'Failed to retrieve variant keys', error.message);
    }
  }

  async getVariantValuesByKey(request: FastifyRequest<{ 
    Params: { key: string };
    Querystring: { gift_id?: number }
  }>, reply: FastifyReply) {
    try {
      const { key } = request.params;
      const { gift_id } = request.query;
      const values = await giftVariantService.getVariantValuesByKey(key, gift_id);
      return ResponseHandler.success(reply, values, 'Variant values retrieved successfully');
    } catch (error: any) {
      return ResponseHandler.serverError(reply, 'Failed to retrieve variant values', error.message);
    }
  }
}

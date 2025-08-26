import { FastifyRequest, FastifyReply } from 'fastify';
import { GiftImageService } from '../services/giftImage.service';
import { CreateGiftImageDTO, UpdateGiftImageDTO, GiftImageQueryDTO } from '../dtos/giftImage.dto';
import { ResponseHandler } from '../utils/response';

const giftImageService = new GiftImageService();

export class GiftImageController {
  async getAllGiftImages(request: FastifyRequest<{ Querystring: GiftImageQueryDTO }>, reply: FastifyReply) {
    try {
      const result = await giftImageService.getAllGiftImages(request.query);
      return ResponseHandler.success(reply, result.images, 'Gift images retrieved successfully', result.pagination);
    } catch (error: any) {
      return ResponseHandler.serverError(reply, 'Failed to retrieve gift images', error.message);
    }
  }

  async getGiftImageById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const imageId = request.params.id;
      const image = await giftImageService.getGiftImageById(imageId);
      return ResponseHandler.success(reply, image, 'Gift image retrieved successfully');
    } catch (error: any) {
      if (error.message === 'Gift image not found') {
        return ResponseHandler.notFound(reply, 'Gift image not found');
      }
      return ResponseHandler.serverError(reply, 'Failed to retrieve gift image', error.message);
    }
  }

  async getGiftImagesByGiftId(request: FastifyRequest<{ Params: { giftId: string } }>, reply: FastifyReply) {
    try {
      const giftId = parseInt(request.params.giftId);
      const images = await giftImageService.getGiftImagesByGiftId(giftId);
      return ResponseHandler.success(reply, images, 'Gift images retrieved successfully');
    } catch (error: any) {
      return ResponseHandler.serverError(reply, 'Failed to retrieve gift images', error.message);
    }
  }

  async createGiftImage(request: FastifyRequest<{ Body: CreateGiftImageDTO }>, reply: FastifyReply) {
    try {
      const image = await giftImageService.createGiftImage(request.body);
      return ResponseHandler.created(reply, image, 'Gift image created successfully');
    } catch (error: any) {
      if (error.message === 'Gift not found') {
        return ResponseHandler.badRequest(reply, 'Gift not found', error.message);
      }
      return ResponseHandler.serverError(reply, 'Failed to create gift image', error.message);
    }
  }

  async updateGiftImage(request: FastifyRequest<{ Params: { id: string }; Body: UpdateGiftImageDTO }>, reply: FastifyReply) {
    try {
      const imageId = request.params.id;
      const image = await giftImageService.updateGiftImage(imageId, request.body);
      return ResponseHandler.success(reply, image, 'Gift image updated successfully');
    } catch (error: any) {
      if (error.message === 'Gift image not found') {
        return ResponseHandler.notFound(reply, 'Gift image not found');
      }
      return ResponseHandler.serverError(reply, 'Failed to update gift image', error.message);
    }
  }

  async deleteGiftImage(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const imageId = request.params.id;
      const result = await giftImageService.deleteGiftImage(imageId);
      return ResponseHandler.success(reply, result, 'Gift image deleted successfully');
    } catch (error: any) {
      if (error.message === 'Gift image not found') {
        return ResponseHandler.notFound(reply, 'Gift image not found');
      }
      return ResponseHandler.serverError(reply, 'Failed to delete gift image', error.message);
    }
  }
}

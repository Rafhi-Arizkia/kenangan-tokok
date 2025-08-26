import { FastifyRequest, FastifyReply } from 'fastify';
import { GiftService } from '../services/gift.service';
import { 
  CreateGiftDTO, 
  UpdateGiftDTO, 
  GiftQueryDTO, 
  CreateGiftImageDTO, 
  CreateGiftReviewDTO, 
  CreateGiftSpecificationDTO 
} from '../dtos/gift.dto';
import { ResponseHandler } from '../utils/response';
import { s3Uploader } from '../utils/s3.helper';

const giftService = new GiftService();

export class GiftController {
  async getAllGifts(request: FastifyRequest<{ Querystring: GiftQueryDTO }>, reply: FastifyReply) {
    try {
      const result = await giftService.getAllGifts(request.query);
      return ResponseHandler.success(reply, result.gifts, 'Gifts retrieved successfully', result.pagination);
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to retrieve gifts', error.message);
    }
  }

  async getGiftById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const giftId = parseInt(request.params.id);
      const gift = await giftService.getGiftById(giftId);
      return ResponseHandler.success(reply, gift, 'Gift retrieved successfully');
    } catch (error: any) {
      if (error.message === 'Gift not found') {
        return ResponseHandler.error(reply, 'Gift not found', error.message, 404);
      }
      return ResponseHandler.error(reply, 'Failed to retrieve gift', error.message);
    }
  }

  async createGift(request: FastifyRequest<{ Body: CreateGiftDTO }>, reply: FastifyReply) {
    try {
      const gift = await giftService.createGift(request.body);
      return ResponseHandler.success(reply, gift, 'Gift created successfully');
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to create gift', error.message, 400);
    }
  }

  async updateGift(request: FastifyRequest<{ Params: { id: string }; Body: UpdateGiftDTO }>, reply: FastifyReply) {
    try {
      const giftId = parseInt(request.params.id);
      const gift = await giftService.updateGift(giftId, request.body);
      return ResponseHandler.success(reply, gift, 'Gift updated successfully');
    } catch (error: any) {
      if (error.message === 'Gift not found') {
        return ResponseHandler.error(reply, 'Gift not found', error.message, 404);
      }
      return ResponseHandler.error(reply, 'Failed to update gift', error.message, 400);
    }
  }

  async deleteGift(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const giftId = parseInt(request.params.id);
      const result = await giftService.deleteGift(giftId);
      return ResponseHandler.success(reply, result, 'Gift deleted successfully');
    } catch (error: any) {
      if (error.message === 'Gift not found') {
        return ResponseHandler.error(reply, 'Gift not found', error.message, 404);
      }
      return ResponseHandler.error(reply, 'Failed to delete gift', error.message);
    }
  }

  async getGiftsByShopId(request: FastifyRequest<{ Params: { shopId: string } }>, reply: FastifyReply) {
    try {
      const shopId = parseInt(request.params.shopId);
      const gifts = await giftService.getGiftsByShopId(shopId);
      return ResponseHandler.success(reply, gifts, 'Gifts retrieved successfully');
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to retrieve gifts', error.message);
    }
  }

  async addGiftImage(request: FastifyRequest<{ Body: CreateGiftImageDTO }>, reply: FastifyReply) {
    try {
      const image = await giftService.addGiftImage(request.body);
      return ResponseHandler.success(reply, image, 'Gift image added successfully');
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to add gift image', error.message, 400);
    }
  }

  // Handle multipart upload and save file to S3, then persist image record
  async uploadGiftImage(request: FastifyRequest, reply: FastifyReply) {
    try {
      // fastify-multipart exposes file via request.file()
      const mp: any = (request as any).file;
      if (!mp) {
        return ResponseHandler.badRequest(reply, 'No file provided');
      }

      const file = await mp();
      const buffer = await (file.toBuffer ? file.toBuffer() : (async () => {
        // Collect stream into buffer
        const chunks: Buffer[] = [];
        for await (const chunk of file.file) chunks.push(chunk as Buffer);
        return Buffer.concat(chunks);
      })());

      const ext = file.filename ? file.filename.split('.').pop() : 'bin';
      const key = `uploads/gifts/${Date.now()}-${Math.random().toString(36).substring(2,8)}.${ext}`;

      const uploadRes = await s3Uploader.uploadBuffer(buffer, key, file.mimetype || 'application/octet-stream');
      const imageUrl = uploadRes.Location;

      // Expect body contains gift_id and optional alt_text/is_primary/sort_order
      const payload = await request.body as any;
      const createImage = {
        gift_id: Number(payload.gift_id),
        image_url: imageUrl,
        alt_text: payload.alt_text,
        is_primary: payload.is_primary === true || payload.is_primary === 'true',
        sort_order: payload.sort_order ? Number(payload.sort_order) : 0,
      };

      const imageRecord = await giftService.addGiftImage(createImage);
      return ResponseHandler.success(reply, imageRecord, 'Gift image uploaded successfully');
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to upload gift image', error.message, 400);
    }
  }

  async addGiftReview(request: FastifyRequest<{ Body: CreateGiftReviewDTO }>, reply: FastifyReply) {
    try {
      const review = await giftService.addGiftReview(request.body);
      return ResponseHandler.success(reply, review, 'Gift review added successfully');
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to add gift review', error.message, 400);
    }
  }

  async addGiftSpecification(request: FastifyRequest<{ Body: CreateGiftSpecificationDTO }>, reply: FastifyReply) {
    try {
      const specification = await giftService.addGiftSpecification(request.body);
      return ResponseHandler.success(reply, specification, 'Gift specification added successfully');
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to add gift specification', error.message, 400);
    }
  }

  async getGiftReviews(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const giftId = parseInt(request.params.id);
      const reviews = await giftService.getGiftReviews(giftId);
      return ResponseHandler.success(reply, reviews, 'Gift reviews retrieved successfully');
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to retrieve gift reviews', error.message);
    }
  }
}

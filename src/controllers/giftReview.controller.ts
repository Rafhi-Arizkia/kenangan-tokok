import { FastifyRequest, FastifyReply } from 'fastify';
import { GiftReviewService } from '../services/giftReview.service';
import { CreateGiftReviewDTO, UpdateGiftReviewDTO, GiftReviewQueryDTO } from '../dtos/giftReview.dto';
import { ResponseHandler } from '../utils/response';

const giftReviewService = new GiftReviewService();

export class GiftReviewController {
  async getAllGiftReviews(request: FastifyRequest<{ Querystring: GiftReviewQueryDTO }>, reply: FastifyReply) {
    try {
      const result = await giftReviewService.getAllGiftReviews(request.query);
      return ResponseHandler.success(reply, result, 'Gift reviews retrieved successfully', result.pagination);
    } catch (error: any) {
      return ResponseHandler.serverError(reply, 'Failed to retrieve gift reviews', error.message);
    }
  }

  async getGiftReviewById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const reviewId = request.params.id;
      const review = await giftReviewService.getGiftReviewById(reviewId);
      return ResponseHandler.success(reply, review, 'Gift review retrieved successfully');
    } catch (error: any) {
      if (error.message === 'Gift review not found') {
        return ResponseHandler.notFound(reply, 'Gift review not found');
      }
      return ResponseHandler.serverError(reply, 'Failed to retrieve gift review', error.message);
    }
  }

  async getGiftReviewsByGiftId(request: FastifyRequest<{ 
    Params: { giftId: string };
    Querystring: { page?: number; limit?: number }
  }>, reply: FastifyReply) {
    try {
      const giftId = parseInt(request.params.giftId);
      const { page = 1, limit = 10 } = request.query;
      const result = await giftReviewService.getGiftReviewsByGiftId(giftId, page, limit);
      return ResponseHandler.success(reply, result.reviews, 'Gift reviews retrieved successfully', result.pagination);
    } catch (error: any) {
      return ResponseHandler.serverError(reply, 'Failed to retrieve gift reviews', error.message);
    }
  }

  async createGiftReview(request: FastifyRequest<{ Body: CreateGiftReviewDTO }>, reply: FastifyReply) {
    try {
      const review = await giftReviewService.createGiftReview(request.body);
      return ResponseHandler.created(reply, review, 'Gift review created successfully');
    } catch (error: any) {
      if (error.message === 'Gift not found') {
        return ResponseHandler.badRequest(reply, 'Gift not found', error.message);
      }
      if (error.message === 'Rating must be between 1 and 5') {
        return ResponseHandler.badRequest(reply, 'Invalid rating', error.message);
      }
      return ResponseHandler.serverError(reply, 'Failed to create gift review', error.message);
    }
  }

  async updateGiftReview(request: FastifyRequest<{ Params: { id: string }; Body: UpdateGiftReviewDTO }>, reply: FastifyReply) {
    try {
      const reviewId = request.params.id;
      const review = await giftReviewService.updateGiftReview(reviewId, request.body);
      return ResponseHandler.success(reply, review, 'Gift review updated successfully');
    } catch (error: any) {
      if (error.message === 'Gift review not found') {
        return ResponseHandler.notFound(reply, 'Gift review not found');
      }
      if (error.message === 'Rating must be between 1 and 5') {
        return ResponseHandler.badRequest(reply, 'Invalid rating', error.message);
      }
      return ResponseHandler.serverError(reply, 'Failed to update gift review', error.message);
    }
  }

  async deleteGiftReview(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const reviewId = request.params.id;
      const result = await giftReviewService.deleteGiftReview(reviewId);
      return ResponseHandler.success(reply, result, 'Gift review deleted successfully');
    } catch (error: any) {
      if (error.message === 'Gift review not found') {
        return ResponseHandler.notFound(reply, 'Gift review not found');
      }
      return ResponseHandler.serverError(reply, 'Failed to delete gift review', error.message);
    }
  }

  async getGiftRatingStats(request: FastifyRequest<{ Params: { giftId: string } }>, reply: FastifyReply) {
    try {
      const giftId = parseInt(request.params.giftId);
      const stats = await giftReviewService.getGiftRatingStats(giftId);
      return ResponseHandler.success(reply, stats, 'Gift rating statistics retrieved successfully');
    } catch (error: any) {
      return ResponseHandler.serverError(reply, 'Failed to retrieve rating statistics', error.message);
    }
  }
}

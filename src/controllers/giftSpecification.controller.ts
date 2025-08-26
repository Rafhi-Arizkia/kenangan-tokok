import { FastifyRequest, FastifyReply } from 'fastify';
import { GiftSpecificationService } from '../services/giftSpecification.service';
import { CreateGiftSpecificationDTO, UpdateGiftSpecificationDTO, GiftSpecificationQueryDTO } from '../dtos/giftSpecification.dto';
import { ResponseHandler } from '../utils/response';

const giftSpecificationService = new GiftSpecificationService();

export class GiftSpecificationController {
  async getAllGiftSpecifications(request: FastifyRequest<{ Querystring: GiftSpecificationQueryDTO }>, reply: FastifyReply) {
    try {
      const result = await giftSpecificationService.getAllGiftSpecifications(request.query);
      return ResponseHandler.success(reply, result.specifications, 'Gift specifications retrieved successfully', result.pagination);
    } catch (error: any) {
      return ResponseHandler.serverError(reply, 'Failed to retrieve gift specifications', error.message);
    }
  }

  async getGiftSpecificationById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const specificationId = request.params.id;
      const specification = await giftSpecificationService.getGiftSpecificationById(specificationId);
      return ResponseHandler.success(reply, specification, 'Gift specification retrieved successfully');
    } catch (error: any) {
      if (error.message === 'Gift specification not found') {
        return ResponseHandler.notFound(reply, 'Gift specification not found');
      }
      return ResponseHandler.serverError(reply, 'Failed to retrieve gift specification', error.message);
    }
  }

  async getGiftSpecificationsByGiftId(request: FastifyRequest<{ Params: { giftId: string } }>, reply: FastifyReply) {
    try {
      const giftId = parseInt(request.params.giftId);
      const specifications = await giftSpecificationService.getGiftSpecificationsByGiftId(giftId);
      return ResponseHandler.success(reply, specifications, 'Gift specifications retrieved successfully');
    } catch (error: any) {
      return ResponseHandler.serverError(reply, 'Failed to retrieve gift specifications', error.message);
    }
  }

  async createGiftSpecification(request: FastifyRequest<{ Body: CreateGiftSpecificationDTO }>, reply: FastifyReply) {
    try {
      const specification = await giftSpecificationService.createGiftSpecification(request.body);
      return ResponseHandler.created(reply, specification, 'Gift specification created successfully');
    } catch (error: any) {
      if (error.message === 'Gift not found') {
        return ResponseHandler.badRequest(reply, 'Gift not found', error.message);
      }
      if (error.message === 'Specification key already exists for this gift') {
        return ResponseHandler.badRequest(reply, 'Specification key already exists', error.message);
      }
      return ResponseHandler.serverError(reply, 'Failed to create gift specification', error.message);
    }
  }

  async updateGiftSpecification(request: FastifyRequest<{ Params: { id: string }; Body: UpdateGiftSpecificationDTO }>, reply: FastifyReply) {
    try {
      const specificationId = request.params.id;
      const specification = await giftSpecificationService.updateGiftSpecification(specificationId, request.body);
      return ResponseHandler.success(reply, specification, 'Gift specification updated successfully');
    } catch (error: any) {
      if (error.message === 'Gift specification not found') {
        return ResponseHandler.notFound(reply, 'Gift specification not found');
      }
      if (error.message === 'Specification key already exists for this gift') {
        return ResponseHandler.badRequest(reply, 'Specification key already exists', error.message);
      }
      return ResponseHandler.serverError(reply, 'Failed to update gift specification', error.message);
    }
  }

  async deleteGiftSpecification(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const specificationId = request.params.id;
      const result = await giftSpecificationService.deleteGiftSpecification(specificationId);
      return ResponseHandler.success(reply, result, 'Gift specification deleted successfully');
    } catch (error: any) {
      if (error.message === 'Gift specification not found') {
        return ResponseHandler.notFound(reply, 'Gift specification not found');
      }
      return ResponseHandler.serverError(reply, 'Failed to delete gift specification', error.message);
    }
  }

  async bulkCreateGiftSpecifications(request: FastifyRequest<{ 
    Params: { giftId: string };
    Body: { specifications: Array<{key: string, value: string}> }
  }>, reply: FastifyReply) {
    try {
      const giftId = parseInt(request.params.giftId);
      const result = await giftSpecificationService.bulkCreateGiftSpecifications(giftId, request.body.specifications);
      return ResponseHandler.created(reply, result, 'Gift specifications created successfully');
    } catch (error: any) {
      if (error.message === 'Gift not found') {
        return ResponseHandler.badRequest(reply, 'Gift not found', error.message);
      }
      return ResponseHandler.serverError(reply, 'Failed to create gift specifications', error.message);
    }
  }

  async bulkUpdateGiftSpecifications(request: FastifyRequest<{ 
    Params: { giftId: string };
    Body: { specifications: Array<{key: string, value: string}> }
  }>, reply: FastifyReply) {
    try {
      const giftId = parseInt(request.params.giftId);
      const result = await giftSpecificationService.bulkUpdateGiftSpecifications(giftId, request.body.specifications);
      return ResponseHandler.success(reply, result, 'Gift specifications updated successfully');
    } catch (error: any) {
      if (error.message === 'Gift not found') {
        return ResponseHandler.badRequest(reply, 'Gift not found', error.message);
      }
      return ResponseHandler.serverError(reply, 'Failed to update gift specifications', error.message);
    }
  }
}

import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { GiftSpecificationController } from '../../controllers/giftSpecification.controller';

const giftSpecificationController = new GiftSpecificationController();

// Schema definitions (simplified for now)
const getAllGiftSpecificationsSchema = {
  description: 'Get all gift specifications',
  tags: ['Gift Specifications'],
  querystring: {
    type: 'object',
    properties: {
      gift_id: { type: 'number' },
      key: { type: 'string' },
      page: { type: 'number', default: 1 },
      limit: { type: 'number', default: 10 }
    }
  }
};

const createGiftSpecificationSchema = {
  description: 'Create new gift specification',
  tags: ['Gift Specifications'],
  body: {
    type: 'object',
    required: ['gift_id', 'key', 'value'],
    properties: {
      gift_id: { type: 'number' },
      key: { type: 'string' },
      value: { type: 'string' }
    }
  }
};

const getGiftSpecificationByIdSchema = {
  description: 'Get gift specification by ID',
  tags: ['Gift Specifications'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  }
};

const updateGiftSpecificationSchema = {
  description: 'Update gift specification',
  tags: ['Gift Specifications'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  },
  body: {
    type: 'object',
    properties: {
      key: { type: 'string' },
      value: { type: 'string' }
    }
  }
};

const deleteGiftSpecificationSchema = {
  description: 'Delete gift specification',
  tags: ['Gift Specifications'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  }
};

const getGiftSpecificationsByGiftIdSchema = {
  description: 'Get gift specifications by gift ID',
  tags: ['Gift Specifications'],
  params: {
    type: 'object',
    required: ['giftId'],
    properties: {
      giftId: { type: 'string' }
    }
  }
};

const bulkCreateGiftSpecificationsSchema = {
  description: 'Bulk create gift specifications',
  tags: ['Gift Specifications'],
  params: {
    type: 'object',
    required: ['giftId'],
    properties: {
      giftId: { type: 'string' }
    }
  },
  body: {
    type: 'object',
    required: ['specifications'],
    properties: {
      specifications: {
        type: 'array',
        items: {
          type: 'object',
          required: ['key', 'value'],
          properties: {
            key: { type: 'string' },
            value: { type: 'string' }
          }
        }
      }
    }
  }
};

async function giftSpecificationRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // GET /api/gift-specifications - Get all gift specifications
  fastify.get('/', {
    schema: getAllGiftSpecificationsSchema,
  }, giftSpecificationController.getAllGiftSpecifications.bind(giftSpecificationController));

  // GET /api/gift-specifications/:id - Get gift specification by ID
  fastify.get('/:id', {
    schema: getGiftSpecificationByIdSchema,
  }, giftSpecificationController.getGiftSpecificationById.bind(giftSpecificationController));

  // GET /api/gift-specifications/gift/:giftId - Get gift specifications by gift ID
  fastify.get('/gift/:giftId', {
    schema: getGiftSpecificationsByGiftIdSchema,
  }, giftSpecificationController.getGiftSpecificationsByGiftId.bind(giftSpecificationController));

  // POST /api/gift-specifications - Create new gift specification
  fastify.post('/', {
    schema: createGiftSpecificationSchema,
  }, giftSpecificationController.createGiftSpecification.bind(giftSpecificationController));

  // POST /api/gift-specifications/gift/:giftId/bulk - Bulk create gift specifications
  fastify.post('/gift/:giftId/bulk', {
    schema: bulkCreateGiftSpecificationsSchema,
  }, giftSpecificationController.bulkCreateGiftSpecifications.bind(giftSpecificationController));

  // PUT /api/gift-specifications/:id - Update gift specification
  fastify.put('/:id', {
    schema: updateGiftSpecificationSchema,
  }, giftSpecificationController.updateGiftSpecification.bind(giftSpecificationController));

  // PUT /api/gift-specifications/gift/:giftId/bulk - Bulk update gift specifications
  fastify.put('/gift/:giftId/bulk', {
    schema: bulkCreateGiftSpecificationsSchema,
  }, giftSpecificationController.bulkUpdateGiftSpecifications.bind(giftSpecificationController));

  // DELETE /api/gift-specifications/:id - Delete gift specification
  fastify.delete('/:id', {
    schema: deleteGiftSpecificationSchema,
  }, giftSpecificationController.deleteGiftSpecification.bind(giftSpecificationController));
}

export default giftSpecificationRoutes;

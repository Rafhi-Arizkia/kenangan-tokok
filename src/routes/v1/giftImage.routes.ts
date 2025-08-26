import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { GiftImageController } from '../../controllers/giftImage.controller';

const giftImageController = new GiftImageController();

// Schema definitions (simplified for now)
const getAllGiftImagesSchema = {
  description: 'Get all gift images',
  tags: ['Gift Images'],
  querystring: {
    type: 'object',
    properties: {
      gift_id: { type: 'number' },
      page: { type: 'number', default: 1 },
      limit: { type: 'number', default: 10 }
    }
  }
};

const createGiftImageSchema = {
  description: 'Create new gift image',
  tags: ['Gift Images'],
  body: {
    type: 'object',
    required: ['gift_id', 'url'],
    properties: {
      gift_id: { type: 'number' },
      url: { type: 'string' }
    }
  }
};

const getGiftImageByIdSchema = {
  description: 'Get gift image by ID',
  tags: ['Gift Images'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  }
};

const updateGiftImageSchema = {
  description: 'Update gift image',
  tags: ['Gift Images'],
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
      url: { type: 'string' }
    }
  }
};

const deleteGiftImageSchema = {
  description: 'Delete gift image',
  tags: ['Gift Images'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  }
};

const getGiftImagesByGiftIdSchema = {
  description: 'Get gift images by gift ID',
  tags: ['Gift Images'],
  params: {
    type: 'object',
    required: ['giftId'],
    properties: {
      giftId: { type: 'string' }
    }
  }
};

async function giftImageRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // GET /api/gift-images - Get all gift images
  fastify.get('/', {
    schema: getAllGiftImagesSchema,
  }, giftImageController.getAllGiftImages.bind(giftImageController));

  // GET /api/gift-images/:id - Get gift image by ID
  fastify.get('/:id', {
    schema: getGiftImageByIdSchema,
  }, giftImageController.getGiftImageById.bind(giftImageController));

  // GET /api/gift-images/gift/:giftId - Get gift images by gift ID
  fastify.get('/gift/:giftId', {
    schema: getGiftImagesByGiftIdSchema,
  }, giftImageController.getGiftImagesByGiftId.bind(giftImageController));

  // POST /api/gift-images - Create new gift image
  fastify.post('/', {
    schema: createGiftImageSchema,
  }, giftImageController.createGiftImage.bind(giftImageController));

  // PUT /api/gift-images/:id - Update gift image
  fastify.put('/:id', {
    schema: updateGiftImageSchema,
  }, giftImageController.updateGiftImage.bind(giftImageController));

  // DELETE /api/gift-images/:id - Delete gift image
  fastify.delete('/:id', {
    schema: deleteGiftImageSchema,
  }, giftImageController.deleteGiftImage.bind(giftImageController));
}

export default giftImageRoutes;

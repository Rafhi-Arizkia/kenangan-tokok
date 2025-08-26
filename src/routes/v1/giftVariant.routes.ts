import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { GiftVariantController } from '../../controllers/giftVariant.controller';

const giftVariantController = new GiftVariantController();

// Schema definitions (simplified for now)
const getAllGiftVariantsSchema = {
  description: 'Get all gift variants',
  tags: ['Gift Variants'],
  querystring: {
    type: 'object',
    properties: {
      gift_id: { type: 'number' },
      variant_key1: { type: 'string' },
      variant_key2: { type: 'string' },
      page: { type: 'number', default: 1 },
      limit: { type: 'number', default: 10 }
    }
  }
};

const createGiftVariantSchema = {
  description: 'Create new gift variant',
  tags: ['Gift Variants'],
  body: {
    type: 'object',
    required: ['variant_key1', 'variant_value1'],
    properties: {
      gift_id: { type: 'number' },
      variant_key1: { type: 'string' },
      variant_key2: { type: 'string' },
      variant_value1: { type: 'string' },
      variant_value2: { type: 'string' }
    }
  }
};

const getGiftVariantByIdSchema = {
  description: 'Get gift variant by ID',
  tags: ['Gift Variants'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  }
};

const updateGiftVariantSchema = {
  description: 'Update gift variant',
  tags: ['Gift Variants'],
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
      variant_key1: { type: 'string' },
      variant_key2: { type: 'string' },
      variant_value1: { type: 'string' },
      variant_value2: { type: 'string' }
    }
  }
};

const deleteGiftVariantSchema = {
  description: 'Delete gift variant',
  tags: ['Gift Variants'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  }
};

const getGiftVariantsByGiftIdSchema = {
  description: 'Get gift variants by gift ID',
  tags: ['Gift Variants'],
  params: {
    type: 'object',
    required: ['giftId'],
    properties: {
      giftId: { type: 'string' }
    }
  }
};

const getVariantKeysSchema = {
  description: 'Get available variant keys',
  tags: ['Gift Variants'],
  querystring: {
    type: 'object',
    properties: {
      gift_id: { type: 'number' }
    }
  }
};

const getVariantValuesByKeySchema = {
  description: 'Get variant values by key',
  tags: ['Gift Variants'],
  params: {
    type: 'object',
    required: ['key'],
    properties: {
      key: { type: 'string' }
    }
  },
  querystring: {
    type: 'object',
    properties: {
      gift_id: { type: 'number' }
    }
  }
};

async function giftVariantRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // GET /api/gift-variants - Get all gift variants
  fastify.get('/', {
    schema: getAllGiftVariantsSchema,
  }, giftVariantController.getAllGiftVariants.bind(giftVariantController));

  // GET /api/gift-variants/:id - Get gift variant by ID
  fastify.get('/:id', {
    schema: getGiftVariantByIdSchema,
  }, giftVariantController.getGiftVariantById.bind(giftVariantController));

  // GET /api/gift-variants/gift/:giftId - Get gift variants by gift ID
  fastify.get('/gift/:giftId', {
    schema: getGiftVariantsByGiftIdSchema,
  }, giftVariantController.getGiftVariantsByGiftId.bind(giftVariantController));

  // GET /api/gift-variants/keys - Get available variant keys
  fastify.get('/keys', {
    schema: getVariantKeysSchema,
  }, giftVariantController.getVariantKeys.bind(giftVariantController));

  // GET /api/gift-variants/values/:key - Get variant values by key
  fastify.get('/values/:key', {
    schema: getVariantValuesByKeySchema,
  }, giftVariantController.getVariantValuesByKey.bind(giftVariantController));

  // POST /api/gift-variants - Create new gift variant
  fastify.post('/', {
    schema: createGiftVariantSchema,
  }, giftVariantController.createGiftVariant.bind(giftVariantController));

  // PUT /api/gift-variants/:id - Update gift variant
  fastify.put('/:id', {
    schema: updateGiftVariantSchema,
  }, giftVariantController.updateGiftVariant.bind(giftVariantController));

  // DELETE /api/gift-variants/:id - Delete gift variant
  fastify.delete('/:id', {
    schema: deleteGiftVariantSchema,
  }, giftVariantController.deleteGiftVariant.bind(giftVariantController));
}

export default giftVariantRoutes;

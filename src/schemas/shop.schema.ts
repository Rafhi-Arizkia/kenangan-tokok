import { FastifySchema } from 'fastify';
import { 
  successResponseSchema, 
  errorResponseSchema, 
  paginationSchema 
} from './common.schema';

// Base Shop Schema
export const shopSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', description: 'Shop unique identifier' },
    user_id: { type: 'integer', description: 'Owner user ID' },
    name: { type: 'string', description: 'Shop name' },
    description: { type: 'string', description: 'Shop description' },
    logo: { type: 'string', format: 'uri', description: 'Shop logo URL' },
    banner: { type: 'string', format: 'uri', description: 'Shop banner URL' },
    phone: { type: 'string', description: 'Shop contact phone' },
    email: { type: 'string', format: 'email', description: 'Shop contact email' },
    website: { type: 'string', format: 'uri', description: 'Shop website URL' },
    address: { type: 'string', description: 'Shop physical address' },
    city: { type: 'string', description: 'Shop city' },
    province: { type: 'string', description: 'Shop province' },
    postal_code: { type: 'string', description: 'Shop postal code' },
    is_active: { type: 'boolean', description: 'Whether shop is active' },
    is_verified: { type: 'boolean', description: 'Whether shop is verified' },
    rating: { type: 'number', minimum: 0, maximum: 5, description: 'Shop rating' },
    total_products: { type: 'integer', minimum: 0, description: 'Total products in shop' },
    total_orders: { type: 'integer', minimum: 0, description: 'Total orders processed' },
    created_at: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
    updated_at: { type: 'string', format: 'date-time', description: 'Last update timestamp' },
  },
};

// GET /shops - Get all shops
export const getAllShopsSchema: FastifySchema = {
  summary: 'Get all shops with pagination and filtering',
  description: 'Retrieve a paginated list of shops with optional filtering',
  tags: ['Shop'],
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1, description: 'Page number' },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10, description: 'Items per page' },
      search: { type: 'string', description: 'Search term for shop name or description' },
      is_active: { type: 'boolean', description: 'Filter by active status' },
      is_verified: { type: 'boolean', description: 'Filter by verified status' },
      city: { type: 'string', description: 'Filter by city' },
      province: { type: 'string', description: 'Filter by province' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: {
          type: 'object',
          properties: {
            shops: {
              type: 'array',
              items: shopSchema,
            },
            pagination: paginationSchema,
          },
        },
      },
    },
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// GET /shops/:id - Get shop by ID
export const getShopByIdSchema: FastifySchema = {
  summary: 'Get shop by ID',
  description: 'Retrieve a single shop by its unique identifier',
  tags: ['Shop'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', description: 'Shop ID' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: shopSchema,
      },
    },
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// POST /shops - Create new shop
export const createShopSchema: FastifySchema = {
  summary: 'Create new shop',
  description: 'Create a new shop in the system',
  tags: ['Shop'],
  body: {
    type: 'object',
    required: ['user_id', 'name'],
    properties: {
      user_id: { type: 'integer', description: 'Owner user ID' },
      name: { type: 'string', minLength: 1, maxLength: 255, description: 'Shop name' },
      description: { type: 'string', maxLength: 2000, description: 'Shop description' },
      logo: { type: 'string', format: 'uri', description: 'Shop logo URL' },
      banner: { type: 'string', format: 'uri', description: 'Shop banner URL' },
      phone: { 
        type: 'string', 
        pattern: '^[+]?[0-9\\-\\s\\(\\)]+$',
        minLength: 8,
        maxLength: 20,
        description: 'Shop contact phone' 
      },
      email: { type: 'string', format: 'email', description: 'Shop contact email' },
      website: { type: 'string', format: 'uri', description: 'Shop website URL' },
      address: { type: 'string', maxLength: 500, description: 'Shop physical address' },
      city: { type: 'string', maxLength: 100, description: 'Shop city' },
      province: { type: 'string', maxLength: 100, description: 'Shop province' },
      postal_code: { 
        type: 'string', 
        pattern: '^[0-9]{5}$',
        description: 'Shop postal code (5 digits)' 
      },
      is_active: { type: 'boolean', default: true, description: 'Whether shop is active' },
      is_verified: { type: 'boolean', default: false, description: 'Whether shop is verified' },
    },
  },
  response: {
    201: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: shopSchema,
      },
    },
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// PUT /shops/:id - Update shop
export const updateShopSchema: FastifySchema = {
  summary: 'Update shop',
  description: 'Update an existing shop',
  tags: ['Shop'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', description: 'Shop ID' },
    },
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 255, description: 'Shop name' },
      description: { type: 'string', maxLength: 2000, description: 'Shop description' },
      logo: { type: 'string', format: 'uri', description: 'Shop logo URL' },
      banner: { type: 'string', format: 'uri', description: 'Shop banner URL' },
      phone: { 
        type: 'string', 
        pattern: '^[+]?[0-9\\-\\s\\(\\)]+$',
        minLength: 8,
        maxLength: 20,
        description: 'Shop contact phone' 
      },
      email: { type: 'string', format: 'email', description: 'Shop contact email' },
      website: { type: 'string', format: 'uri', description: 'Shop website URL' },
      address: { type: 'string', maxLength: 500, description: 'Shop physical address' },
      city: { type: 'string', maxLength: 100, description: 'Shop city' },
      province: { type: 'string', maxLength: 100, description: 'Shop province' },
      postal_code: { 
        type: 'string', 
        pattern: '^[0-9]{5}$',
        description: 'Shop postal code (5 digits)' 
      },
      is_active: { type: 'boolean', description: 'Whether shop is active' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: shopSchema,
      },
    },
    400: errorResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// DELETE /shops/:id - Delete shop
export const deleteShopSchema: FastifySchema = {
  summary: 'Delete shop',
  description: 'Delete a shop from the system',
  tags: ['Shop'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', description: 'Shop ID' },
    },
  },
  response: {
    200: successResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// GET /shops/user/:userId - Get shops by user ID
export const getShopsByUserIdSchema: FastifySchema = {
  summary: 'Get shops by user ID',
  description: 'Retrieve all shops belonging to a specific user',
  tags: ['Shop'],
  params: {
    type: 'object',
    required: ['userId'],
    properties: {
      userId: { type: 'integer', description: 'User ID' },
    },
  },
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1, description: 'Page number' },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10, description: 'Items per page' },
      is_active: { type: 'boolean', description: 'Filter by active status' },
      is_verified: { type: 'boolean', description: 'Filter by verified status' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: {
          type: 'object',
          properties: {
            shops: {
              type: 'array',
              items: shopSchema,
            },
            pagination: paginationSchema,
          },
        },
      },
    },
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// Common response schemas for all API endpoints

export const successResponseSchema = {
  type: 'object',
  properties: {
    statusCode: { type: 'integer', example: 200 },
    message: { type: 'string', description: 'Success message' },
    data: { type: 'object', description: 'Response data' },
  },
  required: ['statusCode', 'message'],
};

export const errorResponseSchema = {
  type: 'object',
  properties: {
    statusCode: { type: 'integer', example: 400 },
    message: { type: 'string', description: 'Error message' },
    error: { 
      type: 'object',
      description: 'Error details',
      properties: {
        code: { type: 'string', description: 'Error code' },
        details: { type: 'object', description: 'Additional error details' },
      },
    },
  },
  required: ['statusCode', 'message'],
};

export const paginationSchema = {
  type: 'object',
  properties: {
    page: { type: 'integer', minimum: 1, description: 'Current page number' },
    limit: { type: 'integer', minimum: 1, maximum: 100, description: 'Items per page' },
    total: { type: 'integer', minimum: 0, description: 'Total items' },
    totalPages: { type: 'integer', minimum: 0, description: 'Total pages' },
    hasNext: { type: 'boolean', description: 'Whether there are more pages' },
    hasPrev: { type: 'boolean', description: 'Whether there are previous pages' },
  },
  required: ['page', 'limit', 'total', 'totalPages'],
};

export const paginatedResponseSchema = (itemSchema: object) => ({
  ...successResponseSchema,
  properties: {
    ...successResponseSchema.properties,
    data: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: itemSchema,
        },
        pagination: paginationSchema,
      },
      required: ['items', 'pagination'],
    },
  },
});

// Common query parameters
export const paginationQuerySchema = {
  type: 'object',
  properties: {
    page: { 
      type: 'integer', 
      minimum: 1, 
      default: 1, 
      description: 'Page number for pagination' 
    },
    limit: { 
      type: 'integer', 
      minimum: 1, 
      maximum: 100, 
      default: 10, 
      description: 'Number of items per page' 
    },
  },
};

export const searchQuerySchema = {
  type: 'object',
  properties: {
    search: { 
      type: 'string',
      minLength: 1,
      maxLength: 255,
      description: 'Search term for filtering results' 
    },
  },
};

export const sortQuerySchema = {
  type: 'object',
  properties: {
    sort_by: { 
      type: 'string',
      description: 'Field to sort by'
    },
    sort_order: { 
      type: 'string', 
      enum: ['ASC', 'DESC'], 
      default: 'DESC',
      description: 'Sort order (ascending or descending)' 
    },
  },
};

// Common parameter schemas
export const idParamSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { 
      type: 'integer',
      minimum: 1,
      description: 'Unique identifier' 
    },
  },
};

export const stringIdParamSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { 
      type: 'string',
      minLength: 1,
      description: 'Unique identifier' 
    },
  },
};

// Common field schemas
export const timestampSchema = {
  type: 'string',
  format: 'date-time',
  description: 'ISO 8601 timestamp',
};

export const phoneSchema = {
  type: 'string',
  pattern: '^[+]?[0-9\\-\\s\\(\\)]+$',
  minLength: 8,
  maxLength: 20,
  description: 'Phone number with optional country code',
};

export const emailSchema = {
  type: 'string',
  format: 'email',
  maxLength: 255,
  description: 'Valid email address',
};

export const urlSchema = {
  type: 'string',
  format: 'uri',
  maxLength: 2048,
  description: 'Valid URL',
};

export const postalCodeSchema = {
  type: 'string',
  pattern: '^[0-9]{5}$',
  description: 'Indonesian postal code (5 digits)',
};

export const ratingSchema = {
  type: 'number',
  minimum: 0,
  maximum: 5,
  description: 'Rating from 0 to 5',
};

export const currencySchema = {
  type: 'number',
  minimum: 0,
  multipleOf: 0.01,
  description: 'Monetary amount (min: 0)',
};

export const booleanFilterSchema = {
  type: 'boolean',
  description: 'Filter by boolean value',
};

// Status enums
export const orderStatusEnum = [
  'pending',
  'confirmed', 
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded'
];

export const paymentStatusEnum = [
  'pending',
  'paid',
  'failed',
  'refunded',
  'partial_refund'
];

export const shipmentStatusEnum = [
  'pending',
  'picked_up',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'failed',
  'returned'
];

export const paymentMethodEnum = [
  'credit_card',
  'debit_card',
  'bank_transfer',
  'e_wallet',
  'cash_on_delivery',
  'installment'
];

// Utility function to create standard CRUD operation responses
export const createCrudResponseSchemas = (itemSchema: object) => ({
  getAll: {
    200: paginatedResponseSchema(itemSchema),
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
  getById: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: itemSchema,
      },
    },
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
  create: {
    201: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: itemSchema,
      },
    },
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
  update: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: itemSchema,
      },
    },
    400: errorResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
  delete: {
    200: successResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
});

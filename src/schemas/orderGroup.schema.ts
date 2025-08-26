import { FastifySchema } from 'fastify';
import { 
  successResponseSchema, 
  errorResponseSchema, 
  paginationSchema 
} from './common.schema';

// Base Order Group Schema
export const orderGroupSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', description: 'Order group unique identifier' },
    buyer_id: { type: 'integer', description: 'Buyer user ID' },
    receiver_id: { type: ['integer', 'null'], description: 'Receiver user ID' },
    is_gift: { type: ['integer', 'boolean'], description: 'Is gift (0/1 or boolean)' },
    is_surprise: { type: ['integer', 'boolean'], description: 'Is surprise' },
    is_hidden: { type: ['integer', 'boolean'], description: 'Is hidden' },
    reference_code: { type: ['string', 'null'], description: 'Reference UUID code' },
    payment_gateway_fee: { type: ['number', 'null'], minimum: 0, description: 'Payment gateway fee' },
    targeted_receiver_name: { type: ['string', 'null'], description: 'Targeted receiver name' },
    type_device: { type: ['string', 'null'], enum: ['MOBILE', 'WEB'], description: 'Device type' },
    service_fee: { type: ['number', 'null'], minimum: 0, description: 'Service fee' },
    message: { type: ['string', 'null'], description: 'Order group message' },
    receiver_message: { type: ['string', 'null'], description: 'Message for receiver' },
    confirm_gift_by: { type: ['integer', 'null'], description: 'User ID who confirmed the gift' },
    createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
    updatedAt: { type: 'string', format: 'date-time', description: 'Last update timestamp' },
  },
};

// CREATE Order Group Schema
export const createOrderGroupSchema = {
  summary: 'Create order group',
  description: 'Create a new order group for multiple orders',
  tags: ['OrderGroup'],
  body: {
    type: 'object',
    required: ['buyer_id'],
    properties: {
      buyer_id: { 
        type: 'integer', 
        description: 'Buyer user ID',
        minimum: 1 
      },
      receiver_id: { 
        type: 'integer', 
        description: 'Receiver user ID',
        minimum: 1 
      },
      is_gift: { 
        type: ['integer', 'boolean'], 
        description: 'Is gift (0/1 or boolean)',
        default: false 
      },
      is_surprise: { 
        type: ['integer', 'boolean'], 
        description: 'Is surprise',
        default: false 
      },
      is_hidden: { 
        type: ['integer', 'boolean'], 
        description: 'Is hidden',
        default: false 
      },
      reference_code: { 
        type: 'string', 
        description: 'Reference UUID code',
        maxLength: 255 
      },
      payment_gateway_fee: { 
        type: 'number', 
        minimum: 0, 
        default: 0,
        description: 'Payment gateway fee' 
      },
      targeted_receiver_name: { 
        type: 'string', 
        maxLength: 255,
        description: 'Targeted receiver name' 
      },
      type_device: { 
        type: 'string', 
        enum: ['MOBILE', 'WEB'], 
        default: 'MOBILE',
        description: 'Device type' 
      },
      service_fee: { 
        type: 'number', 
        minimum: 0, 
        default: 0,
        description: 'Service fee' 
      },
      message: { 
        type: 'string',
        description: 'Order group message' 
      },
      receiver_message: { 
        type: 'string',
        description: 'Message for receiver' 
      },
      confirm_gift_by: { 
        type: 'integer',
        minimum: 1,
        description: 'User ID who confirmed the gift' 
      },
    },
  },
  response: {
    201: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: orderGroupSchema,
      },
    },
    400: errorResponseSchema,
    422: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// GET Order Group by ID Schema
export const getOrderGroupByIdSchema = {
  summary: 'Get order group by ID',
  description: 'Retrieve a specific order group by its ID',
  tags: ['OrderGroup'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { 
        type: 'integer', 
        description: 'Order group ID',
        minimum: 1 
      },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: orderGroupSchema,
      },
    },
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// LIST Order Groups Schema
export const listOrderGroupsSchema = {
  summary: 'List order groups',
  description: 'Retrieve paginated list of order groups with optional filtering',
  tags: ['OrderGroup'],
  querystring: {
    type: 'object',
    properties: {
      page: { 
        type: 'integer', 
        minimum: 1, 
        default: 1,
        description: 'Page number' 
      },
      limit: { 
        type: 'integer', 
        minimum: 1, 
        maximum: 100, 
        default: 10,
        description: 'Items per page' 
      },
      buyer_id: { 
        type: 'integer',
        minimum: 1,
        description: 'Filter by buyer ID' 
      },
      receiver_id: { 
        type: 'integer',
        minimum: 1,
        description: 'Filter by receiver ID' 
      },
      payment_method: { 
        type: 'string',
        description: 'Filter by payment method' 
      },
      shipping_city: { 
        type: 'string',
        description: 'Filter by shipping city' 
      },
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
            orderGroups: { 
              type: 'array', 
              items: orderGroupSchema 
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

// UPDATE Order Group Schema
export const updateOrderGroupSchema = {
  summary: 'Update order group',
  description: 'Update an existing order group',
  tags: ['OrderGroup'],
  params: {
    type: 'object',
    required: ['id'],
    properties: { 
      id: { 
        type: 'integer',
        minimum: 1,
        description: 'Order group ID' 
      } 
    },
  },
  body: {
    type: 'object',
    properties: {
      receiver_id: { 
        type: 'integer',
        minimum: 1,
        description: 'Receiver user ID' 
      },
      is_gift: { 
        type: ['integer', 'boolean'], 
        description: 'Is gift (0/1 or boolean)' 
      },
      is_surprise: { 
        type: ['integer', 'boolean'], 
        description: 'Is surprise' 
      },
      is_hidden: { 
        type: ['integer', 'boolean'], 
        description: 'Is hidden' 
      },
      reference_code: { 
        type: 'string', 
        maxLength: 255,
        description: 'Reference UUID code' 
      },
      payment_gateway_fee: { 
        type: 'number', 
        minimum: 0,
        description: 'Payment gateway fee' 
      },
      targeted_receiver_name: { 
        type: 'string', 
        maxLength: 255,
        description: 'Targeted receiver name' 
      },
      type_device: { 
        type: 'string', 
        enum: ['MOBILE', 'WEB'],
        description: 'Device type' 
      },
      service_fee: { 
        type: 'number', 
        minimum: 0,
        description: 'Service fee' 
      },
      message: { 
        type: 'string',
        description: 'Order group message' 
      },
      receiver_message: { 
        type: 'string',
        description: 'Message for receiver' 
      },
      confirm_gift_by: { 
        type: 'integer',
        minimum: 1,
        description: 'User ID who confirmed the gift' 
      },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: orderGroupSchema,
      },
    },
    400: errorResponseSchema,
    404: errorResponseSchema,
    422: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// DELETE Order Group Schema
export const deleteOrderGroupSchema = {
  summary: 'Delete order group',
  description: 'Delete an existing order group',
  tags: ['OrderGroup'],
  params: {
    type: 'object',
    required: ['id'],
    properties: { 
      id: { 
        type: 'integer',
        minimum: 1,
        description: 'Order group ID' 
      } 
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
            message: { 
              type: 'string',
              description: 'Success message' 
            },
          },
        },
      },
    },
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

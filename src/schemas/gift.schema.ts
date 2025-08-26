import { FastifySchema } from 'fastify';
import { 
  successResponseSchema, 
  errorResponseSchema, 
  paginationSchema 
} from './common.schema';

// Base Gift Schema
export const giftSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', description: 'Gift unique identifier' },
    shop_id: { type: 'integer', description: 'Shop ID that owns this gift' },
    category_id: { type: 'integer', description: 'Category ID for this gift' },
    sub_category: { type: 'string', description: 'Sub category' },
    name: { type: 'string', description: 'Gift name' },
    description: { type: 'string', description: 'Gift description' },
    price: { type: 'number', minimum: 0, description: 'Gift price' },
    total_sold: { type: 'integer', minimum: 0, description: 'Total units sold' },
    photo: { type: 'string', format: 'uri', description: 'Main photo URL or path' },
    minimum_days: { type: 'integer', description: 'Minimum lead time in days' },
    is_available: { type: 'boolean', description: 'Whether gift is available' },
    weight: { type: 'number', description: 'Weight' },
    height: { type: 'number', description: 'Height' },
    width: { type: 'number', description: 'Width' },
    length: { type: 'number', description: 'Length' },
    external_id: { type: 'string', description: 'External system id' },
    external_url: { type: 'string', format: 'uri', description: 'External URL' },
    rating: { type: 'number', minimum: 0, maximum: 5, description: 'Average rating' },
    status_download_photo: { type: 'string', enum: ['PENDING', 'SUCCESS', 'FAILED'], description: 'Photo download status' },
    gift_share_link: { type: 'string', format: 'uri', description: 'Share link' },
    extra_data: { type: 'string', description: 'Extra JSON data (stringified)' },
    stock: { type: 'integer', minimum: 0, description: 'Available stock' },
    gift_variants_id: { type: 'integer', description: 'Variants group id' },
    variant_combinations: { type: 'string', description: 'Variant combinations JSON (stringified)' },
    createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
    updatedAt: { type: 'string', format: 'date-time', description: 'Last update timestamp' },
    syncedAt: { type: 'string', format: 'date-time', description: 'Last sync timestamp' },
    deletedAt: { type: 'string', format: 'date-time', description: 'Deletion timestamp' },
  },
};

// Gift Image Schema
export const giftImageSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'Image unique identifier' },
    gift_id: { type: 'integer', description: 'Associated gift ID' },
    image_url: { type: 'string', format: 'uri', description: 'Image URL' },
    alt_text: { type: 'string', description: 'Alternative text for image' },
    is_primary: { type: 'boolean', description: 'Whether this is the primary image' },
    sort_order: { type: 'integer', minimum: 0, description: 'Display order' },
    created_at: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
    updated_at: { type: 'string', format: 'date-time', description: 'Last update timestamp' },
  },
};

// Gift Review Schema
export const giftReviewSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'Review unique identifier' },
    gift_id: { type: 'integer', description: 'Associated gift ID' },
    order_item_id: { type: 'integer', description: 'Associated order item ID' },
    user_id: { type: 'integer', description: 'Reviewer user ID' },
    rating: { type: 'integer', minimum: 1, maximum: 5, description: 'Review rating (1-5)' },
    review_text: { type: 'string', description: 'Review text content' },
    is_verified: { type: 'boolean', description: 'Whether review is verified' },
    is_approved: { type: 'boolean', description: 'Whether review is approved' },
    helpful_count: { type: 'integer', minimum: 0, description: 'Number of helpful votes' },
    created_at: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
    updated_at: { type: 'string', format: 'date-time', description: 'Last update timestamp' },
  },
};

// Gift Specification Schema
export const giftSpecificationSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'Specification unique identifier' },
    gift_id: { type: 'integer', description: 'Associated gift ID' },
    name: { type: 'string', description: 'Specification name' },
    value: { type: 'string', description: 'Specification value' },
    unit: { type: 'string', description: 'Unit of measurement' },
    sort_order: { type: 'integer', minimum: 0, description: 'Display order' },
    created_at: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
    updated_at: { type: 'string', format: 'date-time', description: 'Last update timestamp' },
  },
};

// GET /gifts - Get all gifts
export const getAllGiftsSchema = {
  summary: 'Get all gifts with pagination and filtering',
  description: 'Retrieve a paginated list of gifts with optional filtering by shop, category, price range, etc.',
  tags: ['Gift'],
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1, description: 'Page number' },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10, description: 'Items per page' },
      search: { type: 'string', description: 'Search term for gift name or description' },
      shop_id: { type: 'integer', description: 'Filter by shop ID' },
      category_id: { type: 'integer', description: 'Filter by category ID' },
      is_active: { type: 'boolean', description: 'Filter by active status' },
      is_featured: { type: 'boolean', description: 'Filter by featured status' },
      min_price: { type: 'number', minimum: 0, description: 'Minimum price filter' },
      max_price: { type: 'number', minimum: 0, description: 'Maximum price filter' },
      sort_by: { 
        type: 'string', 
        enum: ['name', 'price', 'created_at', 'rating', 'total_sold'], 
        default: 'created_at',
        description: 'Sort field' 
      },
      sort_order: { 
        type: 'string', 
        enum: ['ASC', 'DESC'], 
        default: 'DESC',
        description: 'Sort order' 
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
            gifts: {
              type: 'array',
              items: giftSchema,
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

// GET /gifts/:id - Get gift by ID
export const getGiftByIdSchema = {
  summary: 'Get gift by ID',
  description: 'Retrieve a single gift by its unique identifier',
  tags: ['Gift'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', description: 'Gift ID' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: giftSchema,
      },
    },
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// POST /gifts - Create new gift
export const createGiftSchema = {
  summary: 'Create new gift',
  description: 'Create a new gift product in the system',
  tags: ['Gift'],
  body: {
    type: 'object',
    required: ['shop_id', 'name', 'price'],
    properties: {
  shop_id: { type: 'integer', description: 'Shop ID that owns this gift' },
  category_id: { type: 'integer', description: 'Category ID for this gift' },
  sub_category: { type: 'string', maxLength: 255, description: 'Sub category' },
  name: { type: 'string', minLength: 1, maxLength: 255, description: 'Gift name' },
  description: { type: 'string', maxLength: 2000, description: 'Gift description' },
  price: { type: 'number', minimum: 0, description: 'Gift price' },
  photo: { type: 'string', description: 'Main photo URL or path' },
  minimum_days: { type: 'integer', description: 'Minimum lead time in days' },
  is_available: { type: 'boolean', default: true, description: 'Whether gift is available' },
  weight: { type: 'number', description: 'Weight' },
  height: { type: 'number', description: 'Height' },
  width: { type: 'number', description: 'Width' },
  length: { type: 'number', description: 'Length' },
  stock: { type: 'integer', minimum: 0, default: 0, description: 'Available stock' },
    },
  },
  response: {
    201: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: giftSchema,
      },
    },
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// PUT /gifts/:id - Update gift
export const updateGiftSchema = {
  summary: 'Update gift',
  description: 'Update an existing gift product',
  tags: ['Gift'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', description: 'Gift ID' },
    },
  },
  body: {
    type: 'object',
    properties: {
  category_id: { type: 'integer', description: 'Category ID for this gift' },
  sub_category: { type: 'string', maxLength: 255, description: 'Sub category' },
  name: { type: 'string', minLength: 1, maxLength: 255, description: 'Gift name' },
  description: { type: 'string', maxLength: 2000, description: 'Gift description' },
  price: { type: 'number', minimum: 0, description: 'Gift price' },
  photo: { type: 'string', description: 'Main photo URL or path' },
  minimum_days: { type: 'integer', description: 'Minimum lead time in days' },
  is_available: { type: 'boolean', description: 'Whether gift is available' },
  weight: { type: 'number', description: 'Weight' },
  height: { type: 'number', description: 'Height' },
  width: { type: 'number', description: 'Width' },
  length: { type: 'number', description: 'Length' },
  stock: { type: 'integer', minimum: 0, description: 'Available stock' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: giftSchema,
      },
    },
    400: errorResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// DELETE /gifts/:id - Delete gift
export const deleteGiftSchema = {
  summary: 'Delete gift',
  description: 'Delete a gift product from the system',
  tags: ['Gift'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', description: 'Gift ID' },
    },
  },
  response: {
    200: successResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// GET /gifts/shop/:shopId - Get gifts by shop ID
export const getGiftsByShopIdSchema = {
  summary: 'Get gifts by shop ID',
  description: 'Retrieve all gifts belonging to a specific shop',
  tags: ['Gift'],
  params: {
    type: 'object',
    required: ['shopId'],
    properties: {
      shopId: { type: 'integer', description: 'Shop ID' },
    },
  },
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1, description: 'Page number' },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10, description: 'Items per page' },
      is_active: { type: 'boolean', description: 'Filter by active status' },
      is_featured: { type: 'boolean', description: 'Filter by featured status' },
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
            gifts: {
              type: 'array',
              items: giftSchema,
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

// POST /gifts/images - Add gift image
export const addGiftImageSchema = {
  summary: 'Add gift image',
  description: 'Add a new image to a gift product',
  tags: ['Gift'],
  body: {
    type: 'object',
    required: ['gift_id', 'image_url', 'is_primary'],
    properties: {
      gift_id: { type: 'integer', description: 'Associated gift ID' },
      image_url: { type: 'string', format: 'uri', description: 'Image URL' },
      alt_text: { type: 'string', maxLength: 255, description: 'Alternative text for image' },
      is_primary: { type: 'boolean', description: 'Whether this is the primary image' },
      sort_order: { type: 'integer', minimum: 0, default: 0, description: 'Display order' },
    },
  },
  response: {
    201: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: giftImageSchema,
      },
    },
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// POST /gifts/reviews - Add gift review
export const addGiftReviewSchema = {
  summary: 'Add gift review',
  description: 'Add a new review for a gift product',
  tags: ['Gift'],
  body: {
    type: 'object',
    required: ['gift_id', 'rating'],
    properties: {
      gift_id: { type: 'integer', description: 'Associated gift ID' },
      order_item_id: { type: 'integer', description: 'Associated order item ID' },
      user_id: { type: 'integer', description: 'Reviewer user ID' },
      rating: { type: 'integer', minimum: 1, maximum: 5, description: 'Review rating (1-5)' },
      review_text: { type: 'string', maxLength: 2000, description: 'Review text content' },
      is_verified: { type: 'boolean', default: false, description: 'Whether review is verified' },
      is_approved: { type: 'boolean', default: false, description: 'Whether review is approved' },
    },
  },
  response: {
    201: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: giftReviewSchema,
      },
    },
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// GET /gifts/:id/reviews - Get gift reviews
export const getGiftReviewsSchema = {
  summary: 'Get gift reviews',
  description: 'Retrieve all reviews for a specific gift',
  tags: ['Gift'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', description: 'Gift ID' },
    },
  },
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1, description: 'Page number' },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10, description: 'Items per page' },
      is_approved: { type: 'boolean', description: 'Filter by approval status' },
      min_rating: { type: 'integer', minimum: 1, maximum: 5, description: 'Minimum rating filter' },
      max_rating: { type: 'integer', minimum: 1, maximum: 5, description: 'Maximum rating filter' },
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
            reviews: {
              type: 'array',
              items: giftReviewSchema,
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

// POST /gifts/specifications - Add gift specification
export const addGiftSpecificationSchema = {
  summary: 'Add gift specification',
  description: 'Add a new specification to a gift product',
  tags: ['Gift'],
  body: {
    type: 'object',
    required: ['gift_id', 'name', 'value'],
    properties: {
      gift_id: { type: 'integer', description: 'Associated gift ID' },
      name: { type: 'string', minLength: 1, maxLength: 100, description: 'Specification name' },
      value: { type: 'string', minLength: 1, maxLength: 255, description: 'Specification value' },
      unit: { type: 'string', maxLength: 50, description: 'Unit of measurement' },
      sort_order: { type: 'integer', minimum: 0, default: 0, description: 'Display order' },
    },
  },
  response: {
    201: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: giftSpecificationSchema,
      },
    },
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

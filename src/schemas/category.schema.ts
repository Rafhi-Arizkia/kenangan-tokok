import { FastifySchema } from 'fastify';
import { 
  successResponseSchema, 
  errorResponseSchema, 
  paginationSchema 
} from './common.schema';

// Base Category Schema
export const categorySchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', description: 'Category unique identifier' },
    name: { type: 'string', description: 'Category name' },
    parent_id: { type: 'integer', description: 'Parent category ID for hierarchical structure' },
    image_url: { type: 'string', format: 'uri', description: 'Category image URL' },
  },
};

// GET /categories - Get all categories
export const getAllCategoriesSchema = {
  summary: 'Get all categories',
  description: 'Retrieve a list of categories',
  tags: ['Category'],
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1, description: 'Page number' },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10, description: 'Items per page' },
      parent_id: { type: 'integer', description: 'Filter by parent category ID' },
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
            categories: {
              type: 'array',
              items: categorySchema,
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

// GET /categories/:id - Get category by ID
export const getCategoryByIdSchema = {
  summary: 'Get category by ID',
  description: 'Retrieve a single category by its unique identifier',
  tags: ['Category'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', description: 'Category ID' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: categorySchema,
      },
    },
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// POST /categories - Create new category
export const createCategorySchema = {
  summary: 'Create new category',
  description: 'Create a new product category',
  tags: ['Category'],
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 255, description: 'Category name' },
      parent_id: { type: 'integer', description: 'Parent category ID for hierarchical structure' },
      image_url: { type: 'string', format: 'uri', description: 'Category image URL' },
    },
  },
  response: {
    201: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: categorySchema,
      },
    },
    400: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// PUT /categories/:id - Update category
export const updateCategorySchema = {
  summary: 'Update category',
  description: 'Update an existing category',
  tags: ['Category'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', description: 'Category ID' },
    },
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 255, description: 'Category name' },
      parent_id: { type: 'integer', description: 'Parent category ID for hierarchical structure' },
      image_url: { type: 'string', format: 'uri', description: 'Category image URL' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: categorySchema,
      },
    },
    400: errorResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// DELETE /categories/:id - Delete category
export const deleteCategorySchema = {
  summary: 'Delete category',
  description: 'Delete a category from the system',
  tags: ['Category'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', description: 'Category ID' },
    },
  },
  response: {
    200: successResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// GET /categories/:id/children - Get child categories
export const getCategoryChildrenSchema = {
  summary: 'Get child categories',
  description: 'Retrieve all direct child categories of a parent category',
  tags: ['Category'],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', description: 'Parent category ID' },
    },
  },
  querystring: {
    type: 'object',
    properties: {
      is_active: { type: 'boolean', description: 'Filter by active status' },
      include_products_count: { type: 'boolean', default: false, description: 'Include product count for each category' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: {
          type: 'array',
          items: categorySchema,
        },
      },
    },
    404: errorResponseSchema,
    500: errorResponseSchema,
  },
};

// GET /categories/tree - Get category tree
export const getCategoryTreeSchema = {
  summary: 'Get category tree',
  description: 'Retrieve the complete category hierarchy as a tree structure',
  tags: ['Category'],
  querystring: {
    type: 'object',
    properties: {
      is_active: { type: 'boolean', description: 'Filter by active status' },
      max_depth: { type: 'integer', minimum: 1, maximum: 10, description: 'Maximum depth of tree to return' },
    },
  },
  response: {
    200: {
      ...successResponseSchema,
      properties: {
        ...successResponseSchema.properties,
        data: {
          type: 'array',
          items: {
            ...categorySchema,
            properties: {
              ...categorySchema.properties,
              children: {
                type: 'array',
                items: { $ref: '#' }, // Recursive reference for nested children
                description: 'Child categories',
              },
            },
          },
        },
      },
    },
    500: errorResponseSchema,
  },
};

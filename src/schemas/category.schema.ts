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
    parent_id: { type: 'integer', description: 'Parent category ID for hierarchical structure' },
    name: { type: 'string', description: 'Category name' },
    description: { type: 'string', description: 'Category description' },
    icon: { type: 'string', format: 'uri', description: 'Category icon URL' },
    image: { type: 'string', format: 'uri', description: 'Category image URL' },
    is_active: { type: 'boolean', description: 'Whether category is active' },
    sort_order: { type: 'integer', minimum: 0, description: 'Display order' },
    created_at: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
    updated_at: { type: 'string', format: 'date-time', description: 'Last update timestamp' },
  },
};

// GET /categories - Get all categories
export const getAllCategoriesSchema: FastifySchema = {
  summary: 'Get all categories with optional hierarchy',
  description: 'Retrieve a list of categories with optional filtering and hierarchy support',
  tags: ['Category'],
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1, description: 'Page number' },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10, description: 'Items per page' },
      parent_id: { type: 'integer', description: 'Filter by parent category ID' },
      is_active: { type: 'boolean', description: 'Filter by active status' },
      include_children: { type: 'boolean', default: false, description: 'Include child categories' },
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
export const getCategoryByIdSchema: FastifySchema = {
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
  querystring: {
    type: 'object',
    properties: {
      include_children: { type: 'boolean', default: false, description: 'Include child categories' },
      include_products_count: { type: 'boolean', default: false, description: 'Include product count' },
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
export const createCategorySchema: FastifySchema = {
  summary: 'Create new category',
  description: 'Create a new product category',
  tags: ['Category'],
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      parent_id: { type: 'integer', description: 'Parent category ID for hierarchical structure' },
      name: { type: 'string', minLength: 1, maxLength: 255, description: 'Category name' },
      description: { type: 'string', maxLength: 2000, description: 'Category description' },
      icon: { type: 'string', format: 'uri', description: 'Category icon URL' },
      image: { type: 'string', format: 'uri', description: 'Category image URL' },
      is_active: { type: 'boolean', default: true, description: 'Whether category is active' },
      sort_order: { type: 'integer', minimum: 0, default: 0, description: 'Display order' },
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
export const updateCategorySchema: FastifySchema = {
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
      parent_id: { type: 'integer', description: 'Parent category ID for hierarchical structure' },
      name: { type: 'string', minLength: 1, maxLength: 255, description: 'Category name' },
      description: { type: 'string', maxLength: 2000, description: 'Category description' },
      icon: { type: 'string', format: 'uri', description: 'Category icon URL' },
      image: { type: 'string', format: 'uri', description: 'Category image URL' },
      is_active: { type: 'boolean', description: 'Whether category is active' },
      sort_order: { type: 'integer', minimum: 0, description: 'Display order' },
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
export const deleteCategorySchema: FastifySchema = {
  summary: 'Delete category',
  description: 'Delete a category from the system (soft delete)',
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
    409: {
      ...errorResponseSchema,
      properties: {
        ...errorResponseSchema.properties,
        message: { type: 'string', example: 'Cannot delete category with child categories or associated products' },
      },
    },
    500: errorResponseSchema,
  },
};

// GET /categories/:id/children - Get child categories
export const getCategoryChildrenSchema: FastifySchema = {
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
export const getCategoryTreeSchema: FastifySchema = {
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

import { FastifyInstance, FastifyPluginOptions } from 'fastify';
// import { CategoryController } from '../../controllers/category.controller'; // TODO: Create CategoryController
import {
  getAllCategoriesSchema,
  getCategoryByIdSchema,
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
  getCategoryChildrenSchema,
  getCategoryTreeSchema,
} from '../../schemas/category.schema';

// TODO: Uncomment when CategoryController is created
// const categoryController = new CategoryController();

async function categoryRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // GET /api/categories - Get all categories with optional hierarchy
  fastify.get('/', {
    schema: getAllCategoriesSchema,
  }, async (request, reply) => {
    // TODO: Implement with CategoryController
    // return categoryController.getAllCategories.bind(categoryController);
    reply.status(501).send({
      success: false,
      message: 'CategoryController not implemented yet',
    });
  });

  // GET /api/categories/:id - Get category by ID
  fastify.get('/:id', {
    schema: getCategoryByIdSchema,
  }, async (request, reply) => {
    // TODO: Implement with CategoryController
    reply.status(501).send({
      success: false,
      message: 'CategoryController not implemented yet',
    });
  });

  // POST /api/categories - Create new category
  fastify.post('/', {
    schema: createCategorySchema,
  }, async (request, reply) => {
    // TODO: Implement with CategoryController
    reply.status(501).send({
      success: false,
      message: 'CategoryController not implemented yet',
    });
  });

  // PUT /api/categories/:id - Update category
  fastify.put('/:id', {
    schema: updateCategorySchema,
  }, async (request, reply) => {
    // TODO: Implement with CategoryController
    reply.status(501).send({
      success: false,
      message: 'CategoryController not implemented yet',
    });
  });

  // DELETE /api/categories/:id - Delete category
  fastify.delete('/:id', {
    schema: deleteCategorySchema,
  }, async (request, reply) => {
    // TODO: Implement with CategoryController
    reply.status(501).send({
      success: false,
      message: 'CategoryController not implemented yet',
    });
  });

  // GET /api/categories/:id/children - Get child categories
  fastify.get('/:id/children', {
    schema: getCategoryChildrenSchema,
  }, async (request, reply) => {
    // TODO: Implement with CategoryController
    reply.status(501).send({
      success: false,
      message: 'CategoryController not implemented yet',
    });
  });

  // GET /api/categories/tree - Get category tree
  fastify.get('/tree', {
    schema: getCategoryTreeSchema,
  }, async (request, reply) => {
    // TODO: Implement with CategoryController
    reply.status(501).send({
      success: false,
      message: 'CategoryController not implemented yet',
    });
  });
}

export default categoryRoutes;

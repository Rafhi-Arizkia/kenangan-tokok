import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import CategoryController from '../../controllers/category.controller';
import {
  getAllCategoriesSchema,
  getCategoryByIdSchema,
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
  getCategoryChildrenSchema,
  getCategoryTreeSchema,
} from '../../schemas/category.schema';

const categoryController = new CategoryController();

async function categoryRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // GET /api/categories - Get all categories with optional hierarchy
  fastify.get('/', { schema: getAllCategoriesSchema }, categoryController.getAllCategories.bind(categoryController));

  // GET /api/categories/:id - Get category by ID
  fastify.get('/:id', { schema: getCategoryByIdSchema }, categoryController.getCategoryById.bind(categoryController));

  // POST /api/categories - Create new category
  fastify.post('/', { schema: createCategorySchema }, categoryController.createCategory.bind(categoryController));

  // PUT /api/categories/:id - Update category
  fastify.put('/:id', { schema: updateCategorySchema }, categoryController.updateCategory.bind(categoryController));

  // DELETE /api/categories/:id - Delete category
  fastify.delete('/:id', { schema: deleteCategorySchema }, categoryController.deleteCategory.bind(categoryController));

  // GET /api/categories/:id/children - Get child categories
  fastify.get('/:id/children', { schema: getCategoryChildrenSchema }, categoryController.getChildren.bind(categoryController));

  // GET /api/categories/tree - Get category tree
  fastify.get('/tree', { schema: getCategoryTreeSchema }, categoryController.getTree.bind(categoryController));
}

export default categoryRoutes;

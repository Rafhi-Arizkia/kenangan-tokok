import { FastifyRequest, FastifyReply } from 'fastify';
import CategoryService from '../services/category.service';
import { ResponseHandler } from '../utils/response';
import S3Uploader from '../utils/s3.helper';

const categoryService = new CategoryService();

export class CategoryController {
  async getAllCategories(request: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await categoryService.getAllCategories(request.query as any);
      return ResponseHandler.success(reply, result.categories, 'Categories retrieved', result.pagination);
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to retrieve categories', error.message);
    }
  }

  async getCategoryById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const id = Number(request.params.id);
      const category = await categoryService.getCategoryById(id);
      return ResponseHandler.success(reply, category, 'Category retrieved');
    } catch (error: any) {
      if (error.message === 'Category not found') return ResponseHandler.notFound(reply, 'Category not found');
      return ResponseHandler.error(reply, 'Failed to retrieve category', error.message);
    }
  }

  // Accepts body with name, parent_id, image_url (data uri or remote url)
  async createCategory(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body: any = request.body as any;

      // If image_url is a data URI (base64), upload to S3 and replace with public url
      if (body.image_url && typeof body.image_url === 'string' && body.image_url.startsWith('data:')) {
        // create a minimal file object
        const matches = body.image_url.match(/^data:(.+);base64,(.+)$/);
        if (matches) {
          const mimetype = matches[1];
          const b64 = matches[2];
          const buffer = Buffer.from(b64, 'base64');
          const fileName = `category-${Date.now()}.jpg`;
          try {
            const uploaded = await S3Uploader.photo({ data: buffer, name: fileName, mimetype });
            body.image_url = uploaded;
          } catch (e: any) {
            return ResponseHandler.error(reply, 'Failed to upload image to S3', e.message);
          }
        }
      }

      const category = await categoryService.createCategory(body);
      return ResponseHandler.created(reply, category, 'Category created');
    } catch (error: any) {
      return ResponseHandler.badRequest(reply, 'Failed to create category', error.message);
    }
  }

  async updateCategory(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const id = Number(request.params.id);
      const body: any = request.body as any;

      if (body.image_url && typeof body.image_url === 'string' && body.image_url.startsWith('data:')) {
        const matches = body.image_url.match(/^data:(.+);base64,(.+)$/);
        if (matches) {
          const mimetype = matches[1];
          const b64 = matches[2];
          const buffer = Buffer.from(b64, 'base64');
          const fileName = `category-${Date.now()}.jpg`;
          try {
            const uploaded = await S3Uploader.photo({ data: buffer, name: fileName, mimetype });
            body.image_url = uploaded;
          } catch (e: any) {
            return ResponseHandler.error(reply, 'Failed to upload image to S3', e.message);
          }
        }
      }

      const category = await categoryService.updateCategory(id, body);
      return ResponseHandler.success(reply, category, 'Category updated');
    } catch (error: any) {
      if (error.message === 'Category not found') return ResponseHandler.notFound(reply, 'Category not found');
      return ResponseHandler.badRequest(reply, 'Failed to update category', error.message);
    }
  }

  async deleteCategory(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const id = Number(request.params.id);
      const result = await categoryService.deleteCategory(id);
      return ResponseHandler.success(reply, result, 'Category deleted');
    } catch (error: any) {
      if (error.message === 'Category not found') return ResponseHandler.notFound(reply, 'Category not found');
      return ResponseHandler.error(reply, 'Failed to delete category', error.message);
    }
  }

  async getChildren(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const id = Number(request.params.id);
      const children = await categoryService.getChildren(id, request.query);
      return ResponseHandler.success(reply, children, 'Children retrieved');
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to retrieve children', error.message);
    }
  }

  async getTree(request: FastifyRequest, reply: FastifyReply) {
    try {
      const maxDepth = (request.query as any)?.max_depth;
      const tree = await categoryService.getTree(maxDepth);
      return ResponseHandler.success(reply, tree, 'Category tree retrieved');
    } catch (error: any) {
      return ResponseHandler.error(reply, 'Failed to retrieve category tree', error.message);
    }
  }
}

export default CategoryController;

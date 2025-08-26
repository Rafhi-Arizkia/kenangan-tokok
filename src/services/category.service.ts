import { CategoryModel } from '../models/category.model';
import { paginationHelper } from '../utils/response';

export interface CategoryQuery {
  page?: number;
  limit?: number;
  parent_id?: number;
}

export class CategoryService {
  async getAllCategories(query: CategoryQuery) {
    let { page = 1, limit = 10, parent_id } = query as any;
    page = Number(page) || 1;
    limit = Number(limit) || 10;

    const { offset, pagination } = paginationHelper(page, limit, 0);

    const where: any = {};
    if (parent_id !== undefined && parent_id !== null) where.parent_id = parent_id;

    const { count, rows } = await CategoryModel.findAndCountAll({
      where,
      offset,
      limit,
      order: [['id', 'ASC']],
    });

    return {
      categories: rows,
      pagination: {
        ...pagination,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async getCategoryById(id: number) {
    const category = await CategoryModel.findByPk(id);
    if (!category) throw new Error('Category not found');
    return category;
  }

  async createCategory(payload: any) {
    const category = await CategoryModel.create(payload);
    return category;
  }

  async updateCategory(id: number, payload: any) {
    const category = await CategoryModel.findByPk(id);
    if (!category) throw new Error('Category not found');
    await category.update(payload);
    return category;
  }

  async deleteCategory(id: number) {
    const category = await CategoryModel.findByPk(id);
    if (!category) throw new Error('Category not found');
    await category.destroy();
    return { message: 'Category deleted successfully' };
  }

  async getChildren(id: number, options?: any) {
    const children = await CategoryModel.findAll({ where: { parent_id: id } });
    return children;
  }

  async getTree(maxDepth: number = 10) {
    // Load all categories and build a tree in-memory
    const categories = await CategoryModel.findAll({ order: [['id', 'ASC']] });
    const map: Record<number, any> = {};
    const roots: any[] = [];

    categories.forEach((c: any) => {
      const obj = c.toJSON();
      obj.children = [];
      map[obj.id] = obj;
    });

    Object.values(map).forEach((node: any) => {
      if (node.parent_id && map[node.parent_id]) {
        map[node.parent_id].children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  }
}

export default CategoryService;

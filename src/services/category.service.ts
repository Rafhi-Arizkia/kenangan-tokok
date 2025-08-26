import { CategoryModel } from '../models/category.model';
import { paginationHelper } from '../utils/response';
import { WhereOptions } from 'sequelize';
import { 
  CategoryDTO,
  CreateCategoryDTO, 
  UpdateCategoryDTO, 
  CategoryQueryDTO 
} from '../dtos/category.dto';

export class CategoryService {
  async getAllCategories(query: CategoryQueryDTO): Promise<{
    categories: CategoryModel[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const { page = 1, limit = 10, parent_id } = query;
    const normalizedPage = Number(page) || 1;
    const normalizedLimit = Number(limit) || 10;

    const { offset, pagination } = paginationHelper(normalizedPage, normalizedLimit, 0);

    const where: WhereOptions = {};
    if (parent_id !== undefined && parent_id !== null) {
      where.parent_id = parent_id;
    }

    const { count, rows } = await CategoryModel.findAndCountAll({
      where,
      offset,
      limit: normalizedLimit,
      order: [['id', 'ASC']],
    });

    return {
      categories: rows,
      pagination: {
        ...pagination,
        total: count,
        totalPages: Math.ceil(count / normalizedLimit),
      },
    };
  }

  async getCategoryById(id: number): Promise<CategoryModel> {
    const category = await CategoryModel.findByPk(id);
    if (!category) throw new Error('Category not found');
    return category;
  }

  async createCategory(payload: CreateCategoryDTO): Promise<CategoryModel> {
    const category = await CategoryModel.create(payload);
    return category;
  }

  async updateCategory(id: number, payload: UpdateCategoryDTO): Promise<CategoryModel> {
    const category = await CategoryModel.findByPk(id);
    if (!category) throw new Error('Category not found');
    await category.update(payload);
    return category;
  }

  async deleteCategory(id: number): Promise<{ message: string }> {
    const category = await CategoryModel.findByPk(id);
    if (!category) throw new Error('Category not found');
    await category.destroy();
    return { message: 'Category deleted successfully' };
  }

  async getChildren(id: number): Promise<CategoryModel[]> {
    const children = await CategoryModel.findAll({ where: { parent_id: id } });
    return children;
  }

  async getTree(maxDepth: number = 10): Promise<(CategoryDTO & { children: CategoryDTO[] })[]> {
    // Load all categories and build a tree in-memory
    const categories = await CategoryModel.findAll({ order: [['id', 'ASC']] });
    const map: Record<number, CategoryDTO & { children: CategoryDTO[] }> = {};
    const roots: (CategoryDTO & { children: CategoryDTO[] })[] = [];

    categories.forEach((c) => {
      const obj = c.toJSON() as CategoryDTO;
      const nodeWithChildren = { ...obj, children: [] as CategoryDTO[] };
      map[obj.id] = nodeWithChildren;
    });

    Object.values(map).forEach((node) => {
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

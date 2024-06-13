import { CategoryModel } from "../../data";
import {
  CreateCategoryDto,
  CustomError,
  PaginationDto,
  UserEntity,
} from "../../domain";

export class CategoryService {
  async createCategory(dto: CreateCategoryDto, user: UserEntity) {
    const categoryExist = await CategoryModel.findOne({
      name: dto.name,
      user: user.id,
    });
    if (categoryExist) throw CustomError.badRequest("Category already exists");

    try {
      const category = await CategoryModel.create({
        ...dto,
        user: user.id,
      });

      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getCategories(pagination: PaginationDto) {
    const { page, limit } = pagination;
    const isPage1 = page === 1;

    try {
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        await CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);

      return {
        page,
        limit,
        total,
        next: `/api/categories?page=${page + 1}&limit=${limit}`,
        prev: isPage1
          ? `/api/categories?page=${page - 1}&limit=${limit}`
          : null,
        categories: categories.map((category) => ({
          id: category.id,
          name: category.name,
          available: category.available,
        })),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}

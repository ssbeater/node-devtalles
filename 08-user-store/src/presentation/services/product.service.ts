import { CategoryModel, ProductModel } from "../../data";
import {
  CreateCategoryDto,
  CreateProductDto,
  CustomError,
  PaginationDto,
  UserEntity,
} from "../../domain";

export class ProductService {
  async createProduct(dto: CreateProductDto, user: UserEntity) {
    const productExist = await ProductModel.findOne({
      name: dto.name,
      user: user.id,
    });
    if (productExist) throw CustomError.badRequest("Product already exists");

    try {
      const product = await ProductModel.create(dto);
      await product.save();
      return product;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getProducts(pagination: PaginationDto) {
    const { page, limit } = pagination;
    const isPage1 = page === 1;

    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        await ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("user")
          .populate("category", "name available id"),
      ]);

      return {
        page,
        limit,
        total,
        next: `/api/products?page=${page + 1}&limit=${limit}`,
        prev: isPage1 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        products,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}

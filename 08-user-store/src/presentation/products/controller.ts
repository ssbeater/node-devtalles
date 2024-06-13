import { Request, Response } from "express";
import {
  CreateCategoryDto,
  CreateProductDto,
  CustomError,
  PaginationDto,
} from "../../domain";
import { ProductService } from "../services";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  };

  getProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });

    this.productService
      .getProducts(paginationDto!)
      .then((product) => res.status(200).json(product))
      .catch((error) => this.handleError(error, res));
  };

  createProduct = async (req: Request, res: Response) => {
    const [error, dto] = CreateProductDto.create({
      ...req.body,
      user: req.body.user.id,
    });
    if (error) return res.status(400).json({ error });

    this.productService
      .createProduct(dto!, req.body.user)
      .then((product) => res.status(201).json(product))
      .catch((error) => this.handleError(error, res));
  };
}

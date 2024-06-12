import { Request, Response } from "express";
import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";
import { CategoryService } from "../services";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  };

  getCategories = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) res.status(400).json({ error });

    this.categoryService
      .getCategories(paginationDto!, req.body.user)
      .then((categories) => res.status(200).json(categories))
      .catch((error) => this.handleError(error, res));
  };

  createCategory = async (req: Request, res: Response) => {
    const [error, dto] = CreateCategoryDto.create(req.body);
    if (error) res.status(400).json({ error });

    this.categoryService
      .createCategory(dto!, req.body.user)
      .then((category) => res.status(201).json(category))
      .catch((error) => this.handleError(error, res));
  };
}

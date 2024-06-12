import { Router } from "express";
import { CategoryController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoryService } from "../services/category.service";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();
    const categoryService = new CategoryService();
    const controller = new CategoryController(categoryService);

    // routes
    router.get("/", [AuthMiddleware.validateJWT], controller.getCategories);
    router.post("/", [AuthMiddleware.validateJWT], controller.createCategory);

    return router;
  }
}

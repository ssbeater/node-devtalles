import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services";
import { FileUploadMiddleware, TypeMiddleware } from "../middlewares";

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();
    const fileUploadService = new FileUploadService();
    const controller = new FileUploadController(fileUploadService);

    router.use([
      FileUploadMiddleware.containFiles,
      TypeMiddleware.validTypes(["user", "product", "category"]),
    ]);

    // routes
    // <single|multiple>/<user|category|product>/
    router.post("/single/:type", controller.uploadFile);
    router.post("/multiple/:type", controller.uploadMultipleFile);

    return router;
  }
}

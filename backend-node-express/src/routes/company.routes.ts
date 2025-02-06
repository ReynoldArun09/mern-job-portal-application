import { Router } from "express";
import {
  getCompaniesByCurrentUserController,
  getCompanyByIdController,
  registerCompanyController,
} from "../controllers/company.controller";
import { AuthMiddleware } from "../middlewares";

const companyRoutes = Router();

companyRoutes.post("/create-company", AuthMiddleware, registerCompanyController);
companyRoutes.get("/get-company", AuthMiddleware, getCompaniesByCurrentUserController);
companyRoutes.get("/:id", getCompanyByIdController);

export default companyRoutes;

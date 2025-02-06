import { Router } from "express";
import {
  applyJobController,
  getApplicantsController,
  getAppliedJobsController,
  updateApplicationStatusController,
} from "../controllers/application.controller";
import { AuthMiddleware } from "../middlewares";

const applicationRoutes = Router();
applicationRoutes.post("/apply/:id", AuthMiddleware, applyJobController);
applicationRoutes.get("/get", AuthMiddleware, getAppliedJobsController);
applicationRoutes.get("/:id/applicants", AuthMiddleware, getApplicantsController);
applicationRoutes.put("/status/:id/update", AuthMiddleware, updateApplicationStatusController);

export default applicationRoutes;

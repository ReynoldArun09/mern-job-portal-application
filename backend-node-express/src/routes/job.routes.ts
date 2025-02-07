import { Router } from "express";
import {
  createJobController,
  getAdminJobsController,
  getAllJobsController,
  getJobByIdController,
  getLatestJobController,
} from "../controllers/job.controller";
import { AuthMiddleware } from "../middlewares";

const jobRoutes = Router();

jobRoutes.get("/latest-jobs", getLatestJobController);
jobRoutes.post("/create-job", AuthMiddleware, createJobController);
jobRoutes.get("/all-jobs", getAllJobsController);
jobRoutes.get("/single/:id", AuthMiddleware, getJobByIdController);
jobRoutes.get("/admin-jobs", AuthMiddleware, getAdminJobsController);

export default jobRoutes;

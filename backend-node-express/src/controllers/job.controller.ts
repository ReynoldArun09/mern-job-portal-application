import { type Request, type Response } from "express";
import { ApiSuccessMessages, HttpStatusCode } from "../constants";
import {
  createJobService,
  getAdminJobsService,
  getAllJobsService,
  getJobByIdService,
  getLatestJobServices,
} from "../services/job.services";
import { AsyncWrapper, SendApiResponse } from "../utils";
import { JobSchema } from "../validations";

export const createJobController = AsyncWrapper(async (req: Request, res: Response) => {
  const body = JobSchema.parse(req.body);
  const userId = req.ctx._id;
  const job = await createJobService(body, userId);

  SendApiResponse({
    res,
    statusCode: HttpStatusCode.CREATED,
    message: ApiSuccessMessages.JOB_CREATED,
    data: job,
  });
});

export const getAllJobsController = AsyncWrapper(async (req: Request, res: Response) => {
  const keyword = req.query.keyword || "";
  const filters: Record<string, any> = {
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { requirements: { $regex: keyword, $options: "i" } },
    ],
  };

  const { jobs } = await getAllJobsService(filters);
  SendApiResponse({
    res,
    statusCode: HttpStatusCode.OK,
    data: jobs,
  });
});

export const getJobByIdController = AsyncWrapper(async (req: Request, res: Response) => {
  const jobId = req.ctx._id;

  const job = await getJobByIdService(jobId);

  SendApiResponse({
    res,
    statusCode: HttpStatusCode.OK,
    data: job,
  });
});

export const getAdminJobsController = AsyncWrapper(async (req: Request, res: Response) => {
  const adminId = req.ctx._id;

  const adminJobs = await getAdminJobsService(adminId);

  SendApiResponse({
    res,
    statusCode: HttpStatusCode.OK,
    data: adminJobs,
  });
});

export const getLatestJobController = AsyncWrapper(async (req: Request, res: Response) => {
  const jobs = await getLatestJobServices();
  SendApiResponse({
    res,
    statusCode: HttpStatusCode.OK,
    data: jobs,
  });
});

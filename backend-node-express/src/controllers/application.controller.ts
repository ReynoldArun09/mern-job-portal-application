import { type Request, type Response } from "express";
import { ApiSuccessMessages, HttpStatusCode } from "../constants";
import {
  applyJobService,
  getApplicantsService,
  getAppliedJobsService,
  updateApplicationStatusService,
} from "../services/application.services";
import { AsyncWrapper, SendApiResponse } from "../utils";
import { ApplicationSchemaId, ApplicationStatusSchema } from "../validations";
import { JobSchemaId } from "../validations/job.schema";

export const applyJobController = AsyncWrapper(async (req: Request, res: Response) => {
  const userId = req.ctx._id;
  const jobId = JobSchemaId.parse(req.params.id);

  await applyJobService(userId, jobId);

  SendApiResponse({
    res,
    statusCode: HttpStatusCode.CREATED,
    message: ApiSuccessMessages.JOB_APPLICATION_CREATED,
  });
});

export const getAppliedJobsController = AsyncWrapper(async (req: Request, res: Response) => {
  const userId = req.ctx._id;

  const { data } = await getAppliedJobsService(userId);

  SendApiResponse({
    res,
    statusCode: HttpStatusCode.OK,
    data,
  });
});

export const getApplicantsController = AsyncWrapper(async (req: Request, res: Response) => {
  const jobId = JobSchemaId.parse(req.params.id);

  const job = await getApplicantsService(jobId);

  SendApiResponse({
    res,
    statusCode: HttpStatusCode.OK,
    data: job,
  });
});

export const updateApplicationStatusController = AsyncWrapper(async (req: Request, res: Response) => {
  const body = ApplicationStatusSchema.parse(req.body);
  const applicationId = ApplicationSchemaId.parse(req.params.id);

  await updateApplicationStatusService(body, applicationId);

  SendApiResponse({
    res,
    statusCode: HttpStatusCode.CREATED,
    message: ApiSuccessMessages.JOB_APPLICATION_CREATED,
  });
});

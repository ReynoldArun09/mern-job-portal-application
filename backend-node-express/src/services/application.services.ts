import { ApiErrorMessages, HttpStatusCode } from "../constants";
import { Application, Job } from "../models";
import { AppError } from "../utils";
import { ApplicationStatusSchemaType } from "../validations";

export const applyJobService = async (userId: string, jobId: string) => {
  const existingApplication = await Application.findOne({
    job: jobId,
    applicant: userId,
  });

  if (existingApplication) {
    throw new AppError(ApiErrorMessages.APPLICATION_ALREADY_EXISTS, HttpStatusCode.BAD_REQUEST);
  }

  const existingJob = await Job.findById(jobId);

  if (!existingJob) {
    throw new AppError(ApiErrorMessages.JOB_NOT_FOUND, HttpStatusCode.BAD_REQUEST);
  }

  const newApplication = await Application.create({
    job: jobId,
    applicant: userId,
  });

  existingJob?.applications.push(newApplication._id);
  await existingJob.save();
};

export const getAppliedJobsService = async (userId: string) => {
  const existingApplication = await Application.find({ applicant: userId })
    .sort({
      createdAt: -1,
    })
    .populate({
      path: "job",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "company",
        options: { sort: { createdAt: -1 } },
      },
    });

  if (!existingApplication) {
    throw new AppError(ApiErrorMessages.APPLICATION_ALREADY_EXISTS, HttpStatusCode.BAD_REQUEST);
  }

  return { data: existingApplication };
};

export const getApplicantsService = async (jobId: string) => {
  const job = await Job.findById(jobId).populate({
    path: "applications",
    options: { sort: { createdAt: -1 } },
    populate: {
      path: "applicant",
    },
  });
  if (!job) {
    throw new AppError(ApiErrorMessages.JOB_NOT_FOUND, HttpStatusCode.NOT_FOUND);
  }

  return job;
};

export const updateApplicationStatusService = async (body: ApplicationStatusSchemaType, applicationId: string) => {
  const { status } = body;
  const existingApplication = await Application.findOne({
    _id: applicationId,
  });

  if (!existingApplication) {
    throw new AppError(ApiErrorMessages.APPLICATION_NOT_FOUND, HttpStatusCode.NOT_FOUND);
  }

  existingApplication.status = status;
  await existingApplication.save();
};

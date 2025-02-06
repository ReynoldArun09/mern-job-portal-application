import { ApiErrorMessages, HttpStatusCode } from "../constants";
import { Job } from "../models";
import { AppError } from "../utils";
import { JobSchemaType } from "../validations";

export const createJobService = async (body: JobSchemaType, userId: string) => {
  const { title, description, requirements, salary, location, jobType, experienceLevel, position, companyId, applications } = body;
  const parsedRequirements = typeof requirements === "string" ? requirements.split(",").map((item) => item.trim()) : [];

  const job = await Job.create({
    title,
    description,
    location,
    jobType,
    experienceLevel,
    requirements: parsedRequirements,
    salary: Number(salary),
    position,
    company: companyId,
    createdBy: userId,
    applications,
  });

  return job;
};

export const getAllJobsService = async (filters: Record<string, any>) => {
  const jobs = await Job.find(filters)
    .populate({
      path: "company",
    })
    .sort({ createdAt: -1 });

  if (!jobs) {
    throw new AppError(ApiErrorMessages.JOB_NOT_FOUND, HttpStatusCode.NOT_FOUND);
  }

  return { jobs };
};

export const getJobByIdService = async (jobId: string) => {
  const existingJob = await Job.findById(jobId)
    .populate({
      path: "applications",
    })
    .populate({
      path: "company",
    });

  if (!existingJob) {
    throw new AppError(ApiErrorMessages.JOB_NOT_FOUND, HttpStatusCode.NOT_FOUND);
  }

  return { job: existingJob };
};

export const getAdminJobsService = async (adminId: string) => {
  const existingJobs = await Job.find({ createdBy: adminId })
    .populate({
      path: "company",
    })
    .sort({ createdAt: -1 });
  if (!existingJobs) {
    throw new AppError(ApiErrorMessages.JOB_NOT_FOUND, HttpStatusCode.NOT_FOUND);
  }

  return { adminJobs: existingJobs };
};

export const getLatestJobServices = async () => {
  const jobs = await Job.find({})
    .limit(6)
    .populate({
      path: "company",
    })
    .sort({ createdAt: -1 });

  if (!jobs) {
    throw new AppError(ApiErrorMessages.JOB_NOT_FOUND, HttpStatusCode.NOT_FOUND);
  }

  return jobs;
};

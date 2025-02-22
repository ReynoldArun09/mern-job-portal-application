import { z } from "zod";

export const JobSchema = z.object({
  title: z.string().min(4, "Title is required"),
  description: z.string().min(4, "Description is required"),
  requirements: z.any(),
  salary: z.coerce.number().positive("Salary must be positive number"),
  experienceLevel: z.coerce.number().min(0, "Experience level cannot be negative"),
  location: z.string().min(1, "Location is required"),
  jobType: z.string().min(1, "Job type is required"),
  position: z.coerce.number().positive("Position must be positive number"),
  companyId: z.string(),
});
export type JobSchemaType = z.infer<typeof JobSchema>;

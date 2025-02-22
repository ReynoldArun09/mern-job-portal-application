import { z } from "zod";

export const CompanySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  description: z.string().min(1, "Description is required"),
  website: z.string().optional(),
  location: z.string().optional(),
  logo: z.string().optional(),
});

export type CompanySchemaType = z.infer<typeof CompanySchema>;

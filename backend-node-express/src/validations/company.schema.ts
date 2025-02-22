import { z } from "zod";

export const CompanySchema = z.object({
  name: z.string().min(4, { message: "CompanyName should be more than 4 charc" }),
});

export const CompanyIdSchema = z.string().min(1);

export const UpdateCompanySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  logo: z.string().optional(),
});

export type CompanySchemaType = z.infer<typeof CompanySchema>;
export type UpdateCompanySchemaType = z.infer<typeof UpdateCompanySchema>;

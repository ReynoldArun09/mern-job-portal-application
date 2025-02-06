import { z } from "zod";

export const CompanySchema = z.object({
  companyName: z.string().min(4, { message: "CompanyName should be more than 4 charc" }),
});

export const CompanyIdSchema = z.string().min(1);

export type CompanySchemaType = z.infer<typeof CompanySchema>;

import { z } from "zod";

export const CompanySchema = z.object({
  name: z.string().min(4, { message: "CompanyName should be more than 4 charc" }),
});

export const CompanyIdSchema = z.string().min(1);

export type CompanySchemaType = z.infer<typeof CompanySchema>;

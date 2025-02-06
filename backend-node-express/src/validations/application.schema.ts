import { z } from "zod";

export const ApplicationSchemaId = z.string().min(1);
export const ApplicationStatusSchema = z.object({
  status: z.enum(["pending", "rejected", "accepted"]),
});

export type ApplicationStatusSchemaType = z.infer<typeof ApplicationStatusSchema>;

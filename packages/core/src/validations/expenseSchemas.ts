import { z } from "zod";

export const participantSchema = z.object({
  userId: z.string(),
  share: z.number().min(0),
});

export const createExpenseSchema = z.object({
  payerId: z.string(),
  amount: z.number().min(1),
  description: z.string().min(1),
  participants: z.array(participantSchema).min(1),
  type: z.enum(["NORMAL", "SETTLEMENT"]).optional(),
  date: z.optional(z.date()),
});

export type CreateExpenseSchema = z.infer<typeof createExpenseSchema>;

export const updateExpenseSchema = z.object({
  description: z.string().optional(),
  amount: z.number().optional(),
  participants: z.array(participantSchema).optional(),
  date: z.date().optional(),
});

export type UpdateExpenseSchema = z.infer<typeof updateExpenseSchema>;

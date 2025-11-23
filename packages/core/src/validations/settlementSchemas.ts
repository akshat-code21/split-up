import { z } from "zod";


export const createSettlementSchema = z.object({
  payerId: z.string(),
  payeeId: z.string(),
  amount: z.number().min(1),
});

export type CreateSettlementSchema = z.infer<typeof createSettlementSchema>;


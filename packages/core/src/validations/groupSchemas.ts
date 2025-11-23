import { z } from "zod";

export const createGroupSchema = z.object({
  name: z.string().min(1),
  currency: z.string().optional(),
});

export type CreateGroupSchema = z.infer<typeof createGroupSchema>;

export const addMemberSchema = z.object({
  userIdToAdd: z.string(),
});

export type AddMemberSchema = z.infer<typeof addMemberSchema>;

import { z } from "zod";


// TODO: clean up not needed schemas

export const emailSchema = z
  .email("Invalid email format")
  .min(1, "Email is required");

export const idSchema = z
  .uuid("Invalid ID format");


export const sendInviteSchema = z.object({
  email: emailSchema,
});

export type SendInviteSchema = z.infer<typeof sendInviteSchema>;


export const acceptInviteSchema = z.object({
  token: idSchema, 
});

export type AcceptInviteSchema = z.infer<typeof acceptInviteSchema>;


export const rejectInviteSchema = z.object({
  token: idSchema,
});

export type RejectInviteSchema = z.infer<typeof rejectInviteSchema>;

export const resendInviteSchema = z.object({
  inviteId: idSchema,
});

export type ResendInviteSchema = z.infer<typeof resendInviteSchema>;


export const cancelInviteSchema = z.object({
  inviteId: idSchema,
});

export type CancelInviteSchema = z.infer<typeof cancelInviteSchema>;


export const inviteDetailsSchema = z.object({
  token: idSchema,
});

export type InviteDetailsSchema = z.infer<typeof inviteDetailsSchema>;


export const currentUserEmailSchema = z.object({
  email: emailSchema,
});

export type CurrentUserEmailSchema = z.infer<typeof currentUserEmailSchema>;

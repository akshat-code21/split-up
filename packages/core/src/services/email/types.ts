export type SendInviteEmailInput = {
  to: string;
  inviteId: string;
  inviterName: string;
  groupName: string;
};


export type EmailService = {
  sendInviteEmail: (data: SendInviteEmailInput) => Promise<void>;
  sendInviteResendEmail: (data: SendInviteEmailInput) => Promise<void>;
};

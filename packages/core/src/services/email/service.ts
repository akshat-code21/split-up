import { sendEmailFromResend } from "./emailClient";
import { inviteTemplate } from "./templates/invite";
import type { EmailService, SendInviteEmailInput } from "./types";

export const emailService = {
	async sendInviteEmail(data: SendInviteEmailInput) {
		await sendEmailFromResend({
			to: data.to,
			subject: `You have been invited to join ${data.groupName} on split-up`,
			html: inviteTemplate({
				inviteId: data.inviteId,
				inviterName: data.inviterName,
				groupName: data.groupName,
			}),
		});
	},
	async sendInviteResendEmail(data: SendInviteEmailInput) {
		await this.sendInviteEmail(data);
	},
} as EmailService;

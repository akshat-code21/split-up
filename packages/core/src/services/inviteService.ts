import { client } from "@repo/db";
import {
	checkForGroup,
	checkForInvite,
	checkForInviteExpiry,
	checkForMember,
	checkForUser,
	inviteAlreadyExists,
	inviteStatusCheck,
	inviteUserCheck,
	type NotFoundError,
} from "..";
import type { InviteStatus } from "../../../db/generated/prisma/enums";
import { emailService } from "./email/service";

export type SendInviteInput = {
	groupId: string;
	email: string;
};
export type SendInviteOutput = {
	inviteId: string;
	email: string;
	status: "PENDING";
	createdAt: Date;
};

export const sendGroupInvite = async (
	inviterId: string,
	data: SendInviteInput
): Promise<SendInviteOutput | NotFoundError> => {
	try {
		const userExists = await checkForUser(inviterId);
		if (!userExists) {
			return {
				message: "User doesn't exist",
				success: false,
			};
		}
		const requesterIsMember = await checkForMember(inviterId, data.groupId);
		if (!requesterIsMember) {
			return { success: false, message: "You are not a member of this group" };
		}

		const groupExists = await checkForGroup(data.groupId);
		if (!groupExists) {
			return {
				message: "Group doesn't exist",
				success: false,
			};
		}

		const inviteExists = await inviteAlreadyExists(data.groupId, data.email);

		if (inviteExists) {
			return {
				message: "Invite already exists",
				success: false,
			};
		}

		const invite = await client.invite.create({
			data: {
				email: data.email,
				groupId: data.groupId,
				inviterId: inviterId,
			},
		});

		const inviter = await client.user.findUnique({ where: { id: inviterId } });
		if (!inviter) {
			return { message: "User doesn't exist", success: false };
		}

		const group = await client.group.findUnique({
			where: { id: data.groupId },
		});

		if (!group) {
			return { message: "Group doesn't exist", success: false };
		}

		await emailService.sendInviteEmail({
			to: data.email,
			inviteId: invite.id,
			inviterName: inviter.name!,
			groupName: group.name,
		});

		return {
			inviteId: invite.id,
			email: invite.email,
			status: "PENDING",
			createdAt: invite.createdAt,
		};
	} catch (error) {
		return {
			message: "An error occurred while creating the invite",
			success: false,
		};
	}
};

export type PendingInviteOutput = {
	inviteId: string;
	email: string;
	status: "PENDING";
	invitedAt: Date;
};

export const getPendingInvitesForGroup = async (
	groupId: string
): Promise<PendingInviteOutput[] | NotFoundError> => {
	try {
		const groupExists = await checkForGroup(groupId);
		if (!groupExists) {
			return {
				message: "Group doesn't exist",
				success: false,
			};
		}
		const invites = await client.invite.findMany({
			where: {
				groupId,
				status: "PENDING",
			},
		});

		return invites.map((invite) => {
			return {
				inviteId: invite.id,
				email: invite.email,
				status: "PENDING",
				invitedAt: invite.createdAt,
			};
		});
	} catch (error) {
		return {
			message: "An error occurred while getting pending invites",
			success: false,
		};
	}
};

export type UserInviteOutput = {
	inviteId: string;
	groupName: string;
	inviterName: string;
	invitedAt: Date;
	status: "PENDING";
};

export const getPendingInvitesForUser = async (
	email: string
): Promise<UserInviteOutput[] | NotFoundError> => {
	try {
		const invites = await client.invite.findMany({
			where: {
				email: email,
				status: "PENDING",
			},
			include: {
				group: true,
				inviter: true,
			},
		});
		return invites.map((invite) => {
			return {
				inviteId: invite.id,
				groupName: invite.group.name,
				inviterName: invite.inviter.name ?? "Unknown",
				invitedAt: invite.createdAt,
				status: "PENDING",
			};
		});
	} catch (error) {
		return {
			message: "An error occurred while getting pending invites for user",
			success: false,
		};
	}
};

export type InviteDetailOutput = {
	email: string;
	groupId: string;
	groupName: string;
	inviterName: string;
	status: InviteStatus;
	invitedAt: Date;
	inviterAvatar: string;
};

export const getInviteDetails = async (
	inviteId: string
): Promise<InviteDetailOutput | NotFoundError> => {
	try {
		const inviteExists = await checkForInvite(inviteId);
		if (!inviteExists) {
			return {
				message: "Invite doesn't exist",
				success: false,
                errorCode : 404
			};
		}
		const inviteExpiryCheck = await checkForInviteExpiry(inviteId);
		if (inviteExpiryCheck) {
			return {
				message: "Invite expired",
				success: false,
				errorCode: 419,
			};
		}

        // TODO: Invite already claimed check missing !
		const invite = await client.invite.findUnique({
			where: {
				id: inviteId,
			},
			include: {
				group: true,
				inviter: true,
			},
		});
		if (!invite) {
			return {
				message: "Invite doesn't exist",
				success: false,
                errorCode : 404
			};
		}
		return {
			email: invite.email,
			groupId: invite.groupId,
			groupName: invite.group.name,
			inviterName: invite.inviter.name ?? "Unknown",
			status: invite.status,
			invitedAt: invite.createdAt,
			inviterAvatar: invite.inviter.image ?? "",
		};
	} catch (error) {
		return {
			message: "An error occurred while getting invite details",
			success: false,
		};
	}
};

export type AcceptInviteOutput = {
	groupId: string;
	message: string;
};

export const acceptInvite = async (
	userId: string,
	inviteId: string
): Promise<AcceptInviteOutput | NotFoundError> => {
	const invite = await client.invite.findUnique({ where: { id: inviteId } });
	if (!invite) return { success: false, message: "Invite not found" };

	if (await checkForInviteExpiry(inviteId))
		return { success: false, message: "Invite expired" };

	if (invite.status !== "PENDING")
		return { success: false, message: "Invite is not pending" };

	const user = await client.user.findUnique({ where: { id: userId } });
	if (!user || user.email !== invite.email)
		return { success: false, message: "This invite is not for your account" };

	const alreadyMember = await checkForMember(userId, invite.groupId);
	if (alreadyMember)
		return { success: false, message: "You are already a member" };

	await client.$transaction([
		client.groupMember.create({
			data: {
				groupId: invite.groupId,
				userId,
			},
		}),
		client.invite.update({
			where: { id: inviteId },
			data: { status: "ACCEPTED" },
		}),
	]);

	return {
		groupId: invite.groupId,
		message: "Invite accepted",
	};
};

export const rejectInvite = async (
	userId: string,
	inviteId: string
): Promise<{ message: string } | NotFoundError> => {
	const invite = await client.invite.findUnique({ where: { id: inviteId } });

	if (!invite) {
		return { success: false, message: "Invite doesn't exist" };
	}

	const user = await client.user.findUnique({ where: { id: userId } });

	if (!user || invite.email !== user.email) {
		return { success: false, message: "Invite does not belong to you" };
	}

	await client.invite.update({
		where: { id: inviteId },
		data: { status: "REJECTED" },
	});

	return { message: "Invite rejected" };
};

export const cancelInvite = async (requesterId: string, inviteId: string) => {
	const invite = await client.invite.findUnique({ where: { id: inviteId } });
	if (!invite) return { success: false, message: "Invite not found" };

	const requesterIsMember = await checkForMember(requesterId, invite.groupId);
	if (!requesterIsMember) {
		return { success: false, message: "Not authorized to cancel this invite" };
	}

	await client.invite.update({
		where: { id: inviteId },
		data: { status: "CANCELLED" },
	});

	return { message: "Invite cancelled" };
};

export const resendInviteEmail = async (
	requesterId: string,
	inviteId: string
) => {
	const invite = await client.invite.findUnique({ where: { id: inviteId } });

	if (!invite) return { success: false, message: "Invite not found" };

	if (invite.status !== "PENDING") {
		return { success: false, message: "Only pending invites can be resent" };
	}

	const requesterIsMember = await checkForMember(requesterId, invite.groupId);
	if (!requesterIsMember) {
		return { success: false, message: "Not authorized to resend invite" };
	}

	// TODO: integrate with email service
	// sendInviteEmail(invite.email, invite.id, invite.groupId)

	return { message: "Invite resent" };
};

import { client } from "@repo/db";
export * from "./services/groupService";
export * from "./services/expenseService";
export * from "./services/settlementService";
export * from "./validations/expenseSchemas";
export * from "./validations/groupSchemas";
export * from "./ledger/calculateBalance";
export * from "./validations/settlementSchemas";
export * from "./services/inviteService";
export * from "./validations/inviteSchemas"


// TODO: Create an API Wrapper for all services (except email)

export const checkForUser = async (userId: string): Promise<Boolean> => {
	const user = await client.user.findUnique({
		where: {
			id: userId,
		},
	});
	if (!user) {
		return false;
	}
	return true;
};

export const checkForMember = async (requesterId: string, groupId: string) => {
	const isMember = await client.groupMember.findUnique({
		where: {
			userId_groupId: {
				userId: requesterId,
				groupId: groupId,
			},
		},
	});
	return !!isMember;
};

export const checkPayerIsMember = async (payerId: string, groupId: string) => {
	const isMember = await client.groupMember.findUnique({
		where: {
			userId_groupId: {
				userId: payerId,
				groupId: groupId,
			},
		},
	});
	return !!isMember;
};

export const checkForGroup = async (groupId: string) => {
	const isGroup = await client.group.findUnique({
		where: {
			id: groupId,
		},
	});
	return !!isGroup;
};

export const inviteAlreadyExists = async (groupId: string, email: string) => {
	return !!(await client.invite.findFirst({
		where: { groupId, email, status: "PENDING" },
	}));
};

export const checkForInvite = async (inviteId: string) => {
	return !!(await client.invite.findUnique({ where: { id: inviteId } }));
};
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

export const checkForInviteExpiry = async (inviteId: string) => {
	const invite = await client.invite.findUnique({ where: { id: inviteId } });
	if (!invite) return false;
	return Date.now() - invite.createdAt.getTime() > EXPIRY_MS;
};

export const inviteUserCheck = async (inviteId: string, userId: string) => {
	const invite = await client.invite.findUnique({ where: { id: inviteId } });
	const user = await client.user.findUnique({ where: { id: userId } });

	return invite?.email === user?.email;
};

export const inviteStatusCheck = async (inviteId: string) => {
	const invite = await client.invite.findUnique({ where: { id: inviteId } });
	return invite?.status === "PENDING";
};

export type NotFoundError = {
	message?: string;
	success: boolean;
};

export enum InviteStatus {
	"PENDING",
	"ACCEPTED",
	"REJECTED",
	"EXPIRED",
	"CANCELLED",
}

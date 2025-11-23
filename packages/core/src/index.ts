import { client } from "@repo/db";

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


export type NotFoundError = {
	message?: string;
	success: boolean;
};
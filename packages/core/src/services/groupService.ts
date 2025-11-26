import { client } from "@repo/db";
import { checkForUser, type NotFoundError } from "..";

export type CreateGroupInput = {
	name: string;
};

export type CreateGroupOutput =
	| {
			id: string;
			name: string;
			createdAt: Date;
			updatedAt: Date;
	  }
	| NotFoundError;

export const createGroup = async (
	userId: string,
	data: CreateGroupInput
): Promise<CreateGroupOutput> => {
	const userExists = await checkForUser(userId);
	if (!userExists) {
		return {
			message: "User does not exist",
			success: false,
		};
	}
	const group = await client.group.create({
		data: {
			name: data.name,
			members: {
				create: {
					userId: userId,
				},
			},
		},
	});
	return group;
};

export type GetGroupsOutput = {
	id: string;
	name: string;
};

export const getGroupsForUser = async (
	userId: string
): Promise<GetGroupsOutput[] | NotFoundError> => {
	const userExists = await checkForUser(userId);
	if (!userExists) {
		return {
			message: "User does not exist",
			success: false,
		};
	}
	const groups = await client.group.findMany({
		where: {
			members: {
				some: {
					userId: userId,
				},
			},
		},
	});
	return groups.map((group) => ({
		id: group.id,
		name: group.name,
	}));
};

export type AddMemberInput = {
	groupId: string;
	userIdToAdd: string;
};

export const addMember = async (
	requesterId: string,
	data: AddMemberInput
): Promise<void | NotFoundError> => {
	const userExists = await checkForUser(requesterId);
	if (!userExists) {
		return {
			message: "User does not exist",
			success: false,
		};
	}
	const requesterIsMember = await client.groupMember.findUnique({
		where: {
			userId_groupId: {
				userId: requesterId,
				groupId: data.groupId,
			},
		},
	});
	if (!requesterIsMember) {
		return {
			message: "You are not a member of this group",
			success: false,
		};
	}
	const groupExists = await client.group.findUnique({
		where: {
			id: data.groupId,
		},
	});
	if (!groupExists) {
		return {
			message: "Group does not exist",
			success: false,
		};
	}
	const memberExists = await client.groupMember.findUnique({
		where: {
			userId_groupId: {
				userId: data.userIdToAdd,
				groupId: data.groupId,
			},
		},
	});
	if (memberExists) {
		return {
			message: "User is already a member of the group",
			success: false,
		};
	}
	await client.groupMember.create({
		data: {
			userId: data.userIdToAdd,
			groupId: data.groupId,
		},
	});
	return;
};

export type User = {
	userId: string;
	name: string | null;
	email: string;
	image: string | null;
};

export type GroupDetailsOutput = {
	id: string;
	name: string;
	members: Array<User>;
	// TODO : Create and Add type of Expenses
	expenses: Array<any>;
	totalExpenses: number;
};

export const getGroupDetails = async (
	groupId: string,
	requesterId: string
): Promise<GroupDetailsOutput | NotFoundError> => {
	const userExists = await checkForUser(requesterId);
	if (!userExists) {
		return {
			message: "User does not exist",
			success: false,
		};
	}
	const group = await client.group.findUnique({
		where: {
			id: groupId,
		},
		include: {
			members: {
				include: {
					user: true,
				},
			},
			expenses: {
				include : {
					participants : true
				}
			},
		},
	});

	if (!group) {
		return {
			message: "Group does not exist",
			success: false,
		};
	}

	const totalExpenses = await client.expense.aggregate({
		where: {
			groupId: groupId,
		},
		_sum: {
			amount: true,
		},
	});

	return {
		id: group.id,
		name: group.name,
		members: group.members.map((member) => ({
			userId : member.user.id,
			name: member.user.name,
			email: member.user.email,
			image : member.user.image,
		})),
		expenses: group.expenses,
		totalExpenses: totalExpenses._sum.amount ?? 0,
	};
};

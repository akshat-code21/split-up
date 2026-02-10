import { client } from "@repo/db";
import {
	checkForUser,
	checkForMember,
	checkPayerIsMember,
	type NotFoundError,
} from "..";
import type {
	Expense,
	Group,
	GroupMember,
	User as PrismaUser,
} from "../../../db/generated/prisma/client";

export type CreateSettlementInput = {
	groupId: string;
	payerId: string;
	payeeId: string;
	amount: number;
};

export const createSettlement = async (
	requesterId: string,
	data: CreateSettlementInput
): Promise<{ expenseId: string } | NotFoundError> => {
	const userExists = await checkForUser(requesterId);
	if (!userExists) {
		return {
			message: "User doesn't exist",
			success: false,
		};
	}
	const requesterIsMember = await checkForMember(requesterId, data.groupId);
	if (!requesterIsMember) {
		return { success: false, message: "You are not a member of this group" };
	}

	const payerIsMember = await checkPayerIsMember(data.payerId, data.groupId);
	if (!payerIsMember) {
		return {
			success: false,
			message: "Payer must be a member of the group",
		};
	}

	const payeeIsMember = await checkForMember(data.payeeId, data.groupId);
	if (!payeeIsMember) {
		return { success: false, message: "Payee must be a member of this group" };
	}

	if (data.payerId === data.payeeId) {
		return {
			success: false,
			message: "Payer and payee cannot be the same user",
		};
	}

	const expense = await client.expense.create({
		data: {
			groupId: data.groupId,
			payerId: data.payerId,
			amount: data.amount,
			type: "SETTLEMENT",
			description: `Settlement: ${data.payerId} paid ${data.payeeId} ${data.amount}`,
			participants: {
				create: [
					{
						userId: data.payeeId,
						share: data.amount,
					},
				],
			},
		},
	});
	return { expenseId: expense.id };
};

type AllSettlementsForUser = {
	id: string;
	expenseId: string;
	userId: string;
	share: number;
	expense: Expense & {
		payer: {
			id: string;
			name: string | null;
			email: string;
			image: string | null;
		};
		group: Group & {
			members: (GroupMember & { user: PrismaUser })[];
		};
	};
	user: PrismaUser;
};

export const getAllSettlementsForUser = async (
	userId: string
): Promise<AllSettlementsForUser[] | NotFoundError> => {
	const userExists = await checkForUser(userId);
	if (!userExists) {
		return {
			message: "User doesn't exist",
			success: false,
		};
	}
	const allSettlements = await client.expenseParticipant.findMany({
		where: {
			userId,
			expense: {
				type: "SETTLEMENT",
			},
		},
		include: {
			expense: {
				include: {
					payer: true,
					group: {
						include: {
							members: {
								include: {
									user: true,
								},
							},
						},
					},
				},
			},
			user: true,
		},
	});
	return allSettlements;
};

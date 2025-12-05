import { client } from "@repo/db";
import {
	checkForUser,
	checkForMember,
	checkPayerIsMember,
	type NotFoundError,
} from "..";
import type { User } from "./groupService";
import type { Expense } from "../../../db/generated/prisma/client";
export type ExpenseParticipantInput = {
	userId: string;
	share: number;
};

export type CreateExpenseInput = {
	groupId: string;
	payerId: string;
	amount: number;
	description: string;
	participants: ExpenseParticipantInput[];
	type?: "NORMAL" | "SETTLEMENT";
	date?: Date;
};

export type CreateExpenseOutput = {
	id: string;
	groupId: string;
	amount: number;
	description: string;
	date: Date;
};

export const createExpense = async (
	requesterId: string,
	data: CreateExpenseInput
): Promise<CreateExpenseOutput | NotFoundError> => {
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
	const expense = await client.expense.create({
		data: {
			groupId: data.groupId,
			payerId: data.payerId,
			amount: data.amount,
			description: data.description,
			date: data.date,
			participants: {
				create: data.participants.map((p) => ({
					userId: p.userId,
					share: p.share,
				})),
			},
		},
	});
	return {
		id: expense.id,
		groupId: expense.groupId,
		amount: expense.amount,
		description: expense.description,
		date: expense.date,
	};
};

export type UpdateExpenseInput = {
	expenseId: string;
	description?: string;
	amount?: number;
	participants?: ExpenseParticipantInput[];
	date?: Date;
};

export const updateExpense = async (
	requesterId: string,
	data: UpdateExpenseInput
): Promise<void | NotFoundError> => {
	const userExists = await checkForUser(requesterId);
	if (!userExists) {
		return {
			message: "User doesn't exist",
			success: false,
		};
	}

	const expense = await client.expense.findUnique({
		where: { id: data.expenseId },
		include: { group: true },
	});

	if (!expense) {
		return { success: false, message: "Expense does not exist" };
	}
	const requesterIsMember = await checkForMember(requesterId, expense.groupId);

	if (!requesterIsMember) {
		return { success: false, message: "You are not a member of this group" };
	}
	await client.expense.update({
		where: {
			id: data.expenseId,
		},
		data: {
			description: data.description,
			amount: data.amount,
			date: data.date,
			participants: data.participants
				? {
						deleteMany: { expenseId: data.expenseId },
						create: data.participants.map((participant) => ({
							userId: participant.userId,
							share: participant.share,
						})),
					}
				: undefined,
		},
	});
	return;
};

export const deleteExpense = async (
	requesterId: string,
	expenseId: string
): Promise<void | NotFoundError> => {
	const userExists = await checkForUser(requesterId);
	if (!userExists) {
		return { message: "User doesn't exist", success: false };
	}
	const expense = await client.expense.findUnique({
		where: { id: expenseId },
		include: { group: true },
	});

	if (!expense) {
		return { success: false, message: "Expense does not exist" };
	}
	const requesterIsMember = await checkForMember(requesterId, expense.groupId);

	if (!requesterIsMember) {
		return { success: false, message: "You are not a member of this group" };
	}

	await client.expense.delete({ where: { id: expenseId } });
};

export type ExpenseListItem = {
	id: string;
	description: string;
	amount: number;
	payer: User;
	date: Date;
	participants: Array<{ userId: string; share: number }>;
};

export const getExpensesForGroup = async (
	groupId: string,
	requesterId: string
): Promise<ExpenseListItem[] | NotFoundError> => {
	const userExists = await checkForUser(requesterId);
	if (!userExists) {
		return {
			message: "User doesn't exist",
			success: false,
		};
	}
	const requesterIsMember = await checkForMember(requesterId, groupId);
	if (!requesterIsMember) {
		return { success: false, message: "You are not a member of this group" };
	}

	const expenses = await client.expense.findMany({
		where: {
			groupId: groupId,
		},
		include: {
			participants: true,
			payer: true,
		},
	});
	return expenses.map((expense) => ({
		id: expense.id,
		description: expense.description,
		amount: expense.amount,
		payer: {
			userId: expense.payer.id,
			name: expense.payer.name ?? "",
			email: expense.payer.email ?? "",
			image: expense.payer.image ?? "",
		},
		date: expense.date,
		participants: expense.participants.map((participant) => ({
			userId: participant.userId,
			share: participant.share,
		})),
	}));
};



export type ExpenseGroup = {
	id : string;
	name : string;
	description : string | null;
	currency : string;
	createdAt : Date;
	updatedAt : Date;
	expenses : Expense[]
}

export type AllExpensesListItem = {
	id: string;
	userId:string;
	groupId : string;
	role:string;
	joinedAt : Date;
	group : ExpenseGroup;
};

export const getAllExpensesForUser = async (
	userId: string
): Promise<AllExpensesListItem[] | NotFoundError> => {
	const userExists = await checkForUser(userId);
	if (!userExists) {
		return {
			message: "User doesn't exist",
			success: false,
		};
	}
	const allExpenses = await client.groupMember.findMany({
		where : {
			userId
		},
		include : {
			group : {
				include : {
					expenses : true
				}
			}
		}
	})
	return allExpenses
};

import { client } from "@repo/db";
import { checkForGroup, type NotFoundError } from "..";

export type BalanceOutput = {
	userId: string;
	numberBalance: number;
};

export const calculateBalance = async (
	groupId: string
): Promise<BalanceOutput[] | NotFoundError> => {
	const groupExists = await checkForGroup(groupId);
	if (!groupExists) {
		return {
			message: "Group doesn't exist",
			success: false,
		};
	}
	const ledger = new Map<string, number>();

	const members = await client.groupMember.findMany({
		where: { groupId },
	});
	for (const m of members) {
		ledger.set(m.userId, 0);
	}

	const expenses = await client.expense.findMany({
		where: { groupId },
		include: { participants: true },
	});

	for (const expense of expenses) {
		ledger.set(expense.payerId, ledger.get(expense.payerId)! + expense.amount);

		for (const participant of expense.participants) {
			ledger.set(
				participant.userId,
				ledger.get(participant.userId)! - participant.share
			);
		}
	}

	return Array.from(ledger.entries()).map(([userId, numberBalance]) => ({
		userId,
		numberBalance,
	}));
};

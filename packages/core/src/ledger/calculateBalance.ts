import { client } from "@repo/db";
import { checkForGroup } from "..";

export const calculateBalance = async (groupId: string) => {
	const groupExists = await checkForGroup(groupId);
	if (!groupExists) {
		return { success: false, message: "Group doesn't exist" };
	}
	const ledger = new Map<string, number>();
	const nameMap = new Map<string, string>();
	const members = await client.groupMember.findMany({
		where: { groupId },
		include: { user: true },
	});

	for (const m of members) {
		ledger.set(m.user.id, 0);
		nameMap.set(m.user.id, m.user.name || "Unknown");
	}

	const expenses = await client.expense.findMany({
		where: { groupId },
		include: {
			participants: { include: { user: true } },
			payer: true,
		},
	});

	for (const expense of expenses) {
		ledger.set(
			expense.payer.id,
			(ledger.get(expense.payer.id) || 0) + expense.amount
		);

		for (const participant of expense.participants) {
			ledger.set(
				participant.userId,
				(ledger.get(participant.userId) || 0) - participant.share
			);
		}
	}

	return Array.from(ledger.entries()).map(([userId, numberBalance]) => ({
		userId,
		name: nameMap.get(userId) || "Unknown",
		numberBalance,
	}));
};

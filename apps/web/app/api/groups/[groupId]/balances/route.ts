import { calculateBalance } from "@repo/core";
import { auth } from "app/(auth)/auth";
import { NextRequest, NextResponse } from "next/server";

// compute and return ledger
export async function GET(
	_req: NextRequest,
	{
		params,
	}: {
		params: { groupId: string };
	}
) {
	try {
		const { groupId } = params;
		const session = await auth();
		if (!session || !session.user) {
			return NextResponse.json({
				message: "User not found",
			});
		}
		const userId = session.user.id;
		const balances = await calculateBalance(groupId as string);
		return NextResponse.json({
			balances,
		});
	} catch (error) {
		return NextResponse.json({
			message: error,
		});
	}
}

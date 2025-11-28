import { calculateBalance } from "@repo/core";
import { auth } from "app/(auth)/auth";
import { NextRequest, NextResponse } from "next/server";

// compute and return ledger
export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ groupId: string }> }
) {
	try {
		const userId = req.headers.get('x-user-id') || "";
		if (!userId) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 }
			);
		}
		const groupId = (await params).groupId;
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

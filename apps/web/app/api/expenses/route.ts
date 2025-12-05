import { getAllExpensesForUser } from "@repo/core";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const userId = req.headers.get("x-user-id") || "";
		if (!userId) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 }
			);
		}
		const allExpenses = await getAllExpensesForUser(userId);
		return NextResponse.json(
			{
				success: true,
				message: "Member added successfully.",
				data: allExpenses,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error ? error.message : "Unexpected server error",
			},
			{ status: 500 }
		);
	}
}

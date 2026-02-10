import { getAllSettlementsForUser } from "@repo/core";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
	try {
        const userId = req.headers.get("x-user-id") || "";
		if (!userId) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 }
			);
		}
        const allSettlements = await getAllSettlementsForUser(userId);
        return NextResponse.json(
			{
				success: true,
				message: "Settlements fetched successfully.",
				data: allSettlements,
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

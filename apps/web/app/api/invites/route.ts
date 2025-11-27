import { getPendingInvitesForUser } from "@repo/core";
import { NextRequest, NextResponse } from "next/server";

// Get pending invites for current user
export async function GET(req: NextRequest) {
	try {
		const userId = req.headers.get("x-user-id") || "";
		if (!userId) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 }
			);
		}
		const email = req.headers.get("x-user-email") || "";
        if (!email) {
			return NextResponse.json(
				{ success: false, error: "Email not set in headers" },
				{ status: 400 }
			);
		}
		const results = await getPendingInvitesForUser(email);
		return NextResponse.json({
			success: true,
			data: results,
		});
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

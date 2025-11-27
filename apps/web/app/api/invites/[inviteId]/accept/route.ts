import { acceptInvite, getInviteDetails } from "@repo/core";
import { NextRequest, NextResponse } from "next/server";

// Accept invite
export async function POST(
	req: NextRequest,
	{
		params,
	}: {
		params: Promise<{ inviteId: string }>;
	}
) {
	try {
		const userId = req.headers.get("x-user-id") || "";
		if (!userId) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 }
			);
		}
		const inviteId = (await params).inviteId;
		const result = await acceptInvite(userId, inviteId);
		return NextResponse.json(
			{
				success: true,
				message: "Invite accepted successfully",
				data: result,
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

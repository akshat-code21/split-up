import { getInviteDetails } from "@repo/core";
import { NextResponse } from "next/server";

// Get invite details
export async function GET({
	params,
}: {
	params: Promise<{ inviteId: string }>;
}) {
	try {
		const inviteId = (await params).inviteId;
		const result = await getInviteDetails(inviteId);
		return NextResponse.json(
			{
				success: true,
				message: "Invite details fetched successfully",
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

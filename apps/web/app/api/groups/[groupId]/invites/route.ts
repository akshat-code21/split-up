import {
	getPendingInvitesForGroup,
	sendGroupInvite,
	sendInviteSchema,
} from "@repo/core";
import { NextRequest, NextResponse } from "next/server";

// get pending invites of a group
export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ groupId: string }> }
) {
	try {
		const userId = req.headers.get("x-user-id") || "";
		if (!userId) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 }
			);
		}
		const groupId = (await params).groupId;
		const result = await getPendingInvitesForGroup(groupId);
		return NextResponse.json(
			{
				success: true,
				message: "Pending invites fetched successfully",
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

// send invite
export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ groupId: string }> }
) {
	try {
		const userId = req.headers.get("x-user-id") || "";
		if (!userId) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 }
			);
		}
		const groupId = (await params).groupId;
		const rawBody = await req.json();
		const parsedBody = sendInviteSchema.parse(rawBody);
		const finalData = { ...parsedBody, groupId };
		const result = await sendGroupInvite(userId, finalData);
		return NextResponse.json(
			{
				success: true,
				message: "Invite sent successfully.",
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

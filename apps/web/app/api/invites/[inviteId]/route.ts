import { getInviteDetails } from "@repo/core";
import { NextRequest, NextResponse } from "next/server";

// Get invite details
export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ inviteId: string }> }
) {
	try {
		const inviteId = (await params).inviteId;
		const result = await getInviteDetails(inviteId);
        // TODO: solve this type issue !
        // @ts-ignore
		if (result && result.errorCode === 419) {
			return NextResponse.json(
				{
					success: false,
					message: "Invite has expired",
					inviteExpired: true,
				},
				{ status: 419 }
			);
		}
        // @ts-ignore
		if (result && result.errorCode === 404) {
			return NextResponse.json(
				{
					success: false,
					message: "Invite doesn't exist",
					inviteExpired: true,
				},
				{ status: 404 }
			);
		}
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

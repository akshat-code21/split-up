import { getGroupDetails } from "@repo/core";
import { NextRequest, NextResponse } from "next/server";

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
		const groupDetails = await getGroupDetails(
			groupId as string,
			userId as string
		);
		return NextResponse.json({ groupDetails }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				message: error instanceof Error ? error.message : "Unexpected error",
			},
			{ status: 500 }
		);
	}
}

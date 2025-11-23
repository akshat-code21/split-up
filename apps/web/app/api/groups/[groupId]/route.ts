import { getGroupDetails } from "@repo/core";
import { auth } from "app/(auth)/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	_req: NextRequest,
	{ params }: { params: { groupId: string } }
) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const userId = session.user.id;
		const groupId = params.groupId;
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

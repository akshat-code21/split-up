import { addMember, addMemberSchema } from "@repo/core";
import { auth } from "app/(auth)/auth";
import { NextRequest, NextResponse } from "next/server";

// add a member to group
export async function POST(
	req: NextRequest,
	{ params }: { params: { groupId: string } }
) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 }
			);
		}
		const requesterId = session.user.id;
		const groupId = params.groupId;
		const rawBody = await req.json();
		const parsed = addMemberSchema.parse(rawBody);
		const finalData = { ...parsed, groupId };
		const result = await addMember(requesterId, finalData);
		return NextResponse.json(
			{
				success: true,
				message: "Member added successfully.",
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

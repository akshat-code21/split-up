import { addMember, addMemberSchema } from "@repo/core";
import { auth } from "app/(auth)/auth";
import { NextRequest, NextResponse } from "next/server";

// add a member to group
export async function POST(
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
		const requesterId = userId;
		const groupId = (await params).groupId;
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

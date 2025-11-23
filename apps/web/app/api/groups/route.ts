import { NextRequest, NextResponse } from "next/server";
import { createGroup, createGroupSchema, getGroupsForUser } from "@repo/core";
import { auth } from "app/(auth)/auth";

// create a group
export async function POST(req: NextRequest) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 }
			);
		}
		const userId = session.user.id;
		const rawBody = await req.json();
		const body = createGroupSchema.parse(rawBody);
		const group = await createGroup(userId as string, body);
		return NextResponse.json(
			{
				success: true,
				data: group,
				message: "Group created successfully",
			},
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json({
			message: error,
		});
	}
}

// get groups of a user
export async function GET(req: NextRequest) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 }
			);
		}
		const userId = session.user.id;
		const groups = await getGroupsForUser(userId as string);
		return NextResponse.json(
			{
				success: true,
				data: groups,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({
			message: error,
		});
	}
}

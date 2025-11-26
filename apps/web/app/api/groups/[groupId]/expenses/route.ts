import {
	createExpense,
	createExpenseSchema,
	getExpensesForGroup,
} from "@repo/core";
import { auth } from "app/(auth)/auth";
import { NextRequest, NextResponse } from "next/server";

// create an expense
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
		const rawBody = await req.json();
		const parsedBody = createExpenseSchema.parse(rawBody);
		const finalData = {
			...parsedBody,
			groupId: (await params).groupId,
		};
		const expense = await createExpense(requesterId as string, finalData);
		return NextResponse.json(
			{
				success: true,
				message: "Expense created",
				data: expense,
			},
			{
				status: 200,
			}
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

// get all expenses in a group
export async function GET(
	_req: NextRequest,
	{ params }: { params: { groupId: string } }
) {
	try {
		const session = await auth();
		if (!session || !session.user) {
			return NextResponse.json(
				{
					message: "User not found",
				},
				{
					status: 401,
				}
			);
		}
		const userId = session.user.id;
		const groupId = params.groupId;
		const expenses = await getExpensesForGroup(groupId as string, userId as string);
		return NextResponse.json(
			{
				success: true,
				data: expenses,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: error,
			},
			{
				status: 500,
			}
		);
	}
}

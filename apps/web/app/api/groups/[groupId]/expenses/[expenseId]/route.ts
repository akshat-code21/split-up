import { deleteExpense, updateExpense, updateExpenseSchema } from "@repo/core";
import { auth } from "app/(auth)/auth";
import { NextRequest, NextResponse } from "next/server";

// update an expense
export async function PATCH(
	req: NextRequest,
	{
		params,
	}: {
		params: { expenseId: string };
	}
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
        const expenseId = params.expenseId;
		const userId = session.user.id;
        const rawBody = await req.json();
		const parsedBody = updateExpenseSchema.parse(rawBody);
        const finalData = {
            ...parsedBody,
            expenseId
        }
		const expense = updateExpense(userId as string, finalData);
		return NextResponse.json(
			{
				message: "Expense Updated",
				expense,
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

// delete an expense
export async function DELETE(
	req: NextRequest,
	{
		params,
	}: {
		params: { expenseId: string };
	}
) {
	try {
		const session = await auth();
		if (!session || !session.user) {
			return NextResponse.json({
				message: "User not found",
			});
		}
		const userId = session.user.id;
		const { expenseId } = params;
		const expense = await deleteExpense(userId as string, expenseId as string);
		return NextResponse.json({
			message: "Expense Deleted successfully",
			expense,
		});
	} catch (error) {
		return NextResponse.json({
			message: error,
		});
	}
}

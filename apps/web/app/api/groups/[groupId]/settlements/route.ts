import { createSettlement, createSettlementSchema } from "@repo/core";
import { auth } from "app/(auth)/auth";
import { NextRequest, NextResponse } from "next/server";

// create a settlement expense
export async function POST(
	req: NextRequest,
	{ params }: { params: { groupId: string } }
) {
	try {
		const session = await auth();
		if (!session || !session.user) {
			return NextResponse.json({
				message: "User not found",
			});
		}
		const userId = session.user.id;
		const rawBody = await req.json();
		const parsedBody = createSettlementSchema.parse(rawBody);
		const finalData = {
			...parsedBody,
			groupId: params.groupId,
		};
		const settlement = await createSettlement(userId as string, finalData);
		return NextResponse.json(
			{
				success: true,
				message: "Settlement created successfully",
				data: settlement,
			},
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json({
			message: error,
		});
	}
}

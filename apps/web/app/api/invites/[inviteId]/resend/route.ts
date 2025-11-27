import { acceptInvite, cancelInvite, getInviteDetails, rejectInvite, resendInviteEmail } from "@repo/core";
import { NextRequest, NextResponse } from "next/server";

// Resend invite
export async function POST(
    req: NextRequest,
    {
        params,
    }: {
        params: Promise<{ inviteId: string }>;
    }
) {
    try {
        const userId = req.headers.get("x-user-id") || "";
        if (!userId) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }
        const inviteId = (await params).inviteId;
        const result = await resendInviteEmail(userId, inviteId);
        return NextResponse.json({
            result,
            status: 200,
            message: "Invite resent successfully",
        });
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


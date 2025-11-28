"use client"

import * as React from "react"
import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Users, CheckCircle2, AlertTriangle, Loader2, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios, { AxiosError } from "axios"
import { SessionProvider, useSession } from "next-auth/react"

type InviteState = "loading" | "valid" | "accepted" | "expired" | "error"

interface InviteDetails {
    inviterName: string
    inviterAvatar?: string
    groupName: string
    groupId: string
}

function InviteContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const inviteId = searchParams.get("token")

    const { data: session, status } = useSession();

    const [state, setState] = React.useState<InviteState>("loading")
    const [isAccepting, setIsAccepting] = React.useState(false)
    const [inviteDetails, setInviteDetails] = React.useState<InviteDetails | null>(null)

    React.useEffect(() => {
        const fetchInvite = async () => {
            if (!inviteId) {
                setState("error")
                return
            }
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/invites/${inviteId}`)
                setInviteDetails(res.data.data)
                setState("valid")
            } catch (error: any) {
                if (error.status === 419) {
                    setState("expired")
                    return;
                }
                if (error.status === 404) {
                    setState("error")
                    return;
                }
                setState("error")
                console.error("Failed to fetch invite:", error)
            }
        }

        fetchInvite()
    }, [inviteId])

    const handleAccept = async () => {
        if (!session?.user?.id) {
            setState("error");
            return;
        }
        try {
            setIsAccepting(true);
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/invites/${inviteId}/accept`,
                {},
                {
                    headers: {
                        "x-user-id": session.user.id
                    }
                }
            );
            setState("accepted");
        } catch (error) {
            console.error("Failed to accept invite:", error);
            setState("error");
        } finally {
            setIsAccepting(false);
        }
    }

    const handleReject = () => {
        router.push("/")
    }

    const handleGoToGroup = () => {
        if (inviteDetails) {
            router.push(`/dashboard/groups/${inviteDetails.groupId}`)
        }
    }

    return (
        <CardContent className="p-8 text-center relative z-10">
            {/* Loading State */}
            {state === "loading" && (
                <div className="py-12 space-y-4 animate-in fade-in duration-300">
                    <Loader2 className="h-12 w-12 mx-auto text-primary animate-spin" />
                    <p className="text-muted-foreground">Verifying invite...</p>
                </div>
            )}

            {/* Valid Invite State */}
            {state === "valid" && inviteDetails && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="h-16 w-16 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <Users className="h-8 w-8 text-primary" />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                            <Avatar className="h-8 w-8 border border-white/10">
                                <AvatarImage src={inviteDetails.inviterAvatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-primary/20 text-primary text-xs">
                                    {inviteDetails.inviterName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                                <span className="text-white font-medium">{inviteDetails.inviterName}</span> invited you
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold font-heading text-white">Join {inviteDetails.groupName}</h1>
                        <p className="text-sm text-muted-foreground">
                            Accept this invite to start splitting expenses with the group.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                        <Button
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base"
                            onClick={handleAccept}
                            disabled={isAccepting}
                        >
                            {isAccepting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Joining...
                                </>
                            ) : (
                                "Accept Invite"
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full text-muted-foreground hover:text-white hover:bg-white/5"
                            onClick={handleReject}
                            disabled={isAccepting}
                        >
                            Decline
                        </Button>
                    </div>
                </div>
            )}

            {/* Accepted State */}
            {state === "accepted" && inviteDetails && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="h-20 w-20 mx-auto rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10 text-green-500" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold font-heading text-white">You're in!</h1>
                        <p className="text-muted-foreground">
                            You have joined <span className="text-white">{inviteDetails.groupName}</span>
                        </p>
                    </div>

                    <Button
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base"
                        onClick={handleGoToGroup}
                    >
                        Go to Group
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )}

            {/* Expired State */}
            {state === "expired" && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="h-20 w-20 mx-auto rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                        <AlertTriangle className="h-10 w-10 text-yellow-500" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold font-heading text-white">Invite Expired</h1>
                        <p className="text-muted-foreground">
                            This invite link has expired. Please request a new invite from the group admin.
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full border-white/10 hover:bg-white/5 h-12 bg-transparent"
                        onClick={() => router.push("/dashboard")}
                    >
                        Back to Dashboard
                    </Button>
                </div>
            )}

            {/* Error State */}
            {state === "error" && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="h-20 w-20 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <AlertTriangle className="h-10 w-10 text-red-500" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold font-heading text-white">Invalid Invite</h1>
                        <p className="text-muted-foreground">
                            This invite link is invalid or has already been used. Please request a new invite.
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full border-white/10 hover:bg-white/5 h-12 bg-transparent"
                        onClick={() => router.push("/dashboard")}
                    >
                        Back to Dashboard
                    </Button>
                </div>
            )}
        </CardContent>
    )
}

function InviteLoadingFallback() {
    return (
        <CardContent className="p-8 text-center relative z-10">
            <div className="py-12 space-y-4 animate-in fade-in duration-300">
                <Loader2 className="h-12 w-12 mx-auto text-primary animate-spin" />
                <p className="text-muted-foreground">Loading...</p>
            </div>
        </CardContent>
    )
}

export default function InvitePage() {
    return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "64px 64px",
                }}
            />

            <Card className="w-full max-w-md bg-black/40 border border-white/10 backdrop-blur-md rounded-3xl relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

                <Suspense fallback={<InviteLoadingFallback />}>
                    <SessionProvider>
                        <InviteContent />
                    </SessionProvider>
                </Suspense>
            </Card>
        </div>
    )
}

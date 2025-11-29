"use client"

import * as React from "react"
import { UserPlus, Mail, Send, Loader2 } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import axios from "axios"

interface InviteMemberCardProps {
    onCancel?: () => void
    onInvite?: (email: string) => Promise<void>
    groupName?: string
    className?: string
    groupId?: string
    userId?: string
    onSuccess?: () => void
}

export function InviteMemberCard({ onCancel, onInvite, onSuccess, groupName = "this group", className, groupId, userId }: InviteMemberCardProps) {
    const [email, setEmail] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [success, setSuccess] = React.useState(false)

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const handleSubmit = async () => {
        setError(null)

        if (!email.trim()) {
            setError("Please enter an email address")
            return
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address")
            return
        }

        setIsLoading(true)
        try {
            if (groupId && userId) {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/groups/${groupId}/invites`,
                    { email },
                    {
                        headers: {
                            "x-user-id": userId,
                        },
                    }
                )

                if (!res.data.success) {
                    throw new Error(res.data.error || "Failed to send invite")
                }
            } else if (onInvite) {
                await onInvite(email)
            } else {
                throw new Error("Missing groupId or userId")
            }

            setSuccess(true)
            onSuccess?.()
            setTimeout(() => {
                setSuccess(false)
                setEmail("")
                onCancel?.()
            }, 2000)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.error || error.message || "Failed to send invite. Please try again."
                setError(errorMessage)
            } else {
                setError(error instanceof Error ? error.message : "Failed to send invite. Please try again.")
            }
        } finally {
            setIsLoading(false)
        }
    }
    

    return (
        <Card className={cn("w-full max-w-md bg-[#09090b] relative overflow-hidden group", className)}>
            {/* Glow effects */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/30 transition-all duration-500" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />

            <CardHeader className="p-6 pb-2 relative z-10">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-bold font-heading tracking-tight flex items-center gap-2">
                            Invite Member
                        </CardTitle>
                        <CardDescription className="text-muted-foreground/80 text-sm">
                            Invite someone to join {groupName}
                        </CardDescription>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <UserPlus className="h-5 w-5 text-primary" />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6 relative z-10">
                {success ? (
                    <div className="py-8 text-center space-y-3 animate-in fade-in zoom-in duration-300">
                        <div className="h-16 w-16 mx-auto rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                            <Send className="h-8 w-8 text-green-500" />
                        </div>
                        <p className="text-lg font-medium text-white">Invite Sent!</p>
                        <p className="text-sm text-muted-foreground">They will receive an email shortly.</p>
                    </div>
                ) : (
                    <>
                        {/* Email Input */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Email Address
                            </Label>
                            <div className="relative group/input">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="friend@example.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        setError(null)
                                    }}
                                    className={cn(
                                        "pl-10 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 placeholder:text-white/20 transition-all",
                                        error && "border-red-500/50 focus:border-red-500/50",
                                    )}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                />
                            </div>
                            {error && (
                                <p className="text-xs text-red-400 animate-in fade-in slide-in-from-top-1 duration-200">{error}</p>
                            )}
                        </div>

                        {/* Helper text */}
                        <div className="bg-white/5 rounded-lg border border-white/5 p-4">
                            <p className="text-sm text-muted-foreground">
                                They will receive an email invitation to join this group. Once they accept, they can view and add
                                expenses.
                            </p>
                        </div>
                    </>
                )}
            </CardContent>

            {!success && (
                <CardFooter className="p-6 pt-2 top-6 flex flex-col sm:flex-row gap-3 relative z-10">
                    <Button
                        variant="ghost"
                        onClick={onCancel}
                        className="w-full sm:w-auto order-2 sm:order-1 hover:bg-white/5 hover:text-white text-muted-foreground"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="w-full sm:flex-1 order-1 sm:order-2 bg-primary text-primary-foreground hover:bg-primary/90 border-0"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 h-4 w-4" />
                                Send Invite
                            </>
                        )}
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}

"use client"
import { useRouter } from "next/navigation"
import { ArrowLeft, Settings, UserPlus, PlusCircle, Users, Receipt, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FadeIn } from "@repo/ui/motion"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useState } from "react"
import type { InviteStatus, User } from "@repo/core"
import { AvatarImage } from "@radix-ui/react-avatar"
import { AddExpenseCard } from "../dashboard/AddExpenseCard"
import { InviteMemberCard } from "../dashboard/InviteMemberCard"
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import groupApi from "@/apiClient/group"
import GroupSkeleton from "./GroupSkeleton"

const formatDateHumanReadable = (date: Date): string => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    let hours = date.getHours()
    let minutes: string | number = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;

    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate())

    if (dateOnly.getTime() === todayOnly.getTime()) {
        return `Today, ${strTime}`
    } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
        return `Yesterday, ${strTime}`
    }

    const daysAgo = Math.floor((todayOnly.getTime() - dateOnly.getTime()) / (1000 * 60 * 60 * 24))
    if (daysAgo > 0 && daysAgo < 7) {
        return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago, ${strTime}`
    }

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined, hour12: true })
}

export type GroupResult = {
    id: string;
    name: string;
    icon: string | React.ReactNode;
    description?: string;
    color?: string;
    members: User[];
    expenses: Expense[];
    balances: Balance[];
    totalExpenses: number
}

type GroupRes = {
    id: string;
    name: string;
    expenses: Expense[];
    members: User[];
    totalExpenses: number;
    description?: string;
}

type PendingMembers = {
    email: string,
    inviteId: string;
    invitedAt: Date;
    status: InviteStatus
}

type Participant = {
    id: string;
    expenseId: string;
    userId: string;
    share: number
}

type Payer = {
    id: string;
    name: string;
    email: string;
    emailVerified?: string | null;
    image: string;
    createdAt: Date;
    updatedAt: string
}

export type Expense = {
    id: string
    groupId: string;
    payer: Payer;
    amount: number;
    description: string
    type: "NORMAL" | "SETTLEMENT"
    date: Date
    participants: Participant[]
}

type Balance = {
    name: string;
    userId: string
    numberBalance: number;
}

// TODO: create and add types of expense and balances

export default function GroupPage({ userId, groupId }: { userId: string, groupId: string }) {
    const queryClient = useQueryClient();
    const router = useRouter()
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState<boolean>(false);
    const [isAddMemberOpen, setIsAddMemberOpen] = useState<boolean>(false);
    const { data: groupData, isLoading: groupLoading, error: groupError } = useQuery({
        queryKey: ['group', groupId],
        queryFn: () => groupApi.getGroupDetails(groupId, userId),
        enabled: !!groupId && !!userId,
    })

    const { data: pendingMembers = [], isLoading: pendingMembersLoading, error: pendingMembersError } = useQuery({
        queryKey: ['pendingMembers', groupId],
        queryFn: () => groupApi.getPendingMembers(groupId, userId),
        enabled: !!groupId && !!userId,
    })

    const { data: balances = [], isLoading: balancesLoading, error: balancesError } = useQuery({
        queryKey: ['balances', groupId],
        queryFn: () => groupApi.getBalances(groupId, userId),
        enabled: !!groupId && !!userId,
    })

    const normalizeGroup = (group: GroupRes) => {
        const newGroup = {
            ...group,
            icon: <Receipt className="size-8" />,
            color: "from-blue-500 to-cyan-500",
            balances: []
        }
        return newGroup;
    }

    const group = groupData ? normalizeGroup(groupData) : null;
    const others = Array.isArray(balances) ? balances.filter((b: User) => b.userId !== userId) : [];
    const uiBalances = others.map((o: Balance) => {
        if (o.numberBalance < 0) {
            return {
                name: o.name,
                amount: Math.abs(o.numberBalance),
                direction: "owes-you"
            }
        } else {
            return {
                name: o.name,
                amount: o.numberBalance,
                direction: "you-owe"
            }
        }
    })

    if (groupLoading) return <GroupSkeleton />

    if (groupError || !group) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Card className="border-white/10 bg-card/40 backdrop-blur-sm max-w-md">
                    <CardContent className="pt-6 text-center">
                        <h2 className="font-heading text-2xl font-bold mb-2">Group Not Found</h2>
                        <p className="text-muted-foreground mb-4">This group doesn't exist or you don't have access.</p>
                        <Button onClick={() => router.push("/dashboard/groups")}>Back to Groups</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    console.log('Group Data:', groupData);
    console.log('Normalized Group:', group);
    console.log('Group Loading:', groupLoading);

    return (
        <div className="space-y-6">
            {/* Header with Back Button */}
            <FadeIn>
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push("/dashboard/groups")}
                        className="hover:bg-secondary/50"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex-1">
                        <div className="flex items-center gap-4">
                            <Avatar className={`h-16 w-16 bg-gradient-to-br ${group.color || "from-blue-500 to-cyan-500"}`}>
                                <AvatarFallback className="text-3xl bg-transparent">{group.icon}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <h1 className="font-heading text-3xl font-bold tracking-tight">{group.name || "Unnamed Group"}</h1>
                                <p className="text-muted-foreground mt-1">{group.description || ""}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="icon" className="border-white/10 hover:bg-secondary/50 bg-transparent">
                                                <UserPlus className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="p-0 border-zinc-800 bg-[#09090b] sm:max-w-md overflow-hidden">
                                            <VisuallyHidden>
                                                <DialogTitle>Add Member</DialogTitle>
                                                <DialogDescription>Add a new participant to this group.</DialogDescription>
                                            </VisuallyHidden>
                                            <InviteMemberCard
                                                className="border-0 shadow-none" groupName={group.name || "Unnamed Group"} groupId={group.id || ""} userId={userId}
                                                onCancel={() => setIsAddMemberOpen(false)}
                                                onSuccess={() => {
                                                    queryClient.invalidateQueries({ queryKey: ['group', groupId] })
                                                    queryClient.invalidateQueries({ queryKey: ['pendingMembers', groupId] })
                                                    queryClient.invalidateQueries({ queryKey: ['balances', groupId] })
                                                }} />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="text-wrap max-w-md">
                                <p className="text-wrap">Add a Member by inviting them</p>
                            </TooltipContent>
                        </Tooltip>
                        <Button variant="outline" size="icon" className="border-white/10 hover:bg-secondary/50 bg-transparent">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </FadeIn >

            {/* Summary Cards */}
            < FadeIn delay={0.1} >
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-white/10 bg-card/40 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                            <CardDescription className="flex items-center gap-2 text-xs uppercase tracking-wide">
                                <Receipt className="h-4 w-4" />
                                Total Spent
                            </CardDescription>
                            <CardTitle className="font-heading text-3xl">₹{(group.totalExpenses || 0).toLocaleString()}</CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className="border-white/10 bg-card/40 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                            <CardDescription className="flex items-center gap-2 text-xs uppercase tracking-wide">
                                <Users className="h-4 w-4" />
                                Members
                            </CardDescription>
                            <CardTitle className="font-heading text-3xl">{(group.members || []).length}</CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className="border-white/10 bg-card/40 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                            <CardDescription className="flex items-center gap-2 text-xs uppercase tracking-wide">
                                <TrendingUp className="h-4 w-4" />
                                Expenses
                            </CardDescription>
                            <CardTitle className="font-heading text-3xl">{(group.expenses || []).length}</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </FadeIn >

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Recent Expenses */}
                <FadeIn delay={0.2} className="lg:col-span-2">
                    <Card className="border-white/10 bg-card/40 backdrop-blur-sm">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="font-heading text-xl">Recent Expenses</CardTitle>
                                    <CardDescription className="mt-1">Latest transactions in this group</CardDescription>
                                </div>

                                <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)] bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Add Expense
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="p-0 border-zinc-800 bg-[#09090b] sm:max-w-md overflow-hidden">
                                        <DialogTitle className="sr-only">Add Expense</DialogTitle>
                                        <DialogDescription className="sr-only">Fill out the form to add a new expense.</DialogDescription>
                                        <AddExpenseCard
                                            userId={userId}
                                            groupDetails={group}
                                            onCancel={() => setIsAddExpenseOpen(false)}
                                            onSuccess={() => {
                                                setIsAddExpenseOpen(false)
                                                queryClient.invalidateQueries({ queryKey: ['group', groupId] })
                                                queryClient.invalidateQueries({ queryKey: ['pendingMembers', groupId] })
                                                queryClient.invalidateQueries({ queryKey: ['balances', groupId] })
                                            }}
                                            className="border-0 shadow-none"
                                        />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {(group.expenses || []).map((expense: Expense, index: number) => (
                                    <div key={expense.id}>
                                        {index > 0 && <Separator className="bg-white/10" />}
                                        <div className="flex items-start justify-between py-3">
                                            <div className="space-y-1 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-medium">{expense.description}</h4>
                                                    <Badge variant="secondary" className="text-xs">
                                                        Split {expense?.participants?.length} ways
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Paid by <span className="text-foreground font-medium">{expense.payer.name}</span> • {formatDateHumanReadable(new Date(expense.date))}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-heading text-xl font-semibold">₹{expense.amount.toLocaleString()}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {/* ₹{(expense.amount / expense.splitBetween).toFixed(2)} each */}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </FadeIn>

                {/* Members & Balances */}
                <div className="space-y-6">
                    {/* Members List */}
                    <FadeIn delay={0.3}>
                        <Card className="border-white/10 bg-card/40 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="font-heading text-xl">Members</CardTitle>
                                <CardDescription>People in this group</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {(group.members || []).map((member: any) => (
                                        <div key={member.name} className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 bg-gradient-to-br from-primary/20 to-primary/10">
                                                <AvatarImage src={`${member.image}`} alt="User" />
                                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate">{member.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {pendingMembers && pendingMembers.length > 0 && pendingMembers.map((member: PendingMembers) => {
                                        return <div key={member.email} className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 bg-gradient-to-br from-primary/20 to-primary/10">
                                                <AvatarImage src={`placeholder.svg`} alt="User" />
                                                <AvatarFallback>{"U"}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate flex flex-row gap-2">{"New User"} <span className="text-yellow-500">(Invited)</span></p>
                                                <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>

                    {/* Balances */}
                    <FadeIn delay={0.4}>
                        <Card className="border-white/10 bg-card/40 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="font-heading text-xl">Balances</CardTitle>
                                <CardDescription>Who owes whom</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {uiBalances.map((item: any) => (
                                        <div key={item.name} className="flex justify-between py-2">
                                            <span>
                                                <span className="font-medium">{item.name}</span>{" "}
                                                {item.direction === "owes-you" ? "owes you" : "you owe"}
                                            </span>

                                            <span
                                                className={item.amount !== 0 ? item.direction === "owes-you" ? "text-green-500" : "text-orange-500" : "text-white"}
                                            >
                                                ₹{item.amount.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>
            </div>
        </div >
    )
}

"use client"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Settings, UserPlus, PlusCircle, Users, Receipt, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FadeIn } from "@repo/ui/motion"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import AddMemberCard from "@/components/dashboard/AddMemberCard"

// Mock data - replace with actual API call
const mockGroupData: Record<string, any> = {
    "1": {
        id: "1",
        name: "Weekend Trip",
        icon: "🏖️",
        description: "Our amazing beach vacation expenses",
        color: "from-blue-500 to-cyan-500",
        members: [
            { id: "1", name: "You", email: "you@example.com", avatar: "👤" },
            { id: "2", name: "Rohan", email: "rohan@example.com", avatar: "R" },
            { id: "3", name: "Aditi", email: "aditi@example.com", avatar: "A" },
            { id: "4", name: "Vikram", email: "vikram@example.com", avatar: "V" },
        ],
        expenses: [
            {
                id: "1",
                description: "Hotel Booking",
                amount: 12000,
                paidBy: "You",
                date: "Today, 3:30 PM",
                splitBetween: 4,
            },
            {
                id: "2",
                description: "Dinner at Beach Shack",
                amount: 2400,
                paidBy: "Rohan",
                date: "Yesterday, 8:45 PM",
                splitBetween: 4,
            },
            {
                id: "3",
                description: "Scuba Diving",
                amount: 8000,
                paidBy: "You",
                date: "Oct 24, 2023",
                splitBetween: 3,
            },
        ],
        balances: [
            { name: "Rohan", amount: 2400, type: "owes" },
            { name: "Aditi", amount: 5000, type: "owes" },
            { name: "Vikram", amount: 3000, type: "owed" },
        ],
    },
}

export default function GroupPage() {
    const params = useParams()
    const router = useRouter()
    const groupId = params.groupId as string
    const group = mockGroupData[groupId]

    if (!group) {
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

    const totalExpenses = group.expenses.reduce((sum: number, exp: any) => sum + exp.amount, 0)

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
                            <Avatar className={`h-16 w-16 bg-gradient-to-br ${group.color}`}>
                                <AvatarFallback className="text-3xl bg-transparent">{group.icon}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <h1 className="font-heading text-3xl font-bold tracking-tight">{group.name}</h1>
                                <p className="text-muted-foreground mt-1">{group.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="icon" className="border-white/10 hover:bg-secondary/50 bg-transparent">
                                    <UserPlus className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#09090b] border-white/10 sm:max-w-md p-6">
                                <VisuallyHidden>
                                    <DialogTitle>Add Member</DialogTitle>
                                    <DialogDescription>Add a new participant to this group.</DialogDescription>
                                </VisuallyHidden>
                                <AddMemberCard />
                            </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="icon" className="border-white/10 hover:bg-secondary/50 bg-transparent">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </FadeIn>

            {/* Summary Cards */}
            <FadeIn delay={0.1}>
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-white/10 bg-card/40 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                            <CardDescription className="flex items-center gap-2 text-xs uppercase tracking-wide">
                                <Receipt className="h-4 w-4" />
                                Total Spent
                            </CardDescription>
                            <CardTitle className="font-heading text-3xl">₹{totalExpenses.toLocaleString()}</CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className="border-white/10 bg-card/40 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                            <CardDescription className="flex items-center gap-2 text-xs uppercase tracking-wide">
                                <Users className="h-4 w-4" />
                                Members
                            </CardDescription>
                            <CardTitle className="font-heading text-3xl">{group.members.length}</CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className="border-white/10 bg-card/40 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                            <CardDescription className="flex items-center gap-2 text-xs uppercase tracking-wide">
                                <TrendingUp className="h-4 w-4" />
                                Expenses
                            </CardDescription>
                            <CardTitle className="font-heading text-3xl">{group.expenses.length}</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </FadeIn>

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
                                <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Expense
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {group.expenses.map((expense: any, index: number) => (
                                    <div key={expense.id}>
                                        {index > 0 && <Separator className="bg-white/10" />}
                                        <div className="flex items-start justify-between py-3">
                                            <div className="space-y-1 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-medium">{expense.description}</h4>
                                                    <Badge variant="secondary" className="text-xs">
                                                        Split {expense.splitBetween} ways
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Paid by <span className="text-foreground font-medium">{expense.paidBy}</span> • {expense.date}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-heading text-xl font-semibold">₹{expense.amount.toLocaleString()}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    ₹{(expense.amount / expense.splitBetween).toFixed(2)} each
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
                                    {group.members.map((member: any) => (
                                        <div key={member.id} className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 bg-gradient-to-br from-primary/20 to-primary/10">
                                                <AvatarFallback className="text-sm">{member.avatar}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate">{member.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                                            </div>
                                        </div>
                                    ))}
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
                                    {group.balances.map((balance: any, index: number) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <p className="text-sm">
                                                <span className="font-medium">{balance.name}</span>
                                                <span className="text-muted-foreground mx-1">
                                                    {balance.type === "owes" ? "owes you" : "you owe"}
                                                </span>
                                            </p>
                                            <p
                                                className={`font-heading text-lg font-semibold ${balance.type === "owes" ? "text-green-500" : "text-orange-500"
                                                    }`}
                                            >
                                                ₹{balance.amount.toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}

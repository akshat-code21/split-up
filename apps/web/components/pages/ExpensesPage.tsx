"use client"

import { useState } from "react"
import { Search, ReceiptText, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { FadeIn, FadeInStagger, FadeInItem } from "@repo/ui/motion"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { AddExpenseCard } from "@/components/dashboard/AddExpenseCard"
import { ExpenseItem } from "@/components/dashboard/ExpenseItem"
import { ExpensesFilterBar } from "@/components/dashboard/ExpensesFilterBar"
import { AllExpensesForUser } from "@repo/core"

// Mock data - replace with actual API call
const mockExpenses = [
    {
        id: "1",
        description: "Hotel Booking",
        amount: 12000,
        paidBy: "You",
        paidById: "you",
        date: "Today, 3:30 PM",
        category: "accommodation",
        groupName: "Weekend Trip",
        splitBetween: 4,
        yourShare: 3000,
        status: "lent" as const,
        splitMethod: "equal" as const,
    },
    {
        id: "2",
        description: "Dinner at Beach Shack",
        amount: 2400,
        paidBy: "Rohan",
        paidById: "rohan",
        date: "Yesterday, 8:45 PM",
        category: "food",
        groupName: "Weekend Trip",
        splitBetween: 4,
        yourShare: 600,
        status: "borrowed" as const,
        splitMethod: "equal" as const,
    },
    {
        id: "3",
        description: "Scuba Diving Adventure",
        amount: 8000,
        paidBy: "You",
        paidById: "you",
        date: "Jan 22, 2025",
        category: "entertainment",
        groupName: "Goa Trip",
        splitBetween: 3,
        yourShare: 2666.67,
        status: "lent" as const,
        splitMethod: "equal" as const,
    },
    {
        id: "4",
        description: "Taxi to Airport",
        amount: 1200,
        paidBy: "Aditi",
        paidById: "aditi",
        date: "Jan 20, 2025",
        category: "transport",
        groupName: "Goa Trip",
        splitBetween: 4,
        yourShare: 300,
        status: "borrowed" as const,
        splitMethod: "equal" as const,
    },
    {
        id: "5",
        description: "Groceries for BBQ",
        amount: 3500,
        paidBy: "You",
        paidById: "you",
        date: "Jan 18, 2025",
        category: "food",
        groupName: "Home Expenses",
        splitBetween: 4,
        yourShare: 875,
        status: "lent" as const,
        splitMethod: "custom" as const,
    },
]

export default function ExpensesPage({ userId, expensesData }: { userId: string, expensesData: AllExpensesForUser[] }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)
    const [dateFilter, setDateFilter] = useState("all")
    const [sortFilter, setSortFilter] = useState("newest")
    const [expandedExpenseId, setExpandedExpenseId] = useState<string | null>(null)

    // Filter and sort expensesData based on user selection
    // const filteredExpenses = expensesData
    //     .filter((expense) => expense.description.toLowerCase().includes(searchQuery.toLowerCase()))
    //     .sort((a, b) => {
    //         if (sortFilter === "oldest") return -1
    //         if (sortFilter === "highest") return b.amount - a.amount
    //         return 1 // newest first (default)
    //     })

    const handleToggleExpense = (expenseId: string) => {
        setExpandedExpenseId(expandedExpenseId === expenseId ? null : expenseId)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <FadeIn>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                        <h1 className="font-heading text-3xl font-bold tracking-tight">Expenses</h1>
                        <p className="text-muted-foreground text-sm mt-1">Track all your shared expensesData in one place</p>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search expenses…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 w-64 bg-secondary/30 border-white/10 focus:border-primary/50"
                            />
                        </div>

                        {/* Add Expense Button */}
                        <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Expense
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#09090b] border-white/10 sm:max-w-md p-0">
                                <VisuallyHidden>
                                    <DialogTitle>Add Expense</DialogTitle>
                                    <DialogDescription>Record a new expense for any group.</DialogDescription>
                                </VisuallyHidden>
                                <AddExpenseCard onCancel={() => setIsAddExpenseOpen(false)} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </FadeIn>

            {/* Filters */}
            <FadeIn delay={0.1}>
                <ExpensesFilterBar
                    dateFilter={dateFilter}
                    sortFilter={sortFilter}
                    onDateFilterChange={setDateFilter}
                    onSortFilterChange={setSortFilter}
                />
            </FadeIn>

            {/* Expenses List */}
            {expensesData.length > 0 ? (
                <FadeInStagger className="space-y-3">
                    {expensesData.map((expense) => (
                        <FadeInItem key={expense.id}>
                            <ExpenseItem
                            // @ts-ignore
                                expense={expense}
                                isExpanded={expandedExpenseId === expense.id}
                                onToggle={() => handleToggleExpense(expense.id)}
                            />
                        </FadeInItem>
                    ))}
                </FadeInStagger>
            ) : (
                // Empty State
                <FadeIn delay={0.2}>
                    <Card className="border-white/10 bg-card/40 backdrop-blur-sm p-12">
                        <div className="flex flex-col items-center justify-center text-center space-y-4">
                            <div className="h-20 w-20 rounded-full bg-secondary/50 flex items-center justify-center">
                                <ReceiptText className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-heading text-2xl font-bold">No expensesData yet</h3>
                                <p className="text-muted-foreground max-w-md">
                                    Add your first expense to start tracking shared costs with your groups.
                                </p>
                            </div>
                            <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
                                <DialogTrigger asChild>
                                    <Button className="mt-4 bg-primary hover:bg-primary/90">
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add Expense
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-[#09090b] border-white/10 sm:max-w-md p-0">
                                    <VisuallyHidden>
                                        <DialogTitle>Add Expense</DialogTitle>
                                        <DialogDescription>Record a new expense for any group.</DialogDescription>
                                    </VisuallyHidden>
                                    <AddExpenseCard onCancel={() => setIsAddExpenseOpen(false)} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </Card>
                </FadeIn>
            )}
        </div>
    )
}

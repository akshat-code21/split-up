"use client"

import { Search, Plus, Bell, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { AddExpenseCard } from "@/components/dashboard/AddExpenseCard"


export function Topbar({ title = "Dashboard" , userName }: { title?: string,userName?:string }) {
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)
    return (
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border/50 bg-background/50 backdrop-blur-xl px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="flex flex-1 items-center gap-4">
                    <h1 className="text-xl font-heading font-semibold text-foreground tracking-tight">Hello, {userName?.split(" ")[0]} !</h1>
                    <div className="hidden md:flex relative max-w-md flex-1 ml-8">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search expenses, friends, or groups..."
                            className="pl-10 h-9 bg-secondary/50 border-transparent focus:bg-background transition-all"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
                        <span className="sr-only">View notifications</span>
                    </Button>
                    <div className="h-6 w-px bg-border/50" aria-hidden="true" />
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
                            <AddExpenseCard onCancel={() => setIsAddExpenseOpen(false)} className="border-0 shadow-none " />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

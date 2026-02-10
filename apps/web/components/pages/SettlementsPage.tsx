"use client"

import { useState } from "react"
import { Search, ArrowRightLeft, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { FadeIn, FadeInStagger, FadeInItem } from "@repo/ui/motion"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { RecordSettlementCard } from "@/components/dashboard/RecordSettlementCard"
import { SettlementItem } from "@/components/dashboard/SettlementItem"
import { SettlementsFilterBar } from "@/components/dashboard/SettlementsFilterBar"

// Mock data - replace with actual API call
const mockSettlements = [
  {
    id: "1",
    payer: "Rohan",
    payerId: "rohan",
    payee: "You",
    payeeId: "you",
    amount: 1500,
    date: "Today, 2:15 PM",
    groupName: "Weekend Trip",
    note: "Hotel share payment",
  },
  {
    id: "2",
    payer: "You",
    payerId: "you",
    payee: "Aditi",
    payeeId: "aditi",
    amount: 850,
    date: "Yesterday, 5:30 PM",
    groupName: "Goa Trip",
    note: "Dinner settlement",
  },
  {
    id: "3",
    payer: "Vikram",
    payerId: "vikram",
    payee: "You",
    payeeId: "you",
    amount: 2200,
    date: "Jan 22, 2025",
    groupName: "Weekend Trip",
  },
  {
    id: "4",
    payer: "You",
    payerId: "you",
    payee: "Sarah",
    payeeId: "sarah",
    amount: 300,
    date: "Jan 20, 2025",
    groupName: "Home Expenses",
    note: "Groceries share",
  },
  {
    id: "5",
    payer: "Aditi",
    payerId: "aditi",
    payee: "Rohan",
    payeeId: "rohan",
    amount: 1800,
    date: "Jan 18, 2025",
    groupName: "Goa Trip",
  },
]

export default function SettlementsClientPage({settlements} : {settlements : any[]}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isRecordSettlementOpen, setIsRecordSettlementOpen] = useState(false)
  const [dateFilter, setDateFilter] = useState("all")
  const [sortFilter, setSortFilter] = useState("newest")

  // Filter and sort settlements based on user selection
  const filteredSettlements = mockSettlements
    .filter(
      (settlement) =>
        settlement.payer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        settlement.payee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        settlement.groupName?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortFilter === "oldest") return -1
      if (sortFilter === "highest") return b.amount - a.amount
      if (sortFilter === "lowest") return a.amount - b.amount
      return 1 // newest first (default)
    })

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight">Settlements</h1>
            <p className="text-muted-foreground text-sm mt-1">All payments made to settle balances</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search settlements…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64 bg-secondary/30 border-white/10 focus:border-primary/50"
              />
            </div>

            {/* Record Settlement Button */}
            <Dialog open={isRecordSettlementOpen} onOpenChange={setIsRecordSettlementOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Record Settlement
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#09090b] border-white/10 sm:max-w-md p-0">
                <VisuallyHidden>
                  <DialogTitle>Record Settlement</DialogTitle>
                  <DialogDescription>Record a payment to settle balances between members.</DialogDescription>
                </VisuallyHidden>
                <RecordSettlementCard onCancel={() => setIsRecordSettlementOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </FadeIn>

      {/* Filters */}
      <FadeIn delay={0.1}>
        <SettlementsFilterBar
          dateFilter={dateFilter}
          sortFilter={sortFilter}
          onDateFilterChange={setDateFilter}
          onSortFilterChange={setSortFilter}
        />
      </FadeIn>

      {/* Settlements List */}
      {filteredSettlements.length > 0 ? (
        <FadeInStagger className="space-y-3">
          {filteredSettlements.map((settlement) => (
            <FadeInItem key={settlement.id}>
              <SettlementItem settlement={settlement} />
            </FadeInItem>
          ))}
        </FadeInStagger>
      ) : (
        // Empty State
        <FadeIn delay={0.2}>
          <Card className="border-white/10 bg-card/40 backdrop-blur-sm p-12">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <ArrowRightLeft className="h-10 w-10 text-emerald-500" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading text-2xl font-bold">No settlements recorded</h3>
                <p className="text-muted-foreground max-w-md">
                  Record your first settlement to track payments between group members.
                </p>
              </div>
              <Dialog open={isRecordSettlementOpen} onOpenChange={setIsRecordSettlementOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-4 bg-primary hover:bg-primary/90">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Record Settlement
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#09090b] border-white/10 sm:max-w-md p-0">
                  <VisuallyHidden>
                    <DialogTitle>Record Settlement</DialogTitle>
                    <DialogDescription>Record a payment to settle balances between members.</DialogDescription>
                  </VisuallyHidden>
                  <RecordSettlementCard onCancel={() => setIsRecordSettlementOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </FadeIn>
      )}
    </div>
  )
}

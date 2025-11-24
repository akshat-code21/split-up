"use client"

import { useState } from "react"
import { HandCoins, ArrowRightLeft, PartyPopper, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { FadeIn, FadeInStagger, FadeInItem } from "@repo/ui/motion"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { RecordSettlementCard } from "@/components/dashboard/RecordSettlementCard"
import { cn } from "@/lib/utils"

// Mock data - replace with actual API call
const mockBalances = {
  totalOwed: 2850, // Total you owe others
  totalOwedToYou: 3825, // Total others owe you
  netBalance: 975, // Net balance (positive = you're owed, negative = you owe)
  people: [
    {
      id: "1",
      name: "Rohan",
      avatar: "R",
      balance: 1200, // positive = they owe you
      groupCount: 2,
      groups: ["Weekend Trip", "Home Expenses"],
    },
    {
      id: "2",
      name: "Aditi",
      avatar: "A",
      balance: -850, // negative = you owe them
      groupCount: 1,
      groups: ["Goa Trip"],
    },
    {
      id: "3",
      name: "Vikram",
      avatar: "V",
      balance: 1800,
      groupCount: 2,
      groups: ["Weekend Trip", "Office Lunch"],
    },
    {
      id: "4",
      name: "Sarah",
      avatar: "S",
      balance: -1200,
      groupCount: 1,
      groups: ["Home Expenses"],
    },
    {
      id: "5",
      name: "Priya",
      avatar: "P",
      balance: 825,
      groupCount: 1,
      groups: ["Goa Trip"],
    },
    {
      id: "6",
      name: "Arjun",
      avatar: "A",
      balance: -800,
      groupCount: 1,
      groups: ["Office Lunch"],
    },
  ],
  groups: [
    {
      id: "1",
      name: "Weekend Trip",
      emoji: "🏖️",
      totalOutstanding: 2400,
      balances: [
        { name: "Rohan", amount: 800 },
        { name: "Vikram", amount: 1600 },
      ],
    },
    {
      id: "2",
      name: "Goa Trip",
      emoji: "🌴",
      totalOutstanding: -25,
      balances: [
        { name: "Aditi", amount: -850 },
        { name: "Priya", amount: 825 },
      ],
    },
    {
      id: "3",
      name: "Home Expenses",
      emoji: "🏠",
      totalOutstanding: -800,
      balances: [
        { name: "Rohan", amount: 400 },
        { name: "Sarah", amount: -1200 },
      ],
    },
  ],
}

export default function BalancesPage() {
  const [isSettleUpOpen, setIsSettleUpOpen] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null)

  // Sort people by absolute balance amount (highest first)
  const sortedPeople = [...mockBalances.people].sort((a, b) => Math.abs(b.balance) - Math.abs(a.balance))

  const isSettled = mockBalances.netBalance === 0 && mockBalances.people.every((p) => p.balance === 0)

  const handleSettleUp = (personId?: string) => {
    setSelectedPerson(personId || null)
    setIsSettleUpOpen(true)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight">Balances Overview</h1>
            <p className="text-muted-foreground text-sm mt-1">Your total balances across all groups and people</p>
          </div>

          <Dialog open={isSettleUpOpen} onOpenChange={setIsSettleUpOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                <HandCoins className="mr-2 h-4 w-4" />
                Settle Up
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#09090b] border-white/10 sm:max-w-md p-0">
              <VisuallyHidden>
                <DialogTitle>Settle Up</DialogTitle>
                <DialogDescription>Record a payment to settle your balances.</DialogDescription>
              </VisuallyHidden>
              <RecordSettlementCard onCancel={() => setIsSettleUpOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </FadeIn>

      {!isSettled ? (
        <>
          {/* Summary Cards */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Total You Owe */}
              <Card className="border-white/10 bg-card/30 backdrop-blur-sm shadow-lg shadow-black/20">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">You Owe</p>
                  </div>
                  <p className="text-4xl font-bold font-heading text-red-500">
                    ₹{mockBalances.totalOwed.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">What you need to pay others</p>
                </CardContent>
              </Card>

              {/* Total You Are Owed */}
              <Card className="border-white/10 bg-card/30 backdrop-blur-sm shadow-lg shadow-black/20">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">You Are Owed</p>
                  </div>
                  <p className="text-4xl font-bold font-heading text-green-500">
                    ₹{mockBalances.totalOwedToYou.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">What others owe you</p>
                </CardContent>
              </Card>

              {/* Net Balance */}
              <Card className="border-white/10 bg-card/30 backdrop-blur-sm shadow-lg shadow-black/20">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <ArrowRightLeft className="h-5 w-5 text-primary mr-2" />
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Net Balance</p>
                  </div>
                  <p
                    className={cn(
                      "text-4xl font-bold font-heading",
                      mockBalances.netBalance > 0
                        ? "text-green-500"
                        : mockBalances.netBalance < 0
                          ? "text-red-500"
                          : "text-muted-foreground",
                    )}
                  >
                    {mockBalances.netBalance > 0 ? "+" : ""}₹{Math.abs(mockBalances.netBalance).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {mockBalances.netBalance > 0
                      ? "You're getting back overall"
                      : mockBalances.netBalance < 0
                        ? "You owe overall"
                        : "You're settled up"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </FadeIn>

          {/* People Balances List */}
          <FadeIn delay={0.2}>
            <div className="space-y-3">
              <h2 className="font-heading text-xl font-bold tracking-tight">Individual Balances</h2>
              <FadeInStagger className="space-y-3">
                {sortedPeople.map((person) => (
                  <FadeInItem key={person.id}>
                    <Card className="border-white/10 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-card/50 transition-all cursor-pointer group">
                      <CardContent className="px-5 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 border border-white/10">
                            <AvatarFallback className="bg-primary/10 text-primary font-heading">
                              {person.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-base">{person.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Across {person.groupCount} {person.groupCount === 1 ? "group" : "groups"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p
                              className={cn(
                                "text-lg font-bold font-heading",
                                person.balance > 0 ? "text-green-500" : "text-red-500",
                              )}
                            >
                              {person.balance > 0 ? "+" : ""}₹{Math.abs(person.balance).toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {person.balance > 0 ? "owes you" : "you owe"}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSettleUp(person.id)}
                            className="hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            <HandCoins className="h-4 w-4 mr-1.5" />
                            Settle
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeInItem>
                ))}
              </FadeInStagger>
            </div>
          </FadeIn>

          {/* Group Breakdown */}
          <FadeIn delay={0.3}>
            <div className="space-y-3">
              <h2 className="font-heading text-xl font-bold tracking-tight">Breakdown by Group</h2>
              <Accordion type="single" collapsible className="space-y-3">
                {mockBalances.groups.map((group) => (
                  <AccordionItem
                    key={group.id}
                    value={group.id}
                    className="border-white/10 bg-card/20 backdrop-blur-sm rounded-xl overflow-hidden"
                  >
                    <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-card/30 transition-colors">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center text-lg">
                            {group.emoji}
                          </div>
                          <div className="text-left">
                            <p className="font-heading font-semibold">{group.name}</p>
                            <p className="text-xs text-muted-foreground">{group.balances.length} members</p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            "font-heading",
                            group.totalOutstanding > 0
                              ? "border-green-500/30 text-green-500 bg-green-500/10"
                              : group.totalOutstanding < 0
                                ? "border-red-500/30 text-red-500 bg-red-500/10"
                                : "border-white/20 text-muted-foreground",
                          )}
                        >
                          {group.totalOutstanding > 0 ? "+" : "-"}₹{Math.abs(group.totalOutstanding).toLocaleString()}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4">
                      <Separator className="mb-3 bg-white/5" />
                      <div className="space-y-2">
                        {group.balances.map((balance, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <p className="text-sm text-muted-foreground">{balance.name}</p>
                            <p
                              className={cn(
                                "text-sm font-semibold font-heading",
                                balance.amount > 0
                                  ? "text-green-500"
                                  : balance.amount < 0
                                    ? "text-red-500"
                                    : "text-muted-foreground",
                              )}
                            >
                              {balance.amount > 0 ? "+" : "-"}₹{Math.abs(balance.amount).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </FadeIn>
        </>
      ) : (
        // Empty State - All Settled
        <FadeIn delay={0.2}>
          <Card className="border-white/10 bg-card/40 backdrop-blur-sm p-16">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <PartyPopper className="h-12 w-12 text-primary" />
                </div>
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl -z-10 animate-pulse" />
              </div>
              <div className="space-y-3">
                <h3 className="font-heading text-3xl font-bold">You're all settled!</h3>
                <p className="text-muted-foreground text-lg max-w-md">
                  No pending balances across any group. Time to create new memories!
                </p>
              </div>
              <div className="pt-4">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 bg-transparent">
                  View Groups
                </Button>
              </div>
            </div>
          </Card>
        </FadeIn>
      )}
    </div>
  )
}

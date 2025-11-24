"use client"

import * as React from "react"
import { ArrowRightLeft, IndianRupee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface RecordSettlementCardProps {
  onCancel?: () => void
  className?: string
}

// Mock data for members
const mockMembers = [
  { id: "1", name: "You", avatar: "👤" },
  { id: "2", name: "Rohan", avatar: "R" },
  { id: "3", name: "Aditi", avatar: "A" },
  { id: "4", name: "Vikram", avatar: "V" },
  { id: "5", name: "Sarah", avatar: "S" },
]

const mockGroups = [
  { id: "1", name: "Weekend Trip" },
  { id: "2", name: "Goa Trip" },
  { id: "3", name: "Home Expenses" },
]

export function RecordSettlementCard({ onCancel, className }: RecordSettlementCardProps) {
  const [amount, setAmount] = React.useState("")
  const [payer, setPayer] = React.useState("")
  const [payee, setPayee] = React.useState("")
  const [group, setGroup] = React.useState("")
  const [note, setNote] = React.useState("")

  const handleSubmit = () => {
    // Handle settlement submission
    console.log({ amount, payer, payee, group, note })
    onCancel?.()
  }

  return (
    <Card
      className={cn(
        "w-full max-h-[85vh] flex flex-col bg-[#09090b] relative overflow-hidden group border-white/10",
        className,
      )}
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/30 transition-all duration-500" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />

      <CardHeader className="p-6 pb-4 relative z-10 shrink-0">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold font-heading tracking-tight flex items-center gap-2">
              Record Settlement
            </CardTitle>
            <CardDescription className="text-muted-foreground/80 text-sm">
              Record a payment to settle balances
            </CardDescription>
          </div>
          <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <ArrowRightLeft className="h-5 w-5 text-emerald-500" />
          </div>
        </div>
      </CardHeader>

      <div className="flex-1 overflow-y-auto relative z-10">
        <CardContent className="px-6 pb-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Amount
            </Label>
            <div className="relative group/input">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-emerald-500 transition-colors">
                <IndianRupee className="h-5 w-5" />
              </div>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 h-14 text-2xl font-bold bg-white/5 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20 placeholder:text-white/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payer" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Paid by
            </Label>
            <Select value={payer} onValueChange={setPayer}>
              <SelectTrigger className="bg-white/5 border-white/10 focus:ring-emerald-500/20 h-11">
                <SelectValue placeholder="Select who paid" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-white/10 text-white">
                {mockMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payee" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Paid to
            </Label>
            <Select value={payee} onValueChange={setPayee}>
              <SelectTrigger className="bg-white/5 border-white/10 focus:ring-emerald-500/20 h-11">
                <SelectValue placeholder="Select who received" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-white/10 text-white">
                {mockMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-white/5" />

          <div className="space-y-2">
            <Label htmlFor="group" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Group (Optional)
            </Label>
            <Select value={group} onValueChange={setGroup}>
              <SelectTrigger className="bg-white/5 border-white/10 focus:ring-emerald-500/20 h-11">
                <SelectValue placeholder="Select group" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-white/10 text-white">
                {mockGroups.map((g) => (
                  <SelectItem key={g.id} value={g.id}>
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Note (Optional)
            </Label>
            <Textarea
              id="note"
              placeholder="Add any additional details..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[80px] bg-white/5 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/20 resize-none"
            />
          </div>
        </CardContent>
      </div>

      <CardFooter className="p-6 pt-4 top-6 flex flex-col sm:flex-row gap-3 relative z-10 shrink-0 border-t border-white/5 bg-[#09090b]">
        <Button
          variant="ghost"
          onClick={onCancel}
          className="w-full sm:w-auto order-2 sm:order-1 hover:bg-white/5 hover:text-white text-muted-foreground"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!amount || !payer || !payee}
          className="w-full sm:flex-1 order-1 sm:order-2 bg-emerald-500 text-white hover:bg-emerald-600 border-0"
        >
          Record Settlement
        </Button>
      </CardFooter>
    </Card>
  )
}

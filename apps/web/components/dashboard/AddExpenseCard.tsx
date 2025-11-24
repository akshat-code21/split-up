"use client"

import * as React from "react"
import { Receipt, IndianRupee } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface AddExpenseCardProps {
  onCancel?: () => void
  className?: string
}

export function AddExpenseCard({ onCancel, className }: AddExpenseCardProps) {
  const [amount, setAmount] = React.useState("")
  const [splitType, setSplitType] = React.useState("equal")
  const [splitValues, setSplitValues] = React.useState<Record<string, string>>({})

  const participants = [
    { id: "you", name: "You" },
    { id: "aditi", name: "Aditi" },
    { id: "rohan", name: "Rohan" },
    { id: "john", name: "John" },
  ]

  const [selectedParticipants, setSelectedParticipants] = React.useState<string[]>(["you", "aditi"])

  React.useEffect(() => {
    setSplitValues({})
  }, [splitType, selectedParticipants])

  const toggleParticipant = (id: string) => {
    setSelectedParticipants((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const handleSplitValueChange = (id: string, value: string) => {
    setSplitValues((prev) => ({ ...prev, [id]: value }))
  }

  const totalAmount = Number.parseFloat(amount) || 0

  const getSplitValidation = () => {
    if (splitType === "equal") return { isValid: true, message: null }

    if (splitType === "custom") {
      const currentSum = Object.values(splitValues).reduce((sum, val) => sum + (Number.parseFloat(val) || 0), 0)
      const diff = totalAmount - currentSum
      if (Math.abs(diff) < 0.01)
        return { isValid: true, message: <span className="text-green-500">Perfectly split!</span> }
      if (diff > 0)
        return { isValid: false, message: <span className="text-yellow-500">₹{diff.toFixed(2)} remaining</span> }
      return { isValid: false, message: <span className="text-red-500">Over by ₹{Math.abs(diff).toFixed(2)}</span> }
    }

    if (splitType === "percentage") {
      const currentSum = Object.values(splitValues).reduce((sum, val) => sum + (Number.parseFloat(val) || 0), 0)
      const diff = 100 - currentSum
      if (Math.abs(diff) < 0.01) return { isValid: true, message: <span className="text-green-500">Total: 100%</span> }
      if (diff > 0)
        return { isValid: false, message: <span className="text-yellow-500">{diff.toFixed(1)}% remaining</span> }
      return { isValid: false, message: <span className="text-red-500">Over by {Math.abs(diff).toFixed(1)}%</span> }
    }

    return { isValid: true, message: null }
  }

  const validation = getSplitValidation()

  return (
    <Card
      className={cn(
        "w-full max-h-[85vh] flex flex-col bg-[#09090b] relative overflow-hidden group border-white/10",
        className,
      )}
    >
      {/* Glow effects */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/30 transition-all duration-500" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />

      <CardHeader className="p-6 pb-4 relative z-10 shrink-0">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold font-heading tracking-tight flex items-center gap-2">
              Add Expense
            </CardTitle>
            <CardDescription className="text-muted-foreground/80 text-sm">Record a new group expense</CardDescription>
          </div>
          <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <Receipt className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>

      <div className="flex-1 overflow-y-auto relative z-10">
        <CardContent className="px-6 pb-4 space-y-4">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Amount
            </Label>
            <div className="relative group/input">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within/input:text-primary transition-colors">
                <IndianRupee className="h-5 w-5" />
              </div>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 h-14 text-2xl font-bold bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 placeholder:text-white/20 transition-all"
              />
            </div>
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Description
            </Label>
            <Input
              id="description"
              placeholder="e.g. Dinner at Indigo"
              className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 h-11"
            />
          </div>

          {/* Payer Selector */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Paid By</Label>
            <Select defaultValue="you">
              <SelectTrigger className="bg-white/5 border-white/10 focus:ring-primary/20 h-11">
                <SelectValue placeholder="Select payer" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-white/10 text-white">
                <SelectItem value="you">You</SelectItem>
                <SelectItem value="aditi">Aditi</SelectItem>
                <SelectItem value="rohan">Rohan</SelectItem>
                <SelectItem value="john">John</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-white/5" />

          {/* Participants */}
          <div className="space-y-3">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
              <span>For whom?</span>
              <span className="text-[10px] font-normal normal-case opacity-70">
                {selectedParticipants.length} selected
              </span>
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {participants.map((person) => (
                <div
                  key={person.id}
                  onClick={() => toggleParticipant(person.id)}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200
                    ${selectedParticipants.includes(person.id)
                      ? "bg-primary/10 border-primary/50"
                      : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                    }
                  `}
                >
                  <Checkbox
                    checked={selectedParticipants.includes(person.id)}
                    onCheckedChange={() => toggleParticipant(person.id)}
                    className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span
                    className={`text-sm ${selectedParticipants.includes(person.id) ? "text-white font-medium" : "text-muted-foreground"}`}
                  >
                    {person.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Split Type */}
          <div className="space-y-4">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Split Method</Label>
            <ToggleGroup
              type="single"
              value={splitType}
              onValueChange={(val) => val && setSplitType(val)}
              className="bg-white/5 p-1 rounded-lg border border-white/5 w-full justify-between gap-1"
            >
              <ToggleGroupItem
                value="equal"
                className="flex-1 data-[state=on]:bg-white/10 data-[state=on]:text-white text-xs text-muted-foreground hover:text-white transition-all"
              >
                = Equally
              </ToggleGroupItem>
              <ToggleGroupItem
                value="custom"
                className="flex-1 data-[state=on]:bg-white/10 data-[state=on]:text-white text-xs text-muted-foreground hover:text-white transition-all"
              >
                123 Custom
              </ToggleGroupItem>
              <ToggleGroupItem
                value="percentage"
                className="flex-1 data-[state=on]:bg-white/10 data-[state=on]:text-white text-xs text-muted-foreground hover:text-white transition-all"
              >
                % Percent
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="bg-white/5 rounded-lg border border-white/5 p-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
              {splitType === "equal" && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Amount per person</span>
                  <span className="font-bold font-mono text-primary">
                    ₹{(totalAmount / (selectedParticipants.length || 1)).toFixed(2)}
                  </span>
                </div>
              )}

              {(splitType === "custom" || splitType === "percentage") && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-medium text-muted-foreground pb-1 border-b border-white/5">
                    <span>Participant</span>
                    <span>{splitType === "custom" ? "Amount (₹)" : "Percentage (%)"}</span>
                  </div>

                  {participants
                    .filter((p) => selectedParticipants.includes(p.id))
                    .map((person) => (
                      <div key={person.id} className="flex items-center justify-between gap-4">
                        <span className="text-sm text-white/80">{person.name}</span>
                        <div className="relative w-24">
                          {splitType === "custom" && (
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                              ₹
                            </span>
                          )}
                          <Input
                            type="number"
                            value={splitValues[person.id] || ""}
                            onChange={(e) => handleSplitValueChange(person.id, e.target.value)}
                            placeholder="0"
                            className={cn(
                              "h-8 text-right bg-black/20 border-white/10 focus:border-primary/50 text-xs",
                              splitType === "custom" ? "pl-5" : "pr-6",
                            )}
                          />
                          {splitType === "percentage" && (
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                              %
                            </span>
                          )}
                        </div>
                      </div>
                    ))}

                  <div className="flex justify-between items-center pt-2 border-t border-white/10 text-xs font-medium">
                    <span>Status</span>
                    <span className="font-mono">{validation.message}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </div>

      <CardFooter className="px-6 py-4 flex flex-col sm:flex-row gap-3 relative top-6 z-10 shrink-0 border-t border-white/5 bg-[#09090b]">
        <Button
          variant="ghost"
          onClick={onCancel}
          className="w-full sm:w-auto order-2 sm:order-1 hover:bg-white/5 hover:text-white text-muted-foreground"
        >
          Cancel
        </Button>
        <Button
          className="w-full sm:flex-1 order-1 sm:order-2 bg-primary text-primary-foreground hover:bg-primary/90 border-0"
          disabled={!validation.isValid && splitType !== "equal"}
        >
          Add Expense
        </Button>
      </CardFooter>
    </Card>
  )
}

"use client"

import { Receipt, ShoppingBag, Car, Home, Film } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ExpenseItemProps {
  expense: {
    id: string
    description: string
    amount: number
    paidBy: string
    date: string
    groupName?: string
    category?: string
    splitBetween: number
    yourShare: number
    status: "lent" | "borrowed" | "settled"
  }
}

const categoryIcons = {
  food: ShoppingBag,
  transport: Car,
  accommodation: Home,
  entertainment: Film,
  other: Receipt,
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  const Icon = categoryIcons[expense.category as keyof typeof categoryIcons] || Receipt

  return (
    <Card
      className={cn(
        "p-5 rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm",
        "hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40",
        "transition-all duration-200 cursor-pointer group",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="h-12 w-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
            <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <h4 className="font-semibold text-base truncate group-hover:text-primary transition-colors">
              {expense.description}
            </h4>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm text-muted-foreground">
                Paid by <span className="text-foreground font-medium">{expense.paidBy}</span>
              </p>
              <span className="text-muted-foreground">•</span>
              <p className="text-sm text-muted-foreground">{expense.date}</p>
              {expense.groupName && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <Badge
                    variant="outline"
                    className="text-xs bg-white/5 hover:bg-white/10 border-white/10 text-muted-foreground"
                  >
                    {expense.groupName}
                  </Badge>
                </>
              )}
            </div>
            <Badge variant="secondary" className="text-xs mt-1">
              Split {expense.splitBetween} ways
            </Badge>
          </div>
        </div>

        {/* Right Side - Amount */}
        <div className="text-right flex-shrink-0">
          <p className="font-heading text-2xl font-bold">₹{expense.amount.toLocaleString()}</p>
          <p
            className={cn(
              "text-sm font-medium mt-1",
              expense.status === "lent" && "text-green-500",
              expense.status === "borrowed" && "text-orange-500",
              expense.status === "settled" && "text-muted-foreground",
            )}
          >
            {expense.status === "lent" && `You lent ₹${(expense.amount - expense.yourShare).toLocaleString()}`}
            {expense.status === "borrowed" && `You owe ₹${expense.yourShare.toLocaleString()}`}
            {expense.status === "settled" && "Settled"}
          </p>
        </div>
      </div>
    </Card>
  )
}

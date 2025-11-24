"use client"

import { ArrowRightLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Space_Grotesk } from "next/font/google"

interface SettlementItemProps {
  settlement: {
    id: string
    payer: string
    payerId: string
    payee: string
    payeeId: string
    amount: number
    date: string
    groupName?: string
    note?: string
  }
}

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

export function SettlementItem({ settlement }: SettlementItemProps) {
  return (
    <Card className={`p-5 border-white/10 bg-black/30 backdrop-blur-sm hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all cursor-pointer group`}>
      <div className="flex items-center justify-between gap-4">
        {/* Left Side - Icon and Details */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
            <ArrowRightLeft className="h-5 w-5 text-emerald-500" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-foreground">
                {settlement.payer} paid {settlement.payee}
              </p>
              {settlement.groupName && (
                <Badge variant="outline" className="text-xs border-white/10 bg-secondary/50">
                  {settlement.groupName}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <span>{settlement.date}</span>
              {settlement.note && (
                <>
                  <span className="text-white/20">•</span>
                  <span className="truncate">{settlement.note}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Amount */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <p className={`font-bold font-heading text-lg text-emerald-500`}>₹{settlement.amount.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

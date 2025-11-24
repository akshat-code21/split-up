"use client"

import { Users, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface GroupCardProps {
  id: string
  name: string
  icon: string
  memberCount: number
  expenseCount: number
  color: string
  onClick?: () => void
  className?: string
}

export function GroupCard({ name, icon, memberCount, expenseCount, color, onClick, className }: GroupCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`group relative overflow-hidden border-white/10 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 cursor-pointer h-full ${className}`}
    >
      {/* Gradient glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 from-primary to-transparent" />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Avatar className={`h-12 w-12 bg-gradient-to-br ${color}`}>
            <AvatarFallback className="text-2xl bg-transparent">{icon}</AvatarFallback>
          </Avatar>
          <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {name}
        </h3>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{memberCount} Members</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {expenseCount} Expenses
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

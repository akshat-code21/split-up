"use client"

import { Calendar, ArrowUpDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ExpensesFilterBarProps {
  dateFilter: string
  sortFilter: string
  onDateFilterChange: (value: string) => void
  onSortFilterChange: (value: string) => void
}

export function ExpensesFilterBar({
  dateFilter,
  sortFilter,
  onDateFilterChange,
  onSortFilterChange,
}: ExpensesFilterBarProps) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Date Range Filter */}
      <Select value={dateFilter} onValueChange={onDateFilterChange}>
        <SelectTrigger className="w-[180px] bg-secondary/30 border-white/10 focus:ring-primary/20">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-950 border-white/10 text-white">
          <SelectItem value="all">All time</SelectItem>
          <SelectItem value="month">This month</SelectItem>
          <SelectItem value="lastmonth">Last month</SelectItem>
          <SelectItem value="week">This week</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort Filter */}
      <Select value={sortFilter} onValueChange={onSortFilterChange}>
        <SelectTrigger className="w-[180px] bg-secondary/30 border-white/10 focus:ring-primary/20">
          <ArrowUpDown className="mr-2 h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-950 border-white/10 text-white">
          <SelectItem value="newest">Newest first</SelectItem>
          <SelectItem value="oldest">Oldest first</SelectItem>
          <SelectItem value="highest">Highest amount</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

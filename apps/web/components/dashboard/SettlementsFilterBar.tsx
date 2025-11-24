"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ArrowUpDown } from "lucide-react"

interface SettlementsFilterBarProps {
  dateFilter: string
  sortFilter: string
  onDateFilterChange: (value: string) => void
  onSortFilterChange: (value: string) => void
}

export function SettlementsFilterBar({
  dateFilter,
  sortFilter,
  onDateFilterChange,
  onSortFilterChange,
}: SettlementsFilterBarProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Date Range Filter */}
      <Select value={dateFilter} onValueChange={onDateFilterChange}>
        <SelectTrigger className="w-[160px] bg-secondary/30 border-white/10">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="Date range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All time</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">This week</SelectItem>
          <SelectItem value="month">This month</SelectItem>
          <SelectItem value="year">This year</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort Filter */}
      <Select value={sortFilter} onValueChange={onSortFilterChange}>
        <SelectTrigger className="w-[160px] bg-secondary/30 border-white/10">
          <ArrowUpDown className="mr-2 h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest first</SelectItem>
          <SelectItem value="oldest">Oldest first</SelectItem>
          <SelectItem value="highest">Highest amount</SelectItem>
          <SelectItem value="lowest">Lowest amount</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

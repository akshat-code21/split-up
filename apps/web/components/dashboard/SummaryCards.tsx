import { TrendingUp, TrendingDown, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SummaryCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="glass-card hover:bg-secondary/40 transition-colors relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {/* Removed pb-2 to avoid double spacing with the new card's gap-6 */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
          <Wallet className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-heading text-primary">+ $450.00</div>
          <p className="text-xs text-muted-foreground mt-1">
            Overall, you are owed <span className="text-primary font-medium">$450.00</span>
          </p>
        </CardContent>
      </Card>
      <Card className="glass-card hover:bg-secondary/40 transition-colors relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {/* Removed pb-2 to avoid double spacing */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">You are owed</CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-heading text-emerald-500">$625.00</div>
          <p className="text-xs text-muted-foreground mt-1">Across 3 groups</p>
        </CardContent>
      </Card>
      <Card className="glass-card hover:bg-secondary/40 transition-colors relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {/* Removed pb-2 to avoid double spacing */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">You owe</CardTitle>
          <TrendingDown className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-heading text-orange-500">$175.00</div>
          <p className="text-xs text-muted-foreground mt-1">To 2 friends</p>
        </CardContent>
      </Card>
    </div>
  )
}

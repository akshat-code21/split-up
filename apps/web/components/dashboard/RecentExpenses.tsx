import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentExpenses = [
  {
    id: "EXP-001",
    description: "Dinner at Italian Place",
    amount: "$120.00",
    date: "Today, 8:30 PM",
    payer: { name: "You", avatar: "https://github.com/shadcn.png" },
    status: "You lent",
    group: "Weekend Trip",
  },
  {
    id: "EXP-002",
    description: "Uber to Airport",
    amount: "$45.50",
    date: "Yesterday, 2:15 PM",
    payer: { name: "Rohan", avatar: "/placeholder.svg?height=32&width=32" },
    status: "You borrowed",
    group: "Goa Trip",
  },
  {
    id: "EXP-003",
    description: "Groceries",
    amount: "$85.20",
    date: "Oct 24, 2023",
    payer: { name: "Aditi", avatar: "/placeholder.svg?height=32&width=32" },
    status: "You borrowed",
    group: "Home Expenses",
  },
  {
    id: "EXP-004",
    description: "Movie Tickets",
    amount: "$60.00",
    date: "Oct 22, 2023",
    payer: { name: "You", avatar: "https://github.com/shadcn.png" },
    status: "You lent",
    group: "Weekend Trip",
  },
  {
    id: "EXP-005",
    description: "Internet Bill",
    amount: "$50.00",
    date: "Oct 20, 2023",
    payer: { name: "You", avatar: "https://github.com/shadcn.png" },
    status: "You lent",
    group: "Home Expenses",
  },
]

export function RecentExpenses() {
  return (
    <Card className="glass-card col-span-2 h-full">
      <CardHeader>
        <CardTitle className="font-heading text-lg">Recent Expenses</CardTitle>
        <CardDescription>Latest transactions from your groups</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="w-[250px]">Description</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentExpenses.map((expense) => (
              <TableRow key={expense.id} className="hover:bg-accent/30 border-border/50 transition-colors">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-border/50">
                      <AvatarImage src={expense.payer.avatar || "/placeholder.svg"} alt={expense.payer.name} />
                      <AvatarFallback>{expense.payer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{expense.description}</span>
                      <span className="text-xs text-muted-foreground">{expense.payer.name} paid</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-secondary/50 font-normal">
                    {expense.group}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{expense.date}</TableCell>
                <TableCell className="text-right">
                  <div
                    className={cn(
                      "font-medium",
                      expense.status === "You lent" ? "text-emerald-500" : "text-orange-500",
                    )}
                  >
                    {expense.status === "You lent" ? "+" : "-"}
                    {expense.amount}
                  </div>
                  <div className="text-xs text-muted-foreground">{expense.status}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

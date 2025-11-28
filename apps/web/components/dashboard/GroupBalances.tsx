import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const balances = [
  {
    id: 1,
    name: "Rohan",
    avatar: "/placeholder.svg?height=40&width=40",
    amount: "$300.00",
    status: "owes you",
    color: "text-emerald-500",
  },
  {
    id: 2,
    name: "Aditi",
    avatar: "/placeholder.svg?height=40&width=40",
    amount: "$450.00",
    status: "you owe",
    color: "text-orange-500",
  },
  {
    id: 3,
    name: "Vikram",
    avatar: "/placeholder.svg?height=40&width=40",
    amount: "$120.00",
    status: "owes you",
    color: "text-emerald-500",
  },
  {
    id: 4,
    name: "Sarah",
    avatar: "/placeholder.svg?height=40&width=40",
    amount: "$85.00",
    status: "you owe",
    color: "text-orange-500",
  },
]

export function GroupBalances() {
  return (
    <Card className="glass-card h-full !w-full">
      <CardHeader>
        <CardTitle className="font-heading text-lg">Balances</CardTitle>
        <CardDescription>Who owes you and who you owe</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {balances.map((balance) => (
            <div
              key={balance.id}
              className="group flex items-center justify-between p-3 rounded-lg hover:bg-accent/30 transition-all border border-transparent hover:border-border/50"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-background ring-1 ring-border/50">
                  <AvatarImage src={balance.avatar || "/placeholder.svg"} alt={balance.name} />
                  <AvatarFallback>{balance.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{balance.name}</span>
                  <span className={cn("text-xs font-medium uppercase tracking-wider", balance.color)}>
                    {balance.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("text-lg font-bold font-heading", balance.color)}>{balance.amount}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

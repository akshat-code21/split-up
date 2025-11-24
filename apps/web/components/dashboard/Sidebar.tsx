"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Receipt, ArrowLeftRight, CreditCard, Settings, LogOut, Split } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Groups", href: "/dashboard/groups", icon: Users },
  { name: "Expenses", href: "/dashboard/expenses", icon: Receipt },
  { name: "Settlements", href: "/dashboard/settlements", icon: ArrowLeftRight },
  { name: "Balances", href: "/dashboard/balances", icon: CreditCard },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-card/30 backdrop-blur-xl md:flex md:w-64 md:flex-col fixed inset-y-0 z-50">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-6 mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
              <Split className="w-5 h-5"/>
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">split up</span>
          </Link>
        </div>
        <div className="flex-grow flex flex-col gap-1 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary shadow-[0_0_20px_-5px_rgba(124,58,237,0.3)]"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4 border-t border-border/50 bg-card/20">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group">
          <Avatar className="h-9 w-9 border border-border/50">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <p className="text-sm font-medium leading-none text-foreground truncate group-hover:text-primary transition-colors">
              John Doe
            </p>
            <p className="text-xs text-muted-foreground truncate mt-1">john@example.com</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-center text-xs h-8 text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
          >
            <LogOut className="mr-2 h-3.5 w-3.5" />
            Log out
          </Button>
        </div>
      </div>
    </div>
  )
}

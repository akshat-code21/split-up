"use client"
import Link from "next/link"
import { LayoutDashboard, Users, Receipt, ArrowLeftRight, CreditCard, LogOut, X, Split } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Groups", href: "/dashboard/groups", icon: Users },
  { name: "Expenses", href: "/dashboard/expenses", icon: Receipt },
  { name: "Settlements", href: "/dashboard/settlements", icon: ArrowLeftRight },
  { name: "Balances", href: "/dashboard/balances", icon: CreditCard },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
  userImageUrl: string;
  userName: string;
  userEmail: string
}


export function Sidebar({ userImageUrl, userName, userEmail, isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={onClose} />}

      <div
        className={cn(
          "border-r bg-card/30 backdrop-blur-xl flex flex-col fixed inset-y-0 z-50 w-64 transition-transform duration-300 ease-in-out",
          // Desktop: always visible
          "md:translate-x-0",
          // Mobile: slide in/out
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex justify-between items-center flex-shrink-0 px-6 mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                <Split className="w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">split up</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          <div className="flex-grow flex flex-col gap-1 px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
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
              <AvatarImage src={`${userImageUrl}`} alt="User" />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <p className="text-sm font-medium leading-none text-foreground truncate group-hover:text-primary transition-colors">
                {userName}
              </p>
              <p className="text-xs text-muted-foreground truncate mt-1">{userEmail}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center text-xs h-8 text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
              onClick={() => {
                signOut({ redirectTo: "/" });
              }}
            >
              <LogOut className="mr-2 h-3.5 w-3.5" />
              Log out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

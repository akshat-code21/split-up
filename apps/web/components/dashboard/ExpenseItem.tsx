"use client"

import { useState } from "react"
import { Receipt, ShoppingBag, Car, Home, Film, ChevronDown, Pencil, Trash2, Wallet, Divide } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { AllExpensesForUser } from "@repo/core"
import { formatDateHumanReadable } from "../pages/GroupPage"

interface ExpenseItemProps {
  expense: AllExpensesForUser
  isExpanded: boolean
  onToggle: () => void
}

const categoryIcons = {
  food: ShoppingBag,
  transport: Car,
  accommodation: Home,
  entertainment: Film,
  other: Receipt,
}

export function ExpenseItem({ expense, isExpanded, onToggle }: ExpenseItemProps) {
  const Icon = Receipt
  const [hoveredParticipant, setHoveredParticipant] = useState<string | null>(null)

  const findStatus = (expense: AllExpensesForUser): string => {
    if (expense.expense.type === "SETTLEMENT") return "settled"
    if (expense.userId === expense.expense.payerId) return "lent"
    else return "borrowed"
  }

  return (
    <div className="relative font-heading">
      {/* Background glow when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 via-purple-500/10 to-cyan-500/10 blur-2xl -z-10"
          />
        )}
      </AnimatePresence>

      <Card
        className={cn(
          "relative rounded-2xl border border-white/10 bg-[#050505]/80 backdrop-blur-xl overflow-hidden",
          "hover:border-white/20 transition-all duration-500 cursor-pointer",
          "pt-0",
          isExpanded && "border-white/20 bg-[#050505]/95",
        )}
        onClick={onToggle}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            // Collapsed Row
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-5 pb-4 flex items-start justify-between gap-4"
            >
              {/* Left Side */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <h4 className="font-semibold text-base truncate">{expense.expense.description}</h4>
                  <div className="flex items-center gap-2 flex-wrap text-sm">
                    <p className="text-muted-foreground font-mono text-xs">{formatDateHumanReadable(new Date(expense.expense.date))}</p>
                    {expense.expense.group.name && (
                      <>
                        <span className="text-white/20">•</span>
                        <Badge variant="outline" className="text-xs bg-white/5 border-white/10 text-muted-foreground">
                          {expense.expense.group.name}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side - Amount & Status */}
              <div className="text-right flex-shrink-0 flex flex-col items-end gap-2">
                <p className="font-heading text-2xl font-bold">₹{expense.expense.amount.toLocaleString()}</p>
                <p
                  className={cn(
                    "text-sm font-medium",
                    findStatus(expense) === "lent" && "text-green-500",
                    findStatus(expense) === "borrowed" && "text-orange-500",
                    findStatus(expense) === "settled" && "text-muted-foreground",
                  )}
                >
                  {findStatus(expense) === "lent" && `You lent ₹${(expense.share).toLocaleString()}`}
                  {findStatus(expense) === "borrowed" && `You owe ₹${expense.share.toLocaleString()}`}
                  {findStatus(expense) === "settled" && "Settled"}
                </p>
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative p-6 pt-10"
            >
              {/* Pulsing background glow */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 pointer-events-none"
              />

              {/* Close/Collapse indicator */}
              <motion.div className="absolute top-4 right-4" animate={{ rotate: 180 }}>
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </motion.div>

              {/* Hero Header - Massive Typography */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative mb-8"
              >
                <div className="flex items-end justify-between gap-4 pr-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      {expense.expense.group.name && (
                        <Badge variant="outline" className="text-xs bg-white/5 border-white/10 text-muted-foreground">
                          {expense.expense.group.name}
                        </Badge>
                      )}
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">
                      {expense.expense.description}
                    </h2>
                    <p className="font-mono text-xs text-muted-foreground tracking-wider">{formatDateHumanReadable(new Date(expense.expense.date))}</p>
                  </div>
                  <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-right"
                  >
                    <p
                      className={cn(
                        "font-heading text-5xl md:text-6xl font-bold tracking-tight",
                        "bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent",
                      )}
                    >
                      ₹{expense.expense.amount.toLocaleString()}
                    </p>
                    <p
                      className={cn(
                        "text-sm font-medium mt-2",
                        findStatus(expense) === "lent" && "text-green-500",
                        findStatus(expense) === "borrowed" && "text-orange-500",
                        findStatus(expense) === "settled" && "text-muted-foreground",
                      )}
                    >
                      {findStatus(expense) === "lent" &&
                        `You lent ₹${(expense.share).toLocaleString()}`}
                      {findStatus(expense) === "borrowed" && `You owe ₹${expense.share.toLocaleString()}`}
                      {findStatus(expense) === "settled" && "Settled"}
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Avatar Stack */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="relative mb-8"
              >
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Split Between</p>
                <TooltipProvider delayDuration={0}>
                  <div className="flex items-center gap-1">
                    {expense.expense.group.members.map((participant, index) => {
                      const isPayer =
                        participant.userId === expense.expense.payerId
                      const owesAmount = expense.share
                      const getsBack = isPayer ? expense.expense.amount - expense.share : 0

                      return (
                        <Tooltip key={participant.user.id}>
                          <TooltipTrigger asChild>
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
                              whileHover={{ scale: 1.15, zIndex: 10 }}
                              className={cn(
                                "relative -ml-3 first:ml-0 cursor-pointer transition-all duration-200 font-heading",
                                hoveredParticipant === participant.user.id && "z-10",
                              )}
                              onMouseEnter={() => setHoveredParticipant(participant.user.id)}
                              onMouseLeave={() => setHoveredParticipant(null)}
                            >
                              <Avatar
                                className={cn(
                                  "h-14 w-14 border-4 transition-all duration-200 bg-white",
                                  isPayer
                                    ? "border-green-500 shadow-[0_0_15px_#22c55e]"
                                    : "border-orange-500 shadow-[0_0_10px_#f97316]",
                                  hoveredParticipant === participant.user.id && "ring-2 ring-white/50",
                                )}
                              >
                                <AvatarImage src={participant.user.image || "/placeholder.svg"} />
                                <AvatarFallback
                                  className={cn(
                                    "text-sm font-bold",
                                    isPayer ? "bg-green-500/30 text-green-600" : "bg-orange-500/30 text-orange-600",
                                  )}
                                >
                                  {participant?.user?.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="bg-[#0a0a0a] border-white/10 backdrop-blur-xl px-4 py-3"
                          >
                            <div className="space-y-1">
                              <p className="font-semibold">{participant.user.name}</p>
                              <p className={cn("text-sm font-heading", isPayer ? "text-green-400" : "text-orange-400")}>
                                {isPayer
                                  ? `${participant.user.name} Gets back ₹${getsBack.toLocaleString()}`
                                  : `${participant.user.name} Owes ₹${owesAmount.toLocaleString()}`}
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      )
                    })}

                  </div>
                </TooltipProvider>
              </motion.div>

              {/* Bento Grid */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-2 gap-3 mb-6"
              >
                {/* Payer Tile */}
                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                  className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl transition-colors cursor-default"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Wallet className="h-4 w-4 text-green-400" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Paid by</p>
                  <p className="font-semibold">{expense.expense.payer.name || ""}</p>
                </motion.div>

                {/* Category Tile */}
                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                  className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl transition-colors cursor-default"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Category</p>
                  <p className="font-semibold capitalize">{"Other"}</p>
                </motion.div>

                {/* Split Type Tile 
                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                  className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl transition-colors cursor-default"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Divide className="h-4 w-4 text-purple-400" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Split</p>
                  <p className="font-semibold capitalize">{expense.splitMethod || "Equal"}</p>
                </motion.div>
                */}
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.55 }}
                className="flex justify-end"
              >
                <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Pencil className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  )
}

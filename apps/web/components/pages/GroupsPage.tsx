"use client"

import { useState, useRef } from "react"
import { PlusCircle, Search, FolderOpen, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FadeIn, FadeInStagger, FadeInItem } from "@repo/ui/motion"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { CreateGroupCard } from "@/components/dashboard/CreateGroupCard"
import { GroupCard } from "@/components/dashboard/GroupCard"
import Link from "next/link"
import { motion } from "framer-motion"

// Mock data
const mockGroups = [
  {
    id: "1",
    name: "Weekend Trip",
    icon: "🏖️",
    memberCount: 4,
    expenseCount: 12,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "2",
    name: "Home Expenses",
    icon: "🏠",
    memberCount: 3,
    expenseCount: 28,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "3",
    name: "Office Lunch",
    icon: "🍔",
    memberCount: 8,
    expenseCount: 45,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "4",
    name: "Gym Membership",
    icon: "💪",
    memberCount: 2,
    expenseCount: 6,
    color: "from-green-500 to-emerald-500",
  },
]

const normalizeGroup = (group: { id: string; name: string; icon?: string; memberCount?: number; expenseCount?: number; color?: string }) => ({
  id: group.id,
  name: group.name,
  icon: group.icon || <Receipt className="h-4 w-4" />,
  memberCount: group.memberCount ?? 1,
  expenseCount: group.expenseCount ?? 0,
  color: group.color || "from-blue-500 to-cyan-500",
})

export default function GroupsPage({ userId, initialGroups }: { userId: string, initialGroups: any[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [groups, setGroups] = useState(() => initialGroups.map(normalizeGroup))
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
  const initialGroupsLengthRef = useRef(initialGroups.length)

  const filteredGroups = groups.filter((group) => group.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleCreateGroup = (createdGroup: { id: string; name: string }) => {

    // Optimistically add the new group to the list
    // Use normalizeGroup to ensure consistent structure
    const newGroup = normalizeGroup({
      id: createdGroup.id,
      name: createdGroup.name,
    })
    console.log("Adding new group:", newGroup)
    setGroups(prev => {
      const updated = [...prev, newGroup]
      console.log("Updated groups:", updated)
      return updated
    })
    setIsCreateGroupOpen(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">Your Groups</h1>
            <p className="mt-2 text-muted-foreground">Manage all your shared expenses</p>
          </div>
          <Button
            onClick={() => setIsCreateGroupOpen(true)}
            className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </div>
      </FadeIn>

      {/* Create Group Dialog */}
      <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
        <DialogContent showCloseButton={false} className="p-0 border-none bg-transparent shadow-none max-w-md">
          <DialogTitle className="sr-only">Create a New Group</DialogTitle>
          <DialogDescription className="sr-only">Fill in the details to create a new expense group</DialogDescription>
          <CreateGroupCard onCancel={() => setIsCreateGroupOpen(false)} onSubmit={(group) => handleCreateGroup(group)} />
        </DialogContent>
      </Dialog>

      {/* Search Bar */}
      <FadeIn delay={0.1}>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card/50 border-white/10 focus:border-primary/50 transition-all"
          />
        </div>
      </FadeIn>

      {/* Groups Grid */}
      {filteredGroups.length > 0 ? (
        <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredGroups.slice(0, initialGroupsLengthRef.current).map((group) => (
            <FadeInItem key={group.id}>
              <Link href={`/dashboard/groups/${group.id}`}>
                <GroupCard {...group} />
              </Link>
            </FadeInItem>
          ))}
          {filteredGroups.slice(initialGroupsLengthRef.current).map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <Link href={`/dashboard/groups/${group.id}`}>
                <GroupCard {...group} />
              </Link>
            </motion.div>
          ))}
        </FadeInStagger>
      ) : (
        /* Empty State */
        <FadeIn>
          <Card className="border-white/10 bg-card/40 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-primary/10 p-6 mb-6">
                <FolderOpen className="h-12 w-12 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-2">No groups found</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "Create your first group to start tracking shared expenses"}
              </p>
              <Button
                onClick={() => setIsCreateGroupOpen(true)}
                className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Group
              </Button>
            </CardContent>
          </Card>
        </FadeIn>
      )}
    </div>
  )
}

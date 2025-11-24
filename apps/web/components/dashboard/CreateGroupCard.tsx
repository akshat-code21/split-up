"use client"

import type React from "react"

import { useState } from "react"
import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CreateGroupCardProps {
  onCancel?: () => void
  onSubmit?: (data: { name: string; description?: string }) => void
  className?: string
}

export function CreateGroupCard({ onCancel, onSubmit, className }: CreateGroupCardProps) {
  const [groupName, setGroupName] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (groupName.trim()) {
      onSubmit?.({ name: groupName, description })
      setGroupName("")
      setDescription("")
    }
  }

  return (
    <Card className={`w-full max-w-md relative overflow-hidden border-white/10 bg-[#09090b] shadow-2xl ${className}`}>
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2.5">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="font-heading text-2xl">Create a New Group</CardTitle>
            <CardDescription className="mt-1.5">Organize your shared expenses effortlessly</CardDescription>
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="group-name" className="text-sm font-medium">
              Group Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="group-name"
              placeholder="Goa Trip"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
              className="bg-secondary/50 border-white/10 focus:border-primary/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="group-description" className="text-sm font-medium text-muted-foreground">
              Description (Optional)
            </Label>
            <Textarea
              id="group-description"
              placeholder="Add details about this group..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="bg-secondary/50 border-white/10 focus:border-primary/50 transition-all resize-none"
            />
          </div>
        </CardContent>

        <CardFooter className="flex gap-4 mt-4">
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="flex-1 border border-white/10 hover:bg-secondary/50"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={!groupName.trim()}
            className="flex-1 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Group
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

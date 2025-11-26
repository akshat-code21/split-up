"use client"

import type React from "react"

import { useState } from "react"
import { Users, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"

interface CreateGroupCardProps {
  onCancel?: () => void
  onSubmit?: (group: { id: string; name: string }) => void
  className?: string
}

export function CreateGroupCard({ onCancel, onSubmit, className }: CreateGroupCardProps) {
  const [groupName, setGroupName] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/groups`, {
        name: groupName,
        description: description || undefined,
      })

      if (res.data.success && res.data.data) {
        const createdGroup = res.data.data
        onSubmit?.(createdGroup) 
        setGroupName("")
        setDescription("")
      } else {
        setError(res.data.error || "Failed to create group")
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || err.response?.data?.message || "Failed to create group")
      } else {
        setError(err instanceof Error ? err.message : "Failed to create group")
      }
    } finally {
      setIsLoading(false)
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
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="group-name" className="text-sm font-medium">
              Group Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="group-name"
              placeholder="Goa Trip"
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value)
                setError(null)
              }}
              required
              disabled={isLoading}
              className="bg-secondary/50 border-white/10 focus:border-primary/50 transition-all disabled:opacity-50"
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
              disabled={isLoading}
              className="bg-secondary/50 border-white/10 focus:border-primary/50 transition-all resize-none disabled:opacity-50"
            />
          </div>
        </CardContent>

        <CardFooter className="flex gap-4 mt-4">
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 border border-white/10 hover:bg-secondary/50 disabled:opacity-50"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={!groupName.trim() || isLoading}
            className="flex-1 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating..." : "Create Group"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

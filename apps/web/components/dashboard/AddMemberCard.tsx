"use client"

import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogFooter, DialogClose } from "@/components/ui/dialog"

interface AddMemberCardProps {
  onCancel?: () => void
}

export default function AddMemberCard({ onCancel }: AddMemberCardProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          <UserPlus className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-semibold font-heading tracking-tight">Add Member</h2>
          <p className="text-sm text-muted-foreground mt-1">Add a new participant to this group.</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid gap-6 py-2">
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Member Name
          </Label>
          <Input id="name" placeholder="Akash Sharma" className="bg-secondary/20 border-white/10" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <Input type="email" id="email" placeholder="akash@example.com" className="bg-secondary/20 border-white/10" />
        </div>
      </div>

      {/* Actions */}
      <DialogFooter className="mt-8 gap-3 sm:gap-0">
        <DialogClose asChild>
          <Button variant="ghost" type="button" onClick={onCancel}>
            Cancel
          </Button>
        </DialogClose>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
          Add Member
        </Button>
      </DialogFooter>
    </div>
  )
}

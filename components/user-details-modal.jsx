"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Calendar, Shield } from "lucide-react"
import Image from "next/image"

export function UserDetailsModal({ user, isOpen, onClose, onNudge, onSuspend, onDeactivate }) {
  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
              <Image
                src={user.avatar || "/placeholder.svg?height=48&width=48&query=user avatar"}
                alt={user.firstName}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {user.firstName} {user.lastName}
              </h3>
              <Badge
                variant="secondary"
                className={`mt-1 ${
                  user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                }`}
              >
                {user.role}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Username</p>
                <p className="text-sm text-gray-600">{user.firstName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Role</p>
                <p className="text-sm text-gray-600 capitalize">{user.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Member Since</p>
                <p className="text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {user.bio && (
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Bio</p>
                <p className="text-sm text-gray-600">{user.bio}</p>
              </div>
            )}
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-medium text-gray-900">Actions</h4>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => onNudge(user)}>
                Send Nudge
              </Button>
              <Button variant="outline" size="sm" onClick={() => onSuspend(user)}>
                Suspend User
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDeactivate(user)}>
                Deactivate
              </Button>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

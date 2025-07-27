"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Calendar, User, BookOpen } from "lucide-react"

export function UserDetailsModal({ user, isOpen, onClose, onNudge, onSuspend, onDeactivate }) {
  if (!user) return null

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle
            style={{
              color: "#1E1E1E",
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: "18px",
              lineHeight: "24px",
              letterSpacing: "0px",
            }}
          >
            User Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Avatar and Basic Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.firstName} />
              <AvatarFallback className="bg-orange-100 text-orange-600 text-lg font-medium">
                {user.firstName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3
                style={{
                  color: "#1E1E1E",
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  letterSpacing: "0px",
                }}
              >
                {user.firstName} {user.lastName}
              </h3>
              <Badge variant={user.status === "enrolled" ? "default" : "secondary"} className="mt-1">
                {user.status === "enrolled" ? "Enrolled" : "Unenrolled"}
              </Badge>
            </div>
          </div>

          {/* User Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-500" />
              <div>
                <p
                  className="text-sm text-gray-500"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "16px",
                  }}
                >
                  Email
                </p>
                <p
                  style={{
                    color: "#1E1E1E",
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0px",
                  }}
                >
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-500" />
              <div>
                <p
                  className="text-sm text-gray-500"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "16px",
                  }}
                >
                  Phone
                </p>
                <p
                  style={{
                    color: "#1E1E1E",
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0px",
                  }}
                >
                  {user.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <BookOpen className="w-4 h-4 text-gray-500" />
              <div>
                <p
                  className="text-sm text-gray-500"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "16px",
                  }}
                >
                  Courses
                </p>
                <p
                  style={{
                    color: "#1E1E1E",
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0px",
                  }}
                >
                  {user.courses}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div>
                <p
                  className="text-sm text-gray-500"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "16px",
                  }}
                >
                  Joined
                </p>
                <p
                  style={{
                    color: "#1E1E1E",
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0px",
                  }}
                >
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>

            {user.bio && (
              <div className="flex items-start space-x-3">
                <User className="w-4 h-4 text-gray-500 mt-1" />
                <div>
                  <p
                    className="text-sm text-gray-500"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "16px",
                    }}
                  >
                    Bio
                  </p>
                  <p
                    style={{
                      color: "#1E1E1E",
                      fontFamily: "Inter",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "20px",
                      letterSpacing: "0px",
                    }}
                  >
                    {user.bio}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4 border-t">
            <Button
              onClick={() => onNudge(user)}
              variant="outline"
              size="sm"
              className="flex-1"
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0px",
              }}
            >
              Nudge
            </Button>
            <Button
              onClick={() => onSuspend(user)}
              variant="outline"
              size="sm"
              className="flex-1"
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0px",
              }}
            >
              Suspend
            </Button>
            <Button
              onClick={() => onDeactivate(user)}
              variant="destructive"
              size="sm"
              className="flex-1"
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0px",
              }}
            >
              Deactivate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

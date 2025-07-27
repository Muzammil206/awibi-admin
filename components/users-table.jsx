"use client"

import { useState, useEffect } from "react"
import { useUserStore } from "@/lib/users-store"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Loader2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserDetailsModal } from "./user-details-modal"
import { toast } from "sonner"

export function UsersTable() {
  const { getPaginatedUsers, loading, error, fetchUsers, deleteUser } = useUserStore()
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const paginatedUsers = getPaginatedUsers()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleUserClick = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleDelete = async (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const result = await deleteUser(userId)
      if (result.success) {
        toast.success("User deleted successfully")
        setIsModalOpen(false)
      } else {
        toast.error("Failed to delete user: " + result.error)
      }
    }
  }

  const handleNudge = (user) => {
    toast.info(`Nudging ${user.firstName}... (Simulated)`)
    setIsModalOpen(false)
  }

  const handleSuspend = (user) => {
    toast.info(`Suspending ${user.firstName}... (Simulated)`)
    setIsModalOpen(false)
  }

  const handleDeactivate = (user) => {
    toast.info(`Deactivating ${user.firstName}... (Simulated)`)
    setIsModalOpen(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        <span className="ml-2 text-gray-500">Loading users...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg mb-4">Error loading users: {error}</p>
        <Button onClick={() => fetchUsers()} variant="outline">
          Try Again
        </Button>
      </div>
    )
  }

  if (paginatedUsers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">No users found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead
                className="text-left py-4 px-6"
                style={{
                  color: "#1E1E1E",
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "21px",
                  letterSpacing: "0px",
                }}
              >
                Name
              </TableHead>
              <TableHead
                className="text-left py-4 px-6"
                style={{
                  color: "#1E1E1E",
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "21px",
                  letterSpacing: "0px",
                }}
              >
                Email address
              </TableHead>
              <TableHead
                className="text-left py-4 px-6"
                style={{
                  color: "#1E1E1E",
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "21px",
                  letterSpacing: "0px",
                }}
              >
                Phone no.
              </TableHead>
              <TableHead
                className="text-left py-4 px-6"
                style={{
                  color: "#1E1E1E",
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "21px",
                  letterSpacing: "0px",
                }}
              >
                Courses
              </TableHead>
              <TableHead
                className="text-right py-4 px-6"
                style={{
                  color: "#1E1E1E",
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "21px",
                  letterSpacing: "0px",
                }}
              >
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow
                key={user.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
                onClick={() => handleUserClick(user)}
              >
                <TableCell className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={user.avatar || "/placeholder.svg?height=40&width=40&query=user avatar"}
                        alt={user.firstName}
                      />
                      <AvatarFallback className="bg-orange-100 text-orange-600 text-sm font-medium">
                        {user.firstName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div
                        style={{
                          color: "#1E1E1E",
                          fontFamily: "Inter",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "21px",
                          letterSpacing: "0px",
                        }}
                      >
                        {user.firstName} {user.lastName}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className="py-4 px-6"
                  style={{
                    color: "#1E1E1E",
                    fontFamily: "Inter",
                    fontWeight: 300,
                    fontSize: "14px",
                    lineHeight: "21px",
                    letterSpacing: "0px",
                  }}
                >
                  {user.email}
                </TableCell>
                <TableCell
                  className="py-4 px-6"
                  style={{
                    color: "#1E1E1E",
                    fontFamily: "Inter",
                    fontWeight: 300,
                    fontSize: "14px",
                    lineHeight: "21px",
                    letterSpacing: "0px",
                  }}
                >
                  {user.phone}
                </TableCell>
                <TableCell
                  className="py-4 px-6"
                  style={{
                    color: "#1E1E1E",
                    fontFamily: "Inter",
                    fontWeight: 300,
                    fontSize: "14px",
                    lineHeight: "21px",
                    letterSpacing: "0px",
                  }}
                >
                  {user.courses}
                </TableCell>
                <TableCell className="py-4 px-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0 hover:bg-gray-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="w-4 h-4 text-gray-600" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUserClick(user)
                        }}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(user.id)
                        }}
                        className="text-red-600"
                      >
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserDetailsModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNudge={handleNudge}
        onSuspend={handleSuspend}
        onDeactivate={handleDeactivate}
      />
    </div>
  )
}

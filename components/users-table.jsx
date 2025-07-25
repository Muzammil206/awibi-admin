"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Loader2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useUserStore } from "@/lib/users-store"
import { UserDetailsModal } from "./user-details-modal"
import { toast } from "sonner"
import Image from "next/image"

export function UsersTable() {
  const { getFilteredUsers, deleteUser, fetchUsers, loading, error } = useUserStore()
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const filteredUsers = getFilteredUsers()

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

  const handleRefresh = () => {
    fetchUsers()
    toast.success("Users refreshed")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        <span className="ml-2 text-gray-600">Loading users...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg mb-4">Error loading users: {error}</p>
        <Button onClick={handleRefresh} variant="outline">
          Try Again
        </Button>
      </div>
    )
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">No users found matching your criteria.</p>
        <Button onClick={handleRefresh} variant="outline">
          Refresh
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}
        </p>
        <Button onClick={handleRefresh} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-600 font-medium">Name</TableHead>
              <TableHead className="text-gray-600 font-medium">Email address</TableHead>
              <TableHead className="text-gray-600 font-medium">Role</TableHead>
              <TableHead className="text-gray-600 font-medium">Created</TableHead>
              <TableHead className="text-gray-600 font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleUserClick(user)}
              >
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src={user.avatar || "/placeholder.svg?height=40&width=40&query=user avatar"}
                        alt={user.firstName}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0" onClick={(e) => e.stopPropagation()}>
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

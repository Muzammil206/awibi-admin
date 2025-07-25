"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useUserStore } from "@/lib/users-store"
import { UserDetailsModal } from "./user-details-modal"
import { toast } from "sonner"
import Image from "next/image"

export function UsersTable() {
  const { getFilteredUsers, deleteUser } = useUserStore()
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredUsers = getFilteredUsers()

  const handleUserClick = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleDelete = (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser(userId)
      toast.success("User deleted successfully")
      setIsModalOpen(false) // Close modal if open
    }
  }

  const handleNudge = (user) => {
    toast.info(`Nudging ${user.firstName} ${user.lastName}... (Simulated)`)
    setIsModalOpen(false)
  }

  const handleSuspend = (user) => {
    toast.info(`Suspending ${user.firstName} ${user.lastName}... (Simulated)`)
    setIsModalOpen(false)
  }

  const handleDeactivate = (user) => {
    toast.info(`Deactivating ${user.firstName} ${user.lastName}... (Simulated)`)
    setIsModalOpen(false)
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No users found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-600 font-medium">Name</TableHead>
              <TableHead className="text-gray-600 font-medium">Email address</TableHead>
              <TableHead className="text-gray-600 font-medium">Phone no.</TableHead>
              <TableHead className="text-gray-600 font-medium">Courses</TableHead>
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
                <TableCell
                  style={{
                    fontFamily: 'Kumbh Sans, sans-serif',
                    fontWeight: 300,
                    fontStyle: 'normal',
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src={user.avatar || "/placeholder.svg?height=40&width=40&query=user avatar"}
                        alt={`${user.firstName} ${user.lastName}`}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{`${user.firstName} ${user.lastName}`}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'Kumbh Sans, sans-serif',
                    fontWeight: 300,
                    fontStyle: 'normal',
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                  }}
                  className="text-gray-600"
                >
                  {user.email}
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'Kumbh Sans, sans-serif',
                    fontWeight: 300,
                    fontStyle: 'normal',
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                  }}
                  className="text-gray-600"
                >
                  {user.phone}
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'Kumbh Sans, sans-serif',
                    fontWeight: 300,
                    fontStyle: 'normal',
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                  }}
                  className="text-gray-600"
                >
                  {user.courses}
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'Kumbh Sans, sans-serif',
                    fontWeight: 300,
                    fontStyle: 'normal',
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                  }}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <MoreHorizontal className="w-4 h-4 text-gray-600" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => handleUserClick(user)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(user.id)} className="text-red-600">
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

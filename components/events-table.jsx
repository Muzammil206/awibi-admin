"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useResourceStore } from "@/lib/resource-store"
import { toast } from "sonner"

export function EventsTable() {
  const { events } = useResourceStore()

  const handleEdit = (id) => {
    toast.info(`Edit event ${id} functionality coming soon!`)
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      // Implement delete logic in store if needed
      toast.success(`Event ${id} deleted successfully! (Simulated)`)
    }
  }

  if (events.length === 0) {
    return <div className="text-center py-8 text-gray-500">No events available.</div>
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-600">Event Name</TableHead>
            <TableHead className="text-gray-600">Date</TableHead>
            <TableHead className="text-gray-600">Location</TableHead>
            <TableHead className="text-gray-600">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell
                className="font-medium"
                style={{
                  color: "#1E1E1E",
                  fontFamily: "Inter",
                  fontWeight: 300,
                  fontSize: "14px",
                  lineHeight: "21px",
                  letterSpacing: "0px",
                }}
              >
                {event.name}
              </TableCell>
              <TableCell
                style={{
                  color: "#1E1E1E",
                  fontFamily: "Inter",
                  fontWeight: 300,
                  fontSize: "14px",
                  lineHeight: "21px",
                  letterSpacing: "0px",
                }}
              >
                {event.date}
              </TableCell>
              <TableCell
                style={{
                  color: "#1E1E1E",
                  fontFamily: "Inter",
                  fontWeight: 300,
                  fontSize: "14px",
                  lineHeight: "21px",
                  letterSpacing: "0px",
                }}
              >
                {event.location}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => handleEdit(event.id)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(event.id)} className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

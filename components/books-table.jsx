"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useResourceStore } from "@/lib/resource-store"
import { toast } from "sonner"

export function BooksTable() {
  const { books } = useResourceStore()

  const handleEdit = (id) => {
    toast.info(`Edit book ${id} functionality coming soon!`)
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this book?")) {
      // Implement delete logic in store if needed
      toast.success(`Book ${id} deleted successfully! (Simulated)`)
    }
  }

  if (books.length === 0) {
    return <div className="text-center py-8 text-gray-500">No books available. Add your first book!</div>
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-600 front-medium">Title</TableHead>
            <TableHead className="text-gray-600">Category</TableHead>
            <TableHead className="text-gray-600">Uploaded</TableHead>
            <TableHead className="text-gray-600">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
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
                {book.title}
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
                {book.category}
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
                {book.uploaded}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => handleEdit(book.id)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(book.id)} className="text-red-600">
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

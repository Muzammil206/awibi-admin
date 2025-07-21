"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useResourceStore } from "@/lib/resource-store"
import { toast } from "sonner"

export function VideosTable() {
  const { videos } = useResourceStore()

  const handleEdit = (id) => {
    toast.info(`Edit video ${id} functionality coming soon!`)
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this video?")) {
      // Implement delete logic in store if needed
      toast.success(`Video ${id} deleted successfully! (Simulated)`)
    }
  }

  if (videos.length === 0) {
    return <div className="text-center py-8 text-gray-500">No videos available.</div>
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-600">Video Title</TableHead>
            <TableHead className="text-gray-600">No. of Times Watched</TableHead>
            <TableHead className="text-gray-600">Duration</TableHead>
            <TableHead className="text-gray-600">Date</TableHead>
            <TableHead className="text-gray-600">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos.map((video) => (
            <TableRow key={video.id}>
              <TableCell className="font-medium text-gray-900">{video.title}</TableCell>
              <TableCell className="text-gray-600">{video.timesWatched}</TableCell>
              <TableCell className="text-gray-600">{video.duration}</TableCell>
              <TableCell className="text-gray-600">{video.date}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => handleEdit(video.id)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(video.id)} className="text-red-600">
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

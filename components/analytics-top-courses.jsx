"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCourseStore } from "@/lib/course-store"
import { toast } from "sonner"

export function AnalyticsTopCourses() {
  const { courses } = useCourseStore()

  const handleEdit = (courseId) => {
    toast.info(`Edit functionality for course ${courseId} coming soon!`)
  }

  const handleDelete = (courseId) => {
    if (confirm("Are you sure you want to delete this course?")) {
      toast.success(`Course ${courseId} deleted successfully! (Simulated)`)
    }
  }

  const handleAddProvider = () => {
    toast.info("Add Provider functionality coming soon!")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Top Courses</h3>
        <Button
          variant="outline"
          className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
          onClick={handleAddProvider}
        >
          Add Provider
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 bg-gray-50/50">
              <TableHead className="text-gray-700 font-small text-sm py-4 px-4">Course Name</TableHead>
              <TableHead className="text-gray-700 font-small text-sm py-4 px-4">Status</TableHead>
              <TableHead className="text-gray-700 font-small text-sm py-4 px-4">Price</TableHead>
              <TableHead className="text-gray-700 font-medium text-sm py-4 px-4">Category</TableHead>
              <TableHead className="text-gray-700 font-medium text-sm py-4 px-4">Tags</TableHead>
              <TableHead className="text-gray-700 font-medium text-sm py-4 px-4">Students</TableHead>
              <TableHead className="text-gray-700 font-medium text-sm py-4 px-4">Last Updated</TableHead>
              <TableHead className="text-gray-700 font-medium text-sm py-4 px-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.slice(0, 5).map((course) => (
              <TableRow key={course.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <TableCell
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 300,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '145%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                  }}
                  className="py-4 px-4 text-gray-900 text-sm"
                >
                  <div className="max-w-[200px] truncate" title={course.title}>
                    {course.title}
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 300,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '145%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                  }}
                  className="py-4 px-4"
                >
                  <Badge
                    variant="secondary"
                    className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${
                      course.status === "Published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 300,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '145%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                  }}
                  className="py-4 px-4 text-gray-600 text-sm"
                >
                  {course.price || "0.00"}
                </TableCell>
                <TableCell 
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 300,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '145%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                  }}
                  className="py-4 px-4 text-gray-600 text-sm"
                >
                  {course.category}
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 300,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '145%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                  }}
                  className="py-4 px-4 text-gray-600 text-sm"
                >
                  <div className="max-w-[120px] truncate" title={course.tags}>
                    {course.tags || "Web Dev, HTML, CSS"}
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 300,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '145%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                  }}
                  className="py-4 px-4 text-gray-600 text-sm text-center"
                >
                  {course.studentsEnrolled || "0"}
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 300,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '145%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                  }}
                  className="py-4 px-4 text-gray-600 text-sm"
                >
                  {course.lastUpdated || "2023-08-15"}
                </TableCell>
                <TableCell className="py-4 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => handleEdit(course.id)}>Edit course</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(course.id)} className="text-red-600">
                        Delete course
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}




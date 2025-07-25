"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCourseStore } from "@/lib/course-store"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

export function CoursesTable() {
  const { getFilteredCourses, deleteCourse } = useCourseStore()
  const courses = getFilteredCourses()

  const handleDelete = (courseId) => {
    if (confirm("Are you sure you want to delete this course?")) {
      deleteCourse(courseId)
      toast.success("Course deleted successfully")
    }
  }

  const handleEdit = (courseId) => {
    toast.info(`Edit functionality for course ${courseId} coming soon!`)
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b border-gray-100 bg-gray-50/50">
              <TableHead className="text-gray-700 font-medium text-sm py-4 px-4 min-w-[200px]">Course Name</TableHead>
              <TableHead className="text-gray-700 font-medium text-sm py-4 px-4 w-[100px]">Status</TableHead>
              <TableHead className="text-gray-700 font-medium text-sm py-4 px-4 w-[80px]">Price</TableHead>
              <TableHead className="text-gray-700 font-medium text-sm py-4 px-4 w-[120px]">Category</TableHead>
              <TableHead className="text-gray-700 font-medium text-sm py-4 px-4 min-w-[150px]">Tags</TableHead>
              <TableHead className="text-gray-700 font-medium text-sm py-4 px-4 w-[80px]">Students</TableHead>
              <TableHead className="text-gray-700 font-medium text-sm py-4 px-4 w-[100px]">Last Updated</TableHead>
              <TableHead className="text-gray-700 font-medium text-sm py-4 px-4 w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={course.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <TableCell
                  className="py-4 px-4 text-gray-900"
                  style={{
                    fontFamily: "DM Sans",
                    fontWeight: 300,
                    fontSize: "14px",
                    lineHeight: "21px",
                    letterSpacing: "0px",
                  }}
                >
                  <div className="truncate max-w-[180px]" title={course.title}>
                    {course.title}
                  </div>
                </TableCell>
                <TableCell className="py-4 px-4">
                  <Badge
                    variant="secondary"
                    className={`px-2 py-1 text-xs font-medium rounded-full border-0 whitespace-nowrap ${
                      course.status === "Published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 px-4 text-gray-600 text-sm whitespace-nowrap">{course.price}</TableCell>
                <TableCell className="py-4 px-4 text-gray-600 text-sm">
                  <div className="truncate" title={course.category}>
                    {course.category}
                  </div>
                </TableCell>
                <TableCell className="py-4 px-4 text-gray-600 text-sm">
                  <div className="truncate max-w-[130px]" title={course.tags}>
                    {course.tags}
                  </div>
                </TableCell>
                <TableCell className="py-4 px-4 text-gray-600 text-sm text-center">{course.studentsEnrolled}</TableCell>
                <TableCell className="py-4 px-4 text-gray-600 text-sm whitespace-nowrap">
                  {course.lastUpdated}
                </TableCell>
                <TableCell className="py-4 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-gray-100 rounded-md">
                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 rounded-lg shadow-lg border border-gray-100">
                      <DropdownMenuItem
                        onClick={() => handleEdit(course.id)}
                        className="text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                      >
                        Edit course
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(course.id)}
                        className="text-sm text-red-600 hover:bg-red-50 rounded-md"
                      >
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

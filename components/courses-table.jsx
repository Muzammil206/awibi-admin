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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-600">Course Name</TableHead>
            <TableHead className="text-gray-600">Status</TableHead>
            <TableHead className="text-gray-600">Price</TableHead>
            <TableHead className="text-gray-600">Category</TableHead>
            <TableHead className="text-gray-600">Tags</TableHead>
            <TableHead className="text-gray-600">Students</TableHead>
            <TableHead className="text-gray-600">Last Updated</TableHead>
            <TableHead className="text-gray-600">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="text-gray-900 font-medium">{course.title}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`${
                    course.status === "Published"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-gray-100 text-gray-800 border-gray-200"
                  }`}
                >
                  {course.status}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-600">{course.price}</TableCell>
              <TableCell className="text-gray-600">{course.category}</TableCell>
              <TableCell className="text-gray-600">{course.tags}</TableCell>
              <TableCell className="text-gray-600">{course.studentsEnrolled}</TableCell>
              <TableCell className="text-gray-600">{course.lastUpdated}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
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
  )
}

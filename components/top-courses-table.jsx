"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCourseStore } from "@/lib/course-store"
import { toast } from "sonner"

const formatDate = (dateString) => {
  if (!dateString) return 'Not available';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toISOString().split('T')[0];
  } catch (error) {
    return 'Invalid date';
  }
};

export function TopCoursesTable() {
  const { fetchCourses, courses } = useCourseStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true)
      try {
        await fetchCourses()
      } catch (error) {
        console.error('Error fetching courses:', error)
        toast.error('Failed to load courses')
      } finally {
        setIsLoading(false)
      }
    }

    loadCourses()
  }, [fetchCourses])

  // Get top 5 courses sorted by student enrollment
  const topCourses = [...(courses || [])]
    // .filter(course => course && course.is_published === "True")
    // .sort((a, b) => (parseInt(b.studentsEnrolled || 0) - parseInt(a.studentsEnrolled || 0)))
    // .slice(0, 5)

  if (isLoading) {
    return (
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Top Courses</h3>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-gray-500">Loading top courses...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!topCourses.length) {
    return (
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Top Courses</h3>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-gray-500">No published courses found.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Top Courses</h3>
        <TrendingUp className="w-5 h-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-600">Course Name</TableHead>
              <TableHead className="text-gray-600">Category</TableHead>
              <TableHead className="text-gray-600">Price</TableHead>
              <TableHead className="text-gray-600">Students</TableHead>
              <TableHead className="text-gray-600">Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topCourses.map((course) => (
              <TableRow key={`top-course-${course.id}`}>
                <TableCell>
                  <div 
                    className="truncate max-w-[200px] text-gray-900" 
                    title={course.title}
                    style={{
                      fontFamily: "Inter",
                      fontSize: "11px",
                      fontWeight: 300,
                      lineHeight: "100%",
                      letterSpacing: "0.25px"
                    }}
                  >
                    {course.title}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    style={{
                      fontFamily: "Inter",
                      fontSize: "11px",
                      fontWeight: 300,
                      lineHeight: "100%",
                      letterSpacing: "0.25px",
                      color: "#6B7280"
                    }}
                  >
                    {course.category?.name || 'Uncategorized'}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    style={{
                      fontFamily: "Inter",
                      fontSize: "11px",
                      fontWeight: 300,
                      lineHeight: "100%",
                      letterSpacing: "0.25px",
                      color: "#6B7280"
                    }}
                  >
                    ₦{course.price || '0.00'}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    style={{
                      fontFamily: "Inter",
                      fontSize: "11px",
                      fontWeight: 500,
                      lineHeight: "100%",
                      letterSpacing: "0.25px",
                      color: "#6B7280"
                    }}
                  >
                    {course.studentsEnrolled || 0}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    style={{
                      fontFamily: "Inter",
                      fontSize: "11px",
                      fontWeight: 300,
                      lineHeight: "100%",
                      letterSpacing: "0.25px",
                      color: "#6B7280"
                    }}
                  >
                    {formatDate(course.updatedAt)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

"use client"

import { CourseCard } from "./course-card"
import { useCourseStore } from "@/lib/course-store"

export function CoursesGrid() {
  const courses = useCourseStore((state) => state.courses)

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No courses available. Add your first course!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} showDropdown={true} />
      ))}
    </div>
  )
}

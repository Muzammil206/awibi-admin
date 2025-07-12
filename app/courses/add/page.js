import { CoursesHeader } from "@/components/courses-header"
import { AddCourseForm } from "@/components/add-course-form"

export default function AddCoursePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CoursesHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Input course details</h1>
        </div>

        {/* Add Course Form */}
        <AddCourseForm />
      </main>
    </div>
  )
}

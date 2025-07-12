import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AddCourseButton() {
  return (
    <div className="mb-6">
      <Link href="/courses/add">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add New Course
        </Button>
      </Link>
    </div>
  )
}

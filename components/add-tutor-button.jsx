import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function AddTutorButton() {
  return (
    <div className="mb-6 flex justify-end">
      <Link href="/tutors/add">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add New Tutor
        </Button>
      </Link>
    </div>
  )
}

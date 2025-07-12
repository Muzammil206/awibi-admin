"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useTutorStore } from "@/lib/tutor-store"
import { TutorProfileModal } from "./tutor-profile-modal"
import { toast } from "sonner"
import Image from "next/image"

export function TutorsTable() {
  const { getFilteredTutors } = useTutorStore()
  const [selectedTutor, setSelectedTutor] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredTutors = getFilteredTutors()

  const handleTutorClick = (tutor) => {
    setSelectedTutor(tutor)
    setIsModalOpen(true)
  }

  const handleEdit = (tutor) => {
    toast.info("Edit functionality coming soon!")
    setIsModalOpen(false)
  }

  const handleDelete = (tutorId) => {
    if (confirm("Are you sure you want to delete this tutor?")) {
      toast.success("Tutor deleted successfully")
      setIsModalOpen(false)
    }
  }

  return (
    <div>
      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-600 font-medium">Tutor</TableHead>
              <TableHead className="text-gray-600 font-medium">Course</TableHead>
              <TableHead className="text-gray-600 font-medium">Category</TableHead>
              <TableHead className="text-gray-600 font-medium">Email address</TableHead>
              <TableHead className="text-gray-600 font-medium">Gender</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTutors.map((tutor) => (
              <TableRow
                key={tutor.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleTutorClick(tutor)}
              >
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src={tutor.avatar || "/placeholder.svg"}
                        alt={tutor.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{tutor.name}</div>
                      <div className="text-sm text-gray-500">{tutor.expertise}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{tutor.course}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {tutor.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600">{tutor.email}</TableCell>
                <TableCell className="text-gray-600">{tutor.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredTutors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tutors found matching your criteria.</p>
          </div>
        )}
      </div>

      <TutorProfileModal
        tutor={selectedTutor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

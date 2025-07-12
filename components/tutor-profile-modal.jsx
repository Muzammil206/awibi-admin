"use client"

import { Edit, Trash2, GraduationCap, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"

export function TutorProfileModal({ tutor, isOpen, onClose, onEdit, onDelete }) {
  if (!tutor) return null

  const sampleTeachers = [
    "/profilePicture.png?height=40&width=40",
    "/profilePicture.png?height=40&width=40",
    "/profilePicture.png?height=40&width=40",
    "/profilePicture.png?height=40&width=40",
    "/placeholder.svg?height=40&width=40",
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[901px] max-w-[901px] max-h-[90vh] overflow-y-auto p-0">
        <div className="relative p-6">
          {/* Delete Button - Adjusted positioning for more space */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-6 right-6 z-10 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full"
            onClick={() => onDelete(tutor.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>

          <div className="flex flex-col lg:flex-row gap-8 pt-4">
            {/* Left Side - Profile Image */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={tutor.avatar || "/placeholder.svg?height=160&width=160"}
                  alt={tutor.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Name and Title - Positioned below image */}
              <div className="text-center mt-4 space-y-1 max-w-[200px]">
                <h2 className="text-xl font-bold text-gray-900 break-words">{tutor.name}</h2>
                <p className="text-gray-500 text-sm break-words">{tutor.expertise}</p>
              </div>

              {/* Action Buttons - Centered below name */}
              <div className="flex justify-center space-x-3 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-12 h-12 rounded-full p-0 bg-blue-50 border-blue-200 hover:bg-blue-100"
                >
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-12 h-12 rounded-full p-0 bg-blue-50 border-blue-200 hover:bg-blue-100"
                >
                  <Phone className="w-5 h-5 text-blue-600" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-12 h-12 rounded-full p-0 bg-blue-50 border-blue-200 hover:bg-blue-100"
                >
                  <Mail className="w-5 h-5 text-blue-600" />
                </Button>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex-1 min-w-0 space-y-6">
              {/* About Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                <div className="max-h-32 overflow-y-auto pr-2">
                  <p className="text-gray-600 leading-relaxed text-sm break-words">{tutor.bio}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="min-w-0">
                  <span className="text-sm font-medium text-gray-500">Age</span>
                  <p className="text-gray-900 mt-1 break-words">{tutor.age}</p>
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-medium text-gray-500">Gender</span>
                  <p className="text-gray-900 mt-1 break-words">{tutor.gender}</p>
                </div>
              </div>

              {/* Teachers from same class */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Teachers from the same class</h4>
                <div className="flex items-center space-x-2 flex-wrap gap-2">
                  {sampleTeachers.map((teacher, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-full mr-[-20px] mb-[10px] overflow-hidden bg-gray-100 border-2 border-white shadow-sm flex-shrink-0"
                    >
                      <Image
                        src={teacher || "/placeholder.svg"}
                        alt={`Teacher ${index + 1}`}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <span className="text-sm text-blue-600 font-medium whitespace-nowrap">+19 more</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Button - Positioned at bottom center */}
          <div className="flex justify-center mt-8 pt-4 border-t border-gray-100">
            <Button
              variant="outline"
              className="flex items-center space-x-2 px-6 bg-transparent border-blue-300 text-blue-600 hover:bg-blue-50"
              onClick={() => onEdit(tutor)}
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

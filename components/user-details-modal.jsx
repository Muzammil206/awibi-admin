"use client"

import { useState, useEffect } from "react"
import { X, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useUserStore } from "@/lib/users-store"
import { toast } from "sonner"
import Image from "next/image"

export function UserDetailsModal({ user, isOpen, onClose, onNudge, onSuspend, onDeactivate }) {
  const updateUser = useUserStore((state) => state.updateUser)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    courses: "",
    avatar: "",
  })

  const [isEditing, setIsEditing] = useState(false) // State to manage edit mode
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        courses: user.courses !== undefined ? String(user.courses) : "",
        avatar: user.avatar || "/placeholder.svg?height=100&width=100",
      })
      setIsEditing(false) // Reset edit mode when user changes
    }
  }, [user])

  if (!user) return null

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSave = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address"
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required"
    if (!formData.courses.trim()) {
      newErrors.courses = "Courses is required"
    } else if (isNaN(Number.parseInt(formData.courses))) {
      newErrors.courses = "Invalid number of courses"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      updateUser(user.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        courses: Number.parseInt(formData.courses),
        avatar: formData.avatar,
      })
      toast.success("User details updated successfully!")
      setIsEditing(false)
    } else {
      toast.error("Please correct the errors in the form.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="flex flex-row items-center justify-between pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">User Details</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="p-0">
            <X className="w-5 h-5 text-gray-500" />
          </Button>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6">
          {/* Avatar */}
          <div className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <Image
              src={formData.avatar || "/placeholder.svg?height=96&width=96&query=user avatar"}
              alt="User Avatar"
              width={96}
              height={96}
              className="object-cover"
            />
            {isEditing && (
              <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full">
                <Camera className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Form Fields */}
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                disabled={!isEditing}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                disabled={!isEditing}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="courses">Courses</Label>
              <Input
                id="courses"
                type="number"
                value={formData.courses}
                onChange={(e) => handleInputChange("courses", e.target.value)}
                disabled={!isEditing}
                className={errors.courses ? "border-red-500" : ""}
              />
              {errors.courses && <p className="text-sm text-red-600">{errors.courses}</p>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-3 pt-4 border-t border-gray-200">
            {isEditing ? (
              <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Save Changes
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Edit Details
              </Button>
            )}

            <Button
              onClick={() => onNudge(user)}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              disabled={isEditing}
            >
              Nudge
            </Button>
            <Button
              onClick={() => onSuspend(user)}
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
              disabled={isEditing}
            >
              Suspend
            </Button>
            <Button
              onClick={() => onDeactivate(user)}
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
              disabled={isEditing}
            >
              Deactivate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

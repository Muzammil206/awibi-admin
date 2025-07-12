"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useTutorStore } from "@/lib/tutor-store"
import { useRouter } from "next/navigation"

export function AddTutorForm() {
  const router = useRouter()
  const addTutor = useTutorStore((state) => state.addTutors) // Assuming an addTutors function in your store

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    department: "",
    phoneNumber: "",
    gender: "",
    course: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address"
    }
    if (!formData.department.trim()) newErrors.department = "Department is required"
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"
    if (!formData.gender) newErrors.gender = "Gender is required"
    if (!formData.course) newErrors.course = "Course is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      toast.error("Please correct the errors in the form.")
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add tutor to store (assuming a simple add function)
      // In a real app, you'd send this to your backend/Supabase
      const newTutor = {
        id: Date.now().toString(), // Simple ID generation
        name: formData.fullName,
        email: formData.email,
        course: formData.course,
        category: formData.department, // Using department as category for consistency
        gender: formData.gender,
        expertise: "New Tutor", // Default expertise
        avatar: "/placeholder.svg?height=100&width=100",
        age: null,
        rating: null,
        bio: "New tutor added.",
        availability: "Available",
        hourlyRate: 0,
      }
      // This line needs to be updated to match the actual addTutors function in your store
      // For now, I'll just add it to the existing tutors array in the store
      useTutorStore.setState((state) => ({
        tutors: [...state.tutors, newTutor],
      }))

      toast.success("Tutor added successfully!")
      router.push("/tutors") // Redirect to tutors page
    } catch (error) {
      toast.error("Failed to add tutor. Please try again.")
      console.error("Error adding tutor:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Tutor</h1>
        <div className="flex space-x-4 mt-2">
          <span className="font-medium text-gray-700">Manually</span>
          <a href="#" className="text-blue-600 hover:underline">
            Import CSV
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className={errors.fullName ? "border-red-500" : ""}
          />
          {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
        </div>

        {/* Email and Department */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              placeholder="Department"
              value={formData.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
              className={errors.department ? "border-red-500" : ""}
            />
            {errors.department && <p className="text-sm text-red-600">{errors.department}</p>}
          </div>
        </div>

        {/* Phone Number and Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone number</Label>
            <Input
              id="phoneNumber"
              placeholder="Phone number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className={errors.phoneNumber ? "border-red-500" : ""}
            />
            {errors.phoneNumber && <p className="text-sm text-red-600">{errors.phoneNumber}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
              <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-sm text-red-600">{errors.gender}</p>}
          </div>
        </div>

        {/* Course */}
        <div className="space-y-2">
          <Label htmlFor="course">Course</Label>
          <Select value={formData.course} onValueChange={(value) => handleInputChange("course", value)}>
            <SelectTrigger className={errors.course ? "border-red-500" : ""}>
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fundamental Principles of Design">Fundamental Principles of Design</SelectItem>
              <SelectItem value="UI/UX Foundation">UI/UX Foundation</SelectItem>
              <SelectItem value="React Development">React Development</SelectItem>
              <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
            </SelectContent>
          </Select>
          {errors.course && <p className="text-sm text-red-600">{errors.course}</p>}
        </div>

        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
          {isSubmitting ? "Adding Tutor..." : "Add Tutor"}
        </Button>
      </form>
    </div>
  )
}

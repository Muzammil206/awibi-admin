"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useCourseStore } from "@/lib/course-store"
import { toast } from "sonner"

export function AddCourseForm() {
  const router = useRouter()
  const addCourse = useCourseStore((state) => state.addCourse)

  const [formData, setFormData] = useState({
    title: "",
    courseId: "",
    instructor: "",
    email: "",
    category: "",
    description: "",
    startDate: "",
    endDate: "",
    image: null,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file size (1MB = 1048576 bytes)
      if (file.size > 1048576) {
        setErrors((prev) => ({ ...prev, image: "Image size should be under 1MB" }))
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, image: "Please select a valid image file" }))
        return
      }

      setFormData((prev) => ({ ...prev, image: file }))
      setErrors((prev) => ({ ...prev, image: "" }))

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) newErrors.title = "Course title is required"
    if (!formData.courseId.trim()) newErrors.courseId = "Course ID is required"
    if (!formData.instructor.trim()) newErrors.instructor = "Instructor name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.startDate) newErrors.startDate = "Start date is required"
    if (!formData.endDate) newErrors.endDate = "End date is required"

    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = "End date must be after start date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add course to store
      const newCourse = addCourse(formData)

      toast.success("Course added successfully!")
      router.push("/courses")
    } catch (error) {
      toast.error("Failed to add course. Please try again.")
      console.error("Error adding course:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image Upload */}
        <div className="space-y-4">
          <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                {imagePreview ? (
                  <div className="relative w-32 h-32 mx-auto">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Course preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}

                <div>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="image-upload">
                    <Button type="button" variant="outline" className="cursor-pointer bg-transparent" asChild>
                      <span className="flex items-center space-x-2">
                        <Upload className="w-4 h-4" />
                        <span>Upload Photo</span>
                      </span>
                    </Button>
                  </label>
                </div>

                <p className="text-sm text-gray-500">
                  Image size should be under 1MB and
                  <br />
                  image ratio needs to be 1:1
                </p>

                {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Form Fields */}
        <div className="space-y-6">
          {/* Course Title and Course ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course title</Label>
              <Input
                id="title"
                placeholder="Course title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseId">Course ID</Label>
              <Input
                id="courseId"
                placeholder="Course ID"
                value={formData.courseId}
                onChange={(e) => handleInputChange("courseId", e.target.value)}
                className={errors.courseId ? "border-red-500" : ""}
              />
              {errors.courseId && <p className="text-sm text-red-600">{errors.courseId}</p>}
            </div>
          </div>

          {/* Instructor Name */}
          <div className="space-y-2">
            <Label htmlFor="instructor">Instructor Name</Label>
            <Input
              id="instructor"
              placeholder="Instructor name"
              value={formData.instructor}
              onChange={(e) => handleInputChange("instructor", e.target.value)}
              className={errors.instructor ? "border-red-500" : ""}
            />
            {errors.instructor && <p className="text-sm text-red-600">{errors.instructor}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Analytics">Analytics</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <div className="relative">
              <Textarea
                id="description"
                placeholder="Your title, profession or small biography"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className={`min-h-[100px] resize-none ${errors.description ? "border-red-500" : ""}`}
                maxLength={100}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">{formData.description.length}/100</div>
            </div>
            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Start and End Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className={errors.startDate ? "border-red-500" : ""}
              />
              {errors.startDate && <p className="text-sm text-red-600">{errors.startDate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className={errors.endDate ? "border-red-500" : ""}
              />
              {errors.endDate && <p className="text-sm text-red-600">{errors.endDate}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-center">
        <Button type="submit" size="lg" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 px-8">
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}

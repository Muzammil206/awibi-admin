"use client"

import { useState } from "react"
import { Upload, ImageIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { useCourseStore } from "@/lib/course-store"
import { toast } from "sonner"

export function AddCourseModal({ isOpen, onClose }) {
  const addCourse = useCourseStore((state) => state.addCourse)

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    educator: "",
    courseDuration: "",
    price: "",
    discount: "10%", // Default from image
    moduleTitle: "",
    moduleDescription: "",
    moduleContent: "", // Placeholder for upload
    isFreeCourse: false,
    image: null,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 1048576) {
        setErrors((prev) => ({ ...prev, image: "Image size should be under 1MB" }))
        return
      }
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, image: "Please select a valid image file" }))
        return
      }

      setFormData((prev) => ({ ...prev, image: file }))
      setErrors((prev) => ({ ...prev, image: "" }))

      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) newErrors.title = "Course title is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.educator.trim()) newErrors.educator = "Educator is required"
    if (!formData.courseDuration.trim()) newErrors.courseDuration = "Course duration is required"
    if (!formData.price.trim() && !formData.isFreeCourse) newErrors.price = "Price is required for paid courses"
    if (formData.price.trim() && isNaN(Number.parseFloat(formData.price))) newErrors.price = "Invalid price"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (status) => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newCourse = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        educator: formData.educator,
        courseDuration: formData.courseDuration,
        price: formData.isFreeCourse ? "0.00" : formData.price,
        discount: formData.discount,
        modules: formData.moduleTitle
          ? [{ title: formData.moduleTitle, description: formData.moduleDescription, content: formData.moduleContent }]
          : [],
        isFreeCourse: formData.isFreeCourse,
        image: imagePreview, // Use the base64 image preview for now
        status: status,
        instructor: formData.educator, // Map educator to instructor for existing CourseCard/Table
        tags: "", // Default empty, can be expanded
      }

      addCourse(newCourse)

      toast.success(`Course ${status === "Published" ? "published" : "drafted"} successfully!`)
      onClose()
      // Reset form after successful submission
      setFormData({
        title: "",
        category: "",
        description: "",
        educator: "",
        courseDuration: "",
        price: "",
        discount: "10%",
        moduleTitle: "",
        moduleDescription: "",
        moduleContent: "",
        isFreeCourse: false,
        image: null,
      })
      setImagePreview(null)
    } catch (error) {
      toast.error("Failed to add course. Please try again.")
      console.error("Error adding course:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="flex flex-row items-center justify-between pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">Course Details</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="p-0">
            <X className="w-5 h-5 text-gray-500" />
          </Button>
        </DialogHeader>

        <form className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-4">
            <Label htmlFor="image-upload-area" className="text-sm font-medium text-gray-700">
              Upload Course Thumbnails
            </Label>
            <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="space-y-4">
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

                  <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
                  <div>
                    <input
                      type="file"
                      id="image-upload-area"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="image-upload-area">
                      <Button type="button" variant="outline" className="cursor-pointer bg-transparent" asChild>
                        <span className="flex items-center space-x-2">
                          <Upload className="w-4 h-4" />
                          <span>Upload Photo</span>
                        </span>
                      </Button>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Image size should be under 1MB and image ratio needs to be 1:1
                  </p>
                  {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Title and Category */}
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
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Development">Development</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Analytics">Analytics</SelectItem>
                  <SelectItem value="Programming">Programming</SelectItem>
                  <SelectItem value="Mobile Dev">Mobile Dev</SelectItem>
                  <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                  <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <div className="relative">
              <Textarea
                id="description"
                placeholder="About course"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className={`min-h-[100px] resize-none ${errors.description ? "border-red-500" : ""}`}
                maxLength={100}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">{formData.description.length}/100</div>
            </div>
            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Educator and Course Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="educator">Educator</Label>
              <Input
                id="educator"
                placeholder="Educator"
                value={formData.educator}
                onChange={(e) => handleInputChange("educator", e.target.value)}
                className={errors.educator ? "border-red-500" : ""}
              />
              {errors.educator && <p className="text-sm text-red-600">{errors.educator}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseDuration">Course Duration</Label>
              <Input
                id="courseDuration"
                placeholder="No. of modules"
                value={formData.courseDuration}
                onChange={(e) => handleInputChange("courseDuration", e.target.value)}
                className={errors.courseDuration ? "border-red-500" : ""}
              />
              {errors.courseDuration && <p className="text-sm text-red-600">{errors.courseDuration}</p>}
            </div>
          </div>

          {/* Price and Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className={errors.price ? "border-red-500" : ""}
                disabled={formData.isFreeCourse}
              />
              {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Discount</Label>
              <Input
                id="discount"
                placeholder="10%"
                value={formData.discount}
                onChange={(e) => handleInputChange("discount", e.target.value)}
              />
            </div>
          </div>

          {/* Module Section */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900">Module</h3>
            <div className="space-y-2">
              <Label htmlFor="moduleTitle">Title</Label>
              <Input
                id="moduleTitle"
                placeholder="Title"
                value={formData.moduleTitle}
                onChange={(e) => handleInputChange("moduleTitle", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="moduleDescription">Module description</Label>
              <Textarea
                id="moduleDescription"
                placeholder="Details"
                value={formData.moduleDescription}
                onChange={(e) => handleInputChange("moduleDescription", e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="moduleContent">Module content</Label>
              <Input
                id="moduleContent"
                placeholder="Upload"
                value={formData.moduleContent}
                onChange={(e) => handleInputChange("moduleContent", e.target.value)}
              />
            </div>
            <Button variant="outline" className="bg-transparent text-green-600 hover:bg-green-50">
              Add Content
            </Button>
            <div className="border-t border-gray-200 pt-4">
              <Button variant="outline" className="bg-transparent text-green-600 hover:bg-green-50">
                Add New Module
              </Button>
            </div>
          </div>

          {/* Free Course Toggle */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <Label htmlFor="free-course" className="text-base font-medium text-gray-900">
              Free Course
            </Label>
            <Switch
              id="free-course"
              checked={formData.isFreeCourse}
              onCheckedChange={(checked) => {
                handleInputChange("isFreeCourse", checked)
                if (checked) {
                  handleInputChange("price", "0.00") // Set price to 0 if free
                }
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              className="bg-transparent text-green-600 hover:bg-green-50"
              onClick={() => handleSubmit("Draft")}
              disabled={isSubmitting}
            >
              Draft
            </Button>
            <Button
              type="button"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => handleSubmit("Published")}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

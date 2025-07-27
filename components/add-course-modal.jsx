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
    description: "",
    category_id: "", // Will need to fetch categories from backend
    price: "",
    summary: "",
    discounted_price: "",
    duration: "",
    level: "beginner",
    thumbnail_url: null,
    instructor_name: "",
    is_published: false,
    modules: [{
      title: "",
      description: "",
      is_published: true,
      contents: [{
        content_type: "video",
        title: "",
        description: "",
        video_url: "",
        is_published: true
      }]
    }]
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
    if (!formData.category_id) newErrors.category_id = "Category is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.instructor_name.trim()) newErrors.instructor_name = "Instructor name is required"
    if (!formData.duration) newErrors.duration = "Course duration is required"
    if (!formData.price && formData.price !== 0) newErrors.price = "Price is required"
    if (formData.price && isNaN(Number(formData.price))) newErrors.price = "Invalid price"
    if (!formData.summary.trim()) newErrors.summary = "Summary is required"
    
    // Validate modules
    const moduleErrors = formData.modules.some(module => {
      return !module.title.trim() || !module.description.trim() || 
        module.contents.some(content => !content.title.trim() || !content.description.trim() || !content.video_url.trim())
    })
    
    if (moduleErrors) {
      newErrors.modules = "All modules and their contents must be filled out"
      toast.error("Please complete all module and content information")
    }

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
      // Generate a slug from the title
      const slug = formData.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')

      const courseData = {
        title: formData.title,
        description: formData.description,
        category_id: formData.category_id,
        price: Number(formData.price),
        slug: slug,
        summary: formData.summary,
        discounted_price: Number(formData.discounted_price),
        duration: Number(formData.duration),
        level: formData.level,
        thumbnail_url: imagePreview, // This should be updated to use actual uploaded image URL
        instructor_name: formData.instructor_name,
        is_published: status === "Published",
        modules: formData.modules.map(module => ({
          title: module.title,
          description: module.description,
          is_published: true,
          contents: module.contents.map(content => ({
            content_type: content.content_type,
            title: content.title,
            description: content.description,
            video_url: content.video_url,
            is_published: true
          }))
        }))
      }

      // Get auth token
      const token = localStorage.getItem("authToken")
      if (!token) {
        throw new Error("No authentication token available. Please login first.")
      }

      // Make API call to backend
      const response = await fetch('http://localhost:3000/api/v1/courses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData)
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please login again.")
        }
        throw new Error(`Failed to create course: ${response.status}`)
      }

      toast.success(`Course ${status === "Published" ? "published" : "drafted"} successfully!`)
      onClose()

      // Reset form
      setFormData({
        title: "",
        description: "",
        category_id: "",
        price: "",
        summary: "",
        discounted_price: "",
        duration: "",
        level: "beginner",
        thumbnail_url: null,
        instructor_name: "",
        is_published: false,
        modules: [{
          title: "",
          description: "",
          is_published: true,
          contents: [{
            content_type: "video",
            title: "",
            description: "",
            video_url: "",
            is_published: true
          }]
        }]
      })
      setImagePreview(null)

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
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto p-6"
        description="Form to add a new course to the platform. Fill in course details including title, category, description, educator information, and pricing."
      >
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
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                placeholder="Enter course title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category_id} onValueChange={(value) => handleInputChange("category_id", value)}>
                <SelectTrigger className={errors.category_id ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="444d3f42-44ec-45dd-985e-e007860ff7ce">Programming</SelectItem>
                  {/* Add other categories with their UUIDs */}
                </SelectContent>
              </Select>
              {errors.category_id && <p className="text-sm text-red-600">{errors.category_id}</p>}
            </div>
          </div>

          {/* Description and Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Detailed course description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className={`min-h-[100px] resize-none ${errors.description ? "border-red-500" : ""}`}
              />
              {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                placeholder="Brief course summary"
                value={formData.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>
          </div>

          {/* Instructor and Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instructor_name">Instructor Name</Label>
              <Input
                id="instructor_name"
                placeholder="Enter instructor name"
                value={formData.instructor_name}
                onChange={(e) => handleInputChange("instructor_name", e.target.value)}
                className={errors.instructor_name ? "border-red-500" : ""}
              />
              {errors.instructor_name && <p className="text-sm text-red-600">{errors.instructor_name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Course Level</Label>
              <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Duration and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="Enter course duration"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                className={errors.duration ? "border-red-500" : ""}
              />
              {errors.duration && <p className="text-sm text-red-600">{errors.duration}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="Enter course price"
                value={formData.price}
                onChange={(e) => handleInputChange("price", Number(e.target.value))}
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
            </div>
          </div>

          {/* Discounted Price */}
          <div className="space-y-2">
            <Label htmlFor="discounted_price">Discounted Price ($)</Label>
            <Input
              id="discounted_price"
              type="number"
              step="0.01"
              placeholder="Enter discounted price"
              value={formData.discounted_price}
              onChange={(e) => handleInputChange("discounted_price", Number(e.target.value))}
            />
          </div>

          {/* Module Section */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Modules</h3>
              <Button 
                variant="outline" 
                className="bg-transparent text-green-600 hover:bg-green-50"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    modules: [...prev.modules, {
                      title: "",
                      description: "",
                      is_published: true,
                      contents: []
                    }]
                  }))
                }}
                type="button"
              >
                Add New Module
              </Button>
            </div>

            {formData.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="space-y-4 border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-md font-medium">Module {moduleIndex + 1}</h4>
                  {moduleIndex > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          modules: prev.modules.filter((_, i) => i !== moduleIndex)
                        }))
                      }}
                      type="button"
                    >
                      Remove Module
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Module Title</Label>
                  <Input
                    value={module.title}
                    onChange={(e) => {
                      const newModules = [...formData.modules]
                      newModules[moduleIndex].title = e.target.value
                      setFormData(prev => ({ ...prev, modules: newModules }))
                    }}
                    placeholder="Enter module title"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Module Description</Label>
                  <Textarea
                    value={module.description}
                    onChange={(e) => {
                      const newModules = [...formData.modules]
                      newModules[moduleIndex].description = e.target.value
                      setFormData(prev => ({ ...prev, modules: newModules }))
                    }}
                    placeholder="Enter module description"
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium">Contents</h5>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 hover:bg-green-50"
                      onClick={() => {
                        const newModules = [...formData.modules]
                        newModules[moduleIndex].contents.push({
                          content_type: "video",
                          title: "",
                          description: "",
                          video_url: "",
                          is_published: true
                        })
                        setFormData(prev => ({ ...prev, modules: newModules }))
                      }}
                      type="button"
                    >
                      Add Content
                    </Button>
                  </div>

                  {module.contents.map((content, contentIndex) => (
                    <div key={contentIndex} className="space-y-3 border-l-2 border-gray-200 pl-4">
                      <div className="flex items-center justify-between">
                        <Label>Content {contentIndex + 1}</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => {
                            const newModules = [...formData.modules]
                            newModules[moduleIndex].contents = module.contents.filter((_, i) => i !== contentIndex)
                            setFormData(prev => ({ ...prev, modules: newModules }))
                          }}
                          type="button"
                        >
                          Remove
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Input
                          value={content.title}
                          onChange={(e) => {
                            const newModules = [...formData.modules]
                            newModules[moduleIndex].contents[contentIndex].title = e.target.value
                            setFormData(prev => ({ ...prev, modules: newModules }))
                          }}
                          placeholder="Content title"
                        />
                        <Textarea
                          value={content.description}
                          onChange={(e) => {
                            const newModules = [...formData.modules]
                            newModules[moduleIndex].contents[contentIndex].description = e.target.value
                            setFormData(prev => ({ ...prev, modules: newModules }))
                          }}
                          placeholder="Content description"
                          className="min-h-[60px]"
                        />
                        <Input
                          value={content.video_url}
                          onChange={(e) => {
                            const newModules = [...formData.modules]
                            newModules[moduleIndex].contents[contentIndex].video_url = e.target.value
                            setFormData(prev => ({ ...prev, modules: newModules }))
                          }}
                          placeholder="Video URL"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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

"use client"

import { useState } from "react"
import { X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useResourceStore } from "@/lib/resource-store"
import { toast } from "sonner"

export function AddEventModal({ isOpen, onClose }) {
  const addEvent = useResourceStore((state) => state.addEvent)

  const [formData, setFormData] = useState({
    eventTitle: "",
    description: "",
    date: "",
    time: "",
    location: "",
    eventBanner: null, // File object
    registrationLimit: "",
    isRecurringEvent: false,
    isOnline: false,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bannerPreview, setBannerPreview] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleBannerUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 1048576) {
        setErrors((prev) => ({ ...prev, eventBanner: "Banner size should be under 1MB" }))
        return
      }
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ prev, eventBanner: "Please select a valid image file" }))
        return
      }

      setFormData((prev) => ({ ...prev, eventBanner: file }))
      setErrors((prev) => ({ ...prev, eventBanner: "" }))

      const reader = new FileReader()
      reader.onload = (e) => setBannerPreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.eventTitle.trim()) newErrors.eventTitle = "Event title is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.date) newErrors.date = "Date is required"
    if (!formData.time) newErrors.time = "Time is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.registrationLimit) newErrors.registrationLimit = "Registration limit is required"
    if (formData.registrationLimit && isNaN(Number.parseInt(formData.registrationLimit))) {
      newErrors.registrationLimit = "Invalid limit"
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
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newEvent = {
        name: formData.eventTitle,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        eventBanner: bannerPreview, // Use base64 preview for now
        registrationLimit: formData.registrationLimit,
        isRecurringEvent: formData.isRecurringEvent,
        isOnline: formData.isOnline,
        status: status, // "Draft" or "Post"
      }

      addEvent(newEvent)

      toast.success(`Event ${status === "Post" ? "posted" : "drafted"} successfully!`)
      onClose()
      // Reset form after successful submission
      setFormData({
        eventTitle: "",
        description: "",
        date: "",
        time: "",
        location: "",
        eventBanner: null,
        registrationLimit: "",
        isRecurringEvent: false,
        isOnline: false,
      })
      setBannerPreview(null)
    } catch (error) {
      toast.error("Failed to add event. Please try again.")
      console.error("Error adding event:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="flex flex-row items-center justify-between pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">Event Details</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="p-0">
            <X className="w-5 h-5 text-gray-500" />
          </Button>
        </DialogHeader>

        <form className="space-y-6">
          {/* Event Title */}
          <div className="space-y-2">
            <Label htmlFor="eventTitle">Event Title</Label>
            <Input
              id="eventTitle"
              placeholder="Enter event title"
              value={formData.eventTitle}
              onChange={(e) => handleInputChange("eventTitle", e.target.value)}
              className={errors.eventTitle ? "border-red-500" : ""}
            />
            {errors.eventTitle && <p className="text-sm text-red-600">{errors.eventTitle}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="eventDescription">Description</Label>
            <div className="relative">
              <Textarea
                id="eventDescription"
                placeholder="About event"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className={`min-h-[100px] resize-none ${errors.description ? "border-red-500" : ""}`}
                maxLength={100}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">{formData.description.length}/100</div>
            </div>
            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventDate">Date</Label>
              <Input
                id="eventDate"
                type="date" // Using type="date" for simplicity
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className={errors.date ? "border-red-500" : ""}
              />
              {errors.date && <p className="text-sm text-red-600">{errors.date}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventTime">Time</Label>
              <Input
                id="eventTime"
                type="time" // Using type="time" for simplicity
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className={errors.time ? "border-red-500" : ""}
              />
              {errors.time && <p className="text-sm text-red-600">{errors.time}</p>}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="eventLocation">Location</Label>
            <Input
              id="eventLocation"
              placeholder="Enter location address"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
          </div>

          {/* Event Banner */}
          <div className="space-y-2">
            <Label htmlFor="eventBanner">Event banner</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="eventBanner"
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                className={errors.eventBanner ? "border-red-500" : ""}
              />
              <Button type="button" variant="outline" className="flex-shrink-0 bg-transparent">
                <Upload className="w-4 h-4 mr-2" /> Upload
              </Button>
            </div>
            {bannerPreview && (
              <div className="mt-2">
                <img
                  src={bannerPreview || "/placeholder.svg"}
                  alt="Banner preview"
                  className="w-32 h-auto rounded-md"
                />
              </div>
            )}
            {errors.eventBanner && <p className="text-sm text-red-600">{errors.eventBanner}</p>}
          </div>

          {/* Registration Limit */}
          <div className="space-y-2">
            <Label htmlFor="registrationLimit">Registration limit</Label>
            <Input
              id="registrationLimit"
              placeholder="Select limit"
              value={formData.registrationLimit}
              onChange={(e) => handleInputChange("registrationLimit", e.target.value)}
              className={errors.registrationLimit ? "border-red-500" : ""}
            />
            {errors.registrationLimit && <p className="text-sm text-red-600">{errors.registrationLimit}</p>}
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col space-y-2 pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="eventRecurringEvent"
                checked={formData.isRecurringEvent}
                onCheckedChange={(checked) => handleInputChange("isRecurringEvent", checked)}
              />
              <Label htmlFor="eventRecurringEvent">Recurring Event</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="eventOnline"
                checked={formData.isOnline}
                onCheckedChange={(checked) => handleInputChange("isOnline", checked)}
              />
              <Label htmlFor="eventOnline">Online</Label>
            </div>
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
              onClick={() => handleSubmit("Post")}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

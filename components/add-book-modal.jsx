"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useResourceStore } from "@/lib/resource-store"
import { toast } from "sonner"

export function AddBookModal({ isOpen, onClose }) {
  const addBook = useResourceStore((state) => state.addBook)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    author: "",
    isbn: "",
    publication: "",
    isRecurringEvent: false, // Misplaced for book, but included as per image
    isOnline: false, // Misplaced for book, but included as per image
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

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.price.trim()) {
      newErrors.price = "Price is required"
    } else if (isNaN(Number.parseFloat(formData.price))) {
      newErrors.price = "Invalid price"
    }
    if (!formData.author.trim()) newErrors.author = "Author is required"
    if (!formData.isbn.trim()) newErrors.isbn = "ISBN is required"
    if (!formData.publication.trim()) newErrors.publication = "Publication is required"

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

      const newBook = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: formData.price,
        author: formData.author,
        isbn: formData.isbn,
        publication: formData.publication,
        isRecurringEvent: formData.isRecurringEvent,
        isOnline: formData.isOnline,
        uploaded: "Just now", // Set current time for display
        status: status, // "Draft" or "Post"
      }

      addBook(newBook)

      toast.success(`Book ${status === "Post" ? "posted" : "drafted"} successfully!`)
      onClose()
      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
        author: "",
        isbn: "",
        publication: "",
        isRecurringEvent: false,
        isOnline: false,
      })
    } catch (error) {
      toast.error("Failed to add book. Please try again.")
      console.error("Error adding book:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="flex flex-row items-center justify-between pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">Book Details</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="p-0">
            <X className="w-5 h-5 text-gray-500" />
          </Button>
        </DialogHeader>

        <form className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="bookTitle">Title</Label>
            <Input
              id="bookTitle"
              placeholder="Enter title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="bookDescription">Description</Label>
            <div className="relative">
              <Textarea
                id="bookDescription"
                placeholder="About book"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className={`min-h-[100px] resize-none ${errors.description ? "border-red-500" : ""}`}
                maxLength={100}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">{formData.description.length}/100</div>
            </div>
            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Category and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bookCategory">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Literature">Literature</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bookPrice">Price</Label>
              <Input
                id="bookPrice"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
            </div>
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="bookAuthor">Author</Label>
            <Input
              id="bookAuthor"
              placeholder="Enter author"
              value={formData.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
              className={errors.author ? "border-red-500" : ""}
            />
            {errors.author && <p className="text-sm text-red-600">{errors.author}</p>}
          </div>

          {/* ISBN */}
          <div className="space-y-2">
            <Label htmlFor="bookISBN">ISBN</Label>
            <Input
              id="bookISBN"
              placeholder="0000 0000 0000 0000"
              value={formData.isbn}
              onChange={(e) => handleInputChange("isbn", e.target.value)}
              className={errors.isbn ? "border-red-500" : ""}
            />
            {errors.isbn && <p className="text-sm text-red-600">{errors.isbn}</p>}
          </div>

          {/* Publication */}
          <div className="space-y-2">
            <Label htmlFor="bookPublication">Publication</Label>
            <Input
              id="bookPublication"
              placeholder="Enter"
              value={formData.publication}
              onChange={(e) => handleInputChange("publication", e.target.value)}
              className={errors.publication ? "border-red-500" : ""}
            />
            {errors.publication && <p className="text-sm text-red-600">{errors.publication}</p>}
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col space-y-2 pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="bookRecurringEvent"
                checked={formData.isRecurringEvent}
                onCheckedChange={(checked) => handleInputChange("isRecurringEvent", checked)}
              />
              <Label htmlFor="bookRecurringEvent">Recurring Event</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="bookOnline"
                checked={formData.isOnline}
                onCheckedChange={(checked) => handleInputChange("isOnline", checked)}
              />
              <Label htmlFor="bookOnline">Online</Label>
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

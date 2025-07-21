"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"

export function CreateCouponModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    couponCode: "",
    description: "",
    discountType: "",
    discountValue: "",
    startDate: "",
    expiryDate: "",
    applicationScope: "",
    usageLimit: "",
    minimumPurchaseAmount: "",
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

    if (!formData.couponCode.trim()) newErrors.couponCode = "Coupon code is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.discountType.trim()) newErrors.discountType = "Discount type is required"
    if (!formData.discountValue.trim()) {
      newErrors.discountValue = "Discount value is required"
    } else if (isNaN(Number.parseFloat(formData.discountValue))) {
      newErrors.discountValue = "Invalid discount value"
    }
    if (!formData.startDate) newErrors.startDate = "Start date is required"
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required"
    if (formData.startDate && formData.expiryDate && new Date(formData.startDate) >= new Date(formData.expiryDate)) {
      newErrors.expiryDate = "Expiry date must be after start date"
    }
    if (!formData.applicationScope.trim()) newErrors.applicationScope = "Application scope is required"
    if (!formData.usageLimit.trim()) {
      newErrors.usageLimit = "Usage limit is required"
    } else if (isNaN(Number.parseInt(formData.usageLimit))) {
      newErrors.usageLimit = "Invalid usage limit"
    }
    if (!formData.minimumPurchaseAmount.trim()) {
      newErrors.minimumPurchaseAmount = "Minimum purchase amount is required"
    } else if (isNaN(Number.parseFloat(formData.minimumPurchaseAmount))) {
      newErrors.minimumPurchaseAmount = "Invalid amount"
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

      // In a real application, you would send formData to your backend
      console.log("Submitting coupon:", { ...formData, status })

      toast.success(`Coupon ${status === "Published" ? "published" : "drafted"} successfully!`)
      onClose()
      // Reset form after successful submission
      setFormData({
        couponCode: "",
        description: "",
        discountType: "",
        discountValue: "",
        startDate: "",
        expiryDate: "",
        applicationScope: "",
        usageLimit: "",
        minimumPurchaseAmount: "",
      })
    } catch (error) {
      toast.error("Failed to create coupon. Please try again.")
      console.error("Error creating coupon:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="flex flex-row items-center justify-between pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">Create Coupon</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="p-0">
            <X className="w-5 h-5 text-gray-500" />
          </Button>
        </DialogHeader>

        <form className="space-y-6">
          {/* Coupon Code */}
          <div className="space-y-2">
            <Label htmlFor="couponCode">Coupon code</Label>
            <Input
              id="couponCode"
              placeholder="Enter coupon code"
              value={formData.couponCode}
              onChange={(e) => handleInputChange("couponCode", e.target.value)}
              className={errors.couponCode ? "border-red-500" : ""}
            />
            {errors.couponCode && <p className="text-sm text-red-600">{errors.couponCode}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <div className="relative">
              <Textarea
                id="description"
                placeholder="About coupon"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className={`min-h-[100px] resize-none ${errors.description ? "border-red-500" : ""}`}
                maxLength={100}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">{formData.description.length}/100</div>
            </div>
            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Discount Type and Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discountType">Discount type</Label>
              <Input
                id="discountType"
                placeholder="Enter discount type"
                value={formData.discountType}
                onChange={(e) => handleInputChange("discountType", e.target.value)}
                className={errors.discountType ? "border-red-500" : ""}
              />
              {errors.discountType && <p className="text-sm text-red-600">{errors.discountType}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountValue">Discount value</Label>
              <Input
                id="discountValue"
                placeholder="Enter discount value"
                value={formData.discountValue}
                onChange={(e) => handleInputChange("discountValue", e.target.value)}
                className={errors.discountValue ? "border-red-500" : ""}
              />
              {errors.discountValue && <p className="text-sm text-red-600">{errors.discountValue}</p>}
            </div>
          </div>

          {/* Start Date and Expiry Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start date</Label>
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
              <Label htmlFor="expiryDate">Expiry date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                className={errors.expiryDate ? "border-red-500" : ""}
              />
              {errors.expiryDate && <p className="text-sm text-red-600">{errors.expiryDate}</p>}
            </div>
          </div>

          {/* Application Scope */}
          <div className="space-y-2">
            <Label htmlFor="applicationScope">Application scope</Label>
            <Input
              id="applicationScope"
              placeholder="Enter scope"
              value={formData.applicationScope}
              onChange={(e) => handleInputChange("applicationScope", e.target.value)}
              className={errors.applicationScope ? "border-red-500" : ""}
            />
            {errors.applicationScope && <p className="text-sm text-red-600">{errors.applicationScope}</p>}
          </div>

          {/* Usage Limit */}
          <div className="space-y-2">
            <Label htmlFor="usageLimit">Usage limit</Label>
            <Input
              id="usageLimit"
              placeholder="Details"
              value={formData.usageLimit}
              onChange={(e) => handleInputChange("usageLimit", e.target.value)}
              className={errors.usageLimit ? "border-red-500" : ""}
            />
            {errors.usageLimit && <p className="text-sm text-red-600">{errors.usageLimit}</p>}
          </div>

          {/* Minimum Purchase Amount */}
          <div className="space-y-2">
            <Label htmlFor="minimumPurchaseAmount">Minimum purchase amount</Label>
            <Input
              id="minimumPurchaseAmount"
              placeholder="Details"
              value={formData.minimumPurchaseAmount}
              onChange={(e) => handleInputChange("minimumPurchaseAmount", e.target.value)}
              className={errors.minimumPurchaseAmount ? "border-red-500" : ""}
            />
            {errors.minimumPurchaseAmount && <p className="text-sm text-red-600">{errors.minimumPurchaseAmount}</p>}
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

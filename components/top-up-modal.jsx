"use client"

import { useState } from "react"
import { CreditCard, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTutorStore } from "@/lib/tutor-store"
import { toast } from "sonner"

export function TopUpModal({ isOpen, onClose }) {
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const addCredits = useTutorStore((state) => state.addCredits)
  const credits = useTutorStore((state) => state.credits)

  const creditPackages = [
    { id: 1, credits: 50, price: 25, popular: false },
    { id: 2, credits: 100, price: 45, popular: true, savings: "10% OFF" },
    { id: 3, credits: 250, price: 100, popular: false, savings: "20% OFF" },
    { id: 4, credits: 500, price: 180, popular: false, savings: "28% OFF" },
  ]

  const handlePurchase = async () => {
    if (!selectedPackage) {
      toast.error("Please select a credit package")
      return
    }

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      addCredits(selectedPackage.credits)
      toast.success(`Successfully added ${selectedPackage.credits} credits to your account!`)
      onClose()
    } catch (error) {
      toast.error("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-2xl">
            <Zap className="w-6 h-6 text-yellow-500" />
            <span>Top Up Credits</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Credit Packages */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Choose Credit Package</h3>
              <div className="text-sm text-gray-600">
                Current Balance: <span className="font-semibold text-blue-600">{credits} credits</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {creditPackages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedPackage?.id === pkg.id ? "ring-2 ring-blue-500 border-blue-500" : "hover:shadow-md"
                  } ${pkg.popular ? "border-yellow-400 bg-yellow-50" : ""}`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  <CardContent className="p-4 text-center">
                    {pkg.popular && (
                      <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block">
                        MOST POPULAR
                      </div>
                    )}
                    <div className="text-2xl font-bold text-gray-900">{pkg.credits}</div>
                    <div className="text-sm text-gray-600 mb-2">Credits</div>
                    <div className="text-xl font-semibold text-blue-600">${pkg.price}</div>
                    {pkg.savings && <div className="text-xs text-green-600 font-medium mt-1">{pkg.savings}</div>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Payment Information</h3>

            {selectedPackage && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Selected Package:</span>
                    <span className="font-bold">{selectedPackage.credits} Credits</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-medium">Total Amount:</span>
                    <span className="font-bold text-blue-600">${selectedPackage.price}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="text-center" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input id="cardName" placeholder="John Doe" />
              </div>
            </div>

            <div className="flex space-x-3">
              <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent" disabled={isProcessing}>
                Cancel
              </Button>
              <Button
                onClick={handlePurchase}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={!selectedPackage || isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Purchase Credits</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

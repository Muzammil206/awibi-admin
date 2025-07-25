"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation" // Import useRouter

export function SignupForm() {
  const router = useRouter() // Initialize useRouter
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [userName, setUserName] = useState("") // Corresponds to 'username' in API
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [errors, setErrors] = useState({}) // State for validation errors
  const [isSubmitting, setIsSubmitting] = useState(false) // State for loading indicator

  const Role = "admin" // Corresponds to 'role' in API

  const validateForm = () => {
    const newErrors = {}
    if (!email.trim()) {
      newErrors.email = "Email address is required."
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address."
    }
    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required."
    }
    if (!userName.trim()) {
      newErrors.userName = "Admin Name is required."
    }
    if (!password) {
      newErrors.password = "Password is required."
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long."
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required."
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match."
    }
    if (!agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and privacy policy."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please correct the errors in the form.")
      return // Stop submission if validation fails
    }

    setIsSubmitting(true) // Start loading

    try {
      const res = await fetch("https://lms-backend-yux4.onrender.com/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Corrected payload keys to match endpoint expectations
        body: JSON.stringify({
          email: email,
          role: Role, // 'Role' changed to 'role'
          username: userName, // 'userName' changed to 'username'
          password: password,
        }),
      })

      const data = await res.json()
      console.log(data)

      if (data.success) {
        toast.success("Account created successfully! Redirecting to login...")
        router.push("/Login") // Redirect to login page
      } else {
        toast.error(data.message || "Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("Network or API error:", error)
      toast.error("An error occurred while creating your account. Please try again.")
    } finally {
      setIsSubmitting(false) // End loading
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Create new account</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : ""
            }`}
            required
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
              errors.fullName ? "border-red-500" : ""
            }`}
            required
          />
          {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="userName" className="text-sm font-medium text-gray-700">
            Admin Name
          </Label>
          <Input
            id="userName"
            type="text"
            placeholder="Enter admin name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
              errors.userName ? "border-red-500" : ""
            }`}
            required
          />
          {errors.userName && <p className="text-sm text-red-500">{errors.userName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10 ${
                errors.password ? "border-red-500" : ""
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
        </div>
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={agreeToTerms}
            onCheckedChange={(checked) => {
              setAgreeToTerms(checked)
              if (errors.agreeToTerms) {
                setErrors((prev) => ({ ...prev, agreeToTerms: "" }))
              }
            }}
            className="mt-1"
          />
          <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
            I agree to the{" "}
            <Link href="/terms" className="text-blue-600 hover:text-blue-700">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
              Privacy Policy
            </Link>
          </Label>
        </div>
        {errors.agreeToTerms && <p className="text-sm text-red-500">{errors.agreeToTerms}</p>}
        <Button
          type="submit"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          disabled={isSubmitting} // Disable button during submission
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </Button>
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-700">
            Log in
          </Link>
        </div>
      </form>
    </div>
  )
}

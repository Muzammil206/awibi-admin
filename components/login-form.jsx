"use client"

import { useState } from "react"
import { Eye, Twitter } from "lucide-react" // Import Chrome and Twitter icons
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!email.trim()) {
      newErrors.email = "Email address is required."
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address."
    }
    if (!password) {
      newErrors.password = "Password is required."
    }

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
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      const data = await res.json()
      console.log(data)

      if (res.ok && data.success) {
        toast.success("Login successful! Redirecting to dashboard...")
        router.push("/dashboard")
      } else {
        toast.error(data.message || "Login failed. Please check your credentials.")
      }
    } catch (error) {
      console.error("Network or API error:", error)
      toast.error("An error occurred during login. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6 p-8 bg-white rounded-lg">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
        <p className="text-gray-600">Welcome back to Awibi Institute, kindly input your details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder=""
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
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder=""
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
              {showPassword ? <span className="text-sm">Hide</span> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
        </div>

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm text-[#111111] hover:text-blue-700">
            Forget your password
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-[#669933] hover:bg-green-600 text-white font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging In..." : "Login"}
        </Button>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#111111] hover:text-blue-700">
            Sign up
          </Link>
        </div>
      </form>

      <div className="flex items-center my-6">
        <hr className="flex-grow border-t border-gray-200" />
        <span className="px-4 text-gray-500 text-sm">OR</span>
        <hr className="flex-grow border-t border-gray-200" />
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full h-12 flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-50 bg-transparent"
        >
          <Image src="/google.svg" alt="Google Icon" width={20} height={20} className="w-5 h-5" />
          <span>Continue with Google</span>
        </Button>
        <Button
          variant="outline"
          className="w-full h-12 flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-50 bg-transparent"
        >
          <Twitter className="w-5 h-5 text-blue-400" />
          <span>Continue with Twitter</span>
        </Button>
      </div>
    </div>
  )
}

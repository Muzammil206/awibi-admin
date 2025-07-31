"use client"

import { useState } from "react"
import { Eye, Chrome, Twitter, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/lib/users-store"
import Image from "next/image"

export function LoginForm() {
  const router = useRouter()
  const { setAuthToken } = useUserStore()
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
      const res = await fetch("https://lms-backend-yux4.onrender.com/api/v1/auth/login", {
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
        // Store the auth token from the session
        const authToken = data.session.access_token

        // Store in localStorage and Zustand store
        localStorage.setItem("authToken", authToken)
        setAuthToken(authToken)

        // Set cookie for middleware (production safe)
        await fetch("/api/auth/set-cookie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: authToken })
        })

        toast.success("Login successful! Redirecting to dashboard...")
        window.location.href = "/dashboard"
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
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center space-y-3 mb-8">
          <Image
            src="/logo.png"
            alt="Awibi Institute Logo"
            width={64}
            height={64}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-600">Sign in to your Awibi Institute account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`h-12 border-2 rounded-xl transition-all duration-200 focus:border-green-500 focus:ring-green-500/20 ${
                errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200"
              }`}
              required
            />
            {errors.email && <p className="text-sm text-red-500 flex items-center gap-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`h-12 border-2 rounded-xl pr-12 transition-all duration-200 focus:border-green-500 focus:ring-green-500/20 ${
                  errors.password ? "border-red-500 focus:border-red-500" : "border-gray-200"
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <span className="text-sm font-medium">Hide</span> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500 flex items-center gap-1">{errors.password}</p>}
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700 font-medium">
              Forgot your password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Sign In
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-green-600 hover:text-green-700 font-semibold">
              Sign up
            </Link>
          </div>
        </form>

        <div className="flex items-center my-8">
          <hr className="flex-grow border-t border-gray-200" />
          <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
          <hr className="flex-grow border-t border-gray-200" />
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-12 flex items-center justify-center space-x-3 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl transition-all duration-200 bg-transparent"
          >
            <Image src="/google.svg" alt="Google Icon" width={20} height={20} className="w-5 h-5" />
            <span className="font-medium">Continue with Google</span>
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 flex items-center justify-center space-x-3 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl transition-all duration-200 bg-transparent"
          >
            <Twitter className="w-5 h-5 text-blue-400" />
            <span className="font-medium">Continue with Twitter</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

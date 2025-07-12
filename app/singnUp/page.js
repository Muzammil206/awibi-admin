import { Header } from "@/components/header"
import { SignupForm } from "@/components/signup-form"
import Image from "next/image"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Welcome Section */}
        <div className="text-center py-8 bg-gray-50">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Hoistflick!</h1>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Illustration */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-lg">
                <Image
                  src="/side.png"
                  alt="Educational illustration with person at desk surrounded by books and gears"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex justify-center lg:justify-start">
              <SignupForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

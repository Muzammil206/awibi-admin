import { Header } from "@/components/header"
import { SignupForm } from "@/components/signup-form"
import Image from "next/image"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
     

      <main className="flex-1">
        {/* Welcome Section */}
       

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Illustration */}
            <div className="flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-3xl blur-3xl"></div>
                <Image
                  src="/side.png"
                  alt="Educational illustration with person at desk surrounded by books and gears"
                  width={600}
                  height={400}
                  className="w-full h-auto relative z-10 rounded-2xl"
                  priority
                />
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex justify-center lg:justify-start order-1 lg:order-2">
              <SignupForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

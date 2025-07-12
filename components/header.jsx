import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {/* <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full opacity-80"></div>
            </div> */}
            <Image src="/logo.png" width={50} height={50} alt="Logo" />

            <div>
              <span className="text-xl font-bold text-gray-900">Awibi</span>
              <div className="text-sm text-gray-600">Institute</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-blue-600 font-medium hover:text-blue-700">
              Home
            </Link>
            <Link href="/courses" className="text-gray-700 hover:text-gray-900">
              Courses
            </Link>
            <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
              <span>Programs</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <Link href="/community" className="text-gray-700 hover:text-gray-900">
              Community
            </Link>
            <Link href="/tutors" className="text-gray-700 hover:text-gray-900">
              Tutors
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900">
              Contact us
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-gray-900">
              Log in
            </Link>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function TutorsHeader() {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
             <Image src="/logo.png" width={50} height={50} alt="Logo" />
            <div>  
              <span className="text-xl font-bold text-gray-900">Awibi</span>
              <div className="text-sm text-gray-600">Institute</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
              Dashboard
            </Link>
            <Link href="/courses" className="text-gray-700 hover:text-gray-900">
              Courses
            </Link>
            <Link href="/tutors" className="text-blue-600 font-medium hover:text-blue-700">
              Tutors
            </Link>
            <Link href="/students" className="text-gray-700 hover:text-gray-900">
              Students
            </Link>
            <Link href="/settings" className="text-gray-700 hover:text-gray-900">
              Settings
            </Link>
          </nav>

          {/* Logout Button */}
          <div className="flex items-center">
            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

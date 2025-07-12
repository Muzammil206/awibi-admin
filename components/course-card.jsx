"use client"

import { Users, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

export function CourseCard({ course, showDropdown = false }) {
  return (
    <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="relative flex">
          {/* Course Thumbnail */}
          <div className="relative mx-auto flex align-center w-[50%] h-[120px] rounded-[26px] justify-center items-center h-48 bg-gray-100 overflow-hidden">
            <Image src="/profilePicture.png?height=192&width=300" alt={course.title} fill className="object-cover" />
            
          </div>

          {/* Three Dot Menu */}
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 bg-white bg-opacity-80 hover:bg-opacity-100">
                  <MoreHorizontal className="w-4 h-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              {showDropdown && (
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem className="text-red-600">Delete course</DropdownMenuItem>
                  <DropdownMenuItem>Edit course</DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </div>

        {/* Course Info */}
        <div className="p-4 space-y-3 text-center ">
          <div className="justify-between align-center space-y-2">
            <h3 className="font-semibold  items-center text-gray-900 text-lg">{course.title}</h3>
            <p className="text-gray-500  items-center text-sm">{course.instructor}</p>
            <p className="text-purple-600  items-center text-sm font-medium">{course.category}</p>
          </div>

          <div className="flex align-center justify-center items-center space-x-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">{course.studentsEnrolled} students enrolled</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

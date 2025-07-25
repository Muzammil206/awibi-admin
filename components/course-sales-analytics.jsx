"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function CourseSalesAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly")

  // Sample data for the donut chart
  const salesData = {
    completed: 45,
    enrolled: 30,
    unenrolled: 25,
  }

  const total = salesData.completed + salesData.enrolled + salesData.unenrolled
  const completedPercentage = (salesData.completed / total) * 100
  const enrolledPercentage = (salesData.enrolled / total) * 100
  const unenrolledPercentage = (salesData.unenrolled / total) * 100

  // Calculate stroke-dasharray values for the donut chart
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const completedDash = (completedPercentage / 100) * circumference
  const enrolledDash = (enrolledPercentage / 100) * circumference
  const unenrolledDash = (unenrolledPercentage / 100) * circumference

  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <h3 className="text-lg font-semibold text-gray-900">Course Sales Analytics</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedPeriod("Yearly")}>Yearly</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedPeriod("Monthly")}>Monthly</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedPeriod("Weekly")}>Weekly</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {/* Period Selection */}
        <div className="flex flex-col space-y-2 mb-6 w-full">
          {["Yearly", "Monthly", "Weekly"].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "ghost"}
              className={`justify-start text-left ${
                selectedPeriod === period
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </Button>
          ))}
        </div>

        {/* Donut Chart */}
        <div className="relative mb-6">
          <svg width="120" height="120" className="transform -rotate-90">
            <circle cx="60" cy="60" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="8" />
            {/* Completed segment - Blue */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="8"
              strokeDasharray={`${completedDash} ${circumference}`}
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            {/* Enrolled segment - Orange */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#F59E0B"
              strokeWidth="8"
              strokeDasharray={`${enrolledDash} ${circumference}`}
              strokeDashoffset={-completedDash}
              strokeLinecap="round"
            />
            {/* Unenrolled segment - Pink */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#EC4899"
              strokeWidth="8"
              strokeDasharray={`${unenrolledDash} ${circumference}`}
              strokeDashoffset={-(completedDash + enrolledDash)}
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Legend */}
        <div className="space-y-3 w-full">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-700">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-700">Enrolled</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-pink-500"></div>
            <span className="text-sm text-gray-700">Unenrolled</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

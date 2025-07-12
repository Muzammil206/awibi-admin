"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function StatisticsChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly")

  const chartData = [
    { month: "Jan", design: 20, development: 0 },
    { month: "Feb", design: 0, development: 0 },
    { month: "Mar", design: 80, development: 0 },
    { month: "Apr", design: 0, development: 0 },
    { month: "May", design: 0, development: 0 },
    { month: "Jun", design: 0, development: 0 },
    { month: "Jul", design: 0, development: 90 },
    { month: "Aug", design: 0, development: 0 },
    { month: "Sep", design: 0, development: 0 },
    { month: "Oct", design: 0, development: 0 },
    { month: "Nov", design: 90, development: 0 },
    { month: "Dec", design: 0, development: 0 },
  ]

  const maxValue = 100

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
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
      <CardContent>
        <div className="flex items-end justify-between h-64 mb-4">
          {chartData.map((data, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 flex-1">
              <div className="relative w-full max-w-8 h-48 flex flex-col justify-end">
                {data.design > 0 && (
                  <div className="relative">
                    <div
                      className="bg-green-400 rounded-t-sm mb-1 w-full"
                      style={{ height: `${(data.design / maxValue) * 100}%` }}
                    />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Design</span>
                    </div>
                  </div>
                )}
                {data.development > 0 && (
                  <div className="relative">
                    <div
                      className="bg-blue-500 rounded-t-sm w-full"
                      style={{ height: `${(data.development / maxValue) * 100}%` }}
                    />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Development</span>
                    </div>
                  </div>
                )}
                {data.design === 0 && data.development === 0 && <div className="bg-gray-200 rounded-t-sm w-full h-4" />}
              </div>
              <span className="text-xs text-gray-500">{data.month}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function StatisticsChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly")

  const chartData = [
    { month: "Jan", design: 20, development: 10, health: 5 },
    { month: "Feb", design: 30, development: 15, health: 8 },
    { month: "Mar", design: 80, development: 20, health: 10 },
    { month: "Apr", design: 40, development: 25, health: 12 },
    { month: "May", design: 50, development: 30, health: 15 },
    { month: "Jun", design: 60, development: 90, health: 18 },
    { month: "Jul", design: 70, development: 35, health: 20 },
    { month: "Aug", design: 45, development: 40, health: 22 },
    { month: "Sep", design: 55, development: 45, health: 25 },
    { month: "Oct", design: 65, development: 50, health: 70 },
    { month: "Nov", design: 90, development: 55, health: 30 },
    { month: "Dec", design: 75, development: 60, health: 32 },
  ]

  const maxValue = 100 // Max value for chart bars

  return (
    <Card className="mb-8 bg-white border border-gray-200 shadow-sm">
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
        <div className="flex items-end justify-between h-64 mb-4 relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>
          {/* Chart bars */}
          <div className="flex flex-1 justify-between pl-8">
            {chartData.map((data, index) => {
              const totalHeight = data.design + data.development + data.health
              return (
                <div key={index} className="flex flex-col items-center space-y-2 flex-1 mx-1">
                  <div className="relative w-full max-w-8 h-48 flex flex-col justify-end">
                    {/* Health Bar */}
                    {data.health > 0 && (
                      <div
                        className="bg-pink-500 rounded-t-sm w-full"
                        style={{ height: `${(data.health / maxValue) * 100}%` }}
                      />
                    )}
                    {/* Development Bar */}
                    {data.development > 0 && (
                      <div
                        className="bg-purple-600 rounded-t-sm w-full"
                        style={{ height: `${(data.development / maxValue) * 100}%` }}
                      />
                    )}
                    {/* Design Bar */}
                    {data.design > 0 && (
                      <div
                        className="bg-green-500 rounded-t-sm w-full"
                        style={{ height: `${(data.design / maxValue) * 100}%` }}
                      />
                    )}
                    {/* Tooltips/Labels for categories */}
                    {index === 2 && ( // Example for March (Design)
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Design</span>
                      </div>
                    )}
                    {index === 5 && ( // Example for June (Development)
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Development</span>
                      </div>
                    )}
                    {index === 9 && ( // Example for October (Health)
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Health</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{data.month}</span>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

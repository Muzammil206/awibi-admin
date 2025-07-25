"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function AnalyticsStatisticsChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly")
  const [hoveredBar, setHoveredBar] = useState(null)

  const chartData = [
    { month: "Jan", design: 0, development: 0, health: 0 },
    { month: "Feb", design: 0, development: 0, health: 0 },
    { month: "Mar", design: 60, development: 0, health: 0 },
    { month: "Apr", design: 70, development: 0, health: 0 },
    { month: "May", design: 50, development: 0, health: 0 },
    { month: "Jun", design: 0, development: 90, health: 0 },
    { month: "Jul", design: 0, development: 0, health: 0 },
    { month: "Aug", design: 0, development: 0, health: 0 },
    { month: "Sep", design: 0, development: 0, health: 0 },
    { month: "Oct", design: 0, development: 0, health: 80 },
    { month: "Nov", design: 0, development: 0, health: 0 },
    { month: "Dec", design: 0, development: 0, health: 0 },
  ]

  const maxValue = 100
  const categories = [
    { key: "design", label: "Design", color: "bg-green-500" },
    { key: "development", label: "Development", color: "bg-purple-600" },
    { key: "health", label: "Health", color: "bg-pink-500" },
  ]

  return (
    <Card className="mb-8 bg-white border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
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
      <CardContent className="px-6 pb-6">
        {/* Chart */}
        <div className="relative h-80">
          <div className="flex items-end justify-between h-72 gap-2">
            {chartData.map((data, index) => {
              const totalHeight = data.design + data.development + data.health
              const isHovered = hoveredBar === index

              return (
                <div
                  key={index}
                  className="flex flex-col items-center flex-1 group cursor-pointer"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Bars container */}
                  <div className="relative w-full max-w-8 h-64 flex flex-col justify-end mb-3">
                    {/* Design bar */}
                    {data.design > 0 && (
                      <div
                        className={`w-full bg-green-500 transition-all duration-300 ${
                          data.design === totalHeight ? "rounded-t-lg rounded-b-lg" : "rounded-b-lg"
                        } ${isHovered ? "opacity-80" : ""}`}
                        style={{ height: `${(data.design / maxValue) * 100}%` }}
                      />
                    )}

                    {/* Development bar */}
                    {data.development > 0 && (
                      <div
                        className={`w-full bg-purple-600 transition-all duration-300 ${
                          data.development === totalHeight ? "rounded-t-lg" : ""
                        } ${data.design === 0 ? "rounded-b-lg" : ""} ${isHovered ? "opacity-80" : ""}`}
                        style={{ height: `${(data.development / maxValue) * 100}%` }}
                      />
                    )}

                    {/* Health bar */}
                    {data.health > 0 && (
                      <div
                        className={`w-full bg-pink-500 transition-all duration-300 ${
                          data.health === totalHeight ? "rounded-t-lg" : ""
                        } ${data.design === 0 && data.development === 0 ? "rounded-b-lg" : ""} ${isHovered ? "opacity-80" : ""}`}
                        style={{ height: `${(data.health / maxValue) * 100}%` }}
                      />
                    )}

                    {/* Tooltip labels for active categories */}
                    {totalHeight > 0 && isHovered && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {data.design > 0 && "Design"}
                        {data.development > 0 && "Development"}
                        {data.health > 0 && "Health"}
                      </div>
                    )}
                  </div>

                  {/* Month label */}
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

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function StatisticsChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly")
  const [hoveredBar, setHoveredBar] = useState(null)

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

  const maxValue = 100
  const categories = [
    {
      key: "design",
      label: "Design",
      color: "bg-gradient-to-t from-green-400 to-green-500",
      hoverColor: "from-green-500 to-green-600",
    },
    {
      key: "development",
      label: "Development",
      color: "bg-gradient-to-t from-purple-400 to-purple-500",
      hoverColor: "from-purple-500 to-purple-600",
    },
    {
      key: "health",
      label: "Health",
      color: "bg-gradient-to-t from-pink-400 to-pink-500",
      hoverColor: "from-pink-500 to-pink-600",
    },
  ]

  const getHighestCategory = (data) => {
    const values = { design: data.design, development: data.development, health: data.health }
    return Object.keys(values).reduce((a, b) => (values[a] > values[b] ? a : b))
  }

  return (
    <Card className="mb-8 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <h3 className="text-xl font-bold text-gray-900">Statistics</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 rounded-lg">
              <MoreHorizontal className="w-4 h-4 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32 rounded-xl shadow-lg border-0 bg-white">
            <DropdownMenuItem
              onClick={() => setSelectedPeriod("Yearly")}
              className="rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              Yearly
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSelectedPeriod("Monthly")}
              className="rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              Monthly
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSelectedPeriod("Weekly")}
              className="rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              Weekly
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        {/* Legend */}
        <div className="flex items-center gap-6 mb-8">
          {categories.map((category) => (
            <div key={category.key} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
              <span className="text-sm font-medium text-gray-700">{category.label}</span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="relative h-80">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs font-medium text-gray-400 pr-4">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>

          {/* Chart bars container */}
          <div className="flex items-end justify-between h-72 ml-8 gap-1">
            {chartData.map((data, index) => {
              const highestCategory = getHighestCategory(data)
              const isHovered = hoveredBar === index

              return (
                <div
                  key={index}
                  className="flex flex-col items-center flex-1 group cursor-pointer"
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-12 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-10 whitespace-nowrap">
                      <div className="font-semibold capitalize">{highestCategory}</div>
                      <div className="text-gray-300">{data[highestCategory]} units</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  )}

                  {/* Bar container */}
                  <div className="relative w-full max-w-8 h-64 flex flex-col justify-end mb-3">
                    {/* Stacked bars */}
                    {categories.map((category) => {
                      const value = data[category.key]
                      if (value === 0) return null

                      return (
                        <div
                          key={category.key}
                          className={`w-full transition-all duration-300 ${
                            isHovered ? `bg-gradient-to-t ${category.hoverColor}` : category.color
                          } ${
                            category.key === "health" ? "rounded-t-lg" : category.key === "design" ? "rounded-b-lg" : ""
                          } ${isHovered ? "scale-105 shadow-lg" : ""}`}
                          style={{
                            height: `${(value / maxValue) * 100}%`,
                            minHeight: value > 0 ? "8px" : "0px",
                          }}
                        />
                      )
                    })}

                    {/* Highlight effect for highest value */}
                    {isHovered && <div className="absolute inset-0 bg-white/20 rounded-lg pointer-events-none"></div>}
                  </div>

                  {/* Month label */}
                  <span
                    className={`text-xs font-medium transition-colors duration-200 ${
                      isHovered ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {data.month}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary stats */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            Showing data for <span className="font-semibold text-gray-900">{selectedPeriod.toLowerCase()}</span> period
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-gray-600">
              Peak: <span className="font-semibold text-gray-900">Nov (175)</span>
            </div>
            <div className="text-gray-600">
              Avg: <span className="font-semibold text-gray-900">52.3</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

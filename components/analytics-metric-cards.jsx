"use client"

import { Users, BookOpen, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function AnalyticsMetricCards() {
  const metrics = [
    {
      title: "Total Users",
      value: "5,874",
      change: "+140 New Joined",
      icon: Users,
      iconBg: "bg-blue-500",
      chartColor: "text-blue-500",
      trendData: [20, 30, 25, 35, 40, 30, 45, 38, 42, 50, 45, 48], // Sample trend data
    },
    {
      title: "Total Courses",
      value: "2,34,888",
      change: "+52 Sales Today",
      icon: BookOpen,
      iconBg: "bg-green-500",
      chartColor: "text-green-500",
      trendData: [25, 35, 30, 40, 45, 35, 50, 42, 48, 55, 50, 53], // Sample trend data
    },
  ]

  // Simple SVG trend line component
  const TrendLine = ({ data, color }) => {
    const width = 120
    const height = 40
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * width
        const y = height - ((value - min) / range) * height
        return `${x},${y}`
      })
      .join(" ")

    return (
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: color === "blue" ? "#3B82F6" : "#10B981", stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: color === "blue" ? "#3B82F6" : "#10B981", stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>
        <polyline fill="none" stroke={color === "blue" ? "#3B82F6" : "#10B981"} strokeWidth="2" points={points} />
        <polygon fill={`url(#gradient-${color})`} points={`${points},${width},${height},0,${height}`} />
      </svg>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${metric.iconBg}`}>
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <TrendingUp className={`w-4 h-4 ${metric.chartColor}`} />
                  <span className={`font-medium ${metric.chartColor}`}>{metric.change}</span>
                </div>
              </div>
              <div className="ml-4">
                <TrendLine data={metric.trendData} color={metric.iconBg.includes("blue") ? "blue" : "green"} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

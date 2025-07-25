"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { AnalyticsMetricCards } from "@/components/analytics-metric-cards"
import { AnalyticsStatisticsChart } from "@/components/analytics-statistics-chart"
import { CourseSalesAnalytics } from "@/components/course-sales-analytics"
import { AnalyticsTopCourses } from "@/components/analytics-top-courses"

export default function AnalyticsPage() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 text-sm">Track your courses student progress.</p>
          </div>
        </header>

        <main className="flex-1 p-8 bg-gray-50">
          {/* Metric Cards */}
          <AnalyticsMetricCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Statistics Chart */}
            <div className="lg:col-span-2">
              <AnalyticsStatisticsChart />
              <AnalyticsTopCourses />
            </div>

            {/* Right Column - Course Sales Analytics */}
            <div className="lg:col-span-1">
              <CourseSalesAnalytics />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

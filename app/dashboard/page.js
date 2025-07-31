"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { AppSidebar } from "@/components/app-sidebar"
import { StatsCards } from "@/components/stats-cards"
import { AnalyticsStatisticsChart } from "@/components/analytics-statistics-chart"
import { ActivityFeed } from "@/components/activity-feed"
import { TopCoursesTable } from "@/components/top-courses-table"
import { Separator } from "@/components/ui/separator"

export default function DashboardPage() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
              <p className="text-gray-600 text-sm">Manage your courses and track student progress.</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="ml-auto"
            onClick={() => {
              localStorage.removeItem("authToken")
              window.location.reload()
            }}
          >
            Sign Out
          </Button>
        </header>

        <main className="flex-1 p-8 bg-gray-50">
          {/* Stats Cards */}
          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Charts and Tables */}
            <div className="lg:col-span-2 space-y-8">
              <AnalyticsStatisticsChart />
              <TopCoursesTable />
            </div>

            {/* Right Column - Activity Feed */}
            <div className="lg:col-span-1">
              <ActivityFeed />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

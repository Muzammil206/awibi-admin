import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCards } from "@/components/stats-cards"
import { StatisticsChart } from "@/components/statistics-chart"
import { NoticeBoard } from "@/components/notice-board"
import { TopCoursesTable } from "@/components/top-courses-table"
import { FloatingActionButton } from "@/components/floating-action-button"
import { AddTutorSection } from "@/components/add-tutor-section"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Charts and Tables */}
          <div className="lg:col-span-3 space-y-8">
            <StatisticsChart />
            <AddTutorSection />
            <TopCoursesTable />
          </div>

          {/* Right Column - Notice Board */}
          <div className="lg:col-span-1">
            <NoticeBoard />
          </div>
        </div>
      </main>

      <FloatingActionButton />
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { CoursesTable } from "@/components/courses-table"
import { Pagination } from "@/components/pagination"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddCourseModal } from "@/components/add-course-modal"
import { CreateCouponModal } from "@/components/create-coupon-modal"
import { useCourseStore } from "@/lib/course-store"

export default function CoursesPage() {
  const { selectedFilter, setSelectedFilter, fetchCourses, isLoading } = useCourseStore()
  const [showAddCourseModal, setShowAddCourseModal] = useState(false)
  const [showCreateCouponModal, setShowCreateCouponModal] = useState(false)

  useEffect(() => {
    fetchCourses()
  }, [])

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
            <p className="text-gray-600 text-sm">Manage your courses and track student progress.</p>
          </div>
        </header>

        <main className="flex-1 p-8 bg-gray-50">
          {/* Filter Tabs and Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="flex-grow">
              <TabsList className="grid w-full grid-cols-4 h-10">
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="coupons">Coupons</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex space-x-3 flex-shrink-0">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => setShowAddCourseModal(true)}
              >
                Add Course
              </Button>
              <Button
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                onClick={() => setShowCreateCouponModal(true)} // Open coupon modal
              >
                Create coupon
              </Button>
            </div>
          </div>

          {/* Courses Table */}
          <CoursesTable />

          {/* Pagination */}
          <Pagination />
        </main>

        {/* Add Course Modal */}
        <AddCourseModal isOpen={showAddCourseModal} onClose={() => setShowAddCourseModal(false)} />

        {/* Create Coupon Modal */}
        <CreateCouponModal isOpen={showCreateCouponModal} onClose={() => setShowCreateCouponModal(false)} />
      </SidebarInset>
    </SidebarProvider>
  )
}

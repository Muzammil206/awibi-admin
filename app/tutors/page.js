"use client"

import { useState, useEffect } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TutorsSearchFilter } from "@/components/tutors-search-filter"
import { TutorsTable } from "@/components/tutors-table"
import { TopUpModal } from "@/components/top-up-modal"
import { CreditsDisplay } from "@/components/credits-display"
import { Pagination } from "@/components/pagination"
import { AddTutorButton } from "@/components/add-tutor-button"
import { Separator } from "@/components/ui/separator"

export default function TutorsPage() {
  const [showTopUpModal, setShowTopUpModal] = useState(false)

  // Show Top-Up modal when page loads (as requested)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTopUpModal(true)
    }, 1000) // Show after 1 second

    return () => clearTimeout(timer)
  }, [])

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">Tutors</h1>
            <p className="text-gray-600 text-sm">Manage your tutors and track their progress.</p>
          </div>
        </header>
        <TutorsSearchFilter />

        <main className="flex-1 p-8 bg-gray-50">
          {/* Credits Display */}
          <div className="mb-6">
            <CreditsDisplay onTopUpClick={() => setShowTopUpModal(true)} />
          </div>

          {/* Add Tutor Button */}
          <AddTutorButton />

          {/* Tutors Table */}
          <TutorsTable />

          {/* Pagination */}
          <div className="mt-8">
            <Pagination />
          </div>
        </main>

        {/* Top-Up Modal */}
        <TopUpModal isOpen={showTopUpModal} onClose={() => setShowTopUpModal(false)} />
      </SidebarInset>
    </SidebarProvider>
  )
}

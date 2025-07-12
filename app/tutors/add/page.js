"use client"

import { useState, useEffect } from "react"
import { TutorsHeader } from "@/components/tutors-header"
import { TutorsSearchFilter } from "@/components/tutors-search-filter"
import { TutorsTable } from "@/components/tutors-table"
import { TopUpModal } from "@/components/top-up-modal"
import { Pagination } from "@/components/pagination"
import { AddTutorButton } from "@/components/add-tutor-button"

export default function TutorsPage() {
  const [showTopUpModal, setShowTopUpModal] = useState(false)


  return (
    <div className="min-h-screen bg-gray-50">
      <TutorsHeader />
      <TutorsSearchFilter />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

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
    </div>
  )
}

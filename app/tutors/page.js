"use client"

import { useState, useEffect } from "react"
import { TutorsHeader } from "@/components/tutors-header"
import { TutorsSearchFilter } from "@/components/tutors-search-filter"
import { TutorsTable } from "@/components/tutors-table"

import { CreditsDisplay } from "@/components/credits-display"
import { Pagination } from "@/components/pagination"

export default function TutorsPage() {
  const [showTopUpModal, setShowTopUpModal] = useState(false)

  // Show Top-Up modal when page loads (as requested)
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowTopUpModal(true)
  //   }, 1000) // Show after 1 second

  //   return () => clearTimeout(timer)
  // }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <TutorsHeader />
      <TutorsSearchFilter />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Credits Display */}


        {/* Tutors Table */}
        <TutorsTable />

        {/* Pagination */}
        <div className="mt-8">
          <Pagination />
        </div>
      </main>

    </div>
  )
}

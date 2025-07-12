"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Pagination() {
  const [currentPage, setCurrentPage] = useState(2)
  const [showResults, setShowResults] = useState("6")

  const pages = [1, 2, 3, 4, "...", 20]

  return (
    <div className="flex items-center justify-between mt-8">
      {/* Show Results Dropdown */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Show result:</span>
        <Select value={showResults} onValueChange={setShowResults}>
          <SelectTrigger className="w-16 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="24">24</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {pages.map((page, index) => (
          <Button
            key={index}
            variant={page === currentPage ? "default" : "ghost"}
            size="sm"
            className={`w-8 h-8 p-0 ${
              page === currentPage ? "bg-[#6C5DD3] text-white hover:bg-blue-700" : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            disabled={page === "..."}
          >
            {page}
          </Button>
        ))}

        <Button variant="ghost" size="sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === 20}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

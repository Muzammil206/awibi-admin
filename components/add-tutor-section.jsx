"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function AddTutorSection() {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly")

  return (
    <div className="flex items-center justify-between mb-6">
      <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
        <Plus className="w-4 h-4" />
        <span>Add tutor</span>
      </Button>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-gray-600">
              {selectedPeriod}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedPeriod("Monthly")}>Monthly</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedPeriod("Weekly")}>Weekly</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

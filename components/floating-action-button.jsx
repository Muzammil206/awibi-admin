"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FloatingActionButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button  size="lg" className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg">
        <Link href="/courses/add">
        <Plus className="w-6 h-6 text-white" />
        </Link>
      </Button>
    </div>
  )
}

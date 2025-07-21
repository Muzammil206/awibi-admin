"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AddTutorForm } from "@/components/add-tutor-form"
import { Separator } from "@/components/ui/separator"

export default function AddTutorPage() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">Add Tutor</h1>
            <p className="text-gray-600 text-sm">Input tutor details</p>
          </div>
        </header>
        <main className="flex-1 p-8 bg-gray-50">
          <AddTutorForm />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

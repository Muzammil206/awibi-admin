"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SettingsForm } from "@/components/settings-form" // Import the new SettingsForm
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 text-sm">Track your courses student progress.</p>
          </div>
        </header>

        <main className="flex-1 p-8 bg-gray-50">
          <SettingsForm /> {/* Render the new SettingsForm component */}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

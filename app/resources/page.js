"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useResourceStore } from "@/lib/resource-store"
import { BooksTable } from "@/components/books-table"
import { VideosTable } from "@/components/videos-table"
import { EventsTable } from "@/components/events-table"
import { RecentSalesTable } from "@/components/recent-sales-table"

export default function ResourcesPage() {
  const { selectedTab, setSelectedTab } = useResourceStore()

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
            <p className="text-gray-600 text-sm">Manage your resources</p>
          </div>
        </header>

        <main className="flex-1 p-8 bg-gray-50">
          <div className="flex items-center justify-between mb-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-grow">
              <TabsList className="grid w-full grid-cols-5 h-10">
                <TabsTrigger value="all-resources">All Resources</TabsTrigger>
                <TabsTrigger value="books">Books</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="hardware-systems">Hardware Systems</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>
              <TabsContent value="all-resources" className="space-y-8">
                <h2 className="text-xl font-semibold text-gray-900">Books</h2>
                <BooksTable />
                <h2 className="text-xl font-semibold text-gray-900">Events</h2>
                <EventsTable />
                <h2 className="text-xl font-semibold text-gray-900">Recent Sales</h2>
                <RecentSalesTable />
              </TabsContent>

              <TabsContent value="books" className="space-y-8">
                <h2 className="text-xl font-semibold text-gray-900">Recent Sales</h2>
                <RecentSalesTable />
                <h2 className="text-xl font-semibold text-gray-900">All Books</h2>
                <BooksTable />
              </TabsContent>

              <TabsContent value="videos">
                <VideosTable />
              </TabsContent>

              <TabsContent value="hardware-systems">
                <div className="text-center py-12 text-gray-500">Hardware Systems content coming soon!</div>
              </TabsContent>

              <TabsContent value="events">
                <EventsTable />
              </TabsContent>
            </Tabs>
            <Button className="bg-green-500 hover:bg-green-600 text-white ml-4">Add New Book</Button>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

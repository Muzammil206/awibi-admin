"use client"

import { useState } from "react"
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
import { AddBookModal } from "@/components/add-book-modal"
import { AddEventModal } from "@/components/add-event-modal"

export default function ResourcesPage() {
  const { selectedTab, setSelectedTab } = useResourceStore()
  const [showAddBookModal, setShowAddBookModal] = useState(false)
  const [showAddEventModal, setShowAddEventModal] = useState(false)

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
            <div className="flex-grow">
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="h-auto bg-transparent border-b border-gray-200 rounded-none p-0 w-full justify-start">
                  <TabsTrigger
                    value="all-resources"
                    className="h-12 px-0 mr-8 bg-transparent border-b-2 border-transparent rounded-none data-[state=active]:bg-transparent data-[state=active]:border-gray-900 data-[state=active]:shadow-none text-gray-500 data-[state=active]:text-gray-900 font-medium"
                    style={{
                      fontFamily: "Inter",
                      fontSize: "16px",
                      fontWeight: selectedTab === "all-resources" ? 600 : 400,
                    }}
                  >
                    All Resources
                  </TabsTrigger>
                  <TabsTrigger
                    value="books"
                    className="h-12 px-0 mr-8 bg-transparent border-b-2 border-transparent rounded-none data-[state=active]:bg-transparent data-[state=active]:border-gray-900 data-[state=active]:shadow-none text-gray-500 data-[state=active]:text-gray-900 font-medium"
                    style={{
                      fontFamily: "Inter",
                      fontSize: "16px",
                      fontWeight: selectedTab === "books" ? 600 : 400,
                    }}
                  >
                    Books
                  </TabsTrigger>
                  <TabsTrigger
                    value="videos"
                    className="h-12 px-0 mr-8 bg-transparent border-b-2 border-transparent rounded-none data-[state=active]:bg-transparent data-[state=active]:border-gray-900 data-[state=active]:shadow-none text-gray-500 data-[state=active]:text-gray-900 font-medium"
                    style={{
                      fontFamily: "Inter",
                      fontSize: "16px",
                      fontWeight: selectedTab === "videos" ? 600 : 400,
                    }}
                  >
                    Videos
                  </TabsTrigger>
                  <TabsTrigger
                    value="hardware-systems"
                    className="h-12 px-0 mr-8 bg-transparent border-b-2 border-transparent rounded-none data-[state=active]:bg-transparent data-[state=active]:border-gray-900 data-[state=active]:shadow-none text-gray-500 data-[state=active]:text-gray-900 font-medium"
                    style={{
                      fontFamily: "Inter",
                      fontSize: "16px",
                      fontWeight: selectedTab === "hardware-systems" ? 600 : 400,
                    }}
                  >
                    Hardware Systems
                  </TabsTrigger>
                  <TabsTrigger
                    value="events"
                    className="h-12 px-0 mr-8 bg-transparent border-b-2 border-transparent rounded-none data-[state=active]:bg-transparent data-[state=active]:border-gray-900 data-[state=active]:shadow-none text-gray-500 data-[state=active]:text-gray-900 font-medium"
                    style={{
                      fontFamily: "Inter",
                      fontSize: "16px",
                      fontWeight: selectedTab === "events" ? 600 : 400,
                    }}
                  >
                    Events
                  </TabsTrigger>
                </TabsList>

                <div className="mt-8">
                  <TabsContent value="all-resources" className="space-y-8 mt-0">
                    <h2 className="text-xl font-semibold text-gray-900">Books</h2>
                    <BooksTable />
                    <h2 className="text-xl font-semibold text-gray-900">Events</h2>
                    <EventsTable />
                    <h2 className="text-xl font-semibold text-gray-900">Recent Sales</h2>
                    <RecentSalesTable />
                  </TabsContent>

                  <TabsContent value="books" className="space-y-8 mt-0">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Sales</h2>
                    <RecentSalesTable />
                    <h2 className="text-xl font-semibold text-gray-900">All Books</h2>
                    <BooksTable />
                  </TabsContent>

                  <TabsContent value="videos" className="mt-0">
                    <VideosTable />
                  </TabsContent>

                  <TabsContent value="hardware-systems" className="mt-0">
                    <div className="text-center py-12 text-gray-500">Hardware Systems content coming soon!</div>
                  </TabsContent>

                  <TabsContent value="events" className="mt-0">
                    <EventsTable />
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Conditional Add Button - positioned on the right */}
            <div className="flex-shrink-0 ml-8">
              {selectedTab === "all-resources" && (
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-6 py-2"
                  onClick={() => setShowAddBookModal(true)}
                >
                  Add New Book
                </Button>
              )}
              {selectedTab === "books" && (
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-6 py-2"
                  onClick={() => setShowAddBookModal(true)}
                >
                  Add New Book
                </Button>
              )}
              {selectedTab === "events" && (
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-6 py-2"
                  onClick={() => setShowAddEventModal(true)}
                >
                  Add New Event
                </Button>
              )}
              {selectedTab === "videos" && (
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-6 py-2"
                  onClick={() => console.log("Add Video functionality coming soon!")}
                >
                  Add New Video
                </Button>
              )}
              {selectedTab === "hardware-systems" && (
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-6 py-2"
                  onClick={() => console.log("Add Hardware System functionality coming soon!")}
                >
                  Add New Hardware
                </Button>
              )}
            </div>
          </div>
        </main>

        {/* Add Book Modal */}
        <AddBookModal isOpen={showAddBookModal} onClose={() => setShowAddBookModal(false)} />

        {/* Add Event Modal */}
        <AddEventModal isOpen={showAddEventModal} onClose={() => setShowAddEventModal(false)} />
      </SidebarInset>
    </SidebarProvider>
  )
}

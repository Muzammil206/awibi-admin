"use client"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pagination } from "@/components/pagination"
import { UsersTable } from "@/components/users-table"
import { useUserStore } from "@/lib/users-store"
import { useEffect } from "react"

export default function UsersPage() {
  const { selectedTab, setSelectedTab, setAuthToken, getFilteredUsers } = useUserStore()

  useEffect(() => {
    // Set auth token from localStorage when component mounts
    const token = localStorage.getItem("authToken")
    if (token) {
      setAuthToken(token)
    }
  }, [setAuthToken])

  const filteredUsers = getFilteredUsers()
  const enrolledCount = filteredUsers.filter((user) => user.status === "enrolled").length
  const unenrolledCount = filteredUsers.filter((user) => user.status === "unenrolled").length

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-col">
            <h1
              className="text-2xl font-bold"
              style={{
                color: "#1E1E1E",
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: "24px",
                lineHeight: "32px",
                letterSpacing: "0px",
              }}
            >
              Users
            </h1>
            <p
              className="text-sm"
              style={{
                color: "#6B7280",
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "0px",
              }}
            >
              Manage your courses and track student progress.
            </p>
          </div>
        </header>

        <main className="flex-1 p-8 bg-gray-50">
          {/* Filter Tabs */}
          <div className="flex items-center justify-between mb-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-grow">
              <TabsList className="grid w-full grid-cols-3 h-10 bg-white border border-gray-200">
                <TabsTrigger
                  value="all-users"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0px",
                  }}
                >
                  All Users ({filteredUsers.length})
                </TabsTrigger>
                <TabsTrigger
                  value="enrolled-users"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0px",
                  }}
                >
                  Enrolled Users ({enrolledCount})
                </TabsTrigger>
                <TabsTrigger
                  value="unenrolled-users"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "0px",
                  }}
                >
                  Unenrolled Users ({unenrolledCount})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Users Table */}
          <UsersTable />

          {/* Pagination */}
          <Pagination />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

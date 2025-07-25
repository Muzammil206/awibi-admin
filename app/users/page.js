"use client"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pagination } from "@/components/pagination"
import { UsersTable } from "@/components/users-table"
import { useUserStore } from "@/lib/users-store"

export default function UsersPage() {
  const { selectedTab, setSelectedTab } = useUserStore()

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-600 text-sm">Manage users and track their activity.</p>
          </div>
        </header>

        <main className="flex-1 p-8 bg-gray-50">
          <div className="flex items-center justify-between mb-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-grow">
              <TabsList className="grid w-full grid-cols-3 h-10">
                <TabsTrigger value="all-users">All Users</TabsTrigger>
                <TabsTrigger value="admin-users">Admins</TabsTrigger>
                <TabsTrigger value="student-users">Students</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <UsersTable />
          <Pagination />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

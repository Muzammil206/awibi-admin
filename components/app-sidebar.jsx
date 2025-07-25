"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BookOpen, Users, Settings, BarChart2, LogOut, FolderOpen } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Courses",
      href: "/courses",
      icon: BookOpen,
    },
    {
      title: "Resources",
      href: "/resources",
      icon: FolderOpen,
    },
    {
      title: "Users",
      href: "/users",
      icon: Users,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart2,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar {...props} className="border-r border-gray-200">
      <SidebarHeader className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
            <div className="w-7 h-7 bg-white rounded-full opacity-90"></div>
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900">Awibi</span>
            <div className="text-sm text-gray-600 font-medium">Institute</div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="h-12 px-4 rounded-xl font-medium transition-all duration-200 hover:bg-green-50 hover:text-green-700 data-[active=true]:bg-gradient-to-r data-[active=true]:from-green-500 data-[active=true]:to-green-600 data-[active=true]:text-white data-[active=true]:shadow-lg"
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarGroup className="mt-auto p-4 border-t border-gray-100">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="h-12 px-4 rounded-xl font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
              >
                <Link href="/logout" className="flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  )
}

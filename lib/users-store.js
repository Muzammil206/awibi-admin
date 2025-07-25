"use client"

import { create } from "zustand"

export const useUserStore = create((set, get) => ({
  selectedTab: "all-users",
  users: [],
  loading: false,
  error: null,

  setSelectedTab: (tab) => set({ selectedTab: tab }),

  fetchUsers: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch("https://lms-backend-yux4.onrender.com/api/v1/admin/users")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        const transformedUsers = result.data.map((user) => ({
          id: user.id,
          firstName: user.username || "Unknown",
          lastName: "",
          email: user.email,
          phone: "N/A",
          role: user.role,
          avatar: user.avatar_url || "/placeholder.svg?height=40&width=40",
          bio: user.bio || "",
          createdAt: user.created_at,
          updatedAt: user.updated_at,
        }))

        set({ users: transformedUsers, loading: false })
      } else {
        throw new Error("Failed to fetch users")
      }
    } catch (error) {
      console.error("Error fetching users:", error)
      set({ error: error.message, loading: false })
    }
  },

  getFilteredUsers: () => {
    const { users, selectedTab } = get()
    if (selectedTab === "all-users") {
      return users
    } else if (selectedTab === "admin-users") {
      return users.filter((user) => user.role === "admin")
    } else if (selectedTab === "student-users") {
      return users.filter((user) => user.role === "student")
    }
    return []
  },

  updateUser: (id, updatedFields) => {
    set((state) => ({
      users: state.users.map((user) => (user.id === id ? { ...user, ...updatedFields } : user)),
    }))
  },

  deleteUser: async (id) => {
    try {
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }))
      return { success: true }
    } catch (error) {
      console.error("Error deleting user:", error)
      return { success: false, error: error.message }
    }
  },
}))

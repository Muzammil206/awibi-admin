"use client"

import { create } from "zustand"

export const useUserStore = create((set, get) => ({
  selectedTab: "all-users",
  users: [],
  loading: false,
  error: null,
  authToken: null,

  // Pagination state
  currentPage: 1,
  itemsPerPage: 6,
  totalUsers: 0,

  setSelectedTab: (tab) => set({ selectedTab: tab, currentPage: 1 }), // Reset to page 1 when changing tabs

  setAuthToken: (token) => set({ authToken: token }),

  setCurrentPage: (page) => set({ currentPage: page }),

  setItemsPerPage: (items) => set({ itemsPerPage: items, currentPage: 1 }), // Reset to page 1 when changing items per page

  // Get token from localStorage if not in state
  getAuthToken: () => {
    const { authToken } = get()
    if (authToken) return authToken

    // Try to get from localStorage
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken")
    }
    return null
  },

  fetchUsers: async () => {
    set({ loading: true, error: null })
    try {
      const token = get().getAuthToken()

      if (!token) {
        throw new Error("No authentication token available. Please login first.")
      }

      const response = await fetch("https://lms-backend-yux4.onrender.com/api/v1/admin/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please login again.")
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        // Filter out admin users - only show students
        const studentUsers = result.data.filter((user) => user.role === "student")

        const transformedUsers = studentUsers.map((user) => ({
          id: user.id,
          firstName: user.username || "Unknown",
          lastName: "",
          email: user.email,
          phone: "N/A", // Will be updated when phone data is available from API
          courses: Math.floor(Math.random() * 100), // Placeholder - replace with actual course count from API
          avatar: user.avatar_url || "/placeholder.svg?height=40&width=40",
          bio: user.bio || "",
          createdAt: user.created_at,
          updatedAt: user.updated_at,
          status: Math.random() > 0.5 ? "enrolled" : "unenrolled", // Placeholder - replace with actual enrollment status
        }))

        set({ users: transformedUsers, totalUsers: transformedUsers.length, loading: false })
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
    let filteredUsers = []

    if (selectedTab === "all-users") {
      filteredUsers = users
    } else if (selectedTab === "enrolled-users") {
      filteredUsers = users.filter((user) => user.status === "enrolled")
    } else if (selectedTab === "unenrolled-users") {
      filteredUsers = users.filter((user) => user.status === "unenrolled")
    }

    return filteredUsers
  },

  getPaginatedUsers: () => {
    const { currentPage, itemsPerPage } = get()
    const filteredUsers = get().getFilteredUsers()

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    return filteredUsers.slice(startIndex, endIndex)
  },

  getTotalPages: () => {
    const { itemsPerPage } = get()
    const filteredUsers = get().getFilteredUsers()
    return Math.ceil(filteredUsers.length / itemsPerPage)
  },

  updateUser: (id, updatedFields) => {
    set((state) => ({
      users: state.users.map((user) => (user.id === id ? { ...user, ...updatedFields } : user)),
    }))
  },

  deleteUser: async (id) => {
    try {
      const token = get().getAuthToken()

      if (!token) {
        throw new Error("No authentication token available")
      }

      // Make API call to delete user when endpoint is available
      // const response = await fetch(`https://lms-backend-yux4.onrender.com/api/v1/admin/users/${id}`, {
      //   method: 'DELETE',
      //   headers: {
      //     "Authorization": `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //   },
      // })

      // For now, just remove from local state
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        totalUsers: state.totalUsers - 1,
      }))

      return { success: true }
    } catch (error) {
      console.error("Error deleting user:", error)
      return { success: false, error: error.message }
    }
  },
}))

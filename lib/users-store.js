"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useUserStore = create(
  persist(
    (set, get) => ({
      selectedTab: "all-users", // Default selected tab for users page
      users: [
        {
          id: "u1",
          firstName: "Michelle",
          lastName: "Rivera",
          email: "michelle.rivera@gmail.com",
          phone: "09156893257",
          courses: 50,
          status: "enrolled", // 'enrolled' or 'unenrolled'
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "u2",
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "08012345678",
          courses: 0,
          status: "unenrolled",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "u3",
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@example.com",
          phone: "07098765432",
          courses: 75,
          status: "enrolled",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "u4",
          firstName: "Alice",
          lastName: "Johnson",
          email: "alice.j@example.com",
          phone: "09011223344",
          courses: 40,
          status: "enrolled",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "u5",
          firstName: "Bob",
          lastName: "Williams",
          email: "bob.w@example.com",
          phone: "08122334455",
          courses: 0,
          status: "unenrolled",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "u6",
          firstName: "Charlie",
          lastName: "Brown",
          email: "charlie.b@example.com",
          phone: "07033445566",
          courses: 0,
          status: "unenrolled",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "u7",
          firstName: "Diana",
          lastName: "Prince",
          email: "diana.p@example.com",
          phone: "09044556677",
          courses: 0,
          status: "unenrolled",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "u8",
          firstName: "Eve",
          lastName: "Adams",
          email: "eve.a@example.com",
          phone: "08155667788",
          courses: 0,
          status: "unenrolled",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],

      setSelectedTab: (tab) => set({ selectedTab: tab }),

      getFilteredUsers: () => {
        const { users, selectedTab } = get()
        if (selectedTab === "all-users") {
          return users
        } else if (selectedTab === "enrolled-users") {
          return users.filter((user) => user.status === "enrolled")
        } else if (selectedTab === "unenrolled-users") {
          return users.filter((user) => user.status === "unenrolled")
        }
        return []
      },
      updateUser: (id, updatedFields) => {
        set((state) => ({
          users: state.users.map((user) => (user.id === id ? { ...user, ...updatedFields } : user)),
        }))
      },
      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        }))
      },
    }),
    {
      name: "user-storage",
    },
  ),
)

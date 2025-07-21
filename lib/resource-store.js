"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useResourceStore = create(
  persist(
    (set, get) => ({
      selectedTab: "all-resources", // Default selected tab
      books: [
        { id: "b1", title: "Calculus Essentials", category: "Mathematics", uploaded: "2 days ago" },
        { id: "b2", title: "Introduction to Programming", category: "Computer Science", uploaded: "1 week ago" },
        { id: "b3", title: "Literary Analysis Guide", category: "Literature", uploaded: "2 weeks ago" },
      ],
      videos: [
        { id: "v1", title: "Physics for Beginners", timesWatched: 50, duration: "0:30", date: "June 1, 2024" },
        { id: "v2", title: "History of Art", timesWatched: 30, duration: "24:02", date: "June 5, 2024" },
        { id: "v3", title: "Health tips", timesWatched: 25, duration: "7:42", date: "June 10, 2024" },
        { id: "v4", title: "History of Art", timesWatched: 30, duration: "24:02", date: "June 5, 2024" },
        { id: "v5", title: "History of Art", timesWatched: 30, duration: "24:02", date: "June 5, 2024" },
        { id: "v6", title: "History of Art", timesWatched: 30, duration: "24:02", date: "June 5, 2024" },
        { id: "v7", title: "History of Art", timesWatched: 30, duration: "24:02", date: "June 5, 2024" },
      ],
      events: [
        { id: "e1", name: "Summer Coding Workshop", date: "July 15, 2024", location: "Online" },
        { id: "e2", name: "Fall Career Fair", date: "October 20, 2024", location: "Campus Center" },
      ],
      recentSales: [
        { id: "s1", bookTitle: "Physics for Beginners", quantitySold: 50, revenue: "N7,050", date: "June 1, 2024" },
        { id: "s2", bookTitle: "History of Art", quantitySold: 30, revenue: "N4,500", date: "June 5, 2024" },
        { id: "s3", bookTitle: "Spanish Language Course", quantitySold: 25, revenue: "N3,750", date: "June 10, 2024" },
      ],

      setSelectedTab: (tab) => set({ selectedTab: tab }),
      addBook: (book) => set((state) => ({ books: [...state.books, { ...book, id: Date.now().toString() }] })),
      addVideo: (video) => set((state) => ({ videos: [...state.videos, { ...video, id: Date.now().toString() }] })),
      addEvent: (event) => set((state) => ({ events: [...state.events, { ...event, id: Date.now().toString() }] })),
    }),
    {
      name: "resource-storage",
    },
  ),
)

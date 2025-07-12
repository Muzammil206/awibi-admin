"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useTutorStore = create(
  persist(
    (set, get) => ({
      tutors: [
        {
          id: "1",
          name: "Jane Doe",
          course: "Fundamental Principles of Design",
          category: "Design",
          email: "michelle.rivera@example.com",
          gender: "Female",
          age: 34,
          rating: 4.8,
          bio: "Lorem ipsum mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.",
          avatar: "/placeholder.svg?height=100&width=100",
          expertise: "Design Expert",
          availability: "Available",
          hourlyRate: 50,
        },
        {
          id: "2",
          name: "John Doe",
          course: "Fundamental Principles of Design",
          category: "Design",
          email: "debbie.baker@example.com",
          gender: "Female",
          age: 28,
          rating: 4.9,
          bio: "Experienced design professional with 8+ years in the industry.",
          avatar: "/placeholder.svg?height=100&width=100",
          expertise: "UI/UX Specialist",
          availability: "Available",
          hourlyRate: 45,
        },
        {
          id: "3",
          name: "Jane Cooper",
          course: "Fundamental Principles of Design",
          category: "Design",
          email: "kenzi.lawson@example.com",
          gender: "Female",
          age: 32,
          rating: 4.7,
          bio: "Creative designer specializing in brand identity and visual communication.",
          avatar: "/placeholder.svg?height=100&width=100",
          expertise: "Brand Designer",
          availability: "Busy",
          hourlyRate: 55,
        },
      ],
      credits: 100,
      searchQuery: "",
      selectedCategory: "all",
      selectedGender: "all",
      selectedAvailability: "all",

      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSelectedGender: (gender) => set({ selectedGender: gender }),
      setSelectedAvailability: (availability) => set({ selectedAvailability: availability }),

      addCredits: (amount) => set((state) => ({ credits: state.credits + amount })),

      getFilteredTutors: () => {
        const { tutors, searchQuery, selectedCategory, selectedGender, selectedAvailability } = get()

        return tutors.filter((tutor) => {
          const matchesSearch =
            tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tutor.course.toLowerCase().includes(searchQuery.toLowerCase())
          const matchesCategory = selectedCategory === "all" || tutor.category === selectedCategory
          const matchesGender = selectedGender === "all" || tutor.gender === selectedGender
          const matchesAvailability = selectedAvailability === "all" || tutor.availability === selectedAvailability

          return matchesSearch && matchesCategory && matchesGender && matchesAvailability
        })
      },
    }),
    {
      name: "tutor-storage",
    },
  ),
)

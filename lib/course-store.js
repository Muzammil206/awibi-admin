"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useCourseStore = create(
  persist(
    (set, get) => ({
      courses: [
        {
          id: "1",
          title: "UI/UX Foundation",
          instructor: "Jada Pratt",
          category: "Design",
          studentsEnrolled: "789",
          description: "Learn the fundamentals of UI/UX design",
          email: "jada.pratt@example.com",
          startDate: "2024-01-15",
          endDate: "2024-03-15",
          image: null,
        },
        {
            id: "2",
            title: "Web Development",
            instructor: "John Doe",
            category: "Technology",
            category: "Design",
            studentsEnrolled: "789",
            description: "Learn the fundamentals of UI/UX design",
            email: "jada.pratt@example.com",
            startDate: "2024-01-15",
            endDate: "2024-03-15",
            image: null,
          },
          {
            id: "3",
            title: "UI/UX Foundation",
            instructor: "Jada Pratt",
            category: "Design",
            studentsEnrolled: "789",
            description: "Learn the fundamentals of UI/UX design",
            email: "jada.pratt@example.com",
            startDate: "2024-01-15",
            endDate: "2024-03-15",
            image: null,
          },
          {
            id: "9",
            title: "UI/UX Foundation",
            instructor: "Jada Pratt",
            category: "Design",
            studentsEnrolled: "789",
            description: "Learn the fundamentals of UI/UX design",
            email: "jada.pratt@example.com",
            startDate: "2024-01-15",
            endDate: "2024-03-15",
            image: null,
          },
          {
            id: "4",
            title: "UI/UX Foundation",
            instructor: "Jada Pratt",
            category: "Design",
            studentsEnrolled: "789",
            description: "Learn the fundamentals of UI/UX design",
            email: "jada.pratt@example.com",
            startDate: "2024-01-15",
            endDate: "2024-03-15",
            image: null,
          },
      ],
      addCourse: (course) => {
        const newCourse = {
          ...course,
          id: Date.now().toString(),
          studentsEnrolled: "0",
        }
        set((state) => ({
          courses: [...state.courses, newCourse],
        }))
        return newCourse
      },
      updateCourse: (id, updatedCourse) => {
        set((state) => ({
          courses: state.courses.map((course) => (course.id === id ? { ...course, ...updatedCourse } : course)),
        }))
      },
      deleteCourse: (id) => {
        set((state) => ({
          courses: state.courses.filter((course) => course.id !== id),
        }))
      },
    }),
    {
      name: "course-storage",
    },
  ),
)

"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useCourseStore = create(
  persist(
    (set, get) => ({
      courses: [
        {
          id: "1",
          title: "Introduction to Web Development",
          instructor: "Jada Pratt",
          category: "Programming",
          tags: "Web Dev, HTML, CSS",
          studentsEnrolled: "50",
          description: "Learn the fundamentals of UI/UX design",
          email: "jada.pratt@example.com",
          startDate: "2024-01-15",
          endDate: "2024-03-15",
          image: null,
          status: "Published",
          price: "0.00",
          lastUpdated: "2023-08-15",
        },
        {
          id: "2",
          title: "Advanced Data Science Techniques",
          instructor: "John Doe",
          category: "Data Science",
          tags: "Machine Learning, Python",
          studentsEnrolled: "0",
          description: "Deep dive into advanced data science concepts.",
          email: "john.doe@example.com",
          startDate: "2024-02-01",
          endDate: "2024-04-01",
          image: null,
          status: "Draft",
          price: "0.00",
          lastUpdated: "2023-07-20",
        },
        {
          id: "3",
          title: "Mobile App Development with React Native",
          instructor: "Sarah Johnson",
          category: "Mobile Dev",
          tags: "React Native, Javascript",
          studentsEnrolled: "75",
          description: "Build cross-platform mobile apps with React Native.",
          email: "sarah.j@example.com",
          startDate: "2024-03-01",
          endDate: "2024-05-01",
          image: null,
          status: "Published",
          price: "N5,000.00",
          lastUpdated: "2023-09-01",
        },
        {
          id: "4",
          title: "Cloud Computing Fundamentals",
          instructor: "Mike Chen",
          category: "Cloud Computing",
          tags: "AWS, Azure, GCP",
          studentsEnrolled: "40",
          description: "Understand the basics of cloud computing.",
          email: "mike.c@example.com",
          startDate: "2024-04-01",
          endDate: "2024-06-01",
          image: null,
          status: "Published",
          price: "N5,000.00",
          lastUpdated: "2023-08-22",
        },
        {
          id: "5",
          title: "Cybersecurity Essentials",
          instructor: "Emily White",
          category: "Cybersecurity",
          tags: "Network Security, Ethical Hacking",
          studentsEnrolled: "0",
          description: "Essential knowledge for cybersecurity.",
          email: "emily.w@example.com",
          startDate: "2024-05-01",
          endDate: "2024-07-01",
          image: null,
          status: "Draft",
          price: "0.00",
          lastUpdated: "2023-07-10",
        },
        {
          id: "6",
          title: "Another Draft Course",
          instructor: "Test Instructor",
          category: "Test",
          tags: "Test Tag",
          studentsEnrolled: "0",
          description: "This is another draft course.",
          email: "test@example.com",
          startDate: "2024-06-01",
          endDate: "2024-08-01",
          image: null,
          status: "Draft",
          price: "0.00",
          lastUpdated: "2023-07-10",
        },
        {
          id: "7",
          title: "Published Course Example",
          instructor: "Example Instructor",
          category: "Example",
          tags: "Example Tag",
          studentsEnrolled: "10",
          description: "This is a published course example.",
          email: "example@example.com",
          startDate: "2024-07-01",
          endDate: "2024-09-01",
          image: null,
          status: "Published",
          price: "100.00",
          lastUpdated: "2023-09-01",
        },
      ],
      selectedFilter: "all", // New state for filtering courses

      addCourse: (course) => {
        const newCourse = {
          ...course,
          id: Date.now().toString(),
          studentsEnrolled: "0",
          status: "Draft", // Default status for new courses
          price: "0.00", // Default price
          lastUpdated: new Date().toISOString().split("T")[0], // Current date
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
      setSelectedFilter: (filter) => set({ selectedFilter: filter }), // New action to set filter

      getFilteredCourses: () => {
        const { courses, selectedFilter } = get()
        if (selectedFilter === "all") {
          return courses
        } else if (selectedFilter === "drafts") {
          return courses.filter((course) => course.status === "Draft")
        } else if (selectedFilter === "published") {
          return courses.filter((course) => course.status === "Published")
        }
        // For "coupons", you might return a different set of data or an empty array if not implemented yet
        return []
      },
    }),
    {
      name: "course-storage",
    },
  ),
)

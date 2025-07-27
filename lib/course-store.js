"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

const API_URL = 'https://lms-backend-yux4.onrender.com/api/v1'

export const useCourseStore = create(
  persist(
    (set, get) => ({
      courses: [],
      selectedFilter: "all",
      isLoading: false,
      error: null,
      pagination: {
        total: 0,
        pages: 0,
        current: 1
      },

      setSelectedFilter: (filter) => set({ selectedFilter: filter }),

      fetchCourses: async (page = 1) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/courses?page=${page}`);
          const result = await response.json();
          
          if (result.success) {
            set({
              courses: result.data,
              pagination: result.pagination,
              isLoading: false
            });
          } else {
            set({ error: result.message || 'Failed to fetch courses', isLoading: false });
          }
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },

      addCourse: async (courseData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/courses`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData),
          });
          const result = await response.json();
          
          if (result.success) {
            set((state) => ({
              courses: [...state.courses, result.data],
              isLoading: false
            }));
            return result.data;
          } else {
            set({ error: result.message || 'Failed to add course', isLoading: false });
            return null;
          }
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return null;
        }
      },

      updateCourse: async (id, updatedCourse) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/courses/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCourse),
          });
          const result = await response.json();
          
          if (result.success) {
            set((state) => ({
              courses: state.courses.map((course) => 
                course._id === id ? { ...course, ...result.data } : course
              ),
              isLoading: false
            }));
            return result.data;
          } else {
            set({ error: result.message || 'Failed to update course', isLoading: false });
            return null;
          }
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return null;
        }
      },

      deleteCourse: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/courses/${id}`, {
            method: 'DELETE',
          });
          const result = await response.json();
          
          if (result.success) {
            set((state) => ({
              courses: state.courses.filter((course) => course._id !== id),
              isLoading: false
            }));
            return true;
          } else {
            set({ error: result.message || 'Failed to delete course', isLoading: false });
            return false;
          }
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return false;
        }
      },

      getFilteredCourses: () => {
        const { courses, selectedFilter } = get()
        if (selectedFilter === "all") {
          return courses
        } else if (selectedFilter === "drafts") {
          return courses.filter((course) => course.status === "Draft")
        } else if (selectedFilter === "published") {
          return courses.filter((course) => course.status === "Published")
        }
        return []
      },

      // Get a single course by ID
      getCourseById: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/courses/${id}`);
          const result = await response.json();
          
          if (result.success) {
            return result.data;
          } else {
            set({ error: result.message || 'Failed to fetch course', isLoading: false });
            return null;
          }
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return null;
        } finally {
          set({ isLoading: false });
        }
      },

      // Reset error state
      clearError: () => set({ error: null }),

      // Reset store state
      reset: () => set({
        courses: [],
        selectedFilter: "all",
        isLoading: false,
        error: null,
        pagination: {
          total: 0,
          pages: 0,
          current: 1
        }
      })
    }),
    {
      name: "course-storage",
    }
  )
)

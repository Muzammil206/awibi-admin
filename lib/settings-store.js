"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useSettingsStore = create(
  persist(
    (set) => ({
      systemLanguage: "English",
      allowNewUsers: true,
      defaultLanguage: "English",
      timeZone: "CET - Central European Time",
      dateTimeFormat: "DD/MM/YYYY",
      courseAnalytics: "Monthly",
      currency: "NGN (N)",
      allowNotifications: true,
      backupTime: "2:00 AM Everyday",
      systemFont: "DM - Sans",
      profilePictureSizeLimit: "Default- 4096 Kb (4Mb)",
      passwordPolicy: ["Uppercase Letter", "Lowercase Letter", "Number", "Special Character", "Minimum 8 characters"],

      setSetting: (key, value) => set({ [key]: value }),
    }),
    {
      name: "settings-storage",
    },
  ),
)

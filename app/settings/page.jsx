import { CoursesHeader } from "@/components/courses-header"
import { SettingsItem } from "@/components/settings-item"
import { UserPlus, Folder, GraduationCap } from "lucide-react"

export default function SettingsPage() {
  const commonDescription =
    "Create rich course content and coaching products for your students. When you give them a pricing plan, they'll appear on your site!"

  return (
    <div className="min-h-screen bg-gray-50">
      <CoursesHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* Settings Items */}
        <div className="space-y-4">
          <SettingsItem
            icon={UserPlus}
            title="Add other admins"
            description={commonDescription}
            href="/settings/add-admin"
          />
          <SettingsItem
            icon={Folder}
            title="Add tutors"
            description={commonDescription}
            href="/tutors/add" // Link to the existing add tutor page
          />
          <SettingsItem
            icon={GraduationCap}
            title="Add students"
            description={commonDescription}
            href="/settings/add-student"
          />
          {/* Replicating the duplicate "Add students" item as per the image */}
          <SettingsItem
            icon={GraduationCap}
            title="Add students"
            description={commonDescription}
            href="/settings/add-student-duplicate" // A unique href for the duplicate
          />
        </div>
      </main>
    </div>
  )
}

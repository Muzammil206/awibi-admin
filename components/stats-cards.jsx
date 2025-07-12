import { FolderOpen, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function StatsCards() {
  const stats = [
    {
      title: "Total Courses",
      value: "345",
      icon: FolderOpen,
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Students",
      value: "3,500",
      icon: Users,
      borderColor: "border-teal-200",
      iconColor: "text-teal-600",
    },
    {
      title: "Total tutors",
      value: "1349",
      icon: Users,
      borderColor: "border-red-200",
      iconColor: "text-red-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className={`${stat.borderColor} border-2 bg-white`}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg bg-gray-50`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

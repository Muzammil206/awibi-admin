import { Users, BookOpen, UserCheck, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function StatsCards() {
  const stats = [
    {
      title: "Users",
      value: "592k",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Courses",
      value: "3.5k",
      icon: BookOpen,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Enrolled users",
      value: "2.9k",
      icon: UserCheck,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Certificates",
      value: "952",
      icon: Heart,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${stat.iconBg}`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

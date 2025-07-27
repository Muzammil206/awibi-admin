import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function ActivityFeed() {
  const activities = [
    {
      id: 1,
      user: "@DercoMani",
      time: "2 mins ago",
      description: 'Enrolled for "The Study of the Human Mind"',
      avatar: "/image.svg?height=40&width=40",
      hasDot: true,
    },
    {
      id: 2,
      user: "@MiaMore",
      time: "9 mins ago",
      description: "Just registered",
      avatar: "/image.svg?height=40&width=40",
      hasDot: false,
    },
    {
      id: 3,
      user: "@RinaMenol",
      time: "11 mins ago",
      description: "Started following you",
      avatar: "/image.svg?height=40&width=40",
      hasDot: false,
    },
    {
      id: 4,
      user: "@CoryToms",
      time: "23 mins ago",
      description: "Started a new course",
      avatar: "/image.svg?height=40&width=40",
      hasDot: false,
    },
    {
      id: 5,
      user: "@IngaV",
      time: "28 mins ago",
      description: "Started a new course",
      avatar: "/image.svg?height=40&width=40",
      hasDot: false,
    },
    {
      id: 6,
      user: "@HouseHoleJohn",
      time: "33 mins ago",
      description: "Started a new course",
      avatar: "/image.svg?height=40&width=40",
      hasDot: false,
    },
  ]

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Activity feed</h3>
        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
          Notifications
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="relative flex-shrink-0">
              <Image
                src={activity.avatar || "/placeholder.svg"}
                alt={activity.user}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              {activity.hasDot && (
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
              )}
            </div>
            <div>
              <p className="text-gray-900" style={{
                fontFamily: "Inter",
                fontSize: "10px",
                fontWeight: 300,
                lineHeight: "100%",
                letterSpacing: "0.23px"
              }}>
                <span className="font-medium">{activity.user}</span>{" "}
                <span className="text-gray-500">{activity.time}</span>
              </p>
              <p className="text-gray-600" style={{
                fontFamily: "Inter",
                fontSize: "10px",
                fontWeight: 300,
                lineHeight: "100%",
                letterSpacing: "0.23px"
              }}>{activity.description}</p>
            </div>
          </div>
        ))}
        <div className="text-center pt-4">
          <Button variant="outline" className="bg-transparent text-blue-600 hover:bg-blue-50">
            See all
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

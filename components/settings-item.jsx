import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export function SettingsItem({ icon: Icon, title, description, href = "#" }) {
  return (
    <Link href={href} className="block">
      <Card className="bg-white border-none shadow-none hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
        <CardContent className="flex items-start space-x-4 p-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

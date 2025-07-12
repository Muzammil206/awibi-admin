import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function NoticeBoard() {
  const notices = [
    "Salman Juliet just sent an application for the weekend coupon",
    "Salman Juliet just sent an application for the weekend coupon, Salman Juliet just sent an application for the weekend coupon",
    "Salman Juliet just sent an application for the weekend coupon, Salman Juliet just sent an application for the weekend coupon",
    "Salman Juliet just sent an application for the weekend coupon, Salman Juliet just sent an application for the weekend coupon",
    "Salman Juliet just sent an application for the weekend coupon, Salman Juliet just sent an application for the weekend coupon",
  ]

  return (
    <Card className="h-fit">
      <CardHeader>
        <h3 className="text-lg font-semibold text-[#081735]">Notice board</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {notices.map((notice, index) => (
          <div key={index} className="text-sm text-gray-600 leading-relaxed">
            <div className="w-full h-[0px] border-[1px] mx-[0px]"></div>
            <p className=" text-left justify-center text-[#081735]">{notice}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

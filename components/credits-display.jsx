// "use client"

// import { Zap } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { useTutorStore } from "@/lib/tutor-store"

// export function CreditsDisplay({ onTopUpClick }) {
//   const credits = useTutorStore((state) => state.credits)

//   return (
//     <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
//       <CardContent className="p-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-white bg-opacity-20 rounded-full">
//               <Zap className="w-5 h-5" />
//             </div>
//             <div>
//               <p className="text-sm opacity-90">Available Credits</p>
//               <p className="text-2xl font-bold">{credits}</p>
//             </div>
//           </div>
//           <Button
//             onClick={onTopUpClick}
//             variant="secondary"
//             size="sm"
//             className="bg-white text-blue-600 hover:bg-gray-100"
//           >
//             Top Up
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

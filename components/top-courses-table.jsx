import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TopCoursesTable() {
  const courses = [
    {
      id: "PRE2209",
      name: "Introduction to Web Development",
      status: "Published",
      price: "0.00",
      category: "Programming",
      tags: "Web Dev, HTML, CSS",
      students: "50",
      lastUpdated: "2023-08-15",
    },
    {
      id: "PRE1245",
      name: "Advanced Data Science Techniques",
      status: "Draft",
      price: "0.00",
      category: "Data Science",
      tags: "Machine Learning, Python",
      students: "0",
      lastUpdated: "2023-07-20",
    },
    {
      id: "PRE1625",
      name: "Mobile App Development with React Native",
      status: "Published",
      price: "N5,000.00",
      category: "Mobile Dev",
      tags: "React Native, Javascript",
      students: "75",
      lastUpdated: "2023-09-01",
    },
    {
      id: "PRE2516",
      name: "Cloud Computing Fundamentals",
      status: "Published",
      price: "N5,000.00",
      category: "Cloud Computing",
      tags: "AWS, Azure, GCP",
      students: "40",
      lastUpdated: "2023-08-22",
    },
    {
      id: "PRE2209",
      name: "Cybersecurity Essentials",
      status: "Draft",
      price: "0.00",
      category: "Cybersecurity",
      tags: "Network Security, Ethical Hacking",
      students: "0",
      lastUpdated: "2023-07-10",
    },
  ]

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Top Courses</h3>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-600">Course Name</TableHead>
              <TableHead className="text-gray-600">Status</TableHead>
              <TableHead className="text-gray-600">Price</TableHead>
              <TableHead className="text-gray-600">Category</TableHead>
              <TableHead className="text-gray-600">Tags</TableHead>
              <TableHead className="text-gray-600">Students</TableHead>
              <TableHead className="text-gray-600">Last Updated</TableHead>
              <TableHead className="text-gray-600">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={index}>
                <TableCell className="text-gray-900 font-medium">{course.name}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${
                      course.status === "Published"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-gray-100 text-gray-800 border-gray-200"
                    }`}
                  >
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600">{course.price}</TableCell>
                <TableCell className="text-gray-600">{course.category}</TableCell>
                <TableCell className="text-gray-600">{course.tags}</TableCell>
                <TableCell className="text-gray-600">{course.students}</TableCell>
                <TableCell className="text-gray-600">{course.lastUpdated}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

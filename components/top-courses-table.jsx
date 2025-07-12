import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TopCoursesTable() {
  const courses = [
    { id: "PRE2209", name: "Design and its Elements", students: "1185", department: "Design", year: "2025" },
    { id: "PRE1245", name: "Design and its Elements", students: "1195", department: "Design", year: "2024" },
    { id: "PRE1625", name: "Design and its Elements", students: "1196", department: "Design", year: "2024" },
    { id: "PRE2516", name: "Design and its Elements", students: "1187", department: "Design", year: "2023" },
    { id: "PRE2209", name: "Design and its Elements", students: "1185", department: "Design", year: "2020" },
  ]

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Top Courses</h3>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-600">ID</TableHead>
              <TableHead className="text-gray-600">Name</TableHead>
              <TableHead className="text-gray-600">Students</TableHead>
              <TableHead className="text-gray-600">Department</TableHead>
              <TableHead className="text-gray-600">Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={index}>
                <TableCell className="text-gray-600">{course.id}</TableCell>
                <TableCell className="text-gray-900">{course.name}</TableCell>
                <TableCell className="text-gray-600">{course.students}</TableCell>
                <TableCell className="text-gray-600">{course.department}</TableCell>
                <TableCell className="text-gray-600">{course.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useResourceStore } from "@/lib/resource-store"
import { toast } from "sonner"

export function RecentSalesTable() {
  const { recentSales } = useResourceStore()

  const handleViewDetails = (id) => {
    toast.info(`View details for sale ${id} functionality coming soon!`)
  }

  if (recentSales.length === 0) {
    return <div className="text-center py-8 text-gray-500">No recent sales data available.</div>
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-600 ">Book Title</TableHead>
            <TableHead className="text-gray-600">Quantity Sold</TableHead>
            <TableHead className="text-gray-600">Revenue</TableHead>
            <TableHead className="text-gray-600">Date</TableHead>
            <TableHead className="text-gray-600">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentSales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  fontStyle: 'normal',
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0px',
                }}
                className="text-gray-900"
              >
                {sale.bookTitle}
              </TableCell>
              <TableCell
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  fontStyle: 'normal',
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0px',
                }}
                className="text-gray-600"
              >
                {sale.quantitySold}
              </TableCell>
              <TableCell
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  fontStyle: 'normal',
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0px',
                }}
                className="text-gray-600"
              >
                {sale.revenue}
              </TableCell>
              <TableCell
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                  fontStyle: 'normal',
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0px',
                }}
                className="text-gray-600"
              >
                {sale.date}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => handleViewDetails(sale.id)}>View Details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

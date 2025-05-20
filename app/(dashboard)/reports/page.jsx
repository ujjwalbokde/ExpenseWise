"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Download, FileText, BarChart3, PieChart, LineChart } from "lucide-react"

export default function ReportsPage() {
  const [date, setDate] = useState(new Date())
  const [reportType, setReportType] = useState("monthly")

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight font-montserrat">Reports</h2>
        <Button className="group bg-[#1976d2] hover:bg-[#115293]">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="dashboard-card border-l-4 border-l-[#1976d2]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income Report</CardTitle>
            <div className="rounded-full bg-[#1976d2]/10 p-2">
              <LineChart className="h-4 w-4 text-[#1976d2]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1976d2]">$4,500.00</div>
            <p className="text-xs text-muted-foreground mt-1">View detailed income breakdown</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-l-4 border-l-[#f44336]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expense Report</CardTitle>
            <div className="rounded-full bg-[#f44336]/10 p-2">
              <BarChart3 className="h-4 w-4 text-[#f44336]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#f44336]">$3,200.00</div>
            <p className="text-xs text-muted-foreground mt-1">View detailed expense breakdown</p>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-l-4 border-l-[#4caf50]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Report</CardTitle>
            <div className="rounded-full bg-[#4caf50]/10 p-2">
              <PieChart className="h-4 w-4 text-[#4caf50]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#4caf50]">$1,300.00</div>
            <p className="text-xs text-muted-foreground mt-1">View detailed savings breakdown</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Generate Report</CardTitle>
          <CardDescription>Create custom financial reports for your records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select defaultValue={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Report</SelectItem>
                  <SelectItem value="quarterly">Quarterly Report</SelectItem>
                  <SelectItem value="annual">Annual Report</SelectItem>
                  <SelectItem value="custom">Custom Date Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "MMMM yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="mt-6 bg-[#1976d2] hover:bg-[#115293]">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="income" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
        </TabsList>

        <TabsContent value="income" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Income Reports</CardTitle>
              <CardDescription>View and analyze your income sources</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <LineChart className="h-16 w-16 mx-auto text-[#1976d2] mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Income Reports Coming Soon</h3>
                <p className="text-muted-foreground max-w-md">
                  Detailed income reports with charts and analysis will be available in the next update.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Expense Reports</CardTitle>
              <CardDescription>View and analyze your spending patterns</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 mx-auto text-[#f44336] mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Expense Reports Coming Soon</h3>
                <p className="text-muted-foreground max-w-md">
                  Detailed expense reports with charts and analysis will be available in the next update.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Savings Reports</CardTitle>
              <CardDescription>View and analyze your savings progress</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-16 w-16 mx-auto text-[#4caf50] mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Savings Reports Coming Soon</h3>
                <p className="text-muted-foreground max-w-md">
                  Detailed savings reports with charts and analysis will be available in the next update.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

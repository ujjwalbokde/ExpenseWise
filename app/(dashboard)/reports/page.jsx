"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Download,
  FileText,
  BarChart3,
  PieChart,
  LineChart,
  IndianRupeeIcon,
} from "lucide-react";
import { getDashboardData } from "@/lib/api/dashboard";
import { useToast } from "@/components/ui/use-toast";

export default function ReportsPage() {
  const [date, setDate] = useState(new Date());
  const [reportType, setReportType] = useState("monthly");
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

const handleGenerateReport = async () => {
  try {
    setIsLoading(true);
    
    const params = {
      reportType,
      format: 'pdf', // or get this from a state if you have format selection
      ...(reportType === 'monthly' && {
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      }),
    };

    const response = await fetch('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to generate report');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportType}_report.${params.format}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();

    toast({
      title: "Report Downloaded",
      description: `Your ${reportType === "monthly" ? "Monthly" : "Full"} report has been downloaded.`,
    });
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to generate report. Please try again.",
    });
  } finally {
    setIsLoading(false);
  }
};

  const renderValue = (value, color) => (
    <div className={`text-2xl font-bold text-[${color}] flex items-center gap-1`}>
      <IndianRupeeIcon className="w-5 h-5" />
      {isLoading ? "Loading..." : value}
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight font-montserrat">
          Reports
        </h2>
        
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Income */}
        <Card className="dashboard-card border-l-4 border-l-[#1976d2]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income Report</CardTitle>
            <div className="rounded-full bg-[#1976d2]/10 p-2">
              <LineChart className="h-4 w-4 text-[#1976d2]" />
            </div>
          </CardHeader>
          <CardContent>
            {renderValue(dashboardData?.summary?.totalIncome, "#1976d2")}
            <p className="text-xs text-muted-foreground mt-1">
              View detailed income breakdown
            </p>
          </CardContent>
        </Card>

        {/* Expenses */}
        <Card className="dashboard-card border-l-4 border-l-[#f44336]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expense Report</CardTitle>
            <div className="rounded-full bg-[#f44336]/10 p-2">
              <BarChart3 className="h-4 w-4 text-[#f44336]" />
            </div>
          </CardHeader>
          <CardContent>
            {renderValue(dashboardData?.summary?.totalExpenses, "#f44336")}
            <p className="text-xs text-muted-foreground mt-1">
              View detailed expense breakdown
            </p>
          </CardContent>
        </Card>

        {/* Savings */}
        <Card className="dashboard-card border-l-4 border-l-[#4caf50]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Report</CardTitle>
            <div className="rounded-full bg-[#4caf50]/10 p-2">
              <PieChart className="h-4 w-4 text-[#4caf50]" />
            </div>
          </CardHeader>
          <CardContent>
            {renderValue(dashboardData?.summary?.balance, "#4caf50")}
            <p className="text-xs text-muted-foreground mt-1">
              View detailed savings breakdown
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Generate Report */}
      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Generate Report</CardTitle>
          <CardDescription>
            Create custom financial reports for your records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Report Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select defaultValue={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Report</SelectItem>
                  <SelectItem value="full">Full Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Picker - Only show for monthly report */}
            {reportType === "monthly" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Month</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(date, "MMMM yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Format */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            className="mt-6 bg-[#1976d2] hover:bg-[#115293]"
            onClick={handleGenerateReport}
          >
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
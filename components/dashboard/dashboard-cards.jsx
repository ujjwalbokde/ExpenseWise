import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, DollarSign, Percent, TrendingUp, TrendingDown } from "lucide-react"

export function DashboardCards({ data }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="dashboard-card border-l-4 border-l-[#1976d2] dark:border-l-[#42a5f5]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <div className="rounded-full bg-[#1976d2]/10 dark:bg-[#42a5f5]/20 p-2">
            <TrendingUp className="h-4 w-4 text-[#1976d2] dark:text-[#42a5f5]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#1976d2] dark:text-[#42a5f5]">
            ${data.totalIncome.toLocaleString()}
          </div>
          <div className="flex items-center pt-1">
            <ArrowUpIcon className="mr-1 h-3 w-3 text-[#4caf50] dark:text-[#81c784]" />
            <p className="text-xs text-[#4caf50] dark:text-[#81c784] font-medium">+12.5% from last month</p>
          </div>
        </CardContent>
      </Card>
      <Card className="dashboard-card border-l-4 border-l-[#f44336] dark:border-l-[#ef5350]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <div className="rounded-full bg-[#f44336]/10 dark:bg-[#ef5350]/20 p-2">
            <TrendingDown className="h-4 w-4 text-[#f44336] dark:text-[#ef5350]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#f44336] dark:text-[#ef5350]">
            ${data.totalExpenses.toLocaleString()}
          </div>
          <div className="flex items-center pt-1">
            <ArrowUpIcon className="mr-1 h-3 w-3 text-[#f44336] dark:text-[#ef5350]" />
            <p className="text-xs text-[#f44336] dark:text-[#ef5350] font-medium">+2.1% from last month</p>
          </div>
        </CardContent>
      </Card>
      <Card className="dashboard-card border-l-4 border-l-[#4caf50] dark:border-l-[#81c784]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          <div className="rounded-full bg-[#4caf50]/10 dark:bg-[#81c784]/20 p-2">
            <DollarSign className="h-4 w-4 text-[#4caf50] dark:text-[#81c784]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#4caf50] dark:text-[#81c784]">${data.balance.toLocaleString()}</div>
          <div className="flex items-center pt-1">
            <ArrowUpIcon className="mr-1 h-3 w-3 text-[#4caf50] dark:text-[#81c784]" />
            <p className="text-xs text-[#4caf50] dark:text-[#81c784] font-medium">+18.2% from last month</p>
          </div>
        </CardContent>
      </Card>
      <Card className="dashboard-card border-l-4 border-l-[#ff9800] dark:border-l-[#ffb74d]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
          <div className="rounded-full bg-[#ff9800]/10 dark:bg-[#ffb74d]/20 p-2">
            <Percent className="h-4 w-4 text-[#ff9800] dark:text-[#ffb74d]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#ff9800] dark:text-[#ffb74d]">{data.savingsRate}%</div>
          <div className="flex items-center pt-1">
            <ArrowDownIcon className="mr-1 h-3 w-3 text-[#f44336] dark:text-[#ef5350]" />
            <p className="text-xs text-[#f44336] dark:text-[#ef5350] font-medium">-2.5% from last month</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { DashboardCards } from "@/components/dashboard/dashboard-cards"
import { CategoryBreakdown } from "@/components/dashboard/category-breakdown"
import { BudgetOverview } from "@/components/dashboard/budget-overview"
import { getDashboardData } from "@/lib/api/dashboard"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { BarChart, List, PieChart } from "lucide-react"
import { useSidebar } from "@/components/sidebar-provider"

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { isOpen } = useSidebar()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData()
        setDashboardData(data)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  if (isLoading) {
    return (
      <div className={`space-y-6 animate-in fade-in duration-300 ${isOpen ? "ml-4" : "ml-2"}`}>
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Skeleton className="h-[350px] lg:col-span-4" />
          <Skeleton className="h-[350px] lg:col-span-3" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  // For demo purposes, we'll use mock data if the API call fails
  const data = dashboardData || {
    summary: {
      totalIncome: 4500,
      totalExpenses: 3200,
      balance: 1300,
      savingsRate: 28.9,
    },
    monthlyData: [
      { month: "Jan", income: 4200, expenses: 3100 },
      { month: "Feb", income: 4300, expenses: 3300 },
      { month: "Mar", income: 4100, expenses: 3000 },
      { month: "Apr", income: 4500, expenses: 3200 },
      { month: "May", income: 4600, expenses: 3400 },
      { month: "Jun", income: 4400, expenses: 3100 },
    ],
    categoryBreakdown: [
      { name: "Housing", value: 1200 },
      { name: "Food", value: 600 },
      { name: "Transportation", value: 400 },
      { name: "Entertainment", value: 300 },
      { name: "Utilities", value: 250 },
      { name: "Other", value: 450 },
    ],
    budgets: [
      { category: "Housing", budget: 1500, spent: 1200 },
      { category: "Food", budget: 800, spent: 600 },
      { category: "Transportation", budget: 500, spent: 400 },
      { category: "Entertainment", budget: 400, spent: 300 },
      { category: "Utilities", budget: 300, spent: 250 },
    ],
    recentTransactions: [
      { id: 1, description: "Grocery Shopping", amount: -120, category: "Food", date: "2024-05-18" },
      { id: 2, description: "Salary", amount: 4500, category: "Income", date: "2024-05-15" },
      { id: 3, description: "Electricity Bill", amount: -85, category: "Utilities", date: "2024-05-12" },
      { id: 4, description: "Restaurant", amount: -65, category: "Food", date: "2024-05-10" },
      { id: 5, description: "Gas", amount: -45, category: "Transportation", date: "2024-05-08" },
    ],
  }

  return (
    <div className={`space-y-6 animate-in fade-in duration-300 page-transition ${isOpen ? "ml-4" : "ml-2"}`}>
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="w-full">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-lg">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              {/* <TabsTrigger value="budgets" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span>Budgets</span>
              </TabsTrigger> */}
              <TabsTrigger value="transactions" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                <span>Transactions</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <DashboardCards data={data.summary} />
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4 dashboard-card">
                  <CardHeader>
                    <CardTitle className="font-montserrat">Income vs Expenses</CardTitle>
                    <CardDescription>Your income and expenses for the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview data={data.monthlyData} />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3 dashboard-card">
                  <CardHeader>
                    <CardTitle className="font-montserrat">Expense Breakdown</CardTitle>
                    <CardDescription>Your spending by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CategoryBreakdown data={data.categoryBreakdown} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* <TabsContent value="budgets" className="mt-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="font-montserrat">Budget Overview</CardTitle>
                  <CardDescription>Your budget usage for this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <BudgetOverview data={data.budgets} />
                </CardContent>
              </Card>
            </TabsContent> */}

            <TabsContent value="transactions" className="mt-6">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="font-montserrat">Recent Transactions</CardTitle>
                  <CardDescription>Your most recent transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentTransactions data={data.recentTransactions} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
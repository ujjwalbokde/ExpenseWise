import { supabase } from "@/lib/supabaseClient"
import dayjs from "dayjs"

export async function getDashboardData() {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch all transactions for the user
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)

  if (error) {
    console.error("Failed to fetch transactions", error)
    return null
  }

  // Categorize and process
  const now = dayjs()
  const thisYear = now.year()

  let totalIncome = 0
  let totalExpenses = 0
  const monthlyMap = {}
  const categoryMap = {}

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  for (const tx of transactions) {
    const amount = parseFloat(tx.amount)
    const date = dayjs(tx.date)
    const month = date.format("MMM")

    // Monthly Aggregation
    if (!monthlyMap[month]) {
      monthlyMap[month] = { month, income: 0, expenses: 0 }
    }

    if (amount >= 0) {
      totalIncome += amount
      monthlyMap[month].income += amount
    } else {
      totalExpenses += Math.abs(amount)
      monthlyMap[month].expenses += Math.abs(amount)

      // Category Aggregation
      if (!categoryMap[tx.category]) {
        categoryMap[tx.category] = 0
      }
      categoryMap[tx.category] += Math.abs(amount)
    }
  }

  const balance = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0

  return {
    summary: {
      totalIncome,
      totalExpenses,
      balance,
      savingsRate: Number(savingsRate),
    },
    monthlyData: Object.values(monthlyMap),
    categoryBreakdown: Object.entries(categoryMap).map(([name, value]) => ({ name, value })),
    recentTransactions,
  }
}

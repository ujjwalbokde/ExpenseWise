// This is a mock implementation for demo purposes
// In a real app, this function would make actual API calls

export async function getDashboardData() {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
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
      })
    }, 1000)
  })
}

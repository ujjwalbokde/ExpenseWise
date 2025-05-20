// This is a mock implementation for demo purposes
// In a real app, these functions would make actual API calls

export async function getTransactions() {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, description: "Grocery Shopping", amount: -120, category: "Food", date: "2024-05-18" },
        { id: 2, description: "Salary", amount: 4500, category: "Income", date: "2024-05-15" },
        { id: 3, description: "Electricity Bill", amount: -85, category: "Utilities", date: "2024-05-12" },
        { id: 4, description: "Restaurant", amount: -65, category: "Food", date: "2024-05-10" },
        { id: 5, description: "Gas", amount: -45, category: "Transportation", date: "2024-05-08" },
        { id: 6, description: "Movie Tickets", amount: -30, category: "Entertainment", date: "2024-05-05" },
        { id: 7, description: "Internet Bill", amount: -60, category: "Utilities", date: "2024-05-03" },
        { id: 8, description: "Freelance Work", amount: 350, category: "Income", date: "2024-05-02" },
        { id: 9, description: "Coffee Shop", amount: -15, category: "Food", date: "2024-05-01" },
        { id: 10, description: "Gym Membership", amount: -50, category: "Health", date: "2024-04-30" },
      ])
    }, 1000)
  })
}

export async function addTransaction(transaction) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 10000),
        ...transaction,
      })
    }, 1000)
  })
}

export async function editTransaction(id, updatedData) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        ...updatedData,
      })
    }, 1000)
  })
}

export async function deleteTransaction(id) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 1000)
  })
}

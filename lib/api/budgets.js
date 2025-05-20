// This is a mock implementation for demo purposes
// In a real app, these functions would make actual API calls

export async function getBudgets() {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, category: "Housing", budget: 1500, spent: 1200 },
        { id: 2, category: "Food", budget: 800, spent: 600 },
        { id: 3, category: "Transportation", budget: 500, spent: 400 },
        { id: 4, category: "Entertainment", budget: 400, spent: 300 },
        { id: 5, category: "Utilities", budget: 300, spent: 250 },
        { id: 6, category: "Health", budget: 200, spent: 150 },
        { id: 7, category: "Shopping", budget: 300, spent: 280 },
        { id: 8, category: "Education", budget: 150, spent: 100 },
      ])
    }, 1000)
  })
}

export async function addBudget(budget) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 10000),
        ...budget,
      })
    }, 1000)
  })
}

export async function updateBudget(id, updatedData) {
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

export async function deleteBudget(id) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 1000)
  })
}

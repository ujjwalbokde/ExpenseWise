// This is a mock implementation for demo purposes
// In a real app, these functions would make actual API calls

export async function getCategories() {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Housing", type: "expense", icon: "Home" },
        { id: 2, name: "Food", type: "expense", icon: "Utensils" },
        { id: 3, name: "Transportation", type: "expense", icon: "Car" },
        { id: 4, name: "Entertainment", type: "expense", icon: "Film" },
        { id: 5, name: "Utilities", type: "expense", icon: "Zap" },
        { id: 6, name: "Health", type: "expense", icon: "Heart" },
        { id: 7, name: "Shopping", type: "expense", icon: "ShoppingBag" },
        { id: 8, name: "Education", type: "expense", icon: "BookOpen" },
        { id: 9, name: "Income", type: "income", icon: "DollarSign" },
        { id: 10, name: "Investments", type: "income", icon: "TrendingUp" },
        { id: 11, name: "Gifts", type: "income", icon: "Gift" },
        { id: 12, name: "Other", type: "expense", icon: "MoreHorizontal" },
      ])
    }, 1000)
  })
}

export async function addCategory(category) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.floor(Math.random() * 10000),
        ...category,
      })
    }, 1000)
  })
}

export async function updateCategory(id, updatedData) {
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

export async function deleteCategory(id) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 1000)
  })
}

// This is a mock implementation for demo purposes
// In a real app, these functions would make actual API calls

export async function loginUser(credentials) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 1,
          name: "John Doe",
          email: credentials.email,
        },
        token: "mock-jwt-token",
      })
    }, 1000)
  })
}

export async function registerUser(details) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 1,
          name: details.name,
          email: details.email,
        },
      })
    }, 1000)
  })
}

export async function logoutUser() {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 500)
  })
}

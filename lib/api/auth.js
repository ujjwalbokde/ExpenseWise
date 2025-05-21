// lib/api/auth.js
import { supabase } from "@/lib/supabaseClient"

// LOGIN FUNCTION
export async function loginUser({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw new Error(error.message)
  return data
}

// REGISTER FUNCTION
export async function registerUser({ email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw new Error(error.message)
  return data
}

// LOGOUT FUNCTION
export async function logoutUser() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)
  return { success: true }
}

// lib/api/auth.js (add this function)

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw new Error(error.message)
  return data.user
}
/**
 * Check if a user is currently logged in.
 * @returns {Promise<boolean>} True if logged in, false otherwise.
 */
export async function checkUserLoggedIn() {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    console.error("Error checking session:", error.message)
    return false
  }
  return !!data.session
}
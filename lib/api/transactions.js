import { supabase } from "../supabaseClient"

// Get authenticated user's transactions
export async function getTransactions() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("User not authenticated.")
  }

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

// Add a new transaction
export async function addTransaction({ description, amount, category, date }) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("User not authenticated.")
  }

  const { data, error } = await supabase
    .from("transactions")
    .insert({
      user_id: user.id,
      description,
      amount,
      category,
      date,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Edit a transaction
export async function editTransaction(id, updatedData) {
  const { data, error } = await supabase
    .from("transactions")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Delete a transaction
export async function deleteTransaction(id) {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)

  if (error) throw new Error(error.message)
  return { success: true }
}

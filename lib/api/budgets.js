import { supabase } from '../supabaseClient'

export async function getBudgets() {
  const { data, error } = await supabase
    .from('budgets')
    .select('*')

  if (error) {
    console.error('Error fetching budgets:', error)
    return []
  }

  return data
}

export async function addBudget(budget) {
  const { data, error } = await supabase
    .from('budgets')
    .insert([budget])
    .select()
    .single()

  if (error) {
    console.error('Error adding budget:', error)
    return null
  }

  return data
}

export async function updateBudget(id, updatedData) {
  const { data, error } = await supabase
    .from('budgets')
    .update(updatedData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating budget:', error)
    return null
  }

  return data
}

export async function deleteBudget(id) {
  const { error } = await supabase
    .from('budgets')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting budget:', error)
    return { success: false }
  }

  return { success: true }
}

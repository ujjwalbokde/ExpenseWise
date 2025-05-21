import { supabase } from "@/lib/supabaseClient";

// Fetch all categories
export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw new Error("Failed to fetch categories: " + error.message);
  return data;
}

// Add a new category
export async function addCategory(category) {
  const { data, error } = await supabase
    .from("categories")
    .insert([category])
    .select()
    .single();

  if (error) throw new Error("Failed to add category: " + error.message);
  return data;
}

// Update a category by ID
export async function updateCategory(id, updatedData) {
  const { data, error } = await supabase
    .from("categories")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Failed to update category: " + error.message);
  return data;
}

// Delete a category by ID
export async function deleteCategory(id) {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) throw new Error("Failed to delete category: " + error.message);
  return { success: true };
}

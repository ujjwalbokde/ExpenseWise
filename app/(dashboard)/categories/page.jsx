"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryDialog } from "@/components/categories/category-dialog"
import { CategoryGrid } from "@/components/categories/category-grid"
import { getCategories } from "@/lib/api/categories"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus } from "lucide-react"

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load categories. Please try again.",
        })
        // For demo purposes, set mock data
        setCategories([
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
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [toast])

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory])
    toast({
      title: "Category added",
      description: "Your category has been added successfully.",
    })
  }

  const handleEditCategory = (updatedCategory) => {
    setCategories(categories.map((c) => (c.id === updatedCategory.id ? updatedCategory : c)))
    toast({
      title: "Category updated",
      description: "Your category has been updated successfully.",
    })
  }

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id))
    toast({
      title: "Category deleted",
      description: "Your category has been deleted successfully.",
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-[600px] w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
        <Button onClick={() => setDialogOpen(true)} className="group bg-[#1976d2] hover:bg-[#115293]">
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Categories</CardTitle>
          <CardDescription>Manage your income and expense categories</CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryGrid categories={categories} onEdit={handleEditCategory} onDelete={handleDeleteCategory} />
        </CardContent>
      </Card>

      <CategoryDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={handleAddCategory} />
    </div>
  )
}

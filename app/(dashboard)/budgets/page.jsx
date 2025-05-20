"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BudgetDialog } from "@/components/budgets/budget-dialog"
import { BudgetList } from "@/components/budgets/budget-list"
import { getBudgets } from "@/lib/api/budgets"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus } from "lucide-react"

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await getBudgets()
        setBudgets(data)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load budgets. Please try again.",
        })
        // For demo purposes, set mock data
        setBudgets([
          { id: 1, category: "Housing", budget: 1500, spent: 1200 },
          { id: 2, category: "Food", budget: 800, spent: 600 },
          { id: 3, category: "Transportation", budget: 500, spent: 400 },
          { id: 4, category: "Entertainment", budget: 400, spent: 300 },
          { id: 5, category: "Utilities", budget: 300, spent: 250 },
          { id: 6, category: "Health", budget: 200, spent: 150 },
          { id: 7, category: "Shopping", budget: 300, spent: 280 },
          { id: 8, category: "Education", budget: 150, spent: 100 },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchBudgets()
  }, [toast])

  const handleAddBudget = (newBudget) => {
    setBudgets([...budgets, newBudget])
    toast({
      title: "Budget added",
      description: "Your budget has been added successfully.",
    })
  }

  const handleEditBudget = (updatedBudget) => {
    setBudgets(budgets.map((b) => (b.id === updatedBudget.id ? updatedBudget : b)))
    toast({
      title: "Budget updated",
      description: "Your budget has been updated successfully.",
    })
  }

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter((b) => b.id !== id))
    toast({
      title: "Budget deleted",
      description: "Your budget has been deleted successfully.",
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
        <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
        <Button onClick={() => setDialogOpen(true)} className="group bg-[#1976d2] hover:bg-[#115293]">
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
          Add Budget
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Budgets</CardTitle>
          <CardDescription>Set and manage your monthly spending limits by category</CardDescription>
        </CardHeader>
        <CardContent>
          <BudgetList budgets={budgets} onEdit={handleEditBudget} onDelete={handleDeleteBudget} />
        </CardContent>
      </Card>

      <BudgetDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={handleAddBudget} />
    </div>
  )
}

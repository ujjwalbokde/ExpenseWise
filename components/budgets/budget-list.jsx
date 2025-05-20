"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { BudgetDialog } from "@/components/budgets/budget-dialog"

export function BudgetList({ budgets, onEdit, onDelete }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState(null)

  const handleEdit = (budget) => {
    setSelectedBudget(budget)
    setEditDialogOpen(true)
  }

  const handleDelete = (budget) => {
    setSelectedBudget(budget)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedBudget) {
      onDelete(selectedBudget.id)
      setDeleteDialogOpen(false)
    }
  }

  if (budgets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-center text-muted-foreground">No budgets found.</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {budgets.map((budget) => {
          const percentage = Math.round((budget.spent / budget.budget) * 100)
          let progressColor = "bg-[#4caf50]"

          if (percentage > 90) {
            progressColor = "bg-[#f44336]"
          } else if (percentage > 75) {
            progressColor = "bg-[#ff9800]"
          } else if (percentage > 50) {
            progressColor = "bg-[#2196f3]"
          }

          return (
            <div key={budget.id} className="group rounded-lg border p-4 transition-all hover:shadow-md">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-medium">{budget.category}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(budget)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(budget)}
                      className="text-[#f44336] focus:text-[#f44336]"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  ${budget.spent.toLocaleString()} of ${budget.budget.toLocaleString()}
                </span>
                <span className="text-sm font-medium">{percentage}%</span>
              </div>
              <Progress
                value={percentage}
                className="h-2 w-full transition-all duration-500"
                indicatorClassName={progressColor}
              />
              {percentage > 90 && (
                <div className="mt-2 text-xs font-medium text-[#f44336]">You have exceeded your budget!</div>
              )}
              {percentage > 75 && percentage <= 90 && (
                <div className="mt-2 text-xs font-medium text-[#ff9800]">You are approaching your budget limit.</div>
              )}
            </div>
          )
        })}
      </div>

      <BudgetDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} onAdd={onEdit} budget={selectedBudget} />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the budget.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-[#f44336] hover:bg-[#d32f2f]">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  category: z.string({ required_error: "Please select a category." }),
  budget: z.string().refine((val) => !isNaN(Number.parseFloat(val)), { message: "Budget must be a number." }),
})

export function BudgetDialog({ open, onOpenChange, onAdd, budget }) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: budget?.category || "",
      budget: budget?.budget ? budget.budget.toString() : "",
    },
  })

  async function onSubmit(values) {
    setIsLoading(true)
    try {
      const budgetAmount = Number.parseFloat(values.budget)

      const newBudget = {
        id: budget?.id || Math.floor(Math.random() * 10000),
        category: values.category,
        budget: budgetAmount,
        spent: budget?.spent || 0,
      }

      if (budget?.id) {
        // For demo purposes, we're not actually calling the API
        // await updateBudget(budget.id, newBudget)
      } else {
        // For demo purposes, we're not actually calling the API
        // await setBudget(newBudget)
      }

      onAdd(newBudget)
      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error("Failed to save budget:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{budget?.id ? "Edit Budget" : "Add Budget"}</DialogTitle>
          <DialogDescription>
            {budget?.id ? "Edit your budget details below." : "Set a monthly budget for a category."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Housing">Housing</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Shopping">Shopping</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Budget</FormLabel>
                  <FormControl>
                    <Input placeholder="1000.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="bg-[#1976d2] hover:bg-[#115293]">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                    <span>Saving...</span>
                  </div>
                ) : budget?.id ? (
                  "Update Budget"
                ) : (
                  "Add Budget"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  type: z.enum(["income", "expense"], { required_error: "Please select a type." }),
  icon: z.string({ required_error: "Please select an icon." }),
})

export function CategoryDialog({ open, onOpenChange, onAdd, category }) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
      type: category?.type || "expense",
      icon: category?.icon || "Tag",
    },
  })

  async function onSubmit(values) {
    setIsLoading(true)
    try {
      const newCategory = {
        id: category?.id || Math.floor(Math.random() * 10000),
        name: values.name,
        type: values.type,
        icon: values.icon,
      }

      if (category?.id) {
        // For demo purposes, we're not actually calling the API
        // await updateCategory(category.id, newCategory)
      } else {
        // For demo purposes, we're not actually calling the API
        // await addCategory(newCategory)
      }

      onAdd(newCategory)
      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error("Failed to save category:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category?.id ? "Edit Category" : "Add Category"}</DialogTitle>
          <DialogDescription>
            {category?.id ? "Edit your category details below." : "Create a new category for your transactions."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Groceries" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="expense" id="expense" />
                        <Label htmlFor="expense">Expense</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="income" id="income" />
                        <Label htmlFor="income">Income</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Utensils">Food</SelectItem>
                      <SelectItem value="Car">Transportation</SelectItem>
                      <SelectItem value="Film">Entertainment</SelectItem>
                      <SelectItem value="Zap">Utilities</SelectItem>
                      <SelectItem value="Heart">Health</SelectItem>
                      <SelectItem value="ShoppingBag">Shopping</SelectItem>
                      <SelectItem value="BookOpen">Education</SelectItem>
                      <SelectItem value="DollarSign">Income</SelectItem>
                      <SelectItem value="Gift">Gifts</SelectItem>
                      <SelectItem value="Tag">General</SelectItem>
                    </SelectContent>
                  </Select>
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
                ) : category?.id ? (
                  "Update Category"
                ) : (
                  "Add Category"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

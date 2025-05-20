"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon, CreditCard, DollarSign } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  description: z.string().min(2, { message: "Description must be at least 2 characters." }),
  amount: z.string().refine((val) => !isNaN(Number.parseFloat(val)), { message: "Amount must be a number." }),
  category: z.string({ required_error: "Please select a category." }),
  date: z.date({ required_error: "Please select a date." }),
  type: z.enum(["income", "expense"], { required_error: "Please select a type." }),
})

export function TransactionDialog({ open, onOpenChange, onAdd, transaction }) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: transaction?.description || "",
      amount: transaction?.amount ? Math.abs(transaction.amount).toString() : "",
      category: transaction?.category || "",
      date: transaction?.date ? new Date(transaction.date) : new Date(),
      type: transaction?.amount > 0 ? "income" : "expense",
    },
  })

  async function onSubmit(values) {
    setIsLoading(true)
    try {
      const amount = Number.parseFloat(values.amount)
      const finalAmount = values.type === "expense" ? -amount : amount

      const newTransaction = {
        id: transaction?.id || Math.floor(Math.random() * 10000),
        description: values.description,
        amount: finalAmount,
        category: values.category,
        date: format(values.date, "yyyy-MM-dd"),
      }

      if (transaction?.id) {
        // For demo purposes, we're not actually calling the API
        // await editTransaction(transaction.id, newTransaction)
      } else {
        // For demo purposes, we're not actually calling the API
        // await addTransaction(newTransaction)
      }

      onAdd(newTransaction)
      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error("Failed to save transaction:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Category colors mapping
  const categoryColors = {
    Income: "#4caf50",
    Food: "#ff9800",
    Housing: "#1976d2",
    Transportation: "#9c27b0",
    Entertainment: "#e91e63",
    Utilities: "#2196f3",
    Health: "#00bcd4",
    Other: "#607d8b",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-montserrat text-xl">
            {transaction?.id ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
          <DialogDescription>
            {transaction?.id ? "Edit your transaction details below." : "Add a new transaction to your account."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Description</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input placeholder="Grocery shopping" {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="100.00" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={field.value === "income" ? "text-[#4caf50]" : "text-[#f44336]"}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="income" className="text-[#4caf50]">
                          Income
                        </SelectItem>
                        <SelectItem value="expense" className="text-[#f44336]">
                          Expense
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Income" className="text-[#4caf50]">
                        Income
                      </SelectItem>
                      <SelectItem value="Food" className="text-[#ff9800]">
                        Food
                      </SelectItem>
                      <SelectItem value="Housing" className="text-[#1976d2]">
                        Housing
                      </SelectItem>
                      <SelectItem value="Transportation" className="text-[#9c27b0]">
                        Transportation
                      </SelectItem>
                      <SelectItem value="Entertainment" className="text-[#e91e63]">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="Utilities" className="text-[#2196f3]">
                        Utilities
                      </SelectItem>
                      <SelectItem value="Health" className="text-[#00bcd4]">
                        Health
                      </SelectItem>
                      <SelectItem value="Other" className="text-[#607d8b]">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className="w-full pl-3 text-left font-normal">
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

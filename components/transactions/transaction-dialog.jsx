"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon, CreditCard, IndianRupeeIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { addTransaction, editTransaction } from "@/lib/api/transactions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCategories } from "@/lib/api/categories"; // Make sure this function returns categories array [{id, name, icon, etc}]

const formSchema = z.object({
  description: z.string().min(2, { message: "Description must be at least 2 characters." }),
  amount: z.string().refine((val) => !isNaN(Number.parseFloat(val)), { message: "Amount must be a number." }),
  category: z.string({ required_error: "Please select a category." }),
  date: z.date({ required_error: "Please select a date." }),
  type: z.enum(["income", "expense"], { required_error: "Please select a type." }),
});

// Predefined color palette for categories
const categoryColorsPalette = [
  "#4caf50", "#ff9800", "#1976d2", "#9c27b0", "#e91e63", "#2196f3", "#00bcd4", "#607d8b", "#f44336", "#673ab7"
];

// Utility function to pick a random color from palette
function getRandomColor() {
  return categoryColorsPalette[Math.floor(Math.random() * categoryColorsPalette.length)];
}

export function TransactionDialog({ open, onOpenChange, onAdd, transaction }) {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: transaction?.description || "",
      amount: transaction?.amount ? Math.abs(transaction.amount).toString() : "",
      category: transaction?.category || "",
      date: transaction?.date ? new Date(transaction.date) : new Date(),
      type: transaction?.amount > 0 ? "income" : "expense",
    },
  });

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        // Add a random color to each category
        const categoriesWithColors = data.map((cat) => ({
          ...cat,
          color: getRandomColor(),
        }));
        setCategories(categoriesWithColors);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const amount = Number.parseFloat(values.amount);
      const finalAmount = values.type === "expense" ? -amount : amount;

      const newTransaction = {
        description: values.description,
        amount: finalAmount,
        category: values.category,
        date: format(values.date, "yyyy-MM-dd"),
      };

      let savedTransaction;

      if (transaction?.id) {
        savedTransaction = await editTransaction(transaction.id, newTransaction);
      } else {
        savedTransaction = await addTransaction(newTransaction);
      }

      onAdd(savedTransaction);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Failed to save transaction:", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-montserrat text-xl">
            {transaction?.id ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
          <DialogDescription>
            {transaction?.id
              ? "Edit your transaction details below."
              : "Add a new transaction to your account."}
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
                      <Input
                        placeholder="Grocery shopping"
                        {...field}
                        className="pl-10"
                      />
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
                        <IndianRupeeIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          placeholder="100.00"
                          {...field}
                          className="pl-10"
                        />
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={
                            field.value === "income"
                              ? "text-[#4caf50]"
                              : "text-[#f44336]"
                          }
                        >
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
                      {categories.length === 0 ? (
                        <SelectItem disabled>No categories found</SelectItem>
                      ) : (
                        categories.map((cat) => (
                          <SelectItem
                            key={cat.id}
                            value={cat.name}
                            style={{ color: cat.color }}
                          >
                            {cat.name}
                          </SelectItem>
                        ))
                      )}
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
                        <Button
                          variant={"outline"}
                          className="w-full pl-3 text-left font-normal"
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {transaction?.id ? "Update Transaction" : "Add Transaction"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

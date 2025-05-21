"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransactionDialog } from "@/components/transactions/transaction-dialog"
import { TransactionList } from "@/components/transactions/transaction-list"
import { getTransactions } from "@/lib/api/transactions"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Search } from "lucide-react"

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions()
        setTransactions(data)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load transactions. Please try again.",
        })
        // For demo purposes, set mock data
        setTransactions([
          { id: 1, description: "Grocery Shopping", amount: -120, category: "Food", date: "2024-05-18" },
          { id: 2, description: "Salary", amount: 4500, category: "Income", date: "2024-05-15" },
          { id: 3, description: "Electricity Bill", amount: -85, category: "Utilities", date: "2024-05-12" },
          { id: 4, description: "Restaurant", amount: -65, category: "Food", date: "2024-05-10" },
          { id: 5, description: "Gas", amount: -45, category: "Transportation", date: "2024-05-08" },
          { id: 6, description: "Movie Tickets", amount: -30, category: "Entertainment", date: "2024-05-05" },
          { id: 7, description: "Internet Bill", amount: -60, category: "Utilities", date: "2024-05-03" },
          { id: 8, description: "Freelance Work", amount: 350, category: "Income", date: "2024-05-02" },
          { id: 9, description: "Coffee Shop", amount: -15, category: "Food", date: "2024-05-01" },
          { id: 10, description: "Gym Membership", amount: -50, category: "Health", date: "2024-04-30" },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [toast])

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions])
    toast({
      title: "Transaction added",
      description: "Your transaction has been added successfully.",
    })
  }

  const handleEditTransaction = (updatedTransaction) => {
    setTransactions(transactions.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t)))
    toast({
      title: "Transaction updated",
      description: "Your transaction has been updated successfully.",
    })
  }

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id))
    toast({
      title: "Transaction deleted",
      description: "Your transaction has been deleted successfully.",
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-300 ">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <Button onClick={() => setDialogOpen(true)} className="group bg-[#1976d2] hover:bg-[#115293]">
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
          Add Transaction
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
        </TabsList>

        <div className="my-4 flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>View and manage all your transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionList
                transactions={filteredTransactions}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Income</CardTitle>
              <CardDescription>View and manage your income transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionList
                transactions={filteredTransactions.filter((t) => t.amount > 0)}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expenses</CardTitle>
              <CardDescription>View and manage your expense transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionList
                transactions={filteredTransactions.filter((t) => t.amount < 0)}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transfers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transfers</CardTitle>
              <CardDescription>View and manage your transfer transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">No transfer transactions found.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <TransactionDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={handleAddTransaction} />
    </div>
  )
}

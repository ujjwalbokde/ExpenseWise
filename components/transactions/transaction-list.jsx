"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowDownIcon, ArrowUpIcon, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { TransactionDialog } from "@/components/transactions/transaction-dialog"
import { deleteTransaction } from "@/lib/api/transactions" // 🔥 Import your lib function
export function TransactionList({ transactions, onEdit, onDelete }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction)
    setEditDialogOpen(true)
  }

  const handleDelete = (transaction) => {
    setSelectedTransaction(transaction)
    setDeleteDialogOpen(true)
  }

const confirmDelete = async () => {
  if (selectedTransaction) {
    try {
      await deleteTransaction(selectedTransaction.id); // 🔥 Call your lib function
      onDelete(selectedTransaction.id); // 🔄 Update state in parent
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    } finally {
      setDeleteDialogOpen(false);
    }
  }
};


  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-center text-muted-foreground">No transactions found.</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="group transition-colors hover:bg-muted/50">
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#1976d2]" />
                    <span>{transaction.category}</span>
                  </div>
                </TableCell>
                <TableCell>{format(new Date(transaction.date), "MMM dd, yyyy")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {transaction.amount > 0 ? (
                      <ArrowUpIcon className="h-4 w-4 text-[#4caf50]" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-[#f44336]" />
                    )}
                    <span className={transaction.amount > 0 ? "text-[#4caf50]" : "text-[#f44336]"}>
                      ${Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(transaction)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(transaction)}
                        className="text-[#f44336] focus:text-[#f44336]"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TransactionDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onAdd={onEdit}
        transaction={selectedTransaction}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the transaction.
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

"use client"

import { format } from "date-fns"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function RecentTransactions({ data }) {
  // Category colors mapping with dark mode variants
  const categoryColors = {
    Food: { light: "#ff9800", dark: "#ffb74d" },
    Income: { light: "#4caf50", dark: "#81c784" },
    Utilities: { light: "#2196f3", dark: "#64b5f6" },
    Transportation: { light: "#9c27b0", dark: "#ce93d8" },
    Entertainment: { light: "#e91e63", dark: "#f48fb1" },
    Health: { light: "#00bcd4", dark: "#4dd0e1" },
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 dark:bg-muted/20">
            <TableHead className="font-medium">Description</TableHead>
            <TableHead className="font-medium">Category</TableHead>
            <TableHead className="font-medium">Date</TableHead>
            <TableHead className="text-right font-medium">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((transaction) => {
            const categoryColor = categoryColors[transaction.category] || { light: "#607d8b", dark: "#90a4ae" }

            return (
              <TableRow
                key={transaction.id}
                className="group transition-colors hover:bg-muted/50 dark:hover:bg-muted/10"
              >
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: `var(--category-color, ${categoryColor.light})` }}
                    />
                    <span
                      className="font-medium"
                      style={{
                        color: `var(--category-color, ${categoryColor.light})`,
                        "--category-color": `var(--is-dark, ${categoryColor.light})`,
                      }}
                    >
                      {transaction.category}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{format(new Date(transaction.date), "MMM dd, yyyy")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {transaction.amount > 0 ? (
                      <ArrowUpIcon className="h-4 w-4 text-[#4caf50] dark:text-[#81c784]" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-[#f44336] dark:text-[#ef5350]" />
                    )}
                    <span
                      className={
                        transaction.amount > 0
                          ? "text-[#4caf50] dark:text-[#81c784] font-medium"
                          : "text-[#f44336] dark:text-[#ef5350] font-medium"
                      }
                    >
                      ${Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center py-4 bg-muted/20 dark:bg-muted/10">
        <Button variant="outline" size="sm" asChild className="hover:bg-primary hover:text-white transition-colors">
          <a href="/transactions">View All Transactions</a>
        </Button>
      </div>
    </div>
  )
}

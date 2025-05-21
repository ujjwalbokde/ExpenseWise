"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { CategoryDialog } from "@/components/categories/category-dialog"
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
import { deleteCategory } from "@/lib/api/categories"; // adjust the import path as needed

export function CategoryGrid({ categories, onEdit, onDelete }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleEdit = (category) => {
    setSelectedCategory(category)
    setEditDialogOpen(true)
  }

  const handleDelete = (category) => {
    setSelectedCategory(category)
    setDeleteDialogOpen(true)
  }


const confirmDelete = async () => {
  if (!selectedCategory) return;

  try {
    await deleteCategory(selectedCategory.id);
    onDelete(selectedCategory.id); // update UI after successful deletion
    setDeleteDialogOpen(false);
  } catch (error) {
    console.error("Failed to delete category:", error.message);
    // Optionally show an error notification here
  }
};

  // Dynamically get the icon component
  const getIconComponent = (iconName) => {
    const IconComponent = Icons[iconName]
    return IconComponent ? <IconComponent className="h-5 w-5" /> : <Icons.Tag className="h-5 w-5" />
  }

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-center text-muted-foreground">No categories found.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative flex flex-col items-center rounded-lg border p-4 transition-all hover:shadow-md"
          >
            <div className="absolute right-2 top-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(category)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(category)}
                    className="text-[#f44336] focus:text-[#f44336]"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mb-2 rounded-full bg-[#1976d2]/10 p-3 text-[#1976d2]">
              {getIconComponent(category.icon)}
            </div>
            <h3 className="text-center text-lg font-medium">{category.name}</h3>
            <Badge
              variant={category.type === "income" ? "default" : "secondary"}
              className={`mt-2 ${category.type === "income" ? "bg-[#4caf50]" : "bg-[#ff9800]"}`}
            >
              {category.type === "income" ? "Income" : "Expense"}
            </Badge>
          </div>
        ))}
      </div>

      <CategoryDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onAdd={onEdit}
        category={selectedCategory}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the category.
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

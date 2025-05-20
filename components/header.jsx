"use client"

import Link from "next/link"
import { Bell, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/sidebar-provider"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const { isOpen, setIsOpen, isMobile } = useSidebar()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          )}
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold gradient-text font-montserrat">ExpenseWise</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center max-w-sm w-full mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 bg-muted/50 border-none" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
              3
            </span>
          </Button>
          <Button variant="ghost" size="sm" asChild className="font-medium">
            <Link href="/settings" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">JD</span>
              </div>
              <span className="hidden md:inline">John Doe</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

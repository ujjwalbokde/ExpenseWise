"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, CreditCard, LayoutDashboard, LogOut, PieChart, Settings, Tag, User, VariableIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/sidebar-provider"
import { getCurrentUser } from "@/lib/api/auth"
import { useEffect, useState } from "react"
import { logoutUser } from "@/lib/api/auth"
import { checkUserLoggedIn } from "@/lib/api/auth"
import { useRouter } from "next/navigation"
import toast from "@/hooks/use-toast"
export function AppSidebar() {
  const pathname = usePathname()
  const { isOpen, setIsOpen, isMobile } = useSidebar()
  const [user, setUser] = useState(null)
  const router = useRouter()
  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUser()
        setUser(user)
      } catch (err) {
        console.error("Error fetching user:", err)
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    const verifyLogin = async () => {
      const isLoggedIn = await checkUserLoggedIn()
      if (!isLoggedIn) {
        router.push("/auth/login")
      }
    }

    verifyLogin()
  }, [router])

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-[#1976d2] dark:text-[#42a5f5]",
      bgColor: "bg-[#1976d2]/10 dark:bg-[#42a5f5]/20",
    },
    {
      label: "Transactions",
      icon: CreditCard,
      href: "/transactions",
      color: "text-[#9c27b0] dark:text-[#ce93d8]",
      bgColor: "bg-[#9c27b0]/10 dark:bg-[#ce93d8]/20",
    },
    {
      label: "Categories",
      icon: Tag,
      href: "/categories",
      color: "text-[#e91e63] dark:text-[#f48fb1]",
      bgColor: "bg-[#e91e63]/10 dark:bg-[#f48fb1]/20",
    },
    // {
    //   label: "Budgets",
    //   icon: PieChart,
    //   href: "/budgets",
    //   color: "text-[#ff9800] dark:text-[#ffb74d]",
    //   bgColor: "bg-[#ff9800]/10 dark:bg-[#ffb74d]/20",
    // },
    {
      label: "Reports",
      icon: BarChart3,
      href: "/reports",
      color: "text-[#4caf50] dark:text-[#81c784]",
      bgColor: "bg-[#4caf50]/10 dark:bg-[#81c784]/20",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      color: "text-[#607d8b] dark:text-[#90a4ae]",
      bgColor: "bg-[#607d8b]/10 dark:bg-[#90a4ae]/20",
    },
  ]


  const handleLogout = async () => {
    try {
      await logoutUser()
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
        variant: "success",
      })
      router.push("/auth/login")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: error.message,
      })
    }
  }
  if (!isOpen && !isMobile) {
    return (
      <aside className=" fixed left-0 top-0 z-30 flex h-screen w-16 flex-col border-r bg-background pt-16 animate-in slide-in-from-left duration-300">
        <nav className="grid gap-2 px-2 py-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground",
                pathname === route.href && `${route.bgColor} ${route.color}`,
              )}
              title={route.label}
            >
              <route.icon
                className={cn("h-5 w-5", pathname === route.href ? route.color : "text-gray-500 dark:text-gray-400")}
              />
              <span className="sr-only">{route.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-2 py-4">
          <Link
            href="/auth/login"
            className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="Logout"
          >
            <LogOut className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="sr-only">Logout</span>
          </Link>
        </div>
      </aside>
    )
  }

  if (isMobile && !isOpen) {
    return null
  }

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-64 flex-col border-r bg-background pt-20 animate-in slide-in-from-left duration-300 ">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-2">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
          <span className="font-medium">{user && user.user_metadata.name}</span>
            <span className="text-xs text-muted-foreground">{user && user.email}</span>
          </div>
        </div>
      </div>
      <nav className="grid gap-1 px-2 py-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground",
              pathname === route.href && `${route.bgColor} ${route.color}`,
            )}
          >
            <route.icon
              className={cn("h-5 w-5", pathname === route.href ? route.color : "text-gray-500 dark:text-gray-400")}
            />
            <span className={pathname === route.href ? "font-medium" : ""}>{route.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto border-t px-2 py-4 pb-10">
        <Link href="/auth/login">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </Link>
      </div>
      {isMobile && (
        <div className="absolute right-0 top-0 p-2">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
            <span className="sr-only">Close sidebar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </Button>
        </div>
      )}
    </aside>
  )
}

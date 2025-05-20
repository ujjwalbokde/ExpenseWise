import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold gradient-text">ExpenseWise</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-primary hover:bg-primary/90">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start gap-4">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About ExpenseWise</h1>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ExpenseWise is a user-friendly web platform designed to empower you to take control of your personal
                  finances.
                </p>
              </div>
              <div className="space-y-4 text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                <p>
                  Track your income and expenses effortlessly, categorize your spending, set monthly budgets, and watch
                  your financial health improve with insightful charts and real-time alerts.
                </p>
                <p>
                  Our goal: Make budgeting simple, visual, and motivating with an intuitive interface enhanced by
                  vibrant colors and smooth animations.
                </p>
                <p>
                  We believe that financial management should be accessible to everyone, regardless of their financial
                  background or expertise. That's why we've designed ExpenseWise to be intuitive and easy to use, while
                  still providing powerful features for those who want to dive deeper into their finances.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link href="/auth/register">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-background">
        <div className="container flex flex-col gap-2 py-4 md:h-14 md:flex-row md:items-center md:justify-between md:py-0">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2024 ExpenseWise. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-4 md:justify-end">
            <Link href="/terms" className="text-sm text-gray-500 underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

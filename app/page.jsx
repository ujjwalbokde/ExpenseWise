import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BarChart3, PieChart, Wallet } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold gradient-text font-montserrat">ExpenseWise</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" className="font-medium hover:text-primary">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-primary hover:bg-primary/90 animated-button font-medium">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-blue-50 dark:from-background dark:to-blue-950/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-montserrat">
                    <span className="gradient-text">Take Control</span> of Your Finances
                  </h1>
                  <p className="max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    ExpenseWise is a user-friendly web platform designed to empower you to take control of your personal
                    finances with beautiful visualizations and smart insights.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/register">
                    <Button size="lg" className="group bg-primary hover:bg-primary/90 animated-button font-medium">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary/20 hover:border-primary/40 font-medium"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="ExpenseWise Dashboard Preview"
                  className="rounded-lg object-cover shadow-xl"
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-montserrat">
                  Why Choose ExpenseWise?
                </h2>
                <p className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Track your income and expenses effortlessly, categorize your spending, set monthly budgets, and watch
                  your financial health improve with insightful charts and real-time alerts.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md card-hover">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <Wallet className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-montserrat">Track Expenses</h3>
                <p className="text-center text-gray-600 dark:text-gray-300">
                  Easily record and categorize all your income and expenses in one place with a beautiful interface.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md card-hover">
                <div className="rounded-full bg-purple/10 p-3 text-purple dark:bg-purple/20 dark:text-purple-300">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-montserrat">Visualize Data</h3>
                <p className="text-center text-gray-600 dark:text-gray-300">
                  See where your money goes with beautiful charts and interactive graphs.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md card-hover">
                <div className="rounded-full bg-green-500/10 p-3 text-green-500 dark:bg-green-500/20 dark:text-green-400">
                  <PieChart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-montserrat">Set Budgets</h3>
                <p className="text-center text-gray-600 dark:text-gray-300">
                  Create budgets for different categories and get alerts when you're close to limits.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-background dark:from-blue-950/20 dark:to-background">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-montserrat">Our Goal</h2>
              <p className="max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Make budgeting simple, visual, and motivating with an intuitive interface enhanced by vibrant colors and
                smooth animations.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link href="/auth/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90 animated-button font-medium">
                  Get Started
                </Button>
              </Link>
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
            <Link href="/terms" className="text-sm text-gray-500 underline-offset-4 hover:text-primary hover:underline">
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-500 underline-offset-4 hover:text-primary hover:underline"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

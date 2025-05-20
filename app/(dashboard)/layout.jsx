import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <AppSidebar />
        {/* Add proper padding for sidebar and adjust responsive behavior */}
        <main className="flex-1 w-full pl-0 md:pl-16 lg:pl-64 transition-all duration-300">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

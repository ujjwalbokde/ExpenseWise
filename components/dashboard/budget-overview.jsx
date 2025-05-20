"use client"

import { Progress } from "@/components/ui/progress"

export function BudgetOverview({ data }) {
  return (
    <div className="space-y-6">
      {data.map((item, index) => {
        const percentage = Math.round((item.spent / item.budget) * 100)
        let progressColor = "bg-[#4caf50] dark:bg-[#81c784]"
        let textColor = "text-[#4caf50] dark:text-[#81c784]"

        if (percentage > 90) {
          progressColor = "bg-[#f44336] dark:bg-[#ef5350]"
          textColor = "text-[#f44336] dark:text-[#ef5350]"
        } else if (percentage > 75) {
          progressColor = "bg-[#ff9800] dark:bg-[#ffb74d]"
          textColor = "text-[#ff9800] dark:text-[#ffb74d]"
        } else if (percentage > 50) {
          progressColor = "bg-[#2196f3] dark:bg-[#64b5f6]"
          textColor = "text-[#2196f3] dark:text-[#64b5f6]"
        }

        return (
          <div key={index} className="space-y-2 bg-muted/30 dark:bg-muted/10 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: progressColor.replace("bg-", "").replace("dark:bg-", ""),
                  }}
                />
                <span className="text-sm font-medium">{item.category}</span>
              </div>
              <span className="text-sm font-medium">
                <span className={textColor}>${item.spent.toLocaleString()}</span>
                <span className="text-muted-foreground"> / ${item.budget.toLocaleString()}</span>
              </span>
            </div>
            <Progress
              value={percentage}
              className="h-2.5 w-full transition-all duration-500 progress-bar-animate"
              indicatorClassName={progressColor}
            />
            <div className="flex justify-between items-center">
              <span className={`text-xs font-medium ${textColor}`}>{percentage}%</span>
              {percentage > 90 && (
                <div className="text-xs font-medium text-[#f44336] dark:text-[#ef5350] flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  Budget exceeded!
                </div>
              )}
              {percentage > 75 && percentage <= 90 && (
                <div className="text-xs font-medium text-[#ff9800] dark:text-[#ffb74d] flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  Approaching limit
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

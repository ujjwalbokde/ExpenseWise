"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export function CategoryBreakdown({ data }) {
  const COLORS = ["#1976d2", "#ff9800", "#2196f3", "#f44336", "#4caf50", "#9c27b0", "#ffeb3b", "#795548"]

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
            animationDuration={1500}
            animationBegin={200}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`$${value}`, "Amount"]}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
              padding: "0.75rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-md">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <span className="text-xs font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

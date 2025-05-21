"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
export function Overview({ data }) {
  return (
    <ResponsiveContainer width="100%" height={350} className="p-3">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "hsl(var(--muted-foreground))" }}
          dy={10}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "hsl(var(--muted-foreground))" }}
          tickFormatter={(value) => `$${value}`}
          dx={-10}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-3 shadow-md ">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground font-medium">Income</span>
                      <span className="font-bold text-[#1976d2] text-lg">₹{payload[0].value}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground font-medium">Expenses</span>
                      <span className="font-bold text-[#f44336] text-lg">₹{payload[1].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#1976d2"
          strokeWidth={3}
          dot={{ r: 6, fill: "#1976d2", strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 8, fill: "#1976d2", strokeWidth: 2, stroke: "#fff" }}
          animationDuration={1500}
        />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke="#f44336"
          strokeWidth={3}
          dot={{ r: 6, fill: "#f44336", strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 8, fill: "#f44336", strokeWidth: 2, stroke: "#fff" }}
          animationDuration={1500}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

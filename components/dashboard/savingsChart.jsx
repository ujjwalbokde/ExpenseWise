"use client"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

export function SavingsChart({ data }) {
  const savingsData = data.map(({ month, income, expenses }) => ({
    month,
    savings: income - expenses,
  }))

  return (
    <div className="rounded-xl p-3">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={savingsData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

          <XAxis
            dataKey="month"
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={60}
            tickFormatter={(value) => `₹${value}`}
          />

          <Tooltip
            formatter={(value) => [`₹${value}`, "Savings"]}
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
            labelStyle={{ color: "#94a3b8" }}
            itemStyle={{ color: "#22c55e" }}
            cursor={{ stroke: "#16a34a", strokeWidth: 1 }}
          />

          <Area
            type="monotone"
            dataKey="savings"
            stroke="#16a34a"
            fillOpacity={1}
            fill="url(#colorSavings)"
            strokeWidth={2.5}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

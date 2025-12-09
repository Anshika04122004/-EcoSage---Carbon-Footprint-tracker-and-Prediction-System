"use client"

import { Card } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface DashboardProps {
  userData: any
}

export default function Dashboard({ userData }: DashboardProps) {
  // Simulated trend data
  const trendData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    emissions: (Number.parseFloat(userData.emissions.daily) + (Math.random() - 0.5) * 2).toFixed(2),
  }))

  const categoryData = [
    { name: "Travel", value: Number.parseFloat(userData.emissions.breakdown.travel) },
    { name: "Electricity", value: Number.parseFloat(userData.emissions.breakdown.electricity) },
    { name: "Shopping", value: Number.parseFloat(userData.emissions.breakdown.shopping) },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-balance">Your Carbon Dashboard</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6 bg-card border-border">
          <div className="text-sm text-muted mb-2">Weekly Average</div>
          <div className="text-3xl font-bold text-primary">
            {(Number.parseFloat(userData.emissions.daily) * 7).toFixed(1)} kg
          </div>
          <div className="text-xs text-muted mt-2">CO₂ per week</div>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="text-sm text-muted mb-2">Monthly Projection</div>
          <div className="text-3xl font-bold text-accent">{userData.emissions.monthly}</div>
          <div className="text-xs text-muted mt-2">CO₂ this month</div>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="text-sm text-muted mb-2">Annual Projection</div>
          <div className="text-3xl font-bold text-warning">{userData.emissions.yearly}</div>
          <div className="text-xs text-muted mt-2">CO₂ per year</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-4">30-Day Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }} />
              <Area type="monotone" dataKey="emissions" stroke="#10b981" fillOpacity={1} fill="url(#colorEmissions)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Breakdown */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }} />
              <Bar dataKey="value" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}

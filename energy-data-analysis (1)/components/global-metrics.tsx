"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function GlobalMetrics() {
  // Global energy data
  const globalData = [
    { year: 2015, cleanEnergy: 18.2, fossils: 81.8, electricityUsage: 2400 },
    { year: 2016, cleanEnergy: 19.1, fossils: 80.9, electricityUsage: 2450 },
    { year: 2017, cleanEnergy: 19.8, fossils: 80.2, electricityUsage: 2500 },
    { year: 2018, cleanEnergy: 20.5, fossils: 79.5, electricityUsage: 2550 },
    { year: 2019, cleanEnergy: 21.2, fossils: 78.8, electricityUsage: 2600 },
    { year: 2020, cleanEnergy: 22.1, fossils: 77.9, electricityUsage: 2650 },
  ]

  const regionData = [
    { region: "Global Average", cleanShare: 21.2, emissions: 4.2 },
    { region: "Europe", cleanShare: 31.5, emissions: 3.8 },
    { region: "Asia", cleanShare: 18.9, emissions: 4.5 },
    { region: "Americas", cleanShare: 28.7, emissions: 4.1 },
    { region: "Africa", cleanShare: 15.2, emissions: 4.8 },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-balance">Global Energy & Carbon Data</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Global Trend */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-4">Global Clean Energy Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={globalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="year" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }} />
              <Legend />
              <Line type="monotone" dataKey="cleanEnergy" stroke="#10b981" strokeWidth={2} name="Clean Energy %" />
              <Line type="monotone" dataKey="fossils" stroke="#ef4444" strokeWidth={2} name="Fossil Fuels %" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Electricity Usage */}
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-4">Global Electricity Consumption</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={globalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="year" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155" }} />
              <Line type="monotone" dataKey="electricityUsage" stroke="#0ea5e9" strokeWidth={2} name="kWh per Capita" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Regional Comparison */}
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold mb-6">Regional Energy Mix</h3>
        <div className="space-y-4">
          {regionData.map((region) => (
            <div key={region.region} className="border-b border-border pb-4 last:border-b-0">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold">{region.region}</span>
                <div className="flex gap-4 text-sm">
                  <span className="text-primary">Clean: {region.cleanShare}%</span>
                  <span className="text-warning">Emissions: {region.emissions} t/capita</span>
                </div>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  style={{ width: `${region.cleanShare}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

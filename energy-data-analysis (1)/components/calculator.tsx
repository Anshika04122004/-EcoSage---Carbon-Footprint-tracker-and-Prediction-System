"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, TrendingDown } from "lucide-react"

interface CalculatorProps {
  setUserData: (data: any) => void
}

export default function Calculator({ setUserData }: CalculatorProps) {
  const [formData, setFormData] = useState({
    daily_travel_km: 30,
    electricity_usage_kwh: 500,
    diet_type: "Vegan",
    shopping_score: 5,
  })

  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const calculateFootprint = () => {
    setLoading(true)
    setTimeout(() => {
      // Simulated ML calculation
      const travelEmissions = formData.daily_travel_km * 0.21 // kg CO2 per km
      const electricityEmissions = formData.electricity_usage_kwh * 0.233 // kg CO2 per kWh (US average)
      const dietFactor = formData.diet_type === "Vegan" ? 0.5 : formData.diet_type === "Vegetarian" ? 0.7 : 1.0
      const shoppingEmissions = formData.shopping_score * 0.5

      const dailyEmissions = (travelEmissions + electricityEmissions + shoppingEmissions) * dietFactor
      const monthlyEmissions = dailyEmissions * 30
      const yearlyEmissions = dailyEmissions * 365

      const result = {
        daily: dailyEmissions.toFixed(2),
        monthly: monthlyEmissions.toFixed(2),
        yearly: yearlyEmissions.toFixed(2),
        breakdown: {
          travel: (travelEmissions * dietFactor).toFixed(2),
          electricity: (electricityEmissions * dietFactor).toFixed(2),
          shopping: (shoppingEmissions * dietFactor).toFixed(2),
        },
      }

      setResult(result)
      setUserData({ ...formData, emissions: result })
      setLoading(false)
    }, 800)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-2xl">📝</span> Your Carbon Profile
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Daily Travel (km)</label>
              <input
                type="range"
                min="0"
                max="200"
                value={formData.daily_travel_km}
                onChange={(e) => setFormData({ ...formData, daily_travel_km: Number.parseFloat(e.target.value) })}
                className="w-full"
              />
              <div className="text-primary font-bold mt-1">{formData.daily_travel_km} km</div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Monthly Electricity (kWh)</label>
              <input
                type="range"
                min="0"
                max="1500"
                value={formData.electricity_usage_kwh}
                onChange={(e) => setFormData({ ...formData, electricity_usage_kwh: Number.parseFloat(e.target.value) })}
                className="w-full"
              />
              <div className="text-primary font-bold mt-1">{formData.electricity_usage_kwh} kWh</div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Diet Type</label>
              <select
                value={formData.diet_type}
                onChange={(e) => setFormData({ ...formData, diet_type: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground"
              >
                <option>Vegan</option>
                <option>Vegetarian</option>
                <option>Omnivore</option>
                <option>Heavy Meat</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Shopping Score (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.shopping_score}
                onChange={(e) => setFormData({ ...formData, shopping_score: Number.parseFloat(e.target.value) })}
                className="w-full"
              />
              <div className="text-primary font-bold mt-1">{formData.shopping_score}/10</div>
            </div>

            <Button
              onClick={calculateFootprint}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3"
            >
              {loading ? "Calculating..." : "Calculate Footprint"}
            </Button>
          </div>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {result ? (
            <>
              <Card className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30">
                <h3 className="text-sm font-medium text-muted mb-4 flex items-center gap-2">
                  <Leaf className="w-4 h-4" /> Your Carbon Emissions
                </h3>
                <div className="space-y-4">
                  <div className="bg-card/50 p-4 rounded-lg">
                    <div className="text-xs text-muted mb-1">Daily Emissions</div>
                    <div className="text-3xl font-bold text-primary">{result.daily} kg CO₂</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card/50 p-3 rounded-lg">
                      <div className="text-xs text-muted mb-1">Monthly</div>
                      <div className="font-bold text-lg">{result.monthly} kg</div>
                    </div>
                    <div className="bg-card/50 p-3 rounded-lg">
                      <div className="text-xs text-muted mb-1">Yearly</div>
                      <div className="font-bold text-lg">{result.yearly} kg</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-sm font-medium text-muted mb-4 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" /> Emissions Breakdown
                </h3>
                <div className="space-y-3">
                  {Object.entries(result.breakdown).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="capitalize text-sm">{key}</span>
                      <div className="flex items-center gap-3 flex-1 ml-4">
                        <div className="h-2 bg-border rounded-full flex-1 overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full"
                            style={{
                              width: `${(Number.parseFloat(value as string) / Number.parseFloat(result.daily)) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-accent min-w-fit">{value} kg</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-12 bg-card border-border flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-muted">Fill out your profile and calculate to see your emissions</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

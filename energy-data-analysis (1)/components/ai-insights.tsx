"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Sparkles, Zap, Leaf, TrendingDown } from "lucide-react"

interface AIInsightsProps {
  userData: any
}

export default function AIInsights({ userData }: AIInsightsProps) {
  const [insights, setInsights] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate LLM-powered insights generation
    setTimeout(() => {
      const daily = Number.parseFloat(userData.emissions.daily)

      const newInsights = []
      const newRecommendations = []

      // AI-generated insights based on user data
      if (userData.daily_travel_km > 50) {
        newInsights.push("Your travel emissions are above average. Consider carpooling or using public transport.")
        newRecommendations.push("Switch 2-3 car trips per week to public transport to reduce emissions by ~15%")
      }

      if (userData.electricity_usage_kwh > 600) {
        newInsights.push("Your electricity consumption is high. Smart usage patterns could help.")
        newRecommendations.push("Use smart power strips and LED lighting to reduce consumption by ~20%")
      }

      if (userData.diet_type === "Vegan" || userData.diet_type === "Vegetarian") {
        newInsights.push("Your diet choice is already eco-friendly! Great job reducing food-related emissions.")
        newRecommendations.push("Share your sustainable lifestyle with others to amplify impact")
      }

      if (userData.shopping_score > 7) {
        newInsights.push(
          "High shopping activity increases your carbon footprint. Consider buying secondhand or sustainable brands.",
        )
        newRecommendations.push(
          "Buy second-hand items or invest in durable products to reduce consumption emissions by ~25%",
        )
      }

      newInsights.push(
        `Your daily footprint is ${daily.toFixed(2)} kg CO₂, equivalent to driving a car for ${(daily / 0.21).toFixed(0)} km.`,
      )
      newRecommendations.push("Track your progress monthly and adjust behaviors for continuous improvement")

      setInsights(newInsights)
      setRecommendations(newRecommendations)
      setLoading(false)
    }, 1200)
  }, [userData])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-balance flex items-center gap-3">
        <Sparkles className="text-accent" /> AI-Powered Insights & Recommendations
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <Card key={i} className="p-6 bg-card border-border animate-pulse">
                <div className="h-4 bg-border rounded w-3/4 mb-4" />
                <div className="h-3 bg-border rounded w-full mb-3" />
                <div className="h-3 bg-border rounded w-5/6" />
              </Card>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Insights */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="text-warning w-5 h-5" /> Key Insights
            </h3>
            <div className="space-y-4">
              {insights.map((insight, i) => (
                <Card key={i} className="p-4 bg-card border-border hover:border-accent/50 transition-colors">
                  <p className="text-foreground leading-relaxed">{insight}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Leaf className="text-primary w-5 h-5" /> Recommendations
            </h3>
            <div className="space-y-4">
              {recommendations.map((rec, i) => (
                <Card
                  key={i}
                  className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 hover:border-primary/50 transition-colors"
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <TrendingDown className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-foreground leading-relaxed">{rec}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Impact Potential */}
      <Card className="p-8 bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30 mt-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Leaf className="text-primary w-5 h-5" /> Your Impact Potential
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {(Number.parseFloat(userData.emissions.daily) * 0.25).toFixed(1)} kg
            </div>
            <p className="text-sm text-muted">Potential daily reduction (25%)</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">
              {(Number.parseFloat(userData.emissions.monthly) * 0.25).toFixed(1)} kg
            </div>
            <p className="text-sm text-muted">Potential monthly reduction</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-2">
              {(Number.parseFloat(userData.emissions.yearly) * 0.25).toFixed(1)} kg
            </div>
            <p className="text-sm text-muted">Potential yearly reduction</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

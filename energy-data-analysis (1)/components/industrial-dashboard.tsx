"use client"

import { useState } from "react"
import { ArrowLeft, Building2, Target, Globe, TrendingUp, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Line } from "recharts"

interface IndustrialDashboardProps {
  setUserType: (type: "landing" | "individual" | "industrial") => void
}

interface SectorAnalysisResult {
  currentEmissions: number
  sector: string
  country: string
  year: string
  predictions: Array<{
    year: number
    emissions: number
    reduction: number
    riskLevel: string
    recommendations: string
  }>
  heatmapData: Array<{
    region: string
    country: string
    emissions: number
    riskLevel: string
    color: string
  }>
  lineChartData: Array<{
    year: string
    emissions: number
  }>
}

export default function IndustrialDashboard({ setUserType }: IndustrialDashboardProps) {
  const [selectedSector, setSelectedSector] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [year, setYear] = useState("")
  const [analysisResult, setAnalysisResult] = useState<SectorAnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAnalyze = () => {
    if (!selectedSector || !selectedCountry || !year) {
      return
    }

    console.log("[v0] Analysis triggered", { selectedSector, selectedCountry, year })

    const lineChartData = [
      { year: "2026", emissions: 4300.8 },
      { year: "2027", emissions: 4085.87 },
      { year: "2028", emissions: 3841.04 },
      { year: "2029", emissions: 3572.77 },
      { year: "2030", emissions: 3287.89 },
    ]

    const mockResult: SectorAnalysisResult = {
      currentEmissions: 4500,
      sector: selectedSector,
      country: selectedCountry,
      year: year,
      predictions: [
        {
          year: 2026,
          emissions: 4300.8,
          reduction: 4.0,
          riskLevel: "high",
          recommendations:
            "2026: 4.0% reduction needed! Urgent action required - implement renewable energy transition and efficiency programs now.",
        },
        {
          year: 2027,
          emissions: 4085.87,
          reduction: 8.8,
          riskLevel: "high",
          recommendations:
            "2027: 8.8% reduction needed! Urgent action required - implement renewable energy transition and efficiency programs now.",
        },
        {
          year: 2028,
          emissions: 3841.04,
          reduction: 14.3,
          riskLevel: "high",
          recommendations:
            "2028: 14.3% reduction needed! Urgent action required - implement renewable energy transition and efficiency programs now.",
        },
        {
          year: 2029,
          emissions: 3572.77,
          reduction: 20.3,
          riskLevel: "high",
          recommendations:
            "2029: 20.3% reduction needed! Urgent action required - implement renewable energy transition and efficiency programs now.",
        },
        {
          year: 2030,
          emissions: 3287.89,
          reduction: 26.6,
          riskLevel: "high",
          recommendations:
            "2030: 26.6% reduction needed! Urgent action required - implement renewable energy transition and efficiency programs now.",
        },
      ],
      lineChartData: lineChartData,
      heatmapData: [
        { region: "Asia", country: "China", emissions: 11200, riskLevel: "very-high", color: "#ef4444" },
        { region: "Asia", country: "India", emissions: 2800, riskLevel: "high", color: "#f97316" },
        { region: "Asia", country: "Japan", emissions: 1150, riskLevel: "high", color: "#f97316" },
        {
          region: "North America",
          country: "United States",
          emissions: 5200,
          riskLevel: "very-high",
          color: "#ef4444",
        },
        { region: "North America", country: "Canada", emissions: 730, riskLevel: "moderate", color: "#eab308" },
        { region: "Europe", country: "Germany", emissions: 750, riskLevel: "moderate", color: "#eab308" },
        { region: "Europe", country: "France", emissions: 330, riskLevel: "low", color: "#22c55e" },
        { region: "Europe", country: "United Kingdom", emissions: 380, riskLevel: "low", color: "#22c55e" },
        { region: "South America", country: "Brazil", emissions: 470, riskLevel: "low", color: "#22c55e" },
        { region: "Africa", country: "South Africa", emissions: 450, riskLevel: "low", color: "#22c55e" },
        { region: "Oceania", country: "Australia", emissions: 420, riskLevel: "low", color: "#22c55e" },
      ],
    }

    setAnalysisResult(mockResult)
    setIsLoading(false)
    console.log("[v0] Analysis result set", mockResult)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "very-high":
        return "bg-red-600"
      case "high":
        return "bg-orange-500"
      case "moderate":
        return "bg-yellow-500"
      case "low":
        return "bg-emerald-500"
      default:
        return "bg-slate-500"
    }
  }

  const getRiskBorderColor = (risk: string) => {
    switch (risk) {
      case "very-high":
        return "border-red-500"
      case "high":
        return "border-orange-500"
      case "moderate":
        return "border-yellow-500"
      case "low":
        return "border-emerald-500"
      default:
        return "border-slate-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
        {/* Back Button */}
        <Button
          onClick={() => setUserType("landing")}
          variant="outline"
          className="mb-8 rounded-full bg-transparent border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-slate-900 px-6 py-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Title */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-12 text-center">
          Industrial Analytics Dashboard
        </h1>

        {/* Sector Emission Analysis */}
        <Card className="bg-[#1e2a3a] border-slate-700/50 rounded-3xl p-10 mb-8">
          <div className="flex items-center gap-3 mb-8">
            <Building2 className="w-8 h-8 text-emerald-500" />
            <h2 className="text-3xl font-bold text-white">Sector Emission Analysis</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sector Selection */}
            <div>
              <Label htmlFor="sector" className="text-slate-300 text-base mb-3 block">
                Sector
              </Label>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger
                  id="sector"
                  className="bg-[#1a2332] border-slate-700 text-slate-200 text-lg h-14 rounded-xl focus:ring-2 focus:ring-emerald-500"
                >
                  <SelectValue placeholder="Select Sector" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a2332] border-slate-700">
                  <SelectItem value="placeholder" disabled className="text-blue-400 bg-blue-500/20 font-medium">
                    Select Sector
                  </SelectItem>
                  <SelectItem
                    value="CO2 Emissions from Transport"
                    className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700"
                  >
                    CO2 Emissions from Transport
                  </SelectItem>
                  <SelectItem
                    value="Alternative and Nuclear Energy"
                    className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700"
                  >
                    Alternative and Nuclear Energy
                  </SelectItem>
                  <SelectItem
                    value="Fossil Fuel Energy Consumption"
                    className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700"
                  >
                    Fossil Fuel Energy Consumption
                  </SelectItem>
                  <SelectItem
                    value="Electricity Power Consumption"
                    className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700"
                  >
                    Electricity Power Consumption
                  </SelectItem>
                  <SelectItem value="Energy Use" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                    Energy Use
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-slate-500 text-sm mt-2">e.g., 2020</p>
            </div>

            {/* Country Selection */}
            <div>
              <Label htmlFor="country" className="text-slate-300 text-base mb-3 block">
                Country
              </Label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger
                  id="country"
                  className="bg-[#1a2332] border-slate-700 text-slate-200 text-lg h-14 rounded-xl focus:ring-2 focus:ring-emerald-500"
                >
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a2332] border-slate-700">
                  <SelectItem value="placeholder" disabled className="text-blue-400 bg-blue-500/20 font-medium">
                    Select Country
                  </SelectItem>
                  <SelectItem value="United States" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                    United States
                  </SelectItem>
                  <SelectItem value="China" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                    China
                  </SelectItem>
                  <SelectItem value="India" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                    India
                  </SelectItem>
                  <SelectItem value="Germany" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                    Germany
                  </SelectItem>
                  <SelectItem value="United Kingdom" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                    United Kingdom
                  </SelectItem>
                  <SelectItem value="France" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                    France
                  </SelectItem>
                  <SelectItem value="Japan" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                    Japan
                  </SelectItem>
                  <SelectItem value="Brazil" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                    Brazil
                  </SelectItem>
                  <SelectItem value="Canada" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                    Canada
                  </SelectItem>
                  <SelectItem value="Australia" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                    Australia
                  </SelectItem>
                  <SelectItem value="Russia" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                    Russia
                  </SelectItem>
                  <SelectItem value="South Korea" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                    South Korea
                  </SelectItem>
                  <SelectItem value="Mexico" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                    Mexico
                  </SelectItem>
                  <SelectItem value="Italy" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                    Italy
                  </SelectItem>
                  <SelectItem value="Spain" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                    Spain
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Year Input */}
            <div>
              <Label htmlFor="year" className="text-slate-300 text-base mb-3 block">
                Year
              </Label>
              <Input
                id="year"
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="1961"
                className="bg-[#1a2332] border-slate-700 text-slate-200 text-lg h-14 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="mt-8">
            <Button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-black font-bold text-lg py-7 rounded-xl"
            >
              Analyze & Predict
            </Button>
          </div>
        </Card>

        {/* ML-Powered Predictions Info Card */}
        <Card className="bg-[#1e2a3a] border-slate-700/50 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">ML-Powered Predictions</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Time-series forecasting for 2026-2030 emission trends</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>CNN-based pattern recognition in historical data</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Interactive global heatmap visualization</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>Sector-specific emission breakdown and analytics</span>
            </li>
          </ul>
        </Card>

        {analysisResult && (
          <>
            {/* Current Emissions Display */}
            <Card className="bg-[#1e2a3a] border-emerald-500/50 border-2 rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {analysisResult.year} Emissions: {analysisResult.currentEmissions.toFixed(2)} tonnes CO2
                </h2>
              </div>
              <div className="text-emerald-400 text-lg">
                <span className="font-medium">Sector:</span>{" "}
                <span className="text-emerald-300">{analysisResult.sector}</span> |
                <span className="font-medium ml-3">Country:</span>{" "}
                <span className="text-emerald-300">{analysisResult.country}</span>
              </div>
            </Card>

            {/* Interactive Global Emissions Heatmap */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-8 h-8 text-emerald-500" />
                <h2 className="text-4xl font-bold text-white">Interactive Global Emissions Heatmap</h2>
              </div>

              <Card className="bg-[#1e2a3a] border-slate-700/50 rounded-3xl p-8">
                <div className="bg-[#1a2332] border-2 border-slate-700/30 rounded-2xl p-8 min-h-[450px]">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
                    {analysisResult.heatmapData.map((region) => {
                      const totalEmissions = analysisResult.heatmapData.reduce((sum, r) => sum + r.emissions, 0)
                      const percentage = ((region.emissions / totalEmissions) * 100).toFixed(1)
                      const heightClass =
                        region.emissions > 10000 ? "row-span-2" : region.emissions > 3000 ? "row-span-2" : "row-span-1"

                      return (
                        <div
                          key={region.region}
                          className={`${getRiskColor(region.riskLevel)} ${getRiskBorderColor(region.riskLevel)} border-2 rounded-xl p-6 flex flex-col justify-between transition-transform hover:scale-105 cursor-pointer ${heightClass}`}
                        >
                          <div>
                            <h3 className="text-white font-bold text-xl mb-2">{region.region}</h3>
                            <div className="space-y-1 mb-3">
                              <p key={region.country} className="text-white/80 text-sm">
                                <span className="w-2 h-2 bg-white/60 rounded-full inline-block mr-2"></span>
                                {region.country}
                              </p>
                            </div>
                          </div>
                          <div className="mt-auto">
                            <p className="text-white/90 text-2xl font-bold">{region.emissions.toLocaleString()}</p>
                            <p className="text-white/70 text-sm">Mt CO2 ({percentage}%)</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                  <div className="bg-[#2a1f20] border-2 border-red-500 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                      <h4 className="text-white font-bold text-lg">Very High</h4>
                    </div>
                    <p className="text-slate-300 text-sm">Over 5000 Mt CO2</p>
                  </div>
                  <div className="bg-[#2a231f] border-2 border-orange-500 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                      <h4 className="text-white font-bold text-lg">High</h4>
                    </div>
                    <p className="text-slate-300 text-sm">1500-5000 Mt CO2</p>
                  </div>
                  <div className="bg-[#29261f] border-2 border-yellow-500 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                      <h4 className="text-white font-bold text-lg">Moderate</h4>
                    </div>
                    <p className="text-slate-300 text-sm">500-1500 Mt CO2</p>
                  </div>
                  <div className="bg-[#1a2520] border-2 border-emerald-500 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                      <h4 className="text-white font-bold text-lg">Low</h4>
                    </div>
                    <p className="text-slate-300 text-sm">Under 500 Mt CO2</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Future Predictions Section */}
            <Card className="border-slate-700/50 bg-[#1a2332]/80 backdrop-blur-sm">
              <div className="p-8">
                <div className="mb-6 flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-emerald-400" />
                  <h2 className="text-2xl font-bold text-white">Future Predictions (2026-2030)</h2>
                </div>

                <div className="mb-8 rounded-lg bg-[#1e2a3a] p-6">
                  <ChartContainer
                    config={{
                      emissions: {
                        label: "Emissions",
                        color: "hsl(142, 76%, 36%)",
                      },
                    }}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analysisResult.lineChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="year" stroke="#94a3b8" style={{ fontSize: "12px" }} />
                        <YAxis
                          stroke="#94a3b8"
                          style={{ fontSize: "12px" }}
                          label={{
                            value: "Emissions (tonnes CO2)",
                            angle: -90,
                            position: "insideLeft",
                            style: { fill: "#94a3b8" },
                          }}
                        />
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border border-border/50 bg-background p-2 shadow-xl">
                                  <div className="flex flex-col gap-1">
                                    <span className="text-xs text-muted-foreground">
                                      Year: {payload[0].payload.year}
                                    </span>
                                    <span className="text-sm font-semibold text-foreground">
                                      {payload[0].value?.toFixed(2)} tonnes CO2
                                    </span>
                                  </div>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="emissions"
                          stroke="hsl(142, 76%, 36%)"
                          strokeWidth={3}
                          dot={{ fill: "hsl(142, 76%, 36%)", r: 5 }}
                          activeDot={{ r: 7 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <p className="mt-4 text-center text-sm text-slate-400">
                    Predicted Emissions (tonnes) from 2026 to 2030
                  </p>
                </div>

                {/* Prediction Cards */}
                <div className="space-y-4">
                  {analysisResult.predictions.map((pred) => (
                    <Card key={pred.year} className="bg-[#2a1f20] border-2 border-red-500 rounded-2xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-3xl font-bold text-white">{pred.year}</h3>
                        <span className="px-4 py-1.5 bg-red-600 text-white rounded-full text-sm font-bold">
                          High Risk
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="text-slate-400 text-lg">Predicted: </span>
                        <span className="text-emerald-400 text-2xl font-bold">{pred.emissions.toFixed(2)}</span>
                        <span className="text-slate-400 text-lg"> tonnes CO2</span>
                      </div>
                      <div className="flex items-start gap-2 text-amber-300/90 italic">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span className="text-base">{pred.recommendations}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>

            {/* Strategic Action Plan */}
            <Card className="bg-[#1a2520] border-2 border-emerald-500 rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-emerald-500" />
                <h2 className="text-3xl font-bold text-white">Strategic Action Plan</h2>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-2xl font-bold text-emerald-400">1.</span>
                  <p className="text-slate-200 text-lg leading-relaxed">
                    Transition to renewable energy sources (solar, wind, hydroelectric) - target 50% by 2028
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl font-bold text-emerald-400">2.</span>
                  <p className="text-slate-200 text-lg leading-relaxed">
                    Implement energy efficiency programs across all operations - potential 25% reduction
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl font-bold text-emerald-400">3.</span>
                  <p className="text-slate-200 text-lg leading-relaxed">
                    Invest in carbon capture and storage technology
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl font-bold text-emerald-400">4.</span>
                  <p className="text-slate-200 text-lg leading-relaxed">
                    Establish circular economy practices to minimize waste
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl font-bold text-emerald-400">5.</span>
                  <p className="text-slate-200 text-lg leading-relaxed">
                    Regular monitoring and reporting with quarterly reviews
                  </p>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

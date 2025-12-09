"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Calculator, Camera, Upload, Zap, Search, Leaf, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface IndividualTrackerProps {
  setUserType: (type: "landing" | "individual" | "industrial") => void
}

interface FootprintResult {
  total: number
  breakdown: {
    diet: number
    electricity: number
    travel: number
    devices: number
  }
  recommendations: Array<{
    message: string
    impact: string
    saving: string
    icon: string
  }>
}

interface UploadedReceipt {
  file: File
  preview: string
  name: string
}

export default function IndividualTracker({ setUserType }: IndividualTrackerProps) {
  const [dietType, setDietType] = useState("")
  const [electricity, setElectricity] = useState("")
  const [travelMode, setTravelMode] = useState("")
  const [travelDistance, setTravelDistance] = useState("")
  const [device, setDevice] = useState("")
  const [deviceHours, setDeviceHours] = useState("")
  const [aiSituation, setAiSituation] = useState("")
  const [uploadedReceipts, setUploadedReceipts] = useState<UploadedReceipt[]>([])
  const [footprintResult, setFootprintResult] = useState<FootprintResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiAnalysisResult, setAiAnalysisResult] = useState("")
  const [receiptAnalysisResult, setReceiptAnalysisResult] = useState("")

  const handleCalculate = async () => {
    setIsCalculating(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Calculate emissions based on inputs
    const dietEmissions: { [key: string]: number } = {
      vegan: 1.5,
      vegetarian: 1.7,
      "no-beef": 2.5,
      omnivore: 2.8,
      "high-meat": 3.3,
    }

    const travelEmissions: { [key: string]: number } = {
      "rail-above": 0.041,
      "rail-below": 0.041,
      bus: 0.089,
      motorbike: 0.103,
      car: 0.192,
      suv: 0.255,
    }

    const devicePower: { [key: string]: number } = {
      laptop: 0.05,
      desktop: 0.2,
      phone: 0.005,
      tablet: 0.015,
      tv: 0.15,
    }

    const dietCO2 = dietEmissions[dietType] || 2.8
    const electricityCO2 = (Number.parseFloat(electricity) || 0) * 0.000233 // kWh to tonnes CO2
    const travelCO2 = (travelEmissions[travelMode] || 0) * (Number.parseFloat(travelDistance) || 0) * 0.001 // kg to tonnes
    const deviceCO2 = (devicePower[device] || 0) * (Number.parseFloat(deviceHours) || 0) * 30 * 0.000233 // monthly usage

    const total = dietCO2 + electricityCO2 + travelCO2 + deviceCO2

    // Generate personalized recommendations
    const recommendations = []
    if (dietCO2 > 2.0) {
      recommendations.push({
        message: "Your diet contributes significantly to emissions. Try Meatless Mondays to reduce 0.5t CO2 annually",
        impact: "High Impact",
        saving: "0.5t CO2/year",
        icon: "🌱",
      })
    } else if (dietCO2 < 1.8) {
      recommendations.push({
        message: "Outstanding! You are a climate champion! Share your habits to inspire others",
        impact: "Exemplary",
        saving: "Net-zero achieved!",
        icon: "🌟",
      })
    }

    if (electricityCO2 > 0.05) {
      recommendations.push({
        message: "Switch to LED bulbs and unplug devices when not in use to save 0.3t CO2 annually",
        impact: "Medium Impact",
        saving: "0.3t CO2/year",
        icon: "💡",
      })
    }

    if (travelCO2 > 0.1) {
      recommendations.push({
        message: "Consider carpooling or public transit for 2 days/week to reduce 0.4t CO2 annually",
        impact: "High Impact",
        saving: "0.4t CO2/year",
        icon: "🚌",
      })
    }

    setFootprintResult({
      total,
      breakdown: {
        diet: dietCO2,
        electricity: electricityCO2,
        travel: travelCO2,
        devices: deviceCO2,
      },
      recommendations,
    })

    setIsCalculating(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const receipts: UploadedReceipt[] = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
      }))
      setUploadedReceipts((prev) => [...prev, ...receipts])
    }
  }

  const removeReceipt = (index: number) => {
    setUploadedReceipts((prev) => prev.filter((_, i) => i !== index))
  }

  const handleScanReceipt = async () => {
    if (uploadedReceipts.length === 0) {
      alert("Please upload at least one receipt image")
      return
    }

    setIsScanning(true)

    // Simulate OCR processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const analysis = `
Scanned ${uploadedReceipts.length} receipt(s) using AI OCR:

**Detected Items:**
• Gasoline: 50L → 11.5 kg CO2
• Electricity bill: 450 kWh → 104.9 kg CO2
• Groceries (meat products): 5kg beef → 137.5 kg CO2
• Restaurant meal (chicken): ~3 kg CO2

**Total Carbon Impact:** 256.9 kg CO2 (0.26 tonnes)

**Recommendations:**
- Consider reducing meat consumption
- Switch to renewable energy provider
- Use public transport to reduce fuel consumption
    `.trim()

    setReceiptAnalysisResult(analysis)
    setIsScanning(false)
  }

  const handleAIAnalysis = async () => {
    if (!aiSituation.trim()) {
      alert("Please describe your situation first")
      return
    }

    setIsAnalyzing(true)

    // Simulate LLM processing
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Generate contextual analysis based on keywords
    let analysis = ""
    const situation = aiSituation.toLowerCase()

    if (situation.includes("flight") || situation.includes("flying") || situation.includes("plane")) {
      analysis = `
**Flight Carbon Analysis:**

Your flight will generate significant emissions. A typical transatlantic flight produces ~1.6 tonnes CO2 per passenger.

**Environmental Impact:** HIGH ⚠️
- Contributes to ~2.5% of global CO2 emissions
- High-altitude emissions have 2-4x climate impact
- Equivalent to driving 6,400 km in a car

**Reduction Strategies:**
1. Choose direct flights (takeoff/landing uses most fuel)
2. Fly economy class (business class has 3x footprint)
3. Purchase verified carbon offsets
4. Consider train travel for distances <1000km
5. Bundle trips to reduce frequency

**Alternative:** Video conferencing can eliminate 99% of travel emissions for business meetings.
      `.trim()
    } else if (situation.includes("car") || situation.includes("drive") || situation.includes("road trip")) {
      analysis = `
**Road Trip Carbon Analysis:**

Your road trip will generate approximately ${Math.round(Number.parseFloat(situation.match(/\d+/)?.[0] || "200") * 0.192)} kg CO2.

**Environmental Impact:** MEDIUM ⚠️
- Cars emit ~192g CO2 per km
- Highway driving is more efficient than city
- SUVs emit 30-40% more than sedans

**Reduction Strategies:**
1. Carpool with 3+ people (reduces per-person emissions by 75%)
2. Maintain proper tire pressure (improves efficiency 3%)
3. Drive at steady speeds, avoid rapid acceleration
4. Consider renting a hybrid or electric vehicle
5. Plan efficient routes to minimize distance

**Carbon Offset:** Plant 12 trees to offset this trip's emissions over their lifetime.
      `.trim()
    } else if (
      situation.includes("dinner") ||
      situation.includes("party") ||
      situation.includes("event") ||
      situation.includes("meal")
    ) {
      analysis = `
**Event Carbon Analysis:**

Hosting events generates emissions from food, energy, and waste.

**Environmental Impact:** MEDIUM ⚠️
- Food production: 60% of event emissions
- Energy (lighting/heating): 25%
- Transportation of guests: 15%

**Sustainable Event Tips:**
1. Serve plant-based menu options (70% lower emissions)
2. Use seasonal, local ingredients
3. Provide reusable plates and utensils
4. Minimize food waste (plan portions carefully)
5. Encourage carpooling or public transit
6. Use LED lighting and natural ventilation

**Impact:** A vegan dinner party produces 87% less CO2 than beef-centered meals.
      `.trim()
    } else {
      analysis = `
**General Carbon Impact Analysis:**

Based on your situation, here's an AI-powered assessment:

**Current Trajectory:** Your described activities likely generate moderate carbon emissions through energy consumption, transportation, or resource use.

**Key Factors to Consider:**
1. **Energy Sources:** Renewable vs. fossil fuels makes 4-10x difference
2. **Transportation:** Mode choice affects emissions by 10-50x
3. **Consumption:** New products have embedded manufacturing emissions
4. **Diet:** Food choices create 20-30% of personal carbon footprint

**Universal Recommendations:**
- Track all emissions to identify high-impact areas
- Set reduction goals: aim for 50% reduction in 5 years
- Prioritize high-impact changes (travel, diet, energy)
- Support renewable energy and carbon offset programs
- Educate others about climate action

**Remember:** Every action counts. Small changes compound over time to create significant impact.
      `.trim()
    }

    setAiAnalysisResult(analysis)
    setIsAnalyzing(false)
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-16">
      <div className="mx-auto max-w-5xl">
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
        <h1 className="text-5xl font-bold text-emerald-400 mb-12 text-center">Individual Carbon Tracker</h1>

        {/* Smart Impact Calculator */}
        <Card className="bg-slate-800/50 border-slate-700/50 rounded-3xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-emerald-500" />
            <h2 className="text-3xl font-bold text-white">Smart Impact Calculator</h2>
          </div>

          <div className="space-y-6">
            {/* Diet Type */}
            <div>
              <Label htmlFor="diet" className="text-slate-300 text-base mb-2 block">
                Diet Type
              </Label>
              <Select value={dietType} onValueChange={setDietType}>
                <SelectTrigger className="bg-slate-900/80 border-slate-700 text-white h-14 rounded-xl">
                  <SelectValue placeholder="Average Omnivore (2.8t CO2/month)" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="vegan">Vegan (1.5t CO2/month)</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian (1.7t CO2/month)</SelectItem>
                  <SelectItem value="no-beef">No Beef (2.5t CO2/month)</SelectItem>
                  <SelectItem value="omnivore">Average Omnivore (2.8t CO2/month)</SelectItem>
                  <SelectItem value="high-meat">Meat Consumer (3.3t CO2/month)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Electricity Usage */}
            <div>
              <Label htmlFor="electricity" className="text-slate-300 text-base mb-2 block">
                Monthly Electricity Usage (kWh)
              </Label>
              <Input
                id="electricity"
                type="number"
                placeholder="Enter kWh (e.g., 200)"
                value={electricity}
                onChange={(e) => setElectricity(e.target.value)}
                className="bg-slate-900/80 border-slate-700 text-white placeholder:text-slate-500 h-14 rounded-xl"
              />
            </div>

            {/* Travel Mode */}
            <div>
              <Label htmlFor="travel" className="text-slate-300 text-base mb-2 block">
                Primary Travel Mode
              </Label>
              <Select value={travelMode} onValueChange={setTravelMode}>
                <SelectTrigger className="bg-slate-900/80 border-slate-700 text-white h-14 rounded-xl">
                  <SelectValue placeholder="Select Travel Mode" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="rail-above">Above Ground Rail</SelectItem>
                  <SelectItem value="rail-below">Below Ground Rail</SelectItem>
                  <SelectItem value="bus">Bus</SelectItem>
                  <SelectItem value="motorbike">Motorbike</SelectItem>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Travel Distance */}
            {travelMode && (
              <div>
                <Label htmlFor="distance" className="text-slate-300 text-base mb-2 block">
                  Monthly distance in km
                </Label>
                <Input
                  id="distance"
                  type="number"
                  placeholder="Monthly distance in km"
                  value={travelDistance}
                  onChange={(e) => setTravelDistance(e.target.value)}
                  className="bg-slate-900/80 border-slate-700 text-white placeholder:text-slate-500 h-14 rounded-xl"
                />
              </div>
            )}

            {/* Electronic Device */}
            <div>
              <Label htmlFor="device" className="text-slate-300 text-base mb-2 block">
                Primary Electronic Device
              </Label>
              <Select value={device} onValueChange={setDevice}>
                <SelectTrigger className="bg-slate-900/80 border-slate-700 text-white h-14 rounded-xl">
                  <SelectValue placeholder="Select Device" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="desktop">Desktop</SelectItem>
                  <SelectItem value="phone">Mobile Phone</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                  <SelectItem value="tv">Television</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Device Usage Hours */}
            {device && (
              <div>
                <Label htmlFor="hours" className="text-slate-300 text-base mb-2 block">
                  Daily usage hours
                </Label>
                <Input
                  id="hours"
                  type="number"
                  placeholder="Daily usage hours"
                  value={deviceHours}
                  onChange={(e) => setDeviceHours(e.target.value)}
                  className="bg-slate-900/80 border-slate-700 text-white placeholder:text-slate-500 h-14 rounded-xl"
                />
              </div>
            )}

            {/* Calculate Button */}
            <Button
              onClick={handleCalculate}
              disabled={isCalculating}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-lg py-7 rounded-xl"
            >
              {isCalculating ? "Calculating..." : "Calculate My Footprint"}
            </Button>
          </div>
        </Card>

        {/* Results Display */}
        {footprintResult && (
          <Card className="bg-slate-900/50 border-2 border-emerald-500 rounded-3xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-8 h-8 text-emerald-500" />
              <h2 className="text-3xl font-bold text-white">
                Total: {footprintResult.total.toFixed(2)} tonnes CO2/month
              </h2>
            </div>

            {/* Breakdown */}
            <div className="space-y-4 mb-8">
              <div className="bg-slate-800/50 rounded-xl p-4">
                <div className="text-slate-400 mb-1">Diet</div>
                <div className="text-2xl font-bold text-emerald-400">{footprintResult.breakdown.diet.toFixed(2)}t</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4">
                <div className="text-slate-400 mb-1">Electricity</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {footprintResult.breakdown.electricity.toFixed(2)}t
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4">
                <div className="text-slate-400 mb-1">Travel</div>
                <div className="text-2xl font-bold text-blue-400">{footprintResult.breakdown.travel.toFixed(2)}t</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4">
                <div className="text-slate-400 mb-1">Devices</div>
                <div className="text-2xl font-bold text-purple-400">
                  {footprintResult.breakdown.devices.toFixed(2)}t
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {footprintResult.recommendations.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Leaf className="w-6 h-6 text-emerald-500" />
                  <h3 className="text-2xl font-bold text-white">Your Personalized Action Plan</h3>
                </div>
                <div className="space-y-4">
                  {footprintResult.recommendations.map((rec, index) => (
                    <div key={index} className="bg-slate-800/50 border-2 border-emerald-500/50 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{rec.icon}</div>
                        <div className="flex-1">
                          <p className="text-white text-lg mb-3">{rec.message}</p>
                          <div className="flex gap-2">
                            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-bold">
                              {rec.impact}
                            </span>
                            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-bold">
                              {rec.saving}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        )}

        {/* AI Receipt Scanner */}
        <Card className="bg-slate-800/50 border-slate-700/50 rounded-3xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Camera className="w-8 h-8 text-emerald-500" />
            <h2 className="text-3xl font-bold text-white">AI Receipt Scanner</h2>
          </div>

          <div className="border-2 border-dashed border-slate-700 rounded-2xl p-12 mb-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Upload className="w-16 h-16 text-slate-500" />
              <input
                type="file"
                id="receipt-upload"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="receipt-upload"
                className="cursor-pointer inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors bg-emerald-500 text-black hover:bg-emerald-600 h-11 px-8 font-bold"
              >
                Upload Receipt Photos
              </label>
              <p className="text-slate-400 text-sm">AI will scan and analyze carbon footprint</p>
            </div>
          </div>

          {/* Uploaded Receipts */}
          {uploadedReceipts.length > 0 && (
            <div className="space-y-3 mb-6">
              {uploadedReceipts.map((receipt, index) => (
                <div key={index} className="flex items-center gap-4 bg-slate-900/50 rounded-xl p-4">
                  <img
                    src={receipt.preview || "/placeholder.svg"}
                    alt={receipt.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="text-white font-medium">Receipt {index + 1}</div>
                  </div>
                  <Button
                    onClick={() => removeReceipt(index)}
                    variant="ghost"
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Button
            onClick={handleScanReceipt}
            disabled={isScanning || uploadedReceipts.length === 0}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-lg py-7 rounded-xl"
          >
            {isScanning ? (
              <>
                <Search className="w-5 h-5 mr-2 animate-spin" />
                Scanning with AI OCR...
              </>
            ) : (
              <>
                <Camera className="w-5 h-5 mr-2" />
                Scan & Analyze
              </>
            )}
          </Button>

          {/* Receipt Analysis Results */}
          {receiptAnalysisResult && (
            <div className="mt-6 bg-slate-900/50 border-2 border-emerald-500/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">OCR Analysis Results:</h3>
              <pre className="text-slate-300 whitespace-pre-wrap text-sm font-mono">{receiptAnalysisResult}</pre>
            </div>
          )}
        </Card>

        {/* AI Situation Analyzer */}
        <Card className="bg-slate-800/50 border-slate-700/50 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-white">AI Situation Analyzer</h2>
          </div>

          <div className="space-y-4">
            <Label htmlFor="situation" className="text-slate-300 text-base block">
              Describe Your Situation
            </Label>
            <Textarea
              id="situation"
              placeholder="e.g., 'I'm planning a 200km road trip in my SUV', 'Flying from New York to London for vacation', 'Hosting a dinner party for 20 people'..."
              value={aiSituation}
              onChange={(e) => setAiSituation(e.target.value)}
              className="bg-slate-900/80 border-slate-700 text-white placeholder:text-slate-500 min-h-[150px] rounded-xl"
            />
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>AI will provide honest analysis and save responses for repeated situations</span>
            </div>

            <Button
              onClick={handleAIAnalysis}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 hover:from-yellow-700 hover:via-orange-700 hover:to-red-700 text-white font-bold text-lg py-7 rounded-xl"
            >
              {isAnalyzing ? (
                <>
                  <Zap className="w-5 h-5 mr-2 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Get AI Analysis
                </>
              )}
            </Button>

            {/* AI Analysis Results */}
            {aiAnalysisResult && (
              <div className="mt-6 bg-slate-900/50 border-2 border-yellow-500/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-xl font-bold text-yellow-400">AI Analysis:</h3>
                </div>
                <pre className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">{aiAnalysisResult}</pre>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

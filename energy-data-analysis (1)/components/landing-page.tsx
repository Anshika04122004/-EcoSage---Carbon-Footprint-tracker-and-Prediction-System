"use client"

import { Leaf, User, Building2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface LandingPageProps {
  setUserType: (type: "landing" | "individual" | "industrial") => void
}

export default function LandingPage({ setUserType }: LandingPageProps) {
  return (
    <div className="min-h-screen px-4 py-12 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <Leaf className="w-20 h-20 text-emerald-500 mb-6" strokeWidth={1.5} />
          <h1 className="text-6xl font-bold text-emerald-400 mb-6">EcoSage</h1>
          <p className="text-slate-300 text-lg max-w-4xl leading-relaxed">
            This system is a full-stack application designed to calculate an individual's or organization's current
            greenhouse gas emissions (carbon footprint) across various sectors like diet, energy, and travel. It uses
            machine learning (ML) models to forecast future emission trends and provides personalized, actionable
            recommendations for reduction.
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Individual User Card */}
          <Card className="bg-slate-800/50 border-slate-700/50 p-8 hover:bg-slate-800/70 transition-all">
            <div className="flex flex-col items-center text-center space-y-6">
              <User className="w-16 h-16 text-emerald-500" strokeWidth={1.5} />
              <h2 className="text-3xl font-bold text-white">Individual User</h2>
              <p className="text-slate-400 text-base">
                Track personal footprint, AI-powered receipt scanning, and get intelligent LLM-based recommendations
              </p>
              <Button
                onClick={() => setUserType("individual")}
                className="w-full bg-transparent border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </Card>

          {/* Industrial User Card */}
          <Card className="bg-slate-800/50 border-slate-700/50 p-8 hover:bg-slate-800/70 transition-all">
            <div className="flex flex-col items-center text-center space-y-6">
              <Building2 className="w-16 h-16 text-emerald-500" strokeWidth={1.5} />
              <h2 className="text-3xl font-bold text-white">Industrial User</h2>
              <p className="text-slate-400 text-base">
                Analyze sector emissions, predict 2026-2030 trends with ML models, and explore interactive global
                heatmap
              </p>
              <Button
                onClick={() => setUserType("industrial")}
                className="w-full bg-transparent border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Educational Section */}
        <div className="mt-16 space-y-12">
          <Card className="bg-slate-800/50 border-slate-700/50 p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Understanding Carbon Emissions</h2>

            <div className="space-y-8">
              {/* What is Carbon Emission */}
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 rounded-full border-2 border-red-500 flex items-center justify-center">
                      <div className="text-red-500 text-xl font-bold">!</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mt-1">What is Carbon Emission?</h3>
                </div>
                <p className="text-slate-300 text-base leading-relaxed pl-16">
                  Carbon emissions refer to greenhouse gases released into the atmosphere, primarily carbon dioxide
                  (CO2) from burning fossil fuels, deforestation, and industrial processes. These emissions trap heat in
                  Earth's atmosphere, contributing to global warming and climate change. The main sources include
                  transportation, electricity generation, manufacturing, agriculture, and residential energy use.
                  Measured in tonnes of CO2 equivalent, carbon footprints help quantify individual and organizational
                  environmental impact.
                </p>
              </div>

              {/* Environmental Impact */}
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mt-1">Environmental Impact</h3>
                </div>
                <p className="text-slate-300 text-base leading-relaxed pl-16">
                  Rising carbon levels cause severe global consequences including rising global temperatures, melting
                  polar ice caps, and sea level rise threatening coastal communities. It intensifies extreme weather
                  events like hurricanes, droughts, and floods, disrupts ecosystems and accelerates species extinction,
                  causes ocean acidification harming marine life, reduces agricultural productivity and threatens food
                  security, and increases health risks from heat stress and air pollution. Current atmospheric CO2
                  levels exceed 420 ppm, the highest in human history, making immediate action critical.
                </p>
              </div>

              {/* How Our System Helps */}
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <Leaf className="w-12 h-12 text-emerald-500 flex-shrink-0" strokeWidth={1.5} />
                  <h3 className="text-2xl font-bold text-white mt-1">How Our System Helps</h3>
                </div>
                <p className="text-slate-300 text-base leading-relaxed pl-16">
                  EcoSage employs advanced machine learning algorithms and large language models (LLMs) to analyze your
                  carbon footprint across multiple dimensions. Our OCR-powered receipt scanning technology automatically
                  extracts and categorizes purchases to calculate their environmental impact. The system provides
                  real-time tracking of emissions from diet, energy consumption, transportation, and device usage. Using
                  predictive analytics, we forecast future emission trends for 2026-2030 and deliver personalized,
                  data-driven recommendations that can reduce your carbon footprint by up to 40% within six months. Our
                  intelligent system learns from your patterns and continuously optimizes suggestions for maximum
                  environmental impact.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

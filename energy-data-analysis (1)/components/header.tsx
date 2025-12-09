"use client"

import { Leaf } from "lucide-react"

interface HeaderProps {
  activeTab: string
  setActiveTab: (tab: any) => void
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const tabs = [
    { id: "calculator", label: "Calculator", icon: "📊" },
    { id: "dashboard", label: "Dashboard", icon: "📈" },
    { id: "global", label: "Global Data", icon: "🌍" },
    { id: "insights", label: "AI Insights", icon: "✨" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-balance">
              Carbon Footprint <span className="text-primary">Tracker</span>
            </h1>
          </div>
          <div className="text-sm text-muted">AI-Powered Emissions Analysis</div>
        </div>

        <nav className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id ? "bg-primary text-white" : "bg-card text-foreground hover:bg-border"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

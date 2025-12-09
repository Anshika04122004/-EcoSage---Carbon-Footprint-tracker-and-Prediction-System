"use client"

import { useState } from "react"
import LandingPage from "@/components/landing-page"
import IndividualTracker from "@/components/individual-tracker"
import IndustrialDashboard from "@/components/industrial-dashboard"

export default function Home() {
  const [userType, setUserType] = useState<"landing" | "individual" | "industrial">("landing")

  return (
    <main className="min-h-screen bg-[#0a0f1a]">
      {userType === "landing" && <LandingPage setUserType={setUserType} />}
      {userType === "individual" && <IndividualTracker setUserType={setUserType} />}
      {userType === "industrial" && <IndustrialDashboard setUserType={setUserType} />}
    </main>
  )
}

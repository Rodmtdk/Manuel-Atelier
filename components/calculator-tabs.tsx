"use client"

import { useState } from "react"
import { Wrench, Settings, Disc } from "lucide-react"
import { FraisageCalc } from "@/components/calc-fraisage"
import { TournageCalc } from "@/components/calc-tournage"
import { RectificationCalc } from "@/components/calc-rectification"
import { MaterialTable } from "@/components/material-table"

const tabs = [
  { id: "fraisage", label: "Fraisage", icon: Wrench },
  { id: "tournage", label: "Tournage", icon: Settings },
  { id: "rectification", label: "Rectification", icon: Disc },
] as const

type TabId = (typeof tabs)[number]["id"]

export function CalculatorTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("fraisage")

  return (
    <div>
      {/* Tab buttons */}
      <div className="mb-8 flex gap-2 rounded-xl border border-border bg-card p-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "fraisage" && <FraisageCalc />}
      {activeTab === "tournage" && <TournageCalc />}
      {activeTab === "rectification" && <RectificationCalc />}

      {/* Material reference table */}
      <MaterialTable />
    </div>
  )
}

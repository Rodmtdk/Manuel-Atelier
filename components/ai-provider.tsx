"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface AIContextType {
  isProcessing: boolean
  setIsProcessing: (value: boolean) => void
  lastAnalysis: any | null
  setLastAnalysis: (value: any) => void
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export function AIProvider({ children }: { children: ReactNode }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastAnalysis, setLastAnalysis] = useState<any | null>(null)

  return (
    <AIContext.Provider
      value={{
        isProcessing,
        setIsProcessing,
        lastAnalysis,
        setLastAnalysis,
      }}
    >
      {children}
    </AIContext.Provider>
  )
}

export function useAI() {
  const context = useContext(AIContext)
  if (context === undefined) {
    throw new Error("useAI must be used within an AIProvider")
  }
  return context
}

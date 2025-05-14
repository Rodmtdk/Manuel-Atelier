"use client"

import type React from "react"

import { createContext, useContext } from "react"

type ChartConfig = Record<string, { label: string; color: string }>

const ChartContext = createContext<{ config: ChartConfig } | null>(null)

interface ChartContainerProps {
  config: ChartConfig
  children: React.ReactNode
  className?: string
}

export function ChartContainer({ config, children, className }: ChartContainerProps) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={className}>{children}</div>
    </ChartContext.Provider>
  )
}

export function ChartTooltip(props: any) {
  return props.content
}

export function ChartTooltipContent({ active, payload, label }: any) {
  const context = useContext(ChartContext)

  if (!context) {
    throw new Error("ChartTooltipContent must be used within a ChartContainer")
  }

  if (active && payload && payload.length) {
    const { config } = context
    const data = payload[0].payload

    return (
      <div className="rounded-lg border border-gray-700 bg-gray-900 p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          {payload.map((entry: any) => {
            const configKey = Object.keys(config).find((key) => entry.dataKey === key)
            const color = configKey ? config[configKey].color : "hsl(var(--foreground))"

            return (
              <div key={entry.dataKey} className="flex items-center gap-1">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: color,
                  }}
                />
                <span className="text-xs text-muted-foreground">
                  {configKey ? config[configKey].label : entry.name}
                </span>
                <span className="text-xs font-medium">{entry.value}</span>
              </div>
            )
          })}
        </div>
        {label && (
          <div className="mt-1 border-t border-gray-700 pt-1">
            <span className="text-xs font-medium">{label}</span>
          </div>
        )}
      </div>
    )
  }

  return null
}

export function ChartLegend({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center space-x-4">{children}</div>
}

export function ChartLegendItem({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }}></div>
      <span className="text-sm text-muted-foreground">{name}</span>
    </div>
  )
}

export function Chart({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

"use client"

import { cn } from "@/lib/utils"

interface MachinabilityScoreProps {
  score: number
}

export function MachinabilityScore({ score }: MachinabilityScoreProps) {
  // Determine color based on score
  const getColor = () => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-amber-500"
    return "text-red-500"
  }

  // Determine label based on score
  const getLabel = () => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Bon"
    if (score >= 40) return "Moyen"
    return "Difficile"
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" className="text-muted/20" />

          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={`${score * 2.83} 283`}
            strokeDashoffset="0"
            strokeLinecap="round"
            className={getColor()}
            transform="rotate(-90 50 50)"
          />
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-3xl font-bold", getColor())}>{score}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className={cn("text-lg font-medium", getColor())}>{getLabel()}</p>
        <p className="text-sm text-muted-foreground mt-1">Score d'usinabilité</p>
      </div>
    </div>
  )
}

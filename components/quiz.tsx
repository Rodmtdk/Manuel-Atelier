"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, RotateCcw, Trophy, ChevronRight } from "lucide-react"

interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

interface QuizProps {
  title: string
  questions: QuizQuestion[]
  className?: string
}

export function Quiz({ title, questions, className }: QuizProps) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = questions[currentQ]
  const isCorrect = selected === q?.correctIndex

  const handleSelect = useCallback((i: number) => {
    if (!confirmed) setSelected(i)
  }, [confirmed])

  const handleConfirm = useCallback(() => {
    if (selected === null) return
    setConfirmed(true)
    if (selected === q.correctIndex) {
      setScore((s) => s + 1)
    }
  }, [selected, q])

  const handleNext = useCallback(() => {
    if (currentQ + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrentQ((c) => c + 1)
      setSelected(null)
      setConfirmed(false)
    }
  }, [currentQ, questions.length])

  const handleRestart = useCallback(() => {
    setCurrentQ(0)
    setSelected(null)
    setConfirmed(false)
    setScore(0)
    setFinished(false)
  }, [])

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className={cn("rounded-xl border border-border bg-card p-8 text-center", className)}>
        <Trophy className={cn("mx-auto mb-4 h-12 w-12", pct >= 70 ? "text-primary" : "text-muted-foreground")} />
        <h3 className="mb-2 text-xl font-bold text-foreground">{title} - R{"\u00e9"}sultats</h3>
        <p className="mb-1 text-4xl font-bold">
          <span className={pct >= 70 ? "text-primary" : pct >= 50 ? "text-accent" : "text-destructive"}>
            {score}/{questions.length}
          </span>
        </p>
        <p className="mb-6 text-sm text-muted-foreground">
          {pct >= 90 ? "Excellent ! Ma\u00eetrise parfaite." : pct >= 70 ? "Tr\u00e8s bien ! Bonnes connaissances." : pct >= 50 ? "Pas mal, mais r\u00e9visez les erreurs." : "Continuez \u00e0 apprendre, relisez les sections concern\u00e9es."}
        </p>
        <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className={cn("h-full rounded-full transition-all", pct >= 70 ? "bg-primary" : pct >= 50 ? "bg-accent" : "bg-destructive")}
            style={{ width: `${pct}%` }}
          />
        </div>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
        >
          <RotateCcw className="h-4 w-4" />
          Recommencer
        </button>
      </div>
    )
  }

  return (
    <div className={cn("rounded-xl border border-border bg-card overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-6 py-3">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          {currentQ + 1} / {questions.length}
        </span>
      </div>

      {/* Progress */}
      <div className="h-1 bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentQ) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="p-6">
        <p className="mb-5 text-base font-medium leading-relaxed text-foreground">{q.question}</p>

        {/* Options */}
        <div className="flex flex-col gap-2.5">
          {q.options.map((option, i) => {
            const isSelected = selected === i
            const isAnswer = i === q.correctIndex

            let optionStyle = "border-border hover:border-primary/30 hover:bg-secondary/50"
            if (confirmed) {
              if (isAnswer) optionStyle = "border-primary/50 bg-primary/10"
              else if (isSelected && !isAnswer) optionStyle = "border-destructive/50 bg-destructive/10"
              else optionStyle = "border-border opacity-50"
            } else if (isSelected) {
              optionStyle = "border-primary/50 bg-primary/5"
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={confirmed}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all",
                  optionStyle
                )}
              >
                <span className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold",
                  confirmed && isAnswer ? "bg-primary text-primary-foreground" :
                  confirmed && isSelected && !isAnswer ? "bg-destructive text-destructive-foreground" :
                  isSelected ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                )}>
                  {confirmed && isAnswer ? <CheckCircle2 className="h-4 w-4" /> :
                   confirmed && isSelected && !isAnswer ? <XCircle className="h-4 w-4" /> :
                   String.fromCharCode(65 + i)}
                </span>
                <span className={cn(
                  "flex-1",
                  confirmed && isAnswer ? "font-medium text-foreground" :
                  confirmed && isSelected && !isAnswer ? "text-destructive line-through" :
                  "text-muted-foreground"
                )}>
                  {option}
                </span>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {confirmed && (
          <div className={cn(
            "mt-4 rounded-xl border p-4",
            isCorrect ? "border-primary/20 bg-primary/5" : "border-destructive/20 bg-destructive/5"
          )}>
            <p className={cn("mb-1 text-xs font-semibold uppercase tracking-wider", isCorrect ? "text-primary" : "text-destructive")}>
              {isCorrect ? "Bonne r\u00e9ponse !" : "Mauvaise r\u00e9ponse"}
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">{q.explanation}</p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-5 flex justify-end">
          {!confirmed ? (
            <button
              onClick={handleConfirm}
              disabled={selected === null}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all",
                selected !== null
                  ? "bg-primary text-primary-foreground hover:brightness-110"
                  : "bg-secondary text-muted-foreground cursor-not-allowed"
              )}
            >
              Valider
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              {currentQ + 1 >= questions.length ? "Voir les r\u00e9sultats" : "Suivant"}
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

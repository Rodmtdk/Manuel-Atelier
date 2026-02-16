"use client"

import { useState, useCallback } from "react"
import { Download, RotateCcw } from "lucide-react"

interface TournageValues {
  diameter: number
  vc: number
  f: number
  ap: number
}

const presets = [
  { name: "Acier doux - Carbure", vc: 200, f: 0.2 },
  { name: "Acier doux - HSS", vc: 40, f: 0.15 },
  { name: "Acier inox - Carbure", vc: 120, f: 0.15 },
  { name: "Aluminium - Carbure", vc: 400, f: 0.25 },
  { name: "Aluminium - HSS", vc: 150, f: 0.2 },
  { name: "Fonte - Carbure", vc: 150, f: 0.2 },
  { name: "Laiton - Carbure", vc: 250, f: 0.15 },
  { name: "Plastique", vc: 300, f: 0.3 },
  { name: "Titane - Carbure", vc: 60, f: 0.1 },
]

export function TournageCalc() {
  const [values, setValues] = useState<TournageValues>({
    diameter: 50,
    vc: 200,
    f: 0.2,
    ap: 2,
  })

  const n = values.diameter > 0 ? (1000 * values.vc) / (Math.PI * values.diameter) : 0
  const vf = n * values.f
  const Q = Math.PI * values.diameter * values.ap * values.f * n / 1000 // cm3/min simplifie
  const Ra = (values.f * values.f * 1000) / (8 * 0.8) // Ra approx avec rayon de bec 0.8mm

  const handleChange = useCallback((field: keyof TournageValues, value: string) => {
    const num = parseFloat(value)
    if (!isNaN(num) && num >= 0) {
      setValues((prev) => ({ ...prev, [field]: num }))
    }
  }, [])

  const applyPreset = useCallback((preset: (typeof presets)[number]) => {
    setValues((prev) => ({ ...prev, vc: preset.vc, f: preset.f }))
  }, [])

  const reset = useCallback(() => {
    setValues({ diameter: 50, vc: 200, f: 0.2, ap: 2 })
  }, [])

  const exportCSV = useCallback(() => {
    const csv = [
      "Parametre;Valeur;Unite",
      `Diametre piece;${values.diameter};mm`,
      `Vitesse de coupe;${values.vc};m/min`,
      `Avance;${values.f};mm/tr`,
      `Profondeur de passe;${values.ap};mm`,
      `Vitesse de rotation;${n.toFixed(0)};tr/min`,
      `Avance de travail;${vf.toFixed(0)};mm/min`,
      `Ra theorique;${Ra.toFixed(2)};um`,
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "calcul_tournage.csv"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [values, n, vf, Ra])

  return (
    <div className="flex flex-col gap-6">
      {/* Presets */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Preselection materiau / outil :</h3>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/30 hover:text-primary"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Diametre piece (D)", field: "diameter" as const, unit: "mm", step: "0.1" },
          { label: "Vitesse de coupe (Vc)", field: "vc" as const, unit: "m/min", step: "1" },
          { label: "Avance (f)", field: "f" as const, unit: "mm/tr", step: "0.01" },
          { label: "Profondeur (ap)", field: "ap" as const, unit: "mm", step: "0.1" },
        ].map((input) => (
          <div key={input.field}>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{input.label}</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={values[input.field]}
                onChange={(e) => handleChange(input.field, e.target.value)}
                step={input.step}
                min="0"
                className="w-full rounded-lg border border-border bg-input px-4 py-2.5 font-mono text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <span className="shrink-0 text-xs text-muted-foreground">{input.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ResultCard label="Vitesse de rotation (n)" value={n.toFixed(0)} unit="tr/min" primary />
        <ResultCard label="Avance de travail (Vf)" value={vf.toFixed(0)} unit="mm/min" primary />
        <ResultCard label="Ra theorique" value={Ra.toFixed(2)} unit="um" />
        <ResultCard label="Debit copeaux (Q)" value={Q.toFixed(1)} unit="cm3/min" />
      </div>

      {/* Formulas */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Formules utilisees :</h3>
        <div className="grid gap-2 text-sm sm:grid-cols-2">
          <div className="rounded-lg bg-secondary p-3 font-mono text-xs text-primary">
            n = (1000 x Vc) / (Pi x D)
          </div>
          <div className="rounded-lg bg-secondary p-3 font-mono text-xs text-primary">
            Vf = n x f
          </div>
          <div className="rounded-lg bg-secondary p-3 font-mono text-xs text-primary">
            {"Ra = (f^2 x 1000) / (8 x Re)"}
          </div>
          <div className="rounded-lg bg-secondary p-3 font-mono text-xs text-primary">
            Re = rayon de bec (0.8mm par defaut)
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
        >
          <Download className="h-4 w-4" />
          Exporter CSV
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-secondary/80"
        >
          <RotateCcw className="h-4 w-4" />
          Reinitialiser
        </button>
      </div>
    </div>
  )
}

function ResultCard({
  label,
  value,
  unit,
  primary,
}: {
  label: string
  value: string
  unit: string
  primary?: boolean
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        primary ? "border-primary/30 bg-primary/5" : "border-border bg-card"
      }`}
    >
      <div className="mb-1 text-xs font-medium text-muted-foreground">{label}</div>
      <div className="flex items-baseline gap-1.5">
        <span className={`font-mono text-2xl font-bold ${primary ? "text-primary" : "text-foreground"}`}>
          {value}
        </span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
    </div>
  )
}

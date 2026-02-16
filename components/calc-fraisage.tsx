"use client"

import { useState, useCallback } from "react"
import { Calculator, Download, RotateCcw } from "lucide-react"

interface FraisageValues {
  diameter: number
  teeth: number
  vc: number
  fz: number
  ap: number
  ae: number
}

const materialPresets = [
  { name: "Acier doux - Carbure", vc: 120, fz: 0.08 },
  { name: "Acier doux - HSS", vc: 30, fz: 0.05 },
  { name: "Acier inox - Carbure", vc: 80, fz: 0.06 },
  { name: "Aluminium - Carbure", vc: 250, fz: 0.12 },
  { name: "Aluminium - HSS", vc: 100, fz: 0.08 },
  { name: "Fonte - Carbure", vc: 100, fz: 0.1 },
  { name: "Laiton - Carbure", vc: 180, fz: 0.1 },
  { name: "Plastique", vc: 200, fz: 0.15 },
  { name: "Titane - Carbure", vc: 50, fz: 0.05 },
]

export function FraisageCalc() {
  const [values, setValues] = useState<FraisageValues>({
    diameter: 10,
    teeth: 4,
    vc: 120,
    fz: 0.08,
    ap: 2,
    ae: 5,
  })

  const n = values.diameter > 0 ? (1000 * values.vc) / (Math.PI * values.diameter) : 0
  const vf = n * values.teeth * values.fz
  const Q = (values.ap * values.ae * vf) / 1000 // debit copeaux cm3/min
  const Pc = Q * 1.5 // puissance approx kW (facteur simplifie)

  const handleChange = useCallback((field: keyof FraisageValues, value: string) => {
    const num = parseFloat(value)
    if (!isNaN(num) && num >= 0) {
      setValues((prev) => ({ ...prev, [field]: num }))
    }
  }, [])

  const applyPreset = useCallback((preset: (typeof materialPresets)[number]) => {
    setValues((prev) => ({ ...prev, vc: preset.vc, fz: preset.fz }))
  }, [])

  const reset = useCallback(() => {
    setValues({ diameter: 10, teeth: 4, vc: 120, fz: 0.08, ap: 2, ae: 5 })
  }, [])

  const exportCSV = useCallback(() => {
    const csv = [
      "Parametre;Valeur;Unite",
      `Diametre;${values.diameter};mm`,
      `Nombre de dents;${values.teeth};Z`,
      `Vitesse de coupe;${values.vc};m/min`,
      `Avance par dent;${values.fz};mm/dt`,
      `Profondeur axiale;${values.ap};mm`,
      `Profondeur radiale;${values.ae};mm`,
      `Vitesse de rotation;${n.toFixed(0)};tr/min`,
      `Avance de travail;${vf.toFixed(0)};mm/min`,
      `Debit copeaux;${Q.toFixed(1)};cm3/min`,
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "calcul_fraisage.csv"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [values, n, vf, Q])

  return (
    <div className="flex flex-col gap-6">
      {/* Presets */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Preselection materiau / outil :</h3>
        <div className="flex flex-wrap gap-2">
          {materialPresets.map((preset) => (
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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Diametre (D)", field: "diameter" as const, unit: "mm", step: "0.1" },
          { label: "Nombre de dents (Z)", field: "teeth" as const, unit: "dents", step: "1" },
          { label: "Vitesse de coupe (Vc)", field: "vc" as const, unit: "m/min", step: "1" },
          { label: "Avance par dent (fz)", field: "fz" as const, unit: "mm/dt", step: "0.001" },
          { label: "Prof. axiale (ap)", field: "ap" as const, unit: "mm", step: "0.1" },
          { label: "Prof. radiale (ae)", field: "ae" as const, unit: "mm", step: "0.1" },
        ].map((input) => (
          <div key={input.field}>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {input.label}
            </label>
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
        <ResultCard label="Debit copeaux (Q)" value={Q.toFixed(1)} unit="cm3/min" />
        <ResultCard label="Puissance estimee (Pc)" value={Pc.toFixed(1)} unit="kW" />
      </div>

      {/* Formulas */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Formules utilisees :</h3>
        <div className="grid gap-2 text-sm sm:grid-cols-2">
          <div className="rounded-lg bg-secondary p-3 font-mono text-xs text-primary">
            n = (1000 x Vc) / (Pi x D)
          </div>
          <div className="rounded-lg bg-secondary p-3 font-mono text-xs text-primary">
            Vf = n x Z x fz
          </div>
          <div className="rounded-lg bg-secondary p-3 font-mono text-xs text-primary">
            Q = (ap x ae x Vf) / 1000
          </div>
          <div className="rounded-lg bg-secondary p-3 font-mono text-xs text-primary">
            Pc = Q x Kc (approx.)
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
        primary
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-card"
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

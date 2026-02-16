"use client"

import { useState, useCallback } from "react"
import { Download, RotateCcw } from "lucide-react"

interface RectifValues {
  wheelDiameter: number
  wheelSpeed: number
  workDiameter: number
  workSpeed: number
  traverse: number
  depth: number
}

const presets = [
  { name: "Rectif. cylindrique ext. - Acier", wheelSpeed: 35, workSpeed: 25, traverse: 10, depth: 0.01 },
  { name: "Rectif. cylindrique ext. - Inox", wheelSpeed: 30, workSpeed: 20, traverse: 8, depth: 0.005 },
  { name: "Rectif. plane - Acier", wheelSpeed: 30, workSpeed: 15, traverse: 12, depth: 0.02 },
  { name: "Rectif. plane - Aluminium", wheelSpeed: 25, workSpeed: 20, traverse: 15, depth: 0.02 },
  { name: "Rectif. interieure - Acier", wheelSpeed: 40, workSpeed: 30, traverse: 5, depth: 0.005 },
  { name: "Superfinition", wheelSpeed: 30, workSpeed: 15, traverse: 5, depth: 0.002 },
]

export function RectificationCalc() {
  const [values, setValues] = useState<RectifValues>({
    wheelDiameter: 300,
    wheelSpeed: 35,
    workDiameter: 50,
    workSpeed: 25,
    traverse: 10,
    depth: 0.01,
  })

  // Wheel RPM from peripheral speed
  const nWheel = values.wheelDiameter > 0
    ? (values.wheelSpeed * 1000 * 60) / (Math.PI * values.wheelDiameter)
    : 0

  // Work RPM from peripheral speed
  const nWork = values.workDiameter > 0
    ? (values.workSpeed * 1000) / (Math.PI * values.workDiameter)
    : 0

  // Speed ratio
  const ratio = values.workSpeed > 0 ? values.wheelSpeed / (values.workSpeed / 60) : 0

  // Traverse rate (mm/min)
  const traverseRate = nWork * values.traverse

  // Material removal rate Q' (mm3/mm.s) simplified
  const Qprime = values.workSpeed * values.depth / 60 * values.traverse

  const handleChange = useCallback((field: keyof RectifValues, value: string) => {
    const num = parseFloat(value)
    if (!isNaN(num) && num >= 0) {
      setValues((prev) => ({ ...prev, [field]: num }))
    }
  }, [])

  const applyPreset = useCallback((preset: (typeof presets)[number]) => {
    setValues((prev) => ({
      ...prev,
      wheelSpeed: preset.wheelSpeed,
      workSpeed: preset.workSpeed,
      traverse: preset.traverse,
      depth: preset.depth,
    }))
  }, [])

  const reset = useCallback(() => {
    setValues({
      wheelDiameter: 300,
      wheelSpeed: 35,
      workDiameter: 50,
      workSpeed: 25,
      traverse: 10,
      depth: 0.01,
    })
  }, [])

  const exportCSV = useCallback(() => {
    const csv = [
      "Parametre;Valeur;Unite",
      `Diametre meule;${values.wheelDiameter};mm`,
      `Vitesse meule;${values.wheelSpeed};m/s`,
      `Diametre piece;${values.workDiameter};mm`,
      `Vitesse piece;${values.workSpeed};m/min`,
      `Avance traverse;${values.traverse};mm/tr`,
      `Profondeur de passe;${values.depth};mm`,
      `Tours meule;${nWheel.toFixed(0)};tr/min`,
      `Tours piece;${nWork.toFixed(0)};tr/min`,
      `Q prime;${Qprime.toFixed(3)};mm3/s`,
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "calcul_rectification.csv"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [values, nWheel, nWork, Qprime])

  return (
    <div className="flex flex-col gap-6">
      {/* Presets */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Preselection type de rectification :</h3>
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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Diametre meule", field: "wheelDiameter" as const, unit: "mm", step: "1" },
          { label: "Vitesse meule (Vs)", field: "wheelSpeed" as const, unit: "m/s", step: "1" },
          { label: "Diametre piece (Dw)", field: "workDiameter" as const, unit: "mm", step: "0.1" },
          { label: "Vitesse piece (Vw)", field: "workSpeed" as const, unit: "m/min", step: "1" },
          { label: "Avance transversale", field: "traverse" as const, unit: "mm/tr", step: "0.1" },
          { label: "Profondeur de passe (ae)", field: "depth" as const, unit: "mm", step: "0.001" },
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
        <ResultCard label="Tours meule (n)" value={nWheel.toFixed(0)} unit="tr/min" primary />
        <ResultCard label="Tours piece (nw)" value={nWork.toFixed(0)} unit="tr/min" primary />
        <ResultCard label="Ratio vitesse" value={ratio.toFixed(0)} unit="x" />
        <ResultCard label="Debit specifique (Q')" value={Qprime.toFixed(3)} unit="mm3/s" />
      </div>

      {/* Formulas */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Formules utilisees :</h3>
        <div className="grid gap-2 text-sm sm:grid-cols-2">
          <div className="rounded-lg bg-secondary p-3 font-mono text-xs text-primary">
            n_meule = (Vs x 60000) / (Pi x Ds)
          </div>
          <div className="rounded-lg bg-secondary p-3 font-mono text-xs text-primary">
            n_piece = (Vw x 1000) / (Pi x Dw)
          </div>
          <div className="rounded-lg bg-secondary p-3 font-mono text-xs text-primary">
            Q{"'"} = Vw x ae x traverse / 60
          </div>
          <div className="rounded-lg bg-secondary p-3 font-mono text-xs text-primary">
            Vs : 25-35 m/s (conventionnel), 60+ (HSG)
          </div>
        </div>
      </div>

      {/* Reference */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Reference vitesses de meule</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2 text-left font-semibold text-foreground">Type</th>
                <th className="px-4 py-2 text-left font-semibold text-foreground">Vs (m/s)</th>
                <th className="px-4 py-2 text-left font-semibold text-foreground">Application</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Conventionnelle", "25-35", "Rectification standard"],
                ["Grande vitesse (HSG)", "60-120", "Production serie"],
                ["Superfinition", "15-25", "Ra tres faible"],
                ["CBN/Diamant", "30-80", "Materiaux durs"],
              ].map(([type, vs, app], i) => (
                <tr key={i} className="border-b border-border/50 last:border-0">
                  <td className="px-4 py-2 font-medium text-foreground">{type}</td>
                  <td className="px-4 py-2 font-mono text-primary">{vs}</td>
                  <td className="px-4 py-2 text-muted-foreground">{app}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

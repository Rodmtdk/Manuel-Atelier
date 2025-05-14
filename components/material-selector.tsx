"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

interface MaterialSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function MaterialSelector({ value, onChange }: MaterialSelectorProps) {
  return (
    <div className="space-y-3">
      <Label>Matériau</Label>
      <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-2 gap-4">
        <MaterialOption
          value="aluminium"
          label="Aluminium"
          description="Léger et facile à usiner"
          color="bg-blue-500"
          isSelected={value === "aluminium"}
        />
        <MaterialOption
          value="acier"
          label="Acier"
          description="Résistant et durable"
          color="bg-gray-500"
          isSelected={value === "acier"}
        />
        <MaterialOption
          value="inox"
          label="Inox"
          description="Résistant à la corrosion"
          color="bg-slate-400"
          isSelected={value === "inox"}
        />
        <MaterialOption
          value="titane"
          label="Titane"
          description="Léger et très résistant"
          color="bg-zinc-400"
          isSelected={value === "titane"}
        />
        <MaterialOption
          value="plastique"
          label="Plastique"
          description="Économique et léger"
          color="bg-emerald-500"
          isSelected={value === "plastique"}
        />
        <MaterialOption
          value="laiton"
          label="Laiton"
          description="Bonne usinabilité"
          color="bg-yellow-600"
          isSelected={value === "laiton"}
        />
      </RadioGroup>
    </div>
  )
}

interface MaterialOptionProps {
  value: string
  label: string
  description: string
  color: string
  isSelected: boolean
}

function MaterialOption({ value, label, description, color, isSelected }: MaterialOptionProps) {
  return (
    <label
      htmlFor={`material-${value}`}
      className={cn(
        "flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-all",
        isSelected ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50 hover:bg-primary/5",
      )}
    >
      <RadioGroupItem value={value} id={`material-${value}`} className="sr-only" />
      <div className={cn("h-4 w-4 rounded-full", color)}></div>
      <div className="space-y-0.5">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </label>
  )
}

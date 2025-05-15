"use client"

import { useState, useEffect } from "react"

export function CalculateurFraisage() {
  const [diameter, setDiameter] = useState(8)
  const [teeth, setTeeth] = useState(4)
  const [vc, setVc] = useState(70)
  const [fz, setFz] = useState(0.01)
  const [n, setN] = useState(0)
  const [vf, setVf] = useState(0)
  const [materialId, setMaterialId] = useState("aluminum")
  const [toolType, setToolType] = useState("carbide")

  const materials = [
    { id: "aluminum", name: "Aluminium", vcHSS: 100, vcCarbide: 300 },
    { id: "steel", name: "Acier", vcHSS: 30, vcCarbide: 120 },
    { id: "stainless", name: "Acier inoxydable", vcHSS: 20, vcCarbide: 80 },
    { id: "cast-iron", name: "Fonte", vcHSS: 25, vcCarbide: 90 },
    { id: "brass", name: "Laiton", vcHSS: 60, vcCarbide: 180 },
    { id: "plastic", name: "Plastique", vcHSS: 80, vcCarbide: 200 },
  ]

  // Calculer n et vf lorsque les paramètres changent
  useEffect(() => {
    calculateParameters()
  }, [diameter, teeth, vc, fz])

  const calculateParameters = () => {
    // Formule pour calculer la vitesse de rotation (n)
    const calculatedN = Math.round((vc * 1000) / (Math.PI * diameter))
    setN(calculatedN)

    // Formule pour calculer la vitesse d'avance (vf)
    const calculatedVf = Math.round(calculatedN * teeth * fz)
    setVf(calculatedVf)
  }

  const handleMaterialChange = (e) => {
    const selectedMaterial = materials.find((m) => m.id === e.target.value)
    setMaterialId(e.target.value)

    if (selectedMaterial) {
      setVc(toolType === "hss" ? selectedMaterial.vcHSS : selectedMaterial.vcCarbide)
    }
  }

  const handleToolTypeChange = (e) => {
    const selectedMaterial = materials.find((m) => m.id === materialId)
    setToolType(e.target.value)

    if (selectedMaterial) {
      setVc(e.target.value === "hss" ? selectedMaterial.vcHSS : selectedMaterial.vcCarbide)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Calculateur de Fraisage</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="material" className="block text-sm font-medium mb-1">
              Matériau
            </label>
            <select
              id="material"
              className="w-full rounded-md border border-gray-300 p-2"
              value={materialId}
              onChange={handleMaterialChange}
            >
              {materials.map((material) => (
                <option key={material.id} value={material.id}>
                  {material.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tool-type" className="block text-sm font-medium mb-1">
              Type d&apos;outil
            </label>
            <select
              id="tool-type"
              className="w-full rounded-md border border-gray-300 p-2"
              value={toolType}
              onChange={handleToolTypeChange}
            >
              <option value="hss">HSS</option>
              <option value="carbide">Carbure</option>
            </select>
          </div>

          <div>
            <label htmlFor="diameter" className="block text-sm font-medium mb-1">
              Diamètre de fraise (mm)
            </label>
            <input
              id="diameter"
              type="number"
              className="w-full rounded-md border border-gray-300 p-2"
              min="0.1"
              step="0.1"
              value={diameter}
              onChange={(e) => setDiameter(Number(e.target.value))}
            />
          </div>

          <div>
            <label htmlFor="teeth" className="block text-sm font-medium mb-1">
              Nombre de dents
            </label>
            <input
              id="teeth"
              type="number"
              className="w-full rounded-md border border-gray-300 p-2"
              min="1"
              step="1"
              value={teeth}
              onChange={(e) => setTeeth(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="vc" className="block text-sm font-medium mb-1">
              Vitesse de coupe Vc (m/min)
            </label>
            <input
              id="vc"
              type="number"
              className="w-full rounded-md border border-gray-300 p-2"
              min="1"
              step="1"
              value={vc}
              onChange={(e) => setVc(Number(e.target.value))}
            />
          </div>

          <div>
            <label htmlFor="fz" className="block text-sm font-medium mb-1">
              Avance par dent fz (mm/dt)
            </label>
            <input
              id="fz"
              type="number"
              className="w-full rounded-md border border-gray-300 p-2"
              min="0.001"
              step="0.001"
              value={fz}
              onChange={(e) => setFz(Number(e.target.value))}
            />
          </div>

          <div>
            <label htmlFor="n" className="block text-sm font-medium mb-1">
              Vitesse de rotation n (tr/min)
            </label>
            <input
              id="n"
              type="number"
              className="w-full rounded-md border border-gray-300 bg-gray-100 p-2"
              value={n}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="vf" className="block text-sm font-medium mb-1">
              Vitesse d&apos;avance Vf (mm/min)
            </label>
            <input
              id="vf"
              type="number"
              className="w-full rounded-md border border-gray-300 bg-gray-100 p-2"
              value={vf}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={calculateParameters}>
          Calculer
        </button>
      </div>
    </div>
  )
}

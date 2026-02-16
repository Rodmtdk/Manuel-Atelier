export function MaterialTable() {
  const materials = [
    { name: "Acier doux (S235)", vcHSS: "25-35", vcCarbure: "100-150", fzFraisage: "0.05-0.10", fTournage: "0.15-0.30" },
    { name: "Acier mi-dur (C45)", vcHSS: "20-30", vcCarbure: "80-130", fzFraisage: "0.04-0.08", fTournage: "0.10-0.25" },
    { name: "Acier inox (304)", vcHSS: "15-20", vcCarbure: "60-100", fzFraisage: "0.03-0.06", fTournage: "0.10-0.20" },
    { name: "Acier trempe (>50HRC)", vcHSS: "-", vcCarbure: "40-80", fzFraisage: "0.02-0.05", fTournage: "0.05-0.15" },
    { name: "Fonte grise", vcHSS: "15-25", vcCarbure: "80-120", fzFraisage: "0.06-0.12", fTournage: "0.15-0.30" },
    { name: "Aluminium (6061)", vcHSS: "80-150", vcCarbure: "200-500", fzFraisage: "0.08-0.15", fTournage: "0.15-0.40" },
    { name: "Laiton", vcHSS: "60-100", vcCarbure: "150-300", fzFraisage: "0.08-0.12", fTournage: "0.10-0.25" },
    { name: "Cuivre", vcHSS: "40-80", vcCarbure: "100-200", fzFraisage: "0.05-0.10", fTournage: "0.10-0.20" },
    { name: "Titane (Ti6Al4V)", vcHSS: "10-20", vcCarbure: "40-70", fzFraisage: "0.03-0.06", fTournage: "0.08-0.15" },
    { name: "Plastique (POM/PA)", vcHSS: "100-200", vcCarbure: "200-400", fzFraisage: "0.10-0.20", fTournage: "0.20-0.50" },
  ]

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        <span className="mr-2 inline-block h-1 w-8 rounded-full bg-primary align-middle" />
        Table de Reference des Vitesses de Coupe
      </h2>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-3 text-left font-semibold text-foreground">Materiau</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Vc HSS
                <span className="block text-xs font-normal text-muted-foreground">m/min</span>
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Vc Carbure
                <span className="block text-xs font-normal text-muted-foreground">m/min</span>
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                fz Fraisage
                <span className="block text-xs font-normal text-muted-foreground">mm/dent</span>
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                f Tournage
                <span className="block text-xs font-normal text-muted-foreground">mm/tr</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {materials.map((mat, i) => (
              <tr key={i} className="border-b border-border transition-colors last:border-0 hover:bg-secondary/30">
                <td className="px-4 py-3 font-medium text-foreground">{mat.name}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{mat.vcHSS}</td>
                <td className="px-4 py-3 font-mono text-primary">{mat.vcCarbure}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{mat.fzFraisage}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{mat.fTournage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        * Les valeurs sont indicatives et dependent des conditions de coupe, de l{"'"}etat de l{"'"}outil et de la rigidite de la machine.
        Adaptez toujours selon votre experience et les recommandations du fabricant d{"'"}outils.
      </p>
    </div>
  )
}

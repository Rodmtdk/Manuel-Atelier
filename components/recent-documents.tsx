import Link from "next/link"
import { FileText, Clock } from "lucide-react"

// Mock data - in a real app, this would be fetched from an API or local storage
const recentDocuments = [
  {
    title: "Paramètres de coupe pour l'aluminium 7075",
    path: "/materials/aluminum/7075/cutting-parameters",
    timestamp: "Il y a 2 heures",
  },
  {
    title: "Guide de programmation Siemens 840D",
    path: "/cnc/siemens/840d/programming-guide",
    timestamp: "Il y a 1 jour",
  },
  {
    title: "Maintenance préventive fraiseuse 3 axes",
    path: "/maintenance/preventive/3-axis-mill",
    timestamp: "Il y a 3 jours",
  },
  {
    title: "Calcul de temps d'usinage",
    path: "/calculator/machining-time",
    timestamp: "Il y a 1 semaine",
  },
]

export function RecentDocuments() {
  return (
    <div className="space-y-4">
      {recentDocuments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Clock className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">Aucun document consulté récemment</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {recentDocuments.map((doc) => (
            <li key={doc.path}>
              <Link href={doc.path} className="flex items-start gap-2 rounded-md p-2 hover:bg-accent transition-colors">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{doc.title}</p>
                  <p className="text-xs text-muted-foreground">{doc.timestamp}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

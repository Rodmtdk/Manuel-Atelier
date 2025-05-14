import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="flex max-w-md flex-col items-center justify-center text-center">
        <FileQuestion className="h-24 w-24 text-muted-foreground" />
        <h2 className="mt-6 text-3xl font-bold">Page non trouvée</h2>
        <p className="mt-2 text-muted-foreground">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex gap-2">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Accueil
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

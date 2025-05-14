import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentExplorer } from "@/components/documents/document-explorer"
import { DocumentUploader } from "@/components/documents/document-uploader"
import { RecentDocuments } from "@/components/recent-documents"

export default function DocumentsPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Documents techniques</h1>
        <p className="text-muted-foreground">Explorez et gérez tous vos documents techniques d&apos;atelier</p>
      </div>

      <Tabs defaultValue="explorer" className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="explorer">Explorateur</TabsTrigger>
          <TabsTrigger value="recent">Documents récents</TabsTrigger>
          <TabsTrigger value="upload">Importer</TabsTrigger>
        </TabsList>

        <TabsContent value="explorer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Explorateur de documents</CardTitle>
              <CardDescription>Parcourez tous les documents techniques par catégorie</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentExplorer />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents récemment consultés</CardTitle>
              <CardDescription>Accédez rapidement à vos dernières consultations</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <RecentDocuments />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Importer des documents</CardTitle>
              <CardDescription>Ajoutez de nouveaux documents à la base de connaissances</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentUploader />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

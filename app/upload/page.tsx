"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "@/components/file-uploader"
import { ModelViewer } from "@/components/model-viewer"
import { AIAnalysisPanel } from "@/components/ai-analysis-panel"
import { MachinabilityScore } from "@/components/machinability-score"
import { MaterialSelector } from "@/components/material-selector"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowRight, Info, FileUp, FileCheck, Cpu, AlertTriangle } from "lucide-react"

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState("upload")
  const [files, setFiles] = useState<File[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState("")

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles)
    if (newFiles.length > 0) {
      // Automatically move to the next tab when files are uploaded
      setActiveTab("preview")
    }
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisComplete(true)
      setActiveTab("analysis")
    }, 3000)
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Upload intelligent de fichiers</h1>
        <p className="text-muted-foreground">
          Téléchargez vos fichiers 3D/2D et laissez notre IA analyser automatiquement la géométrie et les exigences de
          fabrication.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="upload" disabled={isAnalyzing}>
            <FileUp className="mr-2 h-4 w-4" /> Upload
          </TabsTrigger>
          <TabsTrigger value="preview" disabled={files.length === 0 || isAnalyzing}>
            <FileCheck className="mr-2 h-4 w-4" /> Aperçu
          </TabsTrigger>
          <TabsTrigger value="analysis" disabled={!analysisComplete}>
            <Cpu className="mr-2 h-4 w-4" /> Analyse IA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Téléchargez vos fichiers</CardTitle>
              <CardDescription>Formats supportés: STEP, STL, PDF, DXF. Taille maximale: 50MB.</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader
                id="model-files"
                onFilesChange={handleFileChange}
                acceptedFileTypes=".step,.stp,.stl,.pdf,.dxf"
                maxFiles={5}
              />
            </CardContent>
          </Card>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Conseil</AlertTitle>
            <AlertDescription>
              Pour de meilleurs résultats, utilisez des fichiers STEP ou STL avec des géométries bien définies.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Aperçu du modèle</CardTitle>
                <CardDescription>Visualisez votre modèle 3D et vérifiez qu'il est correctement chargé.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ModelViewer files={files} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paramètres d'analyse</CardTitle>
                <CardDescription>Configurez les paramètres pour l'analyse IA.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <MaterialSelector value={selectedMaterial} onChange={setSelectedMaterial} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleAnalyze} disabled={isAnalyzing || selectedMaterial === ""}>
                  {isAnalyzing ? (
                    <>
                      <span className="loading-dots mr-2">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                      Analyse en cours...
                    </>
                  ) : (
                    <>
                      Analyser avec l'IA <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {isAnalyzing && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div>
                    <p className="font-medium">Analyse IA en cours</p>
                    <p className="text-sm text-muted-foreground">
                      Notre IA analyse votre modèle pour identifier les caractéristiques géométriques, les zones
                      critiques et les stratégies d'usinage optimales.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Analyse géométrique</CardTitle>
                <CardDescription>Caractéristiques détectées par notre IA.</CardDescription>
              </CardHeader>
              <CardContent>
                <AIAnalysisPanel />
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Score d'usinabilité</CardTitle>
                  <CardDescription>Évaluation de la facilité d'usinage de votre pièce.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MachinabilityScore score={85} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Zones critiques</CardTitle>
                  <CardDescription>Zones nécessitant une attention particulière.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Contre-dépouilles détectées</p>
                      <p className="text-sm text-muted-foreground">
                        2 zones avec contre-dépouilles nécessitant un usinage 5 axes ou un repositionnement.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Rayons intérieurs faibles</p>
                      <p className="text-sm text-muted-foreground">4 rayons intérieurs inférieurs à 1mm détectés.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Modifier les paramètres</Button>
            <Button>
              Générer une stratégie d'usinage <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState, useRef } from "react"
import { Upload, X, FileText, File, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

export function DocumentUploader() {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [category, setCategory] = useState("")
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    addFiles(droppedFiles)
  }

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    addFiles(selectedFiles)
  }

  const addFiles = (newFiles) => {
    const updatedFiles = [...files]

    newFiles.forEach((file) => {
      // Check if file already exists
      const exists = updatedFiles.some((f) => f.name === file.name && f.size === file.size)

      if (!exists) {
        updatedFiles.push({
          file,
          id: Date.now() + Math.random().toString(36).substring(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
          status: "pending", // pending, uploading, success, error
        })
      }
    })

    setFiles(updatedFiles)
  }

  const removeFile = (id) => {
    setFiles(files.filter((file) => file.id !== id))
  }

  const uploadFiles = () => {
    if (files.length === 0) {
      toast({
        title: "Aucun fichier à télécharger",
        description: "Veuillez ajouter des fichiers avant de télécharger.",
        variant: "destructive",
      })
      return
    }

    if (!category) {
      toast({
        title: "Catégorie requise",
        description: "Veuillez sélectionner une catégorie pour les documents.",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    // Simulate file upload with progress
    const updatedFiles = files.map((file) => ({
      ...file,
      status: "uploading",
      progress: 0,
    }))

    setFiles(updatedFiles)

    // Simulate upload progress for each file
    updatedFiles.forEach((file) => {
      const intervalId = setInterval(() => {
        setFiles((prevFiles) => {
          const fileIndex = prevFiles.findIndex((f) => f.id === file.id)

          if (fileIndex === -1) {
            clearInterval(intervalId)
            return prevFiles
          }

          const updatedFile = { ...prevFiles[fileIndex] }

          if (updatedFile.progress < 100) {
            updatedFile.progress += Math.floor(Math.random() * 10) + 5

            if (updatedFile.progress >= 100) {
              updatedFile.progress = 100
              updatedFile.status = "success"
              clearInterval(intervalId)
            }
          }

          const newFiles = [...prevFiles]
          newFiles[fileIndex] = updatedFile

          // Check if all files are uploaded
          const allDone = newFiles.every((f) => f.status === "success" || f.status === "error")
          if (allDone) {
            setUploading(false)
            toast({
              title: "Téléchargement terminé",
              description: "Tous les fichiers ont été téléchargés avec succès.",
            })
          }

          return newFiles
        })
      }, 300)
    })
  }

  const getFileIcon = (fileType) => {
    if (fileType.includes("pdf")) {
      return <FileText className="h-8 w-8 text-red-500" />
    } else if (fileType.includes("image")) {
      return <FileText className="h-8 w-8 text-blue-500" />
    } else if (fileType.includes("excel") || fileType.includes("spreadsheet")) {
      return <FileText className="h-8 w-8 text-green-500" />
    } else if (fileType.includes("word") || fileType.includes("document")) {
      return <FileText className="h-8 w-8 text-blue-500" />
    } else {
      return <File className="h-8 w-8 text-gray-500" />
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fraisage">Fraisage</SelectItem>
              <SelectItem value="tournage">Tournage</SelectItem>
              <SelectItem value="cnc">Commandes numériques</SelectItem>
              <SelectItem value="outils">Outils coupants</SelectItem>
              <SelectItem value="materiaux">Matières</SelectItem>
              <SelectItem value="securite">Sécurité</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
          <Input id="tags" placeholder="Ex: aluminium, fraisage, paramètres" />
        </div>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-primary bg-primary/10" : "border-border"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <Upload className="h-12 w-12 text-muted-foreground" />
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Glissez-déposez vos fichiers ici</h3>
            <p className="text-sm text-muted-foreground">ou</p>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              Sélectionner des fichiers
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileInputChange}
              disabled={uploading}
            />
          </div>
          <p className="text-xs text-muted-foreground">Formats supportés: PDF, DOCX, XLSX, PNG, JPG, DWG, STEP</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Fichiers ({files.length})</h3>
            <Button variant="outline" size="sm" onClick={() => setFiles([])} disabled={uploading}>
              Tout effacer
            </Button>
          </div>

          <div className="space-y-2">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.type)}
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{file.name}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                      <Badge
                        variant={
                          file.status === "success"
                            ? "success"
                            : file.status === "error"
                              ? "destructive"
                              : file.status === "uploading"
                                ? "outline"
                                : "secondary"
                        }
                      >
                        {file.status === "success" && <Check className="h-3 w-3 mr-1" />}
                        {file.status === "success"
                          ? "Terminé"
                          : file.status === "error"
                            ? "Erreur"
                            : file.status === "uploading"
                              ? "En cours..."
                              : "En attente"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {file.status === "uploading" && (
                    <div className="w-24">
                      <Progress value={file.progress} className="h-2" />
                    </div>
                  )}

                  {file.status !== "uploading" && (
                    <Button variant="ghost" size="icon" onClick={() => removeFile(file.id)} disabled={uploading}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full" onClick={uploadFiles} disabled={uploading}>
            {uploading ? "Téléchargement en cours..." : "Télécharger les fichiers"}
          </Button>
        </div>
      )}
    </div>
  )
}

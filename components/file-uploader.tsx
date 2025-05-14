"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, FileText, File, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

interface FileUploaderProps {
  id: string
  onFilesChange: (files: File[]) => void
  acceptedFileTypes?: string
  maxFiles?: number
  maxFileSize?: number // in MB
}

export function FileUploader({
  id,
  onFilesChange,
  acceptedFileTypes = ".step,.stp,.stl,.pdf,.dxf",
  maxFiles = 5,
  maxFileSize = 50, // 50MB default
}: FileUploaderProps) {
  const [files, setFiles] = useState<
    Array<{
      file: File
      id: string
      progress: number
      status: "pending" | "uploading" | "success" | "error"
      error?: string
    }>
  >([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    addFiles(droppedFiles)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      addFiles(selectedFiles)
    }
  }

  const addFiles = (newFiles: File[]) => {
    // Check if adding these files would exceed the max files limit
    if (files.length + newFiles.length > maxFiles) {
      toast({
        title: "Trop de fichiers",
        description: `Vous ne pouvez pas télécharger plus de ${maxFiles} fichiers.`,
        variant: "destructive",
      })
      return
    }

    const updatedFiles = [...files]
    let hasErrors = false

    newFiles.forEach((file) => {
      // Check if file already exists
      const exists = updatedFiles.some((f) => f.file.name === file.name && f.file.size === file.size)
      if (exists) return

      // Check file type
      const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`
      const isAcceptedType = acceptedFileTypes.includes(fileExtension)

      // Check file size
      const isAcceptedSize = file.size <= maxFileSize * 1024 * 1024

      if (!isAcceptedType || !isAcceptedSize) {
        hasErrors = true
        updatedFiles.push({
          file,
          id: Date.now() + Math.random().toString(36).substring(2, 9),
          progress: 0,
          status: "error",
          error: !isAcceptedType ? `Type de fichier non supporté` : `Fichier trop volumineux (max: ${maxFileSize}MB)`,
        })
      } else {
        // Simulate upload progress
        const newFile = {
          file,
          id: Date.now() + Math.random().toString(36).substring(2, 9),
          progress: 0,
          status: "uploading" as const,
        }

        updatedFiles.push(newFile)

        // Simulate upload progress
        const interval = setInterval(() => {
          setFiles((currentFiles) => {
            const fileIndex = currentFiles.findIndex((f) => f.id === newFile.id)
            if (fileIndex === -1) {
              clearInterval(interval)
              return currentFiles
            }

            const file = currentFiles[fileIndex]
            if (file.progress >= 100) {
              clearInterval(interval)

              const updatedFiles = [...currentFiles]
              updatedFiles[fileIndex] = {
                ...file,
                status: "success",
                progress: 100,
              }

              // Update parent component with valid files
              const validFiles = updatedFiles.filter((f) => f.status === "success").map((f) => f.file)
              onFilesChange(validFiles)

              return updatedFiles
            }

            const updatedFiles = [...currentFiles]
            updatedFiles[fileIndex] = {
              ...file,
              progress: file.progress + 10,
            }

            return updatedFiles
          })
        }, 200)
      }
    })

    setFiles(updatedFiles)

    if (hasErrors) {
      toast({
        title: "Problème avec certains fichiers",
        description: "Certains fichiers n'ont pas pu être ajoutés. Vérifiez le format et la taille.",
        variant: "destructive",
      })
    }
  }

  const removeFile = (id: string) => {
    const updatedFiles = files.filter((file) => file.id !== id)
    setFiles(updatedFiles)

    // Update parent component
    const validFiles = updatedFiles.filter((f) => f.status === "success").map((f) => f.file)
    onFilesChange(validFiles)
  }

  const getFileIcon = (file: File) => {
    const extension = file.name.split(".").pop()?.toLowerCase()

    if (extension === "stl") {
      return <FileText className="h-8 w-8 text-blue-500" />
    } else if (extension === "step" || extension === "stp") {
      return <FileText className="h-8 w-8 text-green-500" />
    } else if (extension === "pdf") {
      return <FileText className="h-8 w-8 text-red-500" />
    } else if (extension === "dxf") {
      return <FileText className="h-8 w-8 text-purple-500" />
    } else {
      return <File className="h-8 w-8 text-gray-500" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-4">
      <div
        className={`upload-zone rounded-lg p-6 text-center ${isDragging ? "active" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <div className="space-y-2">
            <h3 className="text-base font-medium">Glissez-déposez vos fichiers ici</h3>
            <p className="text-sm text-muted-foreground">ou</p>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              Sélectionner des fichiers
            </Button>
            <input
              ref={fileInputRef}
              id={id}
              type="file"
              multiple
              className="hidden"
              accept={acceptedFileTypes}
              onChange={handleFileInputChange}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Formats supportés: {acceptedFileTypes.replace(/\./g, "").toUpperCase().replace(/,/g, ", ")}
            <br />
            Taille maximale: {maxFileSize}MB
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Fichiers ({files.length})</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFiles([])
                onFilesChange([])
              }}
            >
              Tout effacer
            </Button>
          </div>

          <div className="space-y-2">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.file)}
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{file.file.name}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{formatFileSize(file.file.size)}</span>
                      <Badge
                        variant={
                          file.status === "success" ? "outline" : file.status === "error" ? "destructive" : "secondary"
                        }
                        className="text-xs"
                      >
                        {file.status === "success" && <Check className="h-3 w-3 mr-1" />}
                        {file.status === "error" && <AlertCircle className="h-3 w-3 mr-1" />}
                        {file.status === "success"
                          ? "Prêt"
                          : file.status === "error"
                            ? "Erreur"
                            : file.status === "uploading"
                              ? "En cours..."
                              : "En attente"}
                      </Badge>
                    </div>
                    {file.error && <p className="text-xs text-destructive">{file.error}</p>}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {file.status === "uploading" && (
                    <div className="w-24">
                      <Progress value={file.progress} className="h-2" />
                    </div>
                  )}

                  <Button variant="ghost" size="icon" onClick={() => removeFile(file.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

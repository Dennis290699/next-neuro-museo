"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  Zap,
  Download,
  AlertCircle,
  CheckCircle,
  Loader2,
  ImageIcon,
  Sparkles,
  Brain,
  Eye,
  Palette,
  FileImage,
  X,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useAppStore } from "@/lib/store"
import { processImageWithAI } from "@/lib/ai-model"

type ProcessingStep = {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  status: "pending" | "processing" | "completed"
}

export default function DemoPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
    {
      id: "detection",
      name: "Detección de Objetos",
      description: "Identificando elementos artísticos",
      icon: Eye,
      status: "pending",
    },
    {
      id: "analysis",
      name: "Análisis IA",
      description: "Procesando con redes neuronales",
      icon: Brain,
      status: "pending",
    },
    {
      id: "reconstruction",
      name: "Reconstrucción 2D",
      description: "Generando imagen restaurada",
      icon: Palette,
      status: "pending",
    },
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setModelLoading } = useAppStore()

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Por favor selecciona un archivo de imagen válido")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("El archivo es demasiado grande. Máximo 10MB")
      return
    }

    setSelectedFile(file)
    setError(null)
    setProcessedImageUrl(null)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileSelect(files[0])
      }
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const processImage = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setModelLoading(true)
    setProgress(0)
    setError(null)

    try {
      // Reset steps
      setProcessingSteps((prev) =>
        prev.map((step) => ({
          ...step,
          status: "pending",
        })),
      )

      // Step 1: Detection
      setProcessingSteps((prev) =>
        prev.map((step) => (step.id === "detection" ? { ...step, status: "processing" } : step)),
      )
      setProgress(20)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setProcessingSteps((prev) =>
        prev.map((step) => (step.id === "detection" ? { ...step, status: "completed" } : step)),
      )

      // Step 2: Analysis
      setProcessingSteps((prev) =>
        prev.map((step) => (step.id === "analysis" ? { ...step, status: "processing" } : step)),
      )
      setProgress(50)
      await new Promise((resolve) => setTimeout(resolve, 3000))

      setProcessingSteps((prev) =>
        prev.map((step) => (step.id === "analysis" ? { ...step, status: "completed" } : step)),
      )

      // Step 3: Reconstruction
      setProcessingSteps((prev) =>
        prev.map((step) => (step.id === "reconstruction" ? { ...step, status: "processing" } : step)),
      )
      setProgress(80)

      // Process with AI model
      const result = await processImageWithAI(selectedFile)
      setProcessedImageUrl(result)

      setProcessingSteps((prev) =>
        prev.map((step) => (step.id === "reconstruction" ? { ...step, status: "completed" } : step)),
      )
      setProgress(100)
    } catch (err) {
      setError("Error al procesar la imagen. Por favor intenta nuevamente.")
      console.error("Processing error:", err)
    } finally {
      setIsProcessing(false)
      setModelLoading(false)
    }
  }

  const downloadResult = () => {
    if (!processedImageUrl) return

    const link = document.createElement("a")
    link.href = processedImageUrl
    link.download = `restored-${selectedFile?.name || "image"}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const resetDemo = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setProcessedImageUrl(null)
    setIsProcessing(false)
    setProgress(0)
    setError(null)
    setProcessingSteps((prev) =>
      prev.map((step) => ({
        ...step,
        status: "pending",
      })),
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-40 right-32 w-24 h-24 bg-purple-400/10 rounded-full blur-xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full px-4 py-2 mb-6 shadow-lg">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Demostración Interactiva
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Probar el Modelo
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Sube una imagen de arte dañado y observa cómo nuestra IA la restaura con precisión excepcional
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {error && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="h-full shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Upload className="w-5 h-5 text-white" />
                    </div>
                    <span>Imagen Original</span>
                  </CardTitle>
                  <CardDescription className="text-base">
                    Sube una imagen de arte que necesite restauración (máximo 10MB)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!previewUrl ? (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-blue-300 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer group"
                    >
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow"
                      >
                        <Upload className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Arrastra tu imagen aquí</h3>
                      <p className="text-gray-600 mb-6">o haz clic para seleccionar desde tu dispositivo</p>
                      <div className="flex justify-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <FileImage className="w-4 h-4" />
                          <span>JPG, PNG, WEBP</span>
                        </span>
                        <span>•</span>
                        <span>Máximo 10MB</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4"
                    >
                      <div className="relative rounded-2xl overflow-hidden shadow-lg">
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-64 object-cover"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={resetDemo}
                          className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <FileImage className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">{selectedFile?.name}</p>
                            <p className="text-sm text-gray-500">
                              {selectedFile && (selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                    </motion.div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileSelect(file)
                    }}
                    className="hidden"
                  />

                  {selectedFile && !isProcessing && !processedImageUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-center"
                    >
                      <Button
                        onClick={processImage}
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Zap className="w-5 h-5 mr-2" />
                        Procesar con IA
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Result Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="h-full shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span>Resultado Restaurado</span>
                  </CardTitle>
                  <CardDescription className="text-base">
                    La imagen procesada por nuestra inteligencia artificial
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <AnimatePresence mode="wait">
                    {!selectedFile ? (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-gray-100 rounded-2xl p-12 text-center min-h-[300px] flex items-center justify-center"
                      >
                        <div className="text-gray-500">
                          <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium">El resultado aparecerá aquí</p>
                          <p className="text-sm mt-2">Sube una imagen para comenzar</p>
                        </div>
                      </motion.div>
                    ) : isProcessing ? (
                      <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                          <div className="text-center mb-6">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                            >
                              <Brain className="w-8 h-8 text-white" />
                            </motion.div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Procesando con IA</h3>
                            <p className="text-gray-600">Nuestro modelo está analizando tu imagen...</p>
                          </div>

                          <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-700">Progreso</span>
                              <span className="text-sm font-medium text-blue-600">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>

                          <div className="space-y-3">
                            {processingSteps.map((step, index) => {
                              const Icon = step.icon
                              return (
                                <motion.div
                                  key={step.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                                    step.status === "completed"
                                      ? "bg-green-100 border border-green-200"
                                      : step.status === "processing"
                                        ? "bg-blue-100 border border-blue-200"
                                        : "bg-gray-50 border border-gray-200"
                                  }`}
                                >
                                  <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                      step.status === "completed"
                                        ? "bg-green-500"
                                        : step.status === "processing"
                                          ? "bg-blue-500"
                                          : "bg-gray-400"
                                    }`}
                                  >
                                    {step.status === "processing" ? (
                                      <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                      >
                                        <Loader2 className="w-4 h-4 text-white" />
                                      </motion.div>
                                    ) : step.status === "completed" ? (
                                      <CheckCircle className="w-4 h-4 text-white" />
                                    ) : (
                                      <Icon className="w-4 h-4 text-white" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{step.name}</p>
                                    <p className="text-sm text-gray-600">{step.description}</p>
                                  </div>
                                </motion.div>
                              )
                            })}
                          </div>
                        </div>
                      </motion.div>
                    ) : processedImageUrl ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                      >
                        <div className="relative rounded-2xl overflow-hidden shadow-lg">
                          <img
                            src={processedImageUrl || "/placeholder.svg"}
                            alt="Processed result"
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>Completado</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button
                            onClick={downloadResult}
                            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Descargar Resultado
                          </Button>
                          <Button onClick={resetDemo} variant="outline" className="flex-1">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Probar Otra Imagen
                          </Button>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Process Steps Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Proceso de Restauración</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Nuestro modelo de IA sigue un proceso estructurado para restaurar arte con precisión
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Eye,
                  title: "Detección Inteligente",
                  description: "Identificamos objetos, texturas y áreas dañadas usando visión por computadora avanzada",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Brain,
                  title: "Análisis Profundo",
                  description: "Procesamos la imagen con redes neuronales entrenadas específicamente para arte",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: Palette,
                  title: "Reconstrucción 2D",
                  description: "Generamos la imagen restaurada preservando el estilo y técnica original",
                  color: "from-green-500 to-emerald-500",
                },
              ].map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import {
  Download,
  FileText,
  Archive,
  HardDrive,
  ExternalLink,
  Copy,
  Check,
  Upload,
  Zap,
  Eye,
  Code2,
  Terminal,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageGallery } from "./image-gallery"
import type { DocContent } from "@/data/docs"

const iconMap = {
  Upload,
  Zap,
  Eye,
  Download,
}

export function ContentRenderer({ content }: { content: DocContent[] }) {
  return (
    <div className="space-y-8 lg:space-y-12">
      {content.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          {item.type === "text" && <TextRenderer data={item.data} />}
          {item.type === "code" && <CodeRenderer data={item.data} />}
          {item.type === "image" && <ImageRenderer data={item.data} />}
          {item.type === "download" && <DownloadRenderer data={item.data} />}
          {item.type === "result" && <ResultRenderer data={item.data} />}
          {item.type === "guide" && <GuideRenderer data={item.data} />}
        </motion.div>
      ))}
    </div>
  )
}

function TextRenderer({ data }: { data: any }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose prose-gray max-w-none">
      <p className="text-gray-700 leading-relaxed text-base lg:text-lg font-light tracking-wide">{data.content}</p>
    </motion.div>
  )
}

function CodeRenderer({ data }: { data: any }) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(data.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="overflow-hidden border border-gray-200 shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b-0 p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg lg:text-xl text-white font-semibold truncate">{data.title}</CardTitle>
                <Badge
                  variant="secondary"
                  className="mt-2 bg-white/20 text-white border-white/30 hover:bg-white/30 w-fit"
                >
                  {data.language}
                </Badge>
              </div>
            </div>
            <motion.div whileTap={{ scale: 0.95 }} className="flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={copyCode}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                <span>{copied ? "¡Copiado!" : "Copiar"}</span>
              </Button>
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative w-full">
            <div className="bg-gray-900 text-gray-100 w-full">
              <div className="overflow-x-auto p-4 lg:p-6">
                <pre className="text-sm lg:text-base leading-relaxed">
                  <code className="block whitespace-pre font-mono">{data.code}</code>
                </pre>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-gray-900 to-transparent pointer-events-none opacity-50" />
          </div>

          {data.explanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 lg:p-6 bg-blue-50 border-t border-blue-100"
            >
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Terminal className="w-3 h-3 text-white" />
                </div>
                <p className="text-sm lg:text-base text-blue-800 leading-relaxed">{data.explanation}</p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ImageRenderer({ data }: { data: any }) {
  // Si hay múltiples imágenes, usar galería
  if (Array.isArray(data)) {
    return <ImageGallery images={data} />
  }

  // Imagen única
  const images = [
    {
      src: data.src,
      alt: data.alt,
      caption: data.caption,
    },
  ]

  return <ImageGallery images={images} />
}

function DownloadRenderer({ data }: { data: any }) {
  const getFileIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return FileText
      case "zip":
        return Archive
      case "h5":
        return HardDrive
      default:
        return Download
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border border-gray-200 shadow-lg bg-white">
        <CardHeader className="p-4 lg:p-6 bg-green-50 border-b border-green-100">
          <CardTitle className="flex items-center space-x-3 text-lg lg:text-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Download className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900">{data.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 lg:p-6">
          <div className="grid grid-cols-1 gap-4 lg:gap-6">
            {data.files.map((file: any, index: number) => {
              const Icon = getFileIcon(file.format)
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="p-4 lg:p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300 bg-white">
                    <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-all duration-300">
                          <Icon className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-base lg:text-lg mb-2">{file.name}</h4>
                          <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{file.description}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-3">
                            <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                              {file.format}
                            </Badge>
                            <span className="text-sm text-gray-500 font-medium">{file.size}</span>
                          </div>
                        </div>
                      </div>
                      <motion.div whileTap={{ scale: 0.95 }} className="lg:flex-shrink-0">
                        <Button
                          asChild
                          className="w-full lg:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <a href={file.url} className="flex items-center justify-center space-x-2">
                            <Download className="w-4 h-4" />
                            <span>Descargar</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ResultRenderer({ data }: { data: any }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
      <Card className="border border-gray-200 shadow-lg bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
        <CardHeader className="p-4 lg:p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardTitle className="flex items-center space-x-3 text-lg lg:text-xl">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center border border-white/30">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span>{data.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {data.metrics.map((metric: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white p-4 lg:p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm lg:text-base text-gray-600 font-medium">{metric.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function GuideRenderer({ data }: { data: any }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border border-gray-200 shadow-lg bg-white">
        <CardHeader className="p-4 lg:p-6 bg-purple-50 border-b border-purple-100">
          <CardTitle className="text-lg lg:text-xl text-gray-900">{data.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 lg:p-6">
          <div className="space-y-6 lg:space-y-8">
            {data.steps.map((step: any, index: number) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6 p-4 lg:p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                    <div className="flex items-center lg:items-start space-x-4 lg:space-x-0 lg:flex-col lg:space-y-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-all duration-300 lg:mt-2">
                        <Icon className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-3 text-base lg:text-lg">{step.title}</h4>
                      <p className="text-gray-600 text-sm lg:text-base leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

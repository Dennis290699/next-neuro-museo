"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function FeedbackHeader() {
  return (
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
          Tu Opinión es Importante
        </span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
          Comparte tu Experiencia
        </span>
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Ayúdanos a mejorar <span className="font-semibold text-blue-600">Neuro-Museo</span> con tu valiosa
        retroalimentación
      </p>
    </motion.div>
  )
}

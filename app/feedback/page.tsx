"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { insertFeedback } from "@/lib/supabase"
import { FeedbackHeader } from "@/components/feedback/feedback-header"
import { FeedbackForm } from "@/components/feedback/feedback-form"
import { SuccessMessage } from "@/components/feedback/success-message"

interface FormData {
  name: string
  career: string
  faculty: string
  opinion: "Regular" | "Bueno" | "Excelente" | ""
}

export default function FeedbackPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    career: "",
    faculty: "",
    opinion: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Scroll hacia arriba cuando se muestre el mensaje de confirmación
  useEffect(() => {
    if (isSubmitted) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }, [isSubmitted])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleOpinionChange = (opinion: "Regular" | "Bueno" | "Excelente") => {
    setFormData((prev) => ({ ...prev, opinion }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validación
    if (!formData.name.trim() || !formData.career.trim() || !formData.faculty.trim() || !formData.opinion) {
      setError("Por favor completa todos los campos requeridos")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await insertFeedback({
        name: formData.name.trim(),
        career: formData.career.trim(),
        faculty: formData.faculty.trim(),
        opinion: formData.opinion,
      })

      // Delay para mostrar la animación completa
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)
    } catch (err: any) {
      console.error("Error enviando feedback:", err)
      setError("Error al procesar tu feedback. Por favor intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100 relative overflow-hidden">
      {/* Animated Background - Similar al HeroSection */}
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
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
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
          className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-32 left-40 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-lg"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-4 text-gray-600 hover:text-gray-900 hover:bg-white/60">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
              </Button>
            </Link>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div key="form-container">
                {/* Header Section */}
                <FeedbackHeader />

                {/* Form */}
                <FeedbackForm
                  formData={formData}
                  onInputChange={handleInputChange}
                  onOpinionChange={handleOpinionChange}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  error={error}
                />
              </motion.div>
            ) : (
              /* Success Message */
              <motion.div key="success-container">
                <SuccessMessage />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Send, Zap, Heart, User, GraduationCap, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField } from "./form-field"
import { OpinionSelector } from "./opinion-selector"

interface FormData {
  name: string
  career: string
  faculty: string
  opinion: "Regular" | "Bueno" | "Excelente" | ""
}

interface FeedbackFormProps {
  formData: FormData
  onInputChange: (field: string, value: string) => void
  onOpinionChange: (opinion: "Regular" | "Bueno" | "Excelente") => void
  onSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
  error: string | null
}

export function FeedbackForm({
  formData,
  onInputChange,
  onOpinionChange,
  onSubmit,
  isSubmitting,
  error,
}: FeedbackFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-t-lg border-b border-gray-100">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl"
          >
            <Heart className="w-8 h-8 text-white" />
          </motion.div>
          <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Formulario de Evaluación</CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Comparte tu experiencia con nuestro proyecto de IA
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 lg:p-10">
          <form onSubmit={onSubmit} className="space-y-8">
            {/* Nombre */}
            <FormField
              id="name"
              label="Nombre Completo"
              placeholder="Ingresa tu nombre completo"
              value={formData.name}
              onChange={(value) => onInputChange("name", value)}
              icon={User}
              iconColor="from-blue-500 to-blue-600"
              delay={0.1}
              disabled={isSubmitting}
            />

            {/* Carrera */}
            <FormField
              id="career"
              label="Carrera"
              placeholder="Ej: Ingeniería en Sistemas"
              value={formData.career}
              onChange={(value) => onInputChange("career", value)}
              icon={GraduationCap}
              iconColor="from-purple-500 to-purple-600"
              delay={0.2}
              disabled={isSubmitting}
            />

            {/* Facultad */}
            <FormField
              id="faculty"
              label="Facultad"
              placeholder="Ej: Facultad de Ingeniería"
              value={formData.faculty}
              onChange={(value) => onInputChange("faculty", value)}
              icon={Building}
              iconColor="from-green-500 to-emerald-600"
              delay={0.3}
              disabled={isSubmitting}
            />

            {/* Opinión */}
            <OpinionSelector value={formData.opinion} onChange={onOpinionChange} disabled={isSubmitting} delay={0.4} />

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-4"
                >
                  <p className="text-red-700 text-sm font-medium flex items-center">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs">!</span>
                    </div>
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-6"
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center space-x-3"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                      />
                      <span>Enviando tu feedback...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center space-x-3"
                    >
                      <Send className="w-6 h-6" />
                      <span>Enviar Feedback</span>
                      <Zap className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

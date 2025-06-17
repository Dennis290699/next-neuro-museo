"use client"

import { motion } from "framer-motion"
import { CheckCircle, Target, Lightbulb, Users } from "lucide-react"

const highlights = [
  "Detección automática de objetos artísticos",
  "Reconstrucción basada en IA avanzada",
  "Preservación de técnicas históricas",
  "Interfaz intuitiva y profesional",
]

export function AboutSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4 sm:mb-6">
              <Target className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Sobre el Proyecto</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Innovación en Restauración Digital
            </h2>

            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              Neuro-Museo representa un avance revolucionario en la preservación del patrimonio artístico. Nuestro
              modelo de inteligencia artificial ha sido entrenado específicamente para detectar, analizar y reconstruir
              objetos artísticos con una precisión sin precedentes.
            </p>

            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Utilizando técnicas avanzadas de visión por computadora y aprendizaje profundo, el sistema puede
              identificar patrones, texturas y elementos compositivos para generar reconstrucciones fieles a las
              técnicas originales.
            </p>

            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {highlights.map((highlight, index) => (
                <motion.li
                  key={highlight}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                  <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 mb-2 sm:mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Innovación</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Tecnología de vanguardia aplicada al arte</p>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mb-2 sm:mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Colaboración</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Trabajo en equipo multidisciplinario</p>
                </div>
              </div>
              <div className="mt-4 sm:mt-8">
                <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-6 sm:p-8 rounded-xl text-white shadow-xl">
                  <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">95%</div>
                  <div className="text-purple-100 mb-2 sm:mb-4 text-xs sm:text-sm">Precisión en detección</div>
                  <div className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">2D</div>
                  <div className="text-purple-100 text-xs sm:text-sm">Reconstrucción avanzada</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

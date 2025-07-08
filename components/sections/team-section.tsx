"use client"

import { motion } from "framer-motion"
import { Users, Award, Code, Palette } from "lucide-react"

export function TeamSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">Nuestro Equipo</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Grupo NeuroMuseo</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Un equipo multidisciplinario dedicado a la innovación en restauración digital
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/20"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Code className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Desarrollo IA</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Deep Learning, Redes Neuronales, GANs, UNet
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/20"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Arte Digital</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Expertos en historia del arte y técnicas de restauración
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/20 sm:col-span-2 lg:col-span-1"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Investigación</h3>
            <p className="text-sm sm:text-base text-gray-600">Preservación digital artística</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12"
        >
          <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Nuestra Misión</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Democratizar el acceso a tecnologías avanzadas de restauración digital, preservando el patrimonio
              artístico mundial mediante inteligencia artificial y técnicas de vanguardia.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

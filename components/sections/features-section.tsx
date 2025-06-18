"use client"

import { motion } from "framer-motion"
import { Eye, ImageIcon, Cpu, Palette, Zap, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Eye,
    title: "Detección Inteligente",
    description:
      "Algoritmos avanzados de visión por computadora para identificar objetos artísticos con precisión excepcional.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: ImageIcon,
    title: "Reconstrucción 2D",
    description:
      "Generación automática de imágenes restauradas basadas en referencias históricas y patrones aprendidos.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Cpu,
    title: "IA Especializada",
    description: "Modelo entrenado específicamente para arte histórico con miles de obras de referencia.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Palette,
    title: "Preservación Cromática",
    description: "Mantenimiento de la paleta de colores original y técnicas pictóricas históricas.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Zap,
    title: "Procesamiento Rápido",
    description: "Resultados en tiempo real con optimización de rendimiento para grandes volúmenes de datos.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Calidad Garantizada",
    description: "Validación automática de resultados con métricas de calidad y precisión.",
    color: "from-indigo-500 to-purple-500",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Características Principales</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Tecnología de vanguardia para la restauración digital de arte histórico
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                  <CardHeader className="p-4 sm:p-6">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <CardDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

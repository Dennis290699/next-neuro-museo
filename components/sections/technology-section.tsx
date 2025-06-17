"use client"

import { motion } from "framer-motion"
import { Brain, Database, Layers, Zap } from "lucide-react"

const technologies = [
  {
    icon: Brain,
    title: "Deep Learning",
    description: "Redes neuronales convolucionales especializadas en visión por computadora",
    tech: ["TensorFlow", "PyTorch", "OpenCV"],
  },
  {
    icon: Database,
    title: "Procesamiento de Datos",
    description: "Pipeline optimizado para el manejo de grandes volúmenes de imágenes",
    tech: ["NumPy", "Pandas", "Scikit-learn"],
  },
  {
    icon: Layers,
    title: "Arquitectura Modular",
    description: "Sistema escalable con componentes independientes y reutilizables",
    tech: ["Microservicios", "APIs REST", "Docker"],
  },
  {
    icon: Zap,
    title: "Optimización",
    description: "Algoritmos optimizados para rendimiento en tiempo real",
    tech: ["CUDA", "TensorRT", "ONNX"],
  },
]

export function TechnologySection() {
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Tecnología Avanzada</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Stack tecnológico de última generación para resultados excepcionales
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {technologies.map((tech, index) => {
            const Icon = tech.icon
            return (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 sm:p-3 rounded-xl flex-shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{tech.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                      {tech.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tech.tech.map((item) => (
                        <span
                          key={item}
                          className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 bg-white/10 rounded-full mix-blend-overlay filter blur-xl"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 bg-white/10 rounded-full mix-blend-overlay filter blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 sm:px-4 py-2 mb-6 sm:mb-8">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            <span className="text-xs sm:text-sm font-medium text-white">Comienza Ahora</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Experimenta el Futuro de la
            <br />
            <span className="text-yellow-300">Restauración Digital</span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed">
            Descubre cómo nuestra IA puede transformar y restaurar obras de arte con precisión excepcional. Prueba
            nuestro modelo ahora.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 rounded-full font-semibold"
            >
              <Link href="https://huggingface.co/spaces/Ab3l54/unet-gan-demo-v2" className="flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Probar Modelo</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="default"
              size="lg"
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-3 rounded-full"
            >
              <Link href="/docs" className="flex items-center justify-center space-x-2">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Ver Documentación</span>
              </Link>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-12 text-blue-200 text-sm"
          >
            <p>
              Desarrollado con ❤️ por <span className="font-semibold text-white">NeuroMuseo</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

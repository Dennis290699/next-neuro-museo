"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Palette,
  Github,
  Mail,
  ExternalLink,
  MapPin,
  Phone,
  Heart,
  ArrowUp,
  Sparkles,
  Brain,
  Eye,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="flex items-center space-x-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl"
                >
                  <Palette className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Neuro-Museo
                  </h3>
                  <p className="text-sm text-gray-400">Restaurador de Arte con IA</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Revolucionamos la restauración artística mediante inteligencia artificial avanzada. Detectamos,
                analizamos y reconstruimos objetos artísticos con precisión excepcional, preservando el patrimonio
                cultural para las futuras generaciones.
              </p>

              <div className="flex items-center space-x-2 mb-6">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-gray-300">
                  Desarrollado con pasión por{" "}
                  <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Grupo 2
                  </span>
                </span>
              </div>

              {/* Tech Icons */}
              <div className="flex space-x-3">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30"
                >
                  <Brain className="w-5 h-5 text-blue-400" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30"
                >
                  <Eye className="w-5 h-5 text-purple-400" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30"
                >
                  <Sparkles className="w-5 h-5 text-green-400" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-500/30"
                >
                  <Zap className="w-5 h-5 text-orange-400" />
                </motion.div>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h4 className="font-semibold text-white mb-6 text-lg">Navegación</h4>
              <ul className="space-y-4">
                {[
                  { name: "Inicio", href: "/" },
                  { name: "Características", href: "/#features" },
                  { name: "Tecnología", href: "/#technology" },
                  { name: "Equipo", href: "/#team" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 group"
                    >
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="w-1 h-1 bg-blue-400 rounded-full group-hover:bg-purple-400 transition-colors"
                      />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h4 className="font-semibold text-white mb-6 text-lg">Recursos</h4>
              <ul className="space-y-4">
                {[
                  { name: "Documentación", href: "/docs", icon: ExternalLink },
                  { name: "Probar Modelo", href: "/demo", icon: Zap },
                  { name: "GitHub", href: "#", icon: Github },
                  { name: "Soporte", href: "#", icon: Mail },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-3 group"
                      >
                        <Icon className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <h4 className="font-semibold text-white mb-6 text-lg">Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:grupo2@neuromuseo.com" className="hover:text-white transition-colors">
                      grupo2@neuromuseo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Ubicación</p>
                    <p>Universidad Tecnológica</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                    <Phone className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Proyecto</p>
                    <p>Investigación IA</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-700/50 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-gray-400 text-sm">© {currentYear} Neuro-Museo. Todos los derechos reservados.</p>
              <div className="hidden md:flex items-center space-x-4 text-sm text-gray-400">
                <Link href="#" className="hover:text-white transition-colors">
                  Privacidad
                </Link>
                <span>•</span>
                <Link href="#" className="hover:text-white transition-colors">
                  Términos
                </Link>
                <span>•</span>
                <Link href="#" className="hover:text-white transition-colors">
                  Cookies
                </Link>
              </div>
            </div>

            {/* Back to Top Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={scrollToTop}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Volver arriba
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
      </div>
    </footer>
  )
}

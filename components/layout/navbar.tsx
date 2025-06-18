"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, Palette, FileText, TestTube, ArrowRight, Users, Heart, ExternalLink, Github, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg" : "transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-50">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg"
            >
              <Palette className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </motion.div>
            <span className="font-bold text-lg lg:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Neuro-Museo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              Inicio
            </Link>
            <Link href="/docs" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              Documentación
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/demo" className="flex items-center space-x-2">
                  <TestTube className="w-4 h-4" />
                  <span>Probar Modelo</span>
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden relative z-50">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-[400px] p-0 border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <SheetHeader className="p-6 bg-white/90 backdrop-blur-md border-b border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                      >
                        <Palette className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <SheetTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          Neuro-Museo
                        </SheetTitle>
                        <p className="text-xs text-gray-500 font-medium">Restaurador de Arte con IA</p>
                      </div>
                    </div>
                    {/* <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeMobileMenu}
                      className="h-8 w-8 rounded-full hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Cerrar menú</span>
                    </Button> */}
                  </div>
                </SheetHeader>

                {/* Navigation Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-6 space-y-4">
                    {/* Home Link */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href="/"
                        className="flex items-center space-x-4 p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 shadow-sm hover:shadow-md hover:bg-white/90 transition-all duration-300 group"
                        onClick={closeMobileMenu}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                          <Palette className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            Inicio
                          </h4>
                          <p className="text-sm text-gray-500">Página principal</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </Link>
                    </motion.div>

                    {/* Documentation Link */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href="/docs"
                        className="flex items-center space-x-4 p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 shadow-sm hover:shadow-md hover:bg-white/90 transition-all duration-300 group"
                        onClick={closeMobileMenu}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                            Documentación
                          </h4>
                          <p className="text-sm text-gray-500">Guías y referencias</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                      </Link>
                    </motion.div>

                    {/* Featured CTA Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link href="/demo" className="block" onClick={closeMobileMenu}>
                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                          {/* Background Pattern */}
                          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

                          {/* Floating Elements */}
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="absolute top-2 right-2 w-8 h-8 border border-white/20 rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                            className="absolute bottom-2 left-2 w-6 h-6 bg-white/10 rounded-full blur-sm"
                          />

                          <div className="relative z-10">
                            <div className="flex items-center space-x-3 mb-3">
                              <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30"
                              >
                                <TestTube className="w-6 h-6 text-white" />
                              </motion.div>
                              <div>
                                <h4 className="font-bold text-white text-lg">Probar Modelo</h4>
                                <p className="text-blue-100 text-sm">Experimenta con IA</p>
                              </div>
                            </div>

                            <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                              Sube una imagen y observa cómo nuestra IA restaura arte con precisión excepcional.
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-xs text-green-200 font-medium">Disponible ahora</span>
                              </div>
                              <motion.div whileHover={{ x: 5 }} className="flex items-center space-x-1 text-white">
                                <span className="text-sm font-medium">Comenzar</span>
                                <ArrowRight className="w-4 h-4" />
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white/40 shadow-sm"
                      >
                        <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          95%
                        </div>
                        <div className="text-xs text-gray-600 font-medium">Precisión</div>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white/40 shadow-sm"
                      >
                        <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          2D
                        </div>
                        <div className="text-xs text-gray-600 font-medium">Restauración</div>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white/40 shadow-sm"
                      >
                        <div className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                          IA
                        </div>
                        <div className="text-xs text-gray-600 font-medium">Avanzada</div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="p-6 bg-white/60 backdrop-blur-sm border-t border-gray-200/50 mt-auto">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600 mb-3">
                      Desarrollado con <Heart className="w-4 h-4 text-red-500 inline mx-1" /> por
                    </p>
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      <Users className="w-4 h-4" />
                      <span>Grupo 2</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    <motion.a
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      href="#"
                      className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors"
                    >
                      <Github className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      href="mailto:grupo2@neuromuseo.com"
                      className="w-10 h-10 bg-gray-100 hover:bg-purple-100 rounded-xl flex items-center justify-center transition-colors"
                    >
                      <Mail className="w-5 h-5 text-gray-600 hover:text-purple-600" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      href="#"
                      className="w-10 h-10 bg-gray-100 hover:bg-green-100 rounded-xl flex items-center justify-center transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-gray-600 hover:text-green-600" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  )
}

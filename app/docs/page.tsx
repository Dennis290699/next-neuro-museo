"use client"

import { motion } from "framer-motion"
import { BookOpen, Clock, TrendingUp, Users, Sparkles, ArrowRight, Zap, Search } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAllSections, getRecentArticles, searchArticles, getArticlePath } from "@/lib/docs"

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const sections = getAllSections()
  const recentArticles = getRecentArticles(6)
  const searchResults = searchQuery ? searchArticles(searchQuery) : []

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleNavigation = () => {
    // Scroll suave hacia arriba con un pequeño delay
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, 100)
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100 relative overflow-hidden">
      {/* Animated Background Elements */}
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
          className="absolute top-20 left-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"
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
          className="absolute top-40 right-32 w-24 h-24 bg-purple-400/10 rounded-full blur-xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-white border border-blue-200 rounded-full px-4 py-2 mb-6 shadow-lg">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Documentación Completa
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Centro de Documentación
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Explora guías completas, procesos de entrenamiento, resultados y recursos para dominar{" "}
            <span className="font-semibold text-blue-600">Neuro-Museo</span>
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto mt-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar en la documentación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white border-gray-200 rounded-2xl shadow-lg focus:shadow-xl focus:border-blue-300 transition-all duration-300 text-base"
              />
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Link href="/docs/introduction" className="flex items-center space-x-2" onClick={handleNavigation}>
                <BookOpen className="w-5 h-5" />
                <span>Comenzar</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-3 rounded-full border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 shadow-lg"
            >
              <Link href="/demo" className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Probar Demo</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Search Results */}
        {searchQuery && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Resultados de búsqueda ({searchResults.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={getArticlePath(article.id)}
                      className="block p-4 rounded-xl hover:bg-blue-50 hover:shadow-md transition-all duration-200 group"
                      onClick={handleNavigation}
                    >
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                        {article.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{article.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{article.readTime} min</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {!searchQuery && (
          <>
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16"
            >
              {[
                { icon: BookOpen, label: "Secciones", value: sections.length, color: "from-blue-500 to-blue-600" },
                { icon: TrendingUp, label: "Precisión", value: "95%", color: "from-green-500 to-emerald-600" },
                { icon: Clock, label: "Procesamiento", value: "2.3s", color: "from-purple-500 to-purple-600" },
                { icon: Users, label: "Desarrolladores", value: "Grupo 2", color: "from-orange-500 to-red-500" },
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-4 lg:p-6 text-center">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                        <div className="text-sm lg:text-base text-gray-600 font-medium">{stat.label}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Sections Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12 lg:mb-16"
            >
              <div className="text-center mb-8 lg:mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Explora por Secciones</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Navega a través de nuestras guías organizadas para encontrar exactamente lo que necesitas
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {sections.map((section, index) => {
                  const colors = [
                    "from-blue-500 to-cyan-500",
                    "from-purple-500 to-pink-500",
                    "from-green-500 to-emerald-500",
                    "from-orange-500 to-red-500",
                    "from-indigo-500 to-purple-500",
                  ]
                  return (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group"
                    >
                      <Link href={`/docs/${section.id}`} onClick={handleNavigation}>
                        <Card className="h-full hover:shadow-2xl transition-all duration-500 bg-white border border-gray-200 group-hover:border-blue-300">
                          <CardHeader className="p-6 lg:p-8">
                            <div
                              className={`w-14 h-14 bg-gradient-to-br ${colors[index % colors.length]} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                            >
                              <BookOpen className="w-7 h-7 text-white" />
                            </div>
                            <CardTitle className="text-blue-600 text-xl lg:text-2xl group-hover:text-blue-600 transition-colors duration-300">
                              {section.title}
                            </CardTitle>
                            <CardDescription className="text-base lg:text-lg text-gray-600 leading-relaxed">
                              {section.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-6 lg:p-8 pt-0">
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1">
                                {section.articles.length} artículos
                              </Badge>
                              <div className="flex items-center space-x-1 text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  {section.articles.reduce((acc, article) => acc + article.readTime, 0)} min
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-end mt-4 text-blue-600 group-hover:text-blue-700 transition-colors">
                              <span className="text-sm font-medium mr-2">Explorar</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Recent Articles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center mb-8 lg:mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Artículos Recientes</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Los últimos contenidos y actualizaciones de nuestra documentación
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {recentArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={getArticlePath(article.id)} onClick={handleNavigation}>
                      <Card className="hover:shadow-xl transition-all duration-500 bg-white border border-gray-200 group-hover:border-blue-300">
                        <CardHeader className="p-6 lg:p-8">
                          <div className="flex items-start justify-between mb-4">
                            <CardTitle className="text-blue-600 text-lg lg:text-xl group-hover:text-blue-600 transition-colors duration-300 flex-1 pr-4">
                              {article.title}
                            </CardTitle>
                            <div className="flex items-center space-x-1 text-gray-500 flex-shrink-0">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm font-medium">{article.readTime}m</span>
                            </div>
                          </div>
                          <CardDescription className="text-base text-gray-600 leading-relaxed">
                            {article.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 lg:p-8 pt-0">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap gap-2">
                              {article.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 font-medium">{article.lastUpdated}</span>
                          </div>
                          <div className="flex items-center justify-end mt-4 text-blue-600 group-hover:text-blue-700 transition-colors">
                            <span className="text-sm font-medium mr-2">Leer más</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  BookOpen,
  Users,
  Brain,
  BarChart,
  PlayCircle,
  Download,
} from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ContentRenderer } from "@/components/docs/content-renderers"
import { ArticleNavigation } from "@/components/docs/article-navigation"
import { getSectionById, getArticleById } from "@/lib/docs"

// Mapa de iconos para las secciones
const sectionIconMap = {
  BookOpen: BookOpen,
  Brain: Brain,
  BarChart: BarChart,
  PlayCircle: PlayCircle,
  Download: Download,
}

interface DocPageProps {
  params: {
    slug: string[]
  }
}

export default function DocPage({ params }: DocPageProps) {
  const [sectionId, articleId] = params.slug

  const section = getSectionById(sectionId)
  const article = articleId ? getArticleById(sectionId, articleId) : null

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [sectionId, articleId])

  const handleNavigation = () => {
    // Scroll suave hacia arriba con un pequeño delay
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, 100)
  }

  // Función para obtener el componente de icono correcto
  const getIconComponent = (iconName: string) => {
    const IconComponent = sectionIconMap[iconName as keyof typeof sectionIconMap] || BookOpen
    return IconComponent
  }

  // Ensure params.slug exists and has at least one element
  if (!params.slug || params.slug.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Página no encontrada</h1>
          <p className="text-gray-600 mb-6">La página que buscas no existe.</p>
          <Link href="/docs">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Volver a documentación
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  if (!section) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sección no encontrada</h1>
          <p className="text-gray-600 mb-6">La sección que buscas no existe o ha sido movida.</p>
          <Link href="/docs">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Volver a documentación
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  if (articleId && !article) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
          <p className="text-gray-600 mb-6">El artículo que buscas no existe en esta sección.</p>
          <Link href={`/docs/${sectionId}`}>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Volver a la sección
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  // Obtener el icono correcto para la sección actual
  const SectionIcon = section ? getIconComponent(section.icon) : BookOpen

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100 relative overflow-hidden">
      {/* Animated Background */}
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
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center space-x-2 text-sm text-gray-600 mb-6 lg:mb-8 bg-white rounded-xl p-4 border border-gray-200"
          >
            <Link href="/docs" className="hover:text-blue-600 transition-colors font-medium" onClick={handleNavigation}>
              Documentación
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`/docs/${sectionId}`}
              className="hover:text-blue-600 transition-colors font-medium truncate"
              onClick={handleNavigation}
            >
              {section.title}
            </Link>
            {article && (
              <>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium truncate">{article.title}</span>
              </>
            )}
          </motion.nav>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 lg:mb-8"
          >
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-300"
            >
              <Link href={article ? `/docs/${sectionId}` : "/docs"} onClick={handleNavigation}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Link>
            </Button>
          </motion.div>

          {article ? (
            /* Article View */
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden"
            >
              {/* Article Header */}
              <header className="p-6 lg:p-10 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 border-b border-gray-100">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
                    {article.title}
                  </h1>
                  <p className="text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed font-light">
                    {article.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm text-gray-500 mb-6">
                    <div className="flex items-center space-x-2 bg-white rounded-full px-3 py-2 border border-gray-200">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">Actualizado {article.lastUpdated}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white rounded-full px-3 py-2 border border-gray-200">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{article.readTime} min de lectura</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white hover:bg-gray-50 rounded-full border border-gray-200"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      <span className="font-medium">Compartir</span>
                    </Button>
                  </div>

                  {article.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-600">Tags:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-300"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </header>

              {/* Article Content */}
              <div className="p-6 lg:p-10">
                <ContentRenderer content={article.content} />
              </div>

              {/* Article Navigation */}
              <div className="p-6 lg:p-10 pt-0">
                <ArticleNavigation sectionId={sectionId} currentArticleId={article.id} />
              </div>
            </motion.article>
          ) : (
            /* Section Overview */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden mb-8">
                <div className="p-6 lg:p-10 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 border-b border-gray-100">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                        <SectionIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{section.title}</h1>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span className="text-sm font-medium">{section.articles.length} artículos disponibles</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-light">{section.description}</p>
                  </motion.div>
                </div>

                <div className="p-6 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {section.articles.map((article, index) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group"
                      >
                        <Link href={`/docs/${sectionId}/${article.id}`} onClick={handleNavigation}>
                          <div className="p-6 lg:p-8 bg-white rounded-2xl border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-500">
                            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                              {article.title}
                            </h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">{article.description}</p>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex items-center space-x-2 text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm font-medium">{article.readTime} min</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {article.tags.slice(0, 2).map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="bg-blue-50 border-blue-200 text-blue-700"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

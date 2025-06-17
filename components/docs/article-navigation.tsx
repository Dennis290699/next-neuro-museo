"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getNextArticle, getPreviousArticle } from "@/lib/docs"

interface ArticleNavigationProps {
  sectionId: string
  currentArticleId: string
}

export function ArticleNavigation({ sectionId, currentArticleId }: ArticleNavigationProps) {
  const nextItem = getNextArticle(sectionId, currentArticleId)
  const prevItem = getPreviousArticle(sectionId, currentArticleId)

  if (!nextItem && !prevItem) return null

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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-16 pt-8 border-t border-gray-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Artículo Anterior */}
        {prevItem && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link href={`/docs/${prevItem.section.id}/${prevItem.article.id}`} onClick={handleNavigation}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
                        <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-500 mb-1">Anterior</p>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {prevItem.article.title}
                      </h3>
                      {prevItem.section.id !== sectionId && (
                        <Badge variant="outline" className="mt-2 bg-purple-50 border-purple-200 text-purple-700">
                          {prevItem.section.title}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        )}

        {/* Artículo Siguiente */}
        {nextItem && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={!prevItem ? "md:col-start-2" : ""}
          >
            <Link href={`/docs/${nextItem.section.id}/${nextItem.article.id}`} onClick={handleNavigation}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1 min-w-0 text-right">
                      <p className="text-sm font-medium text-gray-500 mb-1">Siguiente</p>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {nextItem.article.title}
                      </h3>
                      {nextItem.section.id !== sectionId && (
                        <div className="flex justify-end mt-2">
                          <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                            {nextItem.section.title}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
                        <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Navegación rápida a la sección */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 text-center"
      >
        <Link href={`/docs/${sectionId}`}>
          <Button
            variant="outline"
            size="sm"
            className="bg-white border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all duration-300"
            onClick={handleNavigation}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Ver todos los artículos de esta sección
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}

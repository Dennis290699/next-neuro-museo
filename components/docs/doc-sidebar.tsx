"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Brain,
  BarChart,
  PlayCircle,
  Download,
  Search,
  ChevronRight,
  Clock,
  Menu,
  X,
  Sparkles,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { getAllSections, searchArticles } from "@/lib/docs"

// Mapa de iconos para las secciones
const sectionIconMap = {
  BookOpen: BookOpen,
  Brain: Brain,
  BarChart: BarChart,
  PlayCircle: PlayCircle,
  Download: Download,
}

interface DocSidebarProps {
  currentSection?: string
  currentArticle?: string
}

function SidebarContent({
  currentSection,
  currentArticle,
  onLinkClick,
}: DocSidebarProps & { onLinkClick?: () => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedSections, setExpandedSections] = useState<string[]>([currentSection || ""])

  const sections = getAllSections()
  const searchResults = searchQuery ? searchArticles(searchQuery) : []

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const handleLinkClick = () => {
    // Scroll suave hacia arriba con un pequeño delay
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, 100)

    // Llamar al callback si existe (para cerrar el sidebar móvil)
    if (onLinkClick) {
      onLinkClick()
    }
  }

  // Función para obtener el componente de icono correcto
  const getIconComponent = (iconName: string) => {
    const IconComponent = sectionIconMap[iconName as keyof typeof sectionIconMap] || BookOpen
    return IconComponent
  }

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-slate-50 to-white">
      <div className="p-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Documentación
              </h2>
              <p className="text-sm text-gray-500">Guías y referencias</p>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative mb-8"
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <Input
              placeholder="Buscar documentación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-xl shadow-sm focus:shadow-md focus:border-blue-300 transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* Search Results */}
        <AnimatePresence>
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                  Resultados ({searchResults.length})
                </h3>
                <div className="space-y-2">
                  {searchResults.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={`/docs/${article.id}`}
                        className="block p-3 rounded-lg hover:bg-blue-50/80 transition-all duration-200 group"
                        onClick={handleLinkClick}
                      >
                        <h4 className="font-medium text-gray-900 text-sm group-hover:text-blue-700 transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{article.description}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{article.readTime} min</span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {!searchQuery && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            {sections.map((section, sectionIndex) => {
              // Obtener el icono correcto para esta sección
              const IconComponent = getIconComponent(section.icon)

              const isExpanded = expandedSections.includes(section.id)
              const isCurrentSection = currentSection === section.id

              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                >
                  <motion.button
                    onClick={() => toggleSection(section.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                      isCurrentSection
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 shadow-sm"
                        : "hover:bg-white/80 hover:shadow-sm border border-transparent"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isCurrentSection
                            ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg"
                            : "bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-600"
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 transition-colors duration-300 ${
                            isCurrentSection ? "text-white" : "text-gray-600 group-hover:text-white"
                          }`}
                        />
                      </div>
                      <div className="text-left min-w-0">
                        <h3
                          className={`font-semibold text-sm transition-colors duration-300 ${
                            isCurrentSection ? "text-blue-700" : "text-gray-900 group-hover:text-gray-900"
                          }`}
                        >
                          {section.title}
                        </h3>
                        <p className="text-xs text-gray-500">{section.articles.length} artículos</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex-shrink-0"
                    >
                      <ChevronRight
                        className={`w-4 h-4 transition-colors duration-300 ${
                          isCurrentSection ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                        }`}
                      />
                    </motion.div>
                  </motion.button>

                  {/* Articles */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="ml-6 mt-3 space-y-2">
                          {section.articles.map((article, articleIndex) => (
                            <motion.div
                              key={article.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: articleIndex * 0.05 }}
                            >
                              <Link
                                href={`/docs/${section.id}/${article.id}`}
                                className={`block p-3 rounded-lg transition-all duration-200 group ${
                                  currentArticle === article.id
                                    ? "bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 shadow-sm"
                                    : "hover:bg-white/60 hover:shadow-sm"
                                }`}
                                onClick={handleLinkClick}
                              >
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`text-sm font-medium transition-colors duration-200 ${
                                      currentArticle === article.id
                                        ? "text-blue-700"
                                        : "text-gray-700 group-hover:text-gray-900"
                                    }`}
                                  >
                                    {article.title}
                                  </span>
                                  <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                                    <Clock className="w-3 h-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{article.readTime}m</span>
                                  </div>
                                </div>
                                {article.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {article.tags.slice(0, 2).map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="text-xs px-2 py-0.5 bg-gray-100/80"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.nav>
        )}
      </div>
    </div>
  )
}

export function DocSidebar({ currentSection, currentArticle }: DocSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 h-screen sticky top-20 border-r border-gray-200/50 shadow-sm">
        <SidebarContent currentSection={currentSection} currentArticle={currentArticle} />
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-24 left-4 z-50">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/90 backdrop-blur-md border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
              >
                <Menu className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Menú</span>
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent side="left" className="w-[340px] sm:w-[400px] p-0 border-0">
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Navegación</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <SidebarContent
              currentSection={currentSection}
              currentArticle={currentArticle}
              onLinkClick={() => setIsMobileMenuOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

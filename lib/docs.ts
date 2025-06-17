import { docsData, type DocSection, type DocArticle } from "@/data/docs"

export function getAllSections(): DocSection[] {
  return docsData.sort((a, b) => a.order - b.order)
}

export function getSectionById(id: string): DocSection | undefined {
  return docsData.find((section) => section.id === id)
}

export function getArticleById(sectionId: string, articleId: string): DocArticle | undefined {
  const section = getSectionById(sectionId)
  return section?.articles.find((article) => article.id === articleId)
}

export function getAllArticles(): DocArticle[] {
  return docsData.flatMap((section) => section.articles)
}

export function findSectionByArticleId(articleId: string): DocSection | undefined {
  return docsData.find((section) => section.articles.some((article) => article.id === articleId))
}

export function getArticlePath(articleId: string): string {
  const section = findSectionByArticleId(articleId)
  if (!section) return `/docs`
  return `/docs/${section.id}/${articleId}`
}

// Nuevas funciones para navegación direccional
export function getNextArticle(
  sectionId: string,
  currentArticleId: string,
): { article: DocArticle; section: DocSection } | null {
  const section = getSectionById(sectionId)
  if (!section) return null

  const currentIndex = section.articles.findIndex((article) => article.id === currentArticleId)
  if (currentIndex === -1) return null

  // Si hay un siguiente artículo en la misma sección
  if (currentIndex < section.articles.length - 1) {
    return {
      article: section.articles[currentIndex + 1],
      section: section,
    }
  }

  // Si no hay más artículos en esta sección, buscar la siguiente sección
  const sections = getAllSections()
  const sectionIndex = sections.findIndex((s) => s.id === sectionId)
  if (sectionIndex < sections.length - 1) {
    const nextSection = sections[sectionIndex + 1]
    if (nextSection.articles.length > 0) {
      return {
        article: nextSection.articles[0],
        section: nextSection,
      }
    }
  }

  return null
}

export function getPreviousArticle(
  sectionId: string,
  currentArticleId: string,
): { article: DocArticle; section: DocSection } | null {
  const section = getSectionById(sectionId)
  if (!section) return null

  const currentIndex = section.articles.findIndex((article) => article.id === currentArticleId)
  if (currentIndex === -1) return null

  // Si hay un artículo anterior en la misma sección
  if (currentIndex > 0) {
    return {
      article: section.articles[currentIndex - 1],
      section: section,
    }
  }

  // Si no hay más artículos anteriores en esta sección, buscar la sección anterior
  const sections = getAllSections()
  const sectionIndex = sections.findIndex((s) => s.id === sectionId)
  if (sectionIndex > 0) {
    const prevSection = sections[sectionIndex - 1]
    if (prevSection.articles.length > 0) {
      return {
        article: prevSection.articles[prevSection.articles.length - 1],
        section: prevSection,
      }
    }
  }

  return null
}

export function searchArticles(query: string): DocArticle[] {
  const lowercaseQuery = query.toLowerCase()
  return getAllArticles().filter(
    (article) =>
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.description.toLowerCase().includes(lowercaseQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}

export function getRecentArticles(limit = 5): DocArticle[] {
  return getAllArticles()
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, limit)
}

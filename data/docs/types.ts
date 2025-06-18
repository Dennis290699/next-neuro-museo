export interface DocSection {
  id: string
  title: string
  description: string
  icon: string
  order: number
  articles: DocArticle[]
}

export interface DocArticle {
  id: string
  title: string
  description: string
  content: DocContent[]
  tags: string[]
  lastUpdated: string
  readTime: number
}

export interface DocContent {
  type: "text" | "code" | "image" | "download" | "result" | "guide"
  data: any
}

// Tipos específicos para cada tipo de contenido
export interface TextContent {
  content: string
}

export interface CodeContent {
  language: string
  title: string
  code: string
  explanation?: string
}

export interface ImageContent {
  src: string
  alt: string
  caption?: string
}

export interface DownloadContent {
  title: string
  files: Array<{
    name: string
    description: string
    size: string
    format: string
    url: string
  }>
}

export interface ResultContent {
  title: string
  metrics: Array<{
    label: string
    value: string
  }>
}

export interface GuideContent {
  title: string
  steps: Array<{
    title: string
    description: string
    icon: string
  }>
}

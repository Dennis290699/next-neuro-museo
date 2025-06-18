import type { DocSection } from "./types"
import { introductionSection } from "./sections/introduction"
import { trainingSection } from "./sections/training"
import { resultsSection } from "./sections/results"
import { demoGuideSection } from "./sections/demo-guide"
import { downloadsSection } from "./sections/downloads"

export const docsData: DocSection[] = [
  introductionSection,
  trainingSection,
  resultsSection,
  demoGuideSection,
  downloadsSection,
]

// Re-exportar tipos para facilitar el uso
export type { DocSection, DocArticle, DocContent } from "./types"

import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface AppState {
  // Navigation state
  currentSection: string
  setCurrentSection: (section: string) => void

  // Demo state
  isModelLoading: boolean
  setModelLoading: (loading: boolean) => void

  // Processing state
  processingProgress: number
  setProcessingProgress: (progress: number) => void

  // UI state
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void

  // Theme state
  theme: "light" | "dark"
  setTheme: (theme: "light" | "dark") => void

  // Model state
  modelLoaded: boolean
  setModelLoaded: (loaded: boolean) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      // Navigation state
      currentSection: "home",
      setCurrentSection: (section) => set({ currentSection: section }),

      // Demo state
      isModelLoading: false,
      setModelLoading: (loading) => set({ isModelLoading: loading }),

      // Processing state
      processingProgress: 0,
      setProcessingProgress: (progress) => set({ processingProgress: progress }),

      // UI state
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

      // Theme state
      theme: "light",
      setTheme: (theme) => set({ theme }),

      // Model state
      modelLoaded: false,
      setModelLoaded: (loaded) => set({ modelLoaded: loaded }),
    }),
    {
      name: "neuro-museo-store",
    },
  ),
)

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ImageGalleryProps {
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (index: number) => {
    setSelectedImage(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    // Pequeño delay para que la animación se complete antes de resetear el índice
    setTimeout(() => {
      setSelectedImage(null)
    }, 150)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    }
  }

  // Manejar teclas del teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isModalOpen) return

      if (event.key === "Escape") {
        closeModal()
      }
      if (event.key === "ArrowLeft" && images.length > 1) {
        prevImage()
      }
      if (event.key === "ArrowRight" && images.length > 1) {
        nextImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen, selectedImage, images.length])

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isModalOpen])

  if (images.length === 1) {
    // Imagen única
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white border border-gray-200">
          <img
            src={images[0].src || "/placeholder.svg"}
            alt={images[0].alt}
            className="w-full h-auto max-w-full object-contain"
            style={{ maxHeight: "500px" }}
          />
        </div>
        {images[0].caption && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 text-center font-medium">{images[0].caption}</p>
          </div>
        )}

        {/* Modal para imagen única */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent
            className="max-w-4xl w-full p-0 bg-transparent border-0 shadow-none"
            onPointerDownOutside={closeModal}
            onEscapeKeyDown={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <img
                src={images[0].src || "/placeholder.svg"}
                alt={images[0].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full z-50"
                onClick={(e) => {
                  e.stopPropagation()
                  closeModal()
                }}
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Caption */}
              {images[0].caption && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
                  <p className="text-center">{images[0].caption}</p>
                </div>
              )}
            </motion.div>
          </DialogContent>
        </Dialog>
      </motion.div>
    )
  }

  // Galería múltiple
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative"
            onClick={() => openModal(index)}
          >
            <div className="relative overflow-hidden rounded-xl shadow-md bg-white border border-gray-200">
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-auto max-w-full object-contain"
                style={{ maxHeight: "300px" }}
              />
            </div>
            {image.caption && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 text-center font-medium">{image.caption}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Modal para galería */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="max-w-5xl w-full p-0 bg-transparent border-0 shadow-none"
          onPointerDownOutside={closeModal}
          onEscapeKeyDown={closeModal}
        >
          <AnimatePresence mode="wait">
            {selectedImage !== null && (
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[selectedImage].src || "/placeholder.svg"}
                  alt={images[selectedImage].alt}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />

                {/* Controles */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full z-50"
                  onClick={(e) => {
                    e.stopPropagation()
                    closeModal()
                  }}
                >
                  <X className="w-5 h-5" />
                </Button>

                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full z-50"
                      onClick={(e) => {
                        e.stopPropagation()
                        prevImage()
                      }}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full z-50"
                      onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>

                    {/* Indicador de posición */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-40">
                      {selectedImage + 1} / {images.length}
                    </div>
                  </>
                )}

                {/* Caption */}
                {images[selectedImage].caption && (
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg z-40">
                    <p className="text-center">{images[selectedImage].caption}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Building, Check, Search } from "lucide-react"
import { useState, useMemo } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface FacultySelectorProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  delay?: number
}

const FACULTADES = [
  "Facultad de Artes",
  "Facultad de Arquitectura y Urbanismo",
  "Ciencias",
  "Ciencias Administrativas",
  "Ciencias Agrícolas",
  "Ciencias Biológicas",
  "Ciencias de la Discapacidad, atención prehospitalaria",
  "Ciencias Económicas",
  "Ciencias Medicas",
  "Ciencias Psicologicas",
  "Ciencias Químicas",
  "Ciencias Sociales y Humanas",
  "Comunicacion Social",
  "Cultura Fisica",
  "Ingenieria y Ciencias Aplicadas",
  "Filosofia, Letras y Ciencias de la Educacion",
  "Ingenieria en Geologia, Minas, Petroleo y Ambiental",
  "Ingenieria Quimica",
  "Jurisprudencia, Ciencias Politicas y Sociales",
  "Medicina Veterinaria y Zootecnia",
  "Odontologia",
]

export function FacultySelector({ value, onChange, disabled = false, delay = 0 }: FacultySelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  // Filtrar facultades basado en la búsqueda
  const filteredFacultades = useMemo(() => {
    if (!searchTerm) return FACULTADES
    return FACULTADES.filter((facultad) => facultad.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setSearchTerm("")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="space-y-3"
    >
      <Label htmlFor="faculty" className="text-base font-semibold text-gray-700 flex items-center">
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
          <Building className="w-4 h-4 text-white" />
        </div>
        Facultad
      </Label>

      <Select value={value} onValueChange={onChange} disabled={disabled} onOpenChange={handleOpenChange}>
        <SelectTrigger className="h-14 text-base bg-white border-gray-200 focus:border-green-400 focus:ring-green-400/20 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-3 flex-1">
            <SelectValue placeholder="Selecciona tu facultad" />
          </div>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            {/* <ChevronDown className="h-4 w-4 opacity-50" /> */}
          </motion.div>
        </SelectTrigger>

        <SelectContent
          className="max-h-80 bg-white border border-gray-200 shadow-2xl rounded-xl overflow-hidden"
          position="popper"
          sideOffset={4}
        >
          {/* Barra de búsqueda fija */}
          <div className="sticky top-0 z-20 bg-white border-b border-gray-100 p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar facultad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 text-sm border-gray-200 focus:border-green-400 focus:ring-green-400/20"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Lista de facultades con scroll optimizado */}
          <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
            {filteredFacultades.length > 0 ? (
              filteredFacultades.map((facultad, index) => (
                <SelectItem
                  key={facultad}
                  value={facultad}
                  className="text-sm py-4 px-4 hover:bg-green-50 focus:bg-green-50 cursor-pointer transition-colors duration-200 border-b border-gray-50 last:border-b-0"
                >
                  <div className="flex items-center justify-between w-full pr-6">
                    <span className="text-gray-900 leading-relaxed">{facultad}</span>
                    {value === facultad && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="ml-2 flex-shrink-0"
                      >
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </SelectItem>
              ))
            ) : (
              <div className="py-8 px-4 text-center text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No se encontraron facultades</p>
                <p className="text-xs text-gray-400 mt-1">Intenta con otro término de búsqueda</p>
              </div>
            )}
          </div>
        </SelectContent>
      </Select>

      {/* Contador de resultados */}
      {searchTerm && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-gray-500 flex items-center"
        >
          <Search className="w-3 h-3 mr-1" />
          {filteredFacultades.length} facultad{filteredFacultades.length !== 1 ? "es" : ""} encontrada
          {filteredFacultades.length !== 1 ? "s" : ""}
        </motion.p>
      )}
    </motion.div>
  )
}

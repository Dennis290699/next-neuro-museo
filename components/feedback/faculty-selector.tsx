"use client"

import { motion } from "framer-motion"
import { Building, ChevronDown, Check } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="h-14 text-base bg-white border-gray-200 focus:border-green-400 focus:ring-green-400/20 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-3">
            <SelectValue placeholder="Selecciona tu facultad" />
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectTrigger>
        <SelectContent className="max-h-60 bg-white border border-gray-200 shadow-xl rounded-xl">
          {FACULTADES.map((facultad) => (
            <SelectItem
              key={facultad}
              value={facultad}
              className="text-sm py-3 px-4 hover:bg-green-50 focus:bg-green-50 cursor-pointer transition-colors duration-200"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-gray-900">{facultad}</span>
                {value === facultad && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-2">
                    <Check className="h-4 w-4 text-green-600" />
                  </motion.div>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  )
}

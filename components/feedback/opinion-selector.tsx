"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Star, TrendingUp, Crown, CheckCircle, Award } from "lucide-react"
import { Label } from "@/components/ui/label"

type OpinionType = "Regular" | "Bueno" | "Excelente"

interface OpinionSelectorProps {
  value: OpinionType | ""
  onChange: (value: OpinionType) => void
  disabled?: boolean
  delay?: number
}

const getOpinionConfig = (opinion: string) => {
  switch (opinion) {
    case "Regular":
      return {
        icon: Star,
        color: "from-orange-500 to-red-500",
        bgColor: "from-orange-50 to-red-50",
        borderColor: "border-orange-300",
        description: "Necesita mejoras",
        rating: "⭐⭐⭐",
      }
    case "Bueno":
      return {
        icon: TrendingUp,
        color: "from-blue-500 to-purple-500",
        bgColor: "from-blue-50 to-purple-50",
        borderColor: "border-blue-300",
        description: "Cumple expectativas",
        rating: "⭐⭐⭐⭐",
      }
    case "Excelente":
      return {
        icon: Crown,
        color: "from-green-500 to-emerald-500",
        bgColor: "from-green-50 to-emerald-50",
        borderColor: "border-green-300",
        description: "Supera expectativas",
        rating: "⭐⭐⭐⭐⭐",
      }
    default:
      return {
        icon: Star,
        color: "from-gray-400 to-gray-500",
        bgColor: "from-gray-50 to-gray-100",
        borderColor: "border-gray-300",
        description: "Selecciona una opción",
        rating: "⭐⭐⭐⭐⭐",
      }
  }
}

export function OpinionSelector({ value, onChange, disabled = false, delay = 0 }: OpinionSelectorProps) {
  const options: OpinionType[] = ["Regular", "Bueno", "Excelente"]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="space-y-4"
    >
      <Label className="text-base font-semibold text-gray-700 flex items-center">
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
          <Award className="w-4 h-4 text-white" />
        </div>
        ¿Qué opinas del trabajo?
      </Label>

      <div className="grid grid-cols-1 gap-4">
        {options.map((option) => {
          const config = getOpinionConfig(option)
          const Icon = config.icon
          const isSelected = value === option

          return (
            <motion.button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={disabled}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
                isSelected
                  ? `bg-gradient-to-r ${config.bgColor} ${config.borderColor} shadow-xl`
                  : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg"
              }`}
            >
              <div className="flex items-center space-x-4">
                {/* Icon */}
                <motion.div
                  animate={isSelected ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 0.6 }}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isSelected ? `bg-gradient-to-br ${config.color}` : "bg-gray-100 group-hover:bg-gray-200"
                  }`}
                >
                  <Icon className={`w-7 h-7 ${isSelected ? "text-white" : "text-gray-600"}`} />
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <h3
                    className={`text-xl font-bold mb-1 transition-colors duration-300 ${
                      isSelected ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900"
                    }`}
                  >
                    {option}
                  </h3>
                  <p
                    className={`text-sm transition-colors duration-300 ${
                      isSelected ? "text-gray-700" : "text-gray-500"
                    }`}
                  >
                    {config.description}
                  </p>
                  <div className="mt-2 text-lg">{config.rating}</div>
                </div>

                {/* Selection indicator */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

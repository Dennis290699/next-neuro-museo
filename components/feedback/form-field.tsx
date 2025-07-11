"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { LucideIcon } from "lucide-react"

interface FormFieldProps {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  icon: LucideIcon
  iconColor: string
  delay?: number
  disabled?: boolean
  type?: string
}

export function FormField({
  id,
  label,
  placeholder,
  value,
  onChange,
  icon: Icon,
  iconColor,
  delay = 0,
  disabled = false,
  type = "text",
}: FormFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="space-y-3"
    >
      <Label htmlFor={id} className="text-base font-semibold text-gray-700 flex items-center">
        <div
          className={`w-8 h-8 bg-gradient-to-br ${iconColor} rounded-xl flex items-center justify-center mr-3 shadow-lg`}
        >
          <Icon className="w-4 h-4 text-white" />
        </div>
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-14 text-base bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm hover:shadow-md transition-all duration-300"
        disabled={disabled}
      />
    </motion.div>
  )
}

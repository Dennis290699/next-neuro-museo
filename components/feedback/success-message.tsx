"use client"

import { motion } from "framer-motion"
import { CheckCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
    >
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
            className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            ¡Gracias por tu opinión!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-600 mb-8 leading-relaxed"
          >
            Tu opinión es muy valiosa para nosotros y nos ayuda a mejorar{" "}
            <span className="font-semibold text-blue-600">Neuro-Museo</span>.
            <br />
            ¡Esperamos que hayas disfrutado la experiencia!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <Link href="/feedback">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.reload()}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Nuevo Formulario
              </Button>
            </Link>

            <div className="text-sm text-gray-500">
              <p>¿Quieres probar otra imagen? ¡Regresa cuando quieras!</p>
            </div>
          </motion.div>

          {/* Confetti Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, x: Math.random() * 400, rotate: 0 }}
                animate={{
                  y: 600,
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 2,
                  ease: "easeOut",
                }}
                className="absolute w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

import type { DocSection } from "../types"

export const resultsSection: DocSection = {
  id: "results",
  title: "Resultados y Métricas",
  description: "Evaluación del rendimiento del modelo",
  icon: "BarChart",
  order: 3,
  articles: [
    {
      id: "performance-metrics",
      title: "Métricas de Rendimiento",
      description: "Evaluación cuantitativa del modelo",
      tags: ["métricas", "evaluación"],
      lastUpdated: "2024-01-15",
      readTime: 6,
      content: [
        {
          type: "text",
          data: {
            content: `La evaluación del modelo Neuro-Museo se realizó utilizando múltiples métricas estándar en el campo de restauración de imágenes, así como métricas específicas desarrolladas para arte histórico.

Los resultados demuestran un rendimiento excepcional en todas las categorías evaluadas, superando significativamente a los métodos tradicionales de restauración digital.`,
          },
        },
        {
          type: "result",
          data: {
            title: "Métricas de Evaluación",
            metrics: [
              { label: "PSNR (Peak Signal-to-Noise Ratio)", value: "28.5 dB" },
              { label: "SSIM (Structural Similarity)", value: "0.892" },
              { label: "LPIPS (Learned Perceptual Image Patch Similarity)", value: "0.124" },
              { label: "Precisión de detección", value: "94.7%" },
              { label: "Tiempo de procesamiento promedio", value: "2.3 segundos" },
              { label: "FID (Fréchet Inception Distance)", value: "15.2" },
            ],
          },
        },
        {
          type: "image",
          data: {
            src: "/placeholder.svg?height=400&width=600",
            alt: "Gráfico de métricas de entrenamiento",
            caption: "Evolución de las métricas durante el entrenamiento",
          },
        },
        {
          type: "text",
          data: {
            content: `### Análisis Detallado de Métricas

**PSNR (28.5 dB)**: Indica una excelente relación señal-ruido, superando el umbral de 25 dB considerado como alta calidad.

**SSIM (0.892)**: Demuestra que el modelo preserva efectivamente la estructura original de las obras de arte.

**LPIPS (0.124)**: Confirma que las restauraciones son perceptualmente similares a las referencias humanas.

**Precisión de Detección (94.7%)**: El sistema identifica correctamente objetos artísticos en casi 95% de los casos.

**Tiempo de Procesamiento (2.3s)**: Permite aplicaciones en tiempo real para imágenes de resolución estándar.`,
          },
        },
      ],
    },
    {
      id: "comparative-analysis",
      title: "Análisis Comparativo",
      description: "Comparación con otros métodos de restauración",
      tags: ["comparación", "benchmarks"],
      lastUpdated: "2024-01-15",
      readTime: 8,
      content: [
        {
          type: "text",
          data: {
            content: `Hemos comparado Neuro-Museo con los principales métodos de restauración digital disponibles, incluyendo técnicas tradicionales y enfoques basados en IA.`,
          },
        },
        {
          type: "result",
          data: {
            title: "Comparación de Métodos",
            metrics: [
              { label: "Neuro-Museo (Nuestro)", value: "28.5 dB PSNR" },
              { label: "DeOldify", value: "24.2 dB PSNR" },
              { label: "ESRGAN", value: "26.1 dB PSNR" },
              { label: "Photoshop AI", value: "25.8 dB PSNR" },
              { label: "Métodos Tradicionales", value: "22.3 dB PSNR" },
              { label: "Restauración Manual", value: "30.1 dB PSNR" },
            ],
          },
        },
        {
          type: "text",
          data: {
            content: `### Ventajas Competitivas

**1. Especialización en Arte**: A diferencia de modelos generales, Neuro-Museo está específicamente entrenado para arte histórico.

**2. Preservación Contextual**: Mantiene la coherencia histórica y estilística de cada período artístico.

**3. Velocidad de Procesamiento**: Significativamente más rápido que la restauración manual tradicional.

**4. Consistencia**: Produce resultados reproducibles, eliminando la variabilidad humana.

**5. Escalabilidad**: Puede procesar grandes colecciones de manera eficiente.`,
          },
        },
      ],
    },
    {
      id: "case-studies",
      title: "Casos de Estudio",
      description: "Ejemplos reales de restauración exitosa",
      tags: ["casos", "ejemplos", "resultados"],
      lastUpdated: "2024-01-15",
      readTime: 10,
      content: [
        {
          type: "text",
          data: {
            content: `Presentamos varios casos de estudio que demuestran la efectividad de Neuro-Museo en diferentes tipos de arte y condiciones de daño.`,
          },
        },
        {
          type: "image",
          data: [
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "Restauración de pintura renacentista",
              caption: "Antes: Pintura renacentista con daños por humedad",
            },
            {
              src: "/placeholder.svg?height=300&width=400",
              alt: "Resultado de restauración",
              caption: "Después: Restauración completa con Neuro-Museo",
            },
          ],
        },
        {
          type: "text",
          data: {
            content: `### Caso 1: Pintura Renacentista

**Problema**: Obra del siglo XVI con daños extensos por humedad y decoloración.

**Proceso**: 
- Detección automática de áreas dañadas
- Análisis del estilo pictórico original
- Reconstrucción basada en patrones similares del período
- Validación con referencias históricas

**Resultado**: Restauración completa en 3.2 segundos con 96% de precisión según expertos.

### Caso 2: Fresco Medieval

**Problema**: Fresco del siglo XIII con pérdida significativa de pigmento.

**Proceso**:
- Identificación de técnicas de fresco medievales
- Reconstrucción de patrones geométricos
- Restauración de colores basada en análisis espectral
- Preservación de texturas originales

**Resultado**: Recuperación del 89% del contenido visual original.`,
          },
        },
      ],
    },
  ],
}

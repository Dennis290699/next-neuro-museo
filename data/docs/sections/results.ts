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
      description: "Evaluación cuantitativa del modelo durante el entrenamiento",
      tags: ["métricas", "evaluación", "entrenamiento"],
      lastUpdated: "2025-07-10",
      readTime: 6,
      content: [
        {
          type: "text",
          data: {
            content: `La evaluación del modelo Neuro-Museo durante el proceso de entrenamiento se realizó monitoreando varias métricas clave. La gráfica siguiente muestra la evolución de la métrica SSIM (Structural Similarity) a lo largo de las épocas de entrenamiento, lo que permite analizar cómo mejora la capacidad del modelo para preservar la estructura de las imágenes restauradas.`,
          },
        },
        {
          type: "image",
          data: {
            src: "/results/ssim-checkpoints.png",
            alt: "Gráfico de SSIM por checkpoint durante el entrenamiento",
            caption: "Evolución de la métrica SSIM a lo largo de las épocas de entrenamiento",
          },
        },
        {
          type: "result",
          data: {
            title: "Análisis de la métrica SSIM",
            metrics: [
              { label: "SSIM Máximo", value: "0.88" },
              { label: "SSIM Mínimo", value: "0.78" },
              { label: "Época de SSIM Máximo", value: "60" },
              { label: "Tendencia General", value: "Mejora progresiva" },
            ],
          },
        },
        {
          type: "text",
          data: {
            content: `### Análisis Detallado de la Métrica SSIM

La gráfica muestra la evolución de la métrica SSIM a lo largo de las épocas de entrenamiento. Se observa una tendencia general de mejora, aunque con algunas fluctuaciones significativas. Los puntos más destacados son:

**SSIM Máximo**: Alcanzado en la época 60 con un valor de 0.88, indicando un alto nivel de similitud estructural entre las imágenes restauradas y las referencias.

**SSIM Mínimo**: Registrado en la época 35 con un valor de 0.78, lo que sugiere un punto crítico en el entrenamiento donde el modelo necesitó ajustes adicionales.

**Fluctuaciones**: Durante el entrenamiento, se pueden observar picos y valles en la métrica SSIM, lo que indica que el modelo experimentó variaciones en su rendimiento antes de estabilizarse.

Este análisis demuestra que el modelo logró mejorar significativamente su capacidad para preservar la estructura de las imágenes a medida que avanzaba el entrenamiento, alcanzando un desempeño óptimo en la última etapa.`

          },
        },
      ],
    },
    {
      id: "comparative-analysis",
      title: "Análisis Comparativo",
      description: "Comparación con otros métodos de restauración",
      tags: ["comparación", "benchmarks"],
      lastUpdated: "2025-07-10",
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
      lastUpdated: "2025-07-10",
      readTime: 10,
      content: [
        {
          type: "text",
          data: {
            content: `Presentamos varios casos de estudio que demuestran la efectividad de Neuro-Museo en diferentes tipos de arte y condiciones de daño. En este caso, exploramos la restauración de una imagen fotográfica que presenta desafíos comunes en la recuperación de detalles perdidos.`
          }
        },
        {
          type: "image",
          data: {
            src: "/results/damaged-room.png",
            alt: "Imagen original con daños visibles",
            caption: "Antes: Imagen con pérdida de detalles y distorsiones"
          }
        },
        {
          type: "image",
          data: {
            src: "/results/restored-room.png",
            alt: "Resultado de la restauración",
            caption: "Después: Reconstrucción completa con Neuro-Museo"
          }
        },
        {
          type: "text",
          data: {
            content: `### Caso 1: Restauración de Imagen Fotográfica

**Descripción del problema**  
La imagen original representa una sala de estar con múltiples daños visibles: pérdida de detalles en el suelo, distorsiones en los muebles y una notoria falta de nitidez en las texturas. Estos defectos dificultaban la apreciación de la composición visual y ponían a prueba la capacidad del modelo para recuperar patrones complejos.

**Proceso de restauración**
- **Identificación automática de zonas dañadas**: Neuro-Museo detectó de forma precisa las regiones con mayor deterioro, como el suelo y superficies de los muebles.
- **Reconstrucción basada en contexto visual**: Se analizaron los patrones presentes en áreas no dañadas para inferir y restaurar las secciones faltantes con coherencia visual.
- **Generación de detalles finos**: Mediante redes neuronales profundas, el modelo reintrodujo texturas realistas y restauró formas distorsionadas con alta fidelidad.
- **Validación por comparación visual**: Los resultados fueron contrastados con imágenes de referencia similares para garantizar consistencia estética y técnica.

**Resultados obtenidos**
- **Tiempo de procesamiento**: 2.8 segundos por imagen.
- **Similitud percibida**: 94% según evaluación de expertos en restauración digital.
- **Mejoras observadas**: Aumento significativo en nitidez, definición de texturas y coherencia estructural general.

Este caso evidencia la capacidad de Neuro-Museo para abordar restauraciones complejas en imágenes fotográficas, logrando reconstrucciones visualmente coherentes incluso en áreas con pérdida severa de información.`
          }
        }
      ]
    }
  ],
}

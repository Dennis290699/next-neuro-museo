import type { DocSection } from "../types"

export const introductionSection: DocSection = {
  id: "introduction",
  title: "Introducción",
  description: "Conceptos básicos y arquitectura del modelo",
  icon: "BookOpen",
  order: 1,
  articles: [
    {
      id: "what-is-neuro-museo",
      title: "¿Qué es Neuro-Museo?",
      description: "Introducción al proyecto y sus objetivos",
      tags: ["introducción", "concepto"],
      lastUpdated: "2024-01-15",
      readTime: 5,
      content: [
        {
          type: "text",
          data: {
            content: `Neuro-Museo es un proyecto revolucionario que utiliza inteligencia artificial avanzada para la restauración digital de arte histórico. Nuestro modelo ha sido entrenado específicamente para detectar, analizar y reconstruir objetos artísticos con una precisión excepcional.

El proyecto surge de la necesidad de preservar el patrimonio cultural mundial mediante tecnologías de vanguardia, democratizando el acceso a herramientas de restauración digital que tradicionalmente requerían años de experiencia y recursos especializados.

La innovación principal de Neuro-Museo radica en su capacidad para comprender no solo los aspectos técnicos de una obra de arte, sino también su contexto histórico y cultural, permitiendo restauraciones que respetan la intención original del artista.

## Tecnologías Integradas

El sistema integra múltiples tecnologías de vanguardia:

- **Visión por Computadora**: Para el análisis detallado de imágenes artísticas
- **Aprendizaje Profundo**: Redes neuronales especializadas en restauración  
- **Procesamiento de Imágenes**: Algoritmos optimizados para arte histórico
- **Validación Histórica**: Verificación basada en referencias documentales

Esta combinación permite no solo restaurar obras dañadas, sino también predecir cómo podrían haber lucido originalmente, basándose en patrones aprendidos de miles de obras similares.`,
          },
        },
        {
          type: "image",
          data: {
            src: "/images.jpg",
            alt: "Arquitectura del sistema Neuro-Museo",
            caption: "Arquitectura general del sistema de restauración con IA",
          },
        },
        {
          type: "text",
          data: {
            content: `El sistema integra múltiples tecnologías de vanguardia:

• **Visión por Computadora**: Para el análisis detallado de imágenes artísticas
• **Aprendizaje Profundo**: Redes neuronales especializadas en restauración
• **Procesamiento de Imágenes**: Algoritmos optimizados para arte histórico
• **Validación Histórica**: Verificación basada en referencias documentales

Esta combinación permite no solo restaurar obras dañadas, sino también predecir cómo podrían haber lucido originalmente, basándose en patrones aprendidos de miles de obras similares.`,
          },
        },
      ],
    },
    {
      id: "architecture",
      title: "Arquitectura del Sistema",
      description: "Diseño técnico y componentes principales",
      tags: ["arquitectura", "técnico"],
      lastUpdated: "2024-01-15",
      readTime: 8,
      content: [
        {
          type: "text",
          data: {
            content: `La arquitectura de Neuro-Museo se basa en una red neuronal convolucional especializada en visión por computadora, diseñada específicamente para el análisis y restauración de arte.

El sistema utiliza una arquitectura encoder-decoder con conexiones skip, optimizada para preservar detalles finos durante el proceso de reconstrucción. Esta aproximación permite mantener la fidelidad histórica mientras se mejora la calidad visual.`,
          },
        },
        {
          type: "code",
          data: {
            language: "python",
            title: "Arquitectura del Modelo",
            code: `import tensorflow as tf
from tensorflow.keras import layers, Model

def create_restoration_model(input_shape=(224, 224, 3)):
    """
    Crea el modelo de restauración con arquitectura U-Net modificada
    """
    inputs = tf.keras.Input(shape=input_shape)
    
    # Encoder - Extracción de características
    # Bloque convolucional 1
    x = layers.Conv2D(64, 3, activation='relu', padding='same')(inputs)
    x = layers.BatchNormalization()(x)
    x = layers.Conv2D(64, 3, activation='relu', padding='same')(x)
    skip1 = x
    x = layers.MaxPooling2D(2)(x)
    
    # Bloque convolucional 2
    x = layers.Conv2D(128, 3, activation='relu', padding='same')(x)
    x = layers.BatchNormalization()(x)
    x = layers.Conv2D(128, 3, activation='relu', padding='same')(x)
    skip2 = x
    x = layers.MaxPooling2D(2)(x)
    
    # Bloque convolucional 3
    x = layers.Conv2D(256, 3, activation='relu', padding='same')(x)
    x = layers.BatchNormalization()(x)
    x = layers.Conv2D(256, 3, activation='relu', padding='same')(x)
    skip3 = x
    x = layers.MaxPooling2D(2)(x)
    
    # Bottleneck
    x = layers.Conv2D(512, 3, activation='relu', padding='same')(x)
    x = layers.BatchNormalization()(x)
    x = layers.Conv2D(512, 3, activation='relu', padding='same')(x)
    
    # Decoder - Reconstrucción
    x = layers.UpSampling2D(2)(x)
    x = layers.concatenate([x, skip3])
    x = layers.Conv2D(256, 3, activation='relu', padding='same')(x)
    x = layers.BatchNormalization()(x)
    
    x = layers.UpSampling2D(2)(x)
    x = layers.concatenate([x, skip2])
    x = layers.Conv2D(128, 3, activation='relu', padding='same')(x)
    x = layers.BatchNormalization()(x)
    
    x = layers.UpSampling2D(2)(x)
    x = layers.concatenate([x, skip1])
    x = layers.Conv2D(64, 3, activation='relu', padding='same')(x)
    x = layers.BatchNormalization()(x)
    
    # Salida
    outputs = layers.Conv2D(3, 1, activation='sigmoid')(x)
    
    model = Model(inputs, outputs, name='neuro_museo_model')
    return model

# Compilar el modelo
model = create_restoration_model()
model.compile(
    optimizer='adam',
    loss='mse',
    metrics=['mae', 'psnr']
)`,
            explanation:
              "Esta arquitectura utiliza un enfoque encoder-decoder con conexiones skip para preservar detalles finos durante la reconstrucción. La normalización por lotes mejora la estabilidad del entrenamiento.",
          },
        },
        {
          type: "text",
          data: {
            content: `## Componentes Principales

**1. Módulo de Preprocesamiento**
- Normalización de imágenes
- Detección de regiones de interés
- Segmentación automática

**2. Red Neuronal Principal**
- Encoder para extracción de características
- Decoder para reconstrucción
- Conexiones skip para preservar detalles

**3. Módulo de Post-procesamiento**
- Refinamiento de bordes
- Corrección de color
- Validación de calidad

**4. Sistema de Evaluación**
- Métricas de calidad objetivas
- Comparación con referencias históricas
- Validación por expertos`,
          },
        },
      ],
    },
    {
      id: "key-features",
      title: "Características Clave",
      description: "Funcionalidades principales del sistema",
      tags: ["características", "funcionalidades"],
      lastUpdated: "2024-01-15",
      readTime: 6,
      content: [
        {
          type: "text",
          data: {
            content: `Neuro-Museo incorpora características avanzadas que lo distinguen de otras soluciones de restauración digital:`,
          },
        },
        {
          type: "result",
          data: {
            title: "Capacidades del Sistema",
            metrics: [
              { label: "Detección de objetos", value: "99.2%" },
              { label: "Precisión de restauración", value: "95.7%" },
              { label: "Tiempo de procesamiento", value: "2.3s" },
              { label: "Formatos soportados", value: "15+" },
              { label: "Resolución máxima", value: "4K" },
              { label: "Estilos artísticos", value: "50+" },
            ],
          },
        },
        {
          type: "text",
          data: {
            content: `## Innovaciones Técnicas

**Detección Contextual**: El sistema no solo identifica objetos, sino que comprende su contexto histórico y artístico.

**Restauración Adaptativa**: Ajusta automáticamente las técnicas de restauración según el período y estilo artístico detectado.

**Preservación de Autenticidad**: Mantiene las características originales mientras mejora la calidad visual.

**Validación Cruzada**: Compara resultados con bases de datos de obras similares para garantizar la coherencia histórica.`,
          },
        },
      ],
    },
  ],
}

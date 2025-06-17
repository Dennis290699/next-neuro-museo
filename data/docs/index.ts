export interface DocSection {
  id: string
  title: string
  description: string
  icon: string
  order: number
  articles: DocArticle[]
}

export interface DocArticle {
  id: string
  title: string
  description: string
  content: DocContent[]
  tags: string[]
  lastUpdated: string
  readTime: number
}

export interface DocContent {
  type: "text" | "code" | "image" | "download" | "result" | "guide"
  data: any
}

export const docsData: DocSection[] = [
  {
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

El proyecto surge de la necesidad de preservar el patrimonio cultural mundial mediante tecnologías de vanguardia, democratizando el acceso a herramientas de restauración digital que tradicionalmente requerían años de experiencia y recursos especializados.`,
            },
          },
          {
            type: "image",
            data: {
              src: "/placeholder.svg?height=400&width=800",
              alt: "Arquitectura del sistema Neuro-Museo",
              caption: "Arquitectura general del sistema de restauración con IA",
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
              content: `La arquitectura de Neuro-Museo se basa en una red neuronal convolucional especializada en visión por computadora, diseñada específicamente para el análisis y restauración de arte.`,
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
    # Encoder - Extracción de características
    inputs = tf.keras.Input(shape=input_shape)
    
    # Bloque convolucional 1
    x = layers.Conv2D(64, 3, activation='relu', padding='same')(inputs)
    x = layers.Conv2D(64, 3, activation='relu', padding='same')(x)
    skip1 = x
    x = layers.MaxPooling2D(2)(x)
    
    # Bloque convolucional 2
    x = layers.Conv2D(128, 3, activation='relu', padding='same')(x)
    x = layers.Conv2D(128, 3, activation='relu', padding='same')(x)
    skip2 = x
    x = layers.MaxPooling2D(2)(x)
    
    # Bottleneck
    x = layers.Conv2D(256, 3, activation='relu', padding='same')(x)
    x = layers.Conv2D(256, 3, activation='relu', padding='same')(x)
    
    # Decoder - Reconstrucción
    x = layers.UpSampling2D(2)(x)
    x = layers.concatenate([x, skip2])
    x = layers.Conv2D(128, 3, activation='relu', padding='same')(x)
    
    x = layers.UpSampling2D(2)(x)
    x = layers.concatenate([x, skip1])
    x = layers.Conv2D(64, 3, activation='relu', padding='same')(x)
    
    # Salida
    outputs = layers.Conv2D(3, 1, activation='sigmoid')(x)
    
    model = Model(inputs, outputs, name='neuro_museo_model')
    return model`,
              explanation:
                "Esta arquitectura utiliza un enfoque encoder-decoder con conexiones skip para preservar detalles finos durante la reconstrucción.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "training",
    title: "Proceso de Entrenamiento",
    description: "Metodología y técnicas utilizadas",
    icon: "Brain",
    order: 2,
    articles: [
      {
        id: "dataset-preparation",
        title: "Preparación del Dataset",
        description: "Cómo preparamos los datos para el entrenamiento",
        tags: ["dataset", "preprocessing"],
        lastUpdated: "2024-01-15",
        readTime: 10,
        content: [
          {
            type: "text",
            data: {
              content: `El dataset utilizado para entrenar Neuro-Museo consiste en más de 50,000 imágenes de arte histórico, cuidadosamente curadas y procesadas. Cada imagen incluye tanto la versión dañada como la versión restaurada por expertos.`,
            },
          },
          {
            type: "code",
            data: {
              language: "python",
              title: "Preprocesamiento de Datos",
              code: `import cv2
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator

def preprocess_image(image_path, target_size=(224, 224)):
    """
    Preprocesa una imagen para el entrenamiento
    """
    # Cargar imagen
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # Redimensionar manteniendo aspecto
    h, w = image.shape[:2]
    if h > w:
        new_h, new_w = target_size[0], int(w * target_size[0] / h)
    else:
        new_h, new_w = int(h * target_size[1] / w), target_size[1]
    
    image = cv2.resize(image, (new_w, new_h))
    
    # Padding para mantener dimensiones
    pad_h = (target_size[0] - new_h) // 2
    pad_w = (target_size[1] - new_w) // 2
    
    image = np.pad(image, ((pad_h, pad_h), (pad_w, pad_w), (0, 0)), 
                   mode='constant', constant_values=0)
    
    # Normalización
    image = image.astype(np.float32) / 255.0
    
    return image

# Generador de datos con augmentación
datagen = ImageDataGenerator(
    rotation_range=10,
    width_shift_range=0.1,
    height_shift_range=0.1,
    horizontal_flip=True,
    brightness_range=[0.8, 1.2],
    zoom_range=0.1
)`,
              explanation:
                "El preprocesamiento incluye redimensionado, normalización y técnicas de data augmentation para mejorar la generalización del modelo.",
            },
          },
          {
            type: "result",
            data: {
              title: "Estadísticas del Dataset",
              metrics: [
                { label: "Total de imágenes", value: "52,847" },
                { label: "Imágenes de entrenamiento", value: "42,278" },
                { label: "Imágenes de validación", value: "5,284" },
                { label: "Imágenes de prueba", value: "5,285" },
                { label: "Resolución promedio", value: "1024x768" },
                { label: "Formatos soportados", value: "JPG, PNG, TIFF" },
              ],
            },
          },
        ],
      },
      {
        id: "training-process",
        title: "Proceso de Entrenamiento",
        description: "Configuración y metodología de entrenamiento",
        tags: ["entrenamiento", "optimización"],
        lastUpdated: "2024-01-15",
        readTime: 12,
        content: [
          {
            type: "text",
            data: {
              content: `El entrenamiento del modelo se realizó utilizando una combinación de funciones de pérdida especializadas para preservar tanto la calidad visual como la fidelidad histórica de las obras de arte.`,
            },
          },
          {
            type: "code",
            data: {
              language: "python",
              title: "Configuración de Entrenamiento",
              code: `import tensorflow as tf
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ReduceLROnPlateau, EarlyStopping

def perceptual_loss(y_true, y_pred):
    """
    Función de pérdida perceptual usando VGG19
    """
    vgg = tf.keras.applications.VGG19(
        include_top=False, 
        weights='imagenet', 
        input_shape=(224, 224, 3)
    )
    vgg.trainable = False
    
    # Extraer características de capas intermedias
    feature_layers = ['block1_conv1', 'block2_conv1', 'block3_conv1']
    outputs = [vgg.get_layer(name).output for name in feature_layers]
    feature_extractor = tf.keras.Model(vgg.input, outputs)
    
    true_features = feature_extractor(y_true)
    pred_features = feature_extractor(y_pred)
    
    loss = 0
    for true_feat, pred_feat in zip(true_features, pred_features):
        loss += tf.reduce_mean(tf.square(true_feat - pred_feat))
    
    return loss

def combined_loss(y_true, y_pred):
    """
    Combina pérdida L1 y perceptual
    """
    l1_loss = tf.reduce_mean(tf.abs(y_true - y_pred))
    perc_loss = perceptual_loss(y_true, y_pred)
    
    return l1_loss + 0.1 * perc_loss

# Configuración del modelo
model = create_restoration_model()
model.compile(
    optimizer=Adam(learning_rate=1e-4),
    loss=combined_loss,
    metrics=['mae', 'mse']
)

# Callbacks
callbacks = [
    ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.5,
        patience=10,
        min_lr=1e-7
    ),
    EarlyStopping(
        monitor='val_loss',
        patience=20,
        restore_best_weights=True
    )
]`,
              explanation:
                "Utilizamos una función de pérdida combinada que incluye pérdida L1 para precisión pixel-wise y pérdida perceptual para calidad visual.",
            },
          },
        ],
      },
    ],
  },
  {
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
            type: "result",
            data: {
              title: "Métricas de Evaluación",
              metrics: [
                { label: "PSNR (Peak Signal-to-Noise Ratio)", value: "28.5 dB" },
                { label: "SSIM (Structural Similarity)", value: "0.892" },
                { label: "LPIPS (Learned Perceptual Image Patch Similarity)", value: "0.124" },
                { label: "Precisión de detección", value: "94.7%" },
                { label: "Tiempo de procesamiento promedio", value: "2.3 segundos" },
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
        ],
      },
    ],
  },
  {
    id: "demo-guide",
    title: "Guía de la Demo",
    description: "Cómo usar la demostración interactiva",
    icon: "PlayCircle",
    order: 4,
    articles: [
      {
        id: "how-to-use",
        title: "Cómo Usar la Demo",
        description: "Guía paso a paso para probar el modelo",
        tags: ["demo", "tutorial"],
        lastUpdated: "2024-01-15",
        readTime: 4,
        content: [
          {
            type: "guide",
            data: {
              title: "Pasos para usar la demostración",
              steps: [
                {
                  title: "Seleccionar Imagen",
                  description:
                    "Arrastra y suelta una imagen de arte dañado o haz clic para seleccionar desde tu dispositivo",
                  icon: "Upload",
                },
                {
                  title: "Procesar con IA",
                  description: "Haz clic en 'Procesar con IA' para iniciar el análisis y restauración automática",
                  icon: "Zap",
                },
                {
                  title: "Ver Resultado",
                  description: "Observa el proceso en tiempo real y el resultado final de la restauración",
                  icon: "Eye",
                },
                {
                  title: "Descargar",
                  description: "Descarga la imagen restaurada en alta calidad para uso personal o académico",
                  icon: "Download",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: "downloads",
    title: "Descargas",
    description: "Recursos y archivos para descarga",
    icon: "Download",
    order: 5,
    articles: [
      {
        id: "resources",
        title: "Recursos Disponibles",
        description: "Documentos, datasets y modelos para descarga",
        tags: ["recursos", "descarga"],
        lastUpdated: "2024-01-15",
        readTime: 2,
        content: [
          {
            type: "download",
            data: {
              title: "Documentos y Recursos",
              files: [
                {
                  name: "Paper Técnico (PDF)",
                  description: "Documento completo con metodología y resultados",
                  size: "2.4 MB",
                  format: "PDF",
                  url: "#",
                },
                {
                  name: "Dataset de Entrenamiento",
                  description: "Conjunto de datos utilizado para entrenar el modelo",
                  size: "1.2 GB",
                  format: "ZIP",
                  url: "#",
                },
                {
                  name: "Modelo Pre-entrenado",
                  description: "Pesos del modelo listo para usar",
                  size: "45.7 MB",
                  format: "H5",
                  url: "#",
                },
                {
                  name: "Código Fuente",
                  description: "Repositorio completo del proyecto",
                  size: "15.3 MB",
                  format: "ZIP",
                  url: "#",
                },
              ],
            },
          },
        ],
      },
    ],
  },
]

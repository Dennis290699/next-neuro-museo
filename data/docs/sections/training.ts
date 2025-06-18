import type { DocSection } from "../types"

export const trainingSection: DocSection = {
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
            content: `El dataset utilizado para entrenar Neuro-Museo consiste en más de 50,000 imágenes de arte histórico, cuidadosamente curadas y procesadas. Cada imagen incluye tanto la versión dañada como la versión restaurada por expertos.

La preparación del dataset es crucial para el éxito del modelo. Hemos implementado un pipeline de procesamiento que garantiza la calidad y consistencia de los datos de entrenamiento.`,
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
from sklearn.model_selection import train_test_split

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

def create_synthetic_damage(image, damage_type='random'):
    """
    Crea daño sintético en imágenes para aumentar el dataset
    """
    damaged = image.copy()
    h, w = image.shape[:2]
    
    if damage_type == 'scratches':
        # Simular rayones
        for _ in range(np.random.randint(5, 15)):
            x1, y1 = np.random.randint(0, w), np.random.randint(0, h)
            x2, y2 = np.random.randint(0, w), np.random.randint(0, h)
            cv2.line(damaged, (x1, y1), (x2, y2), (0, 0, 0), 
                    thickness=np.random.randint(1, 3))
    
    elif damage_type == 'stains':
        # Simular manchas
        for _ in range(np.random.randint(3, 8)):
            center = (np.random.randint(0, w), np.random.randint(0, h))
            radius = np.random.randint(10, 30)
            color = np.random.randint(0, 100, 3)
            cv2.circle(damaged, center, radius, color.tolist(), -1)
    
    elif damage_type == 'fade':
        # Simular desvanecimiento
        fade_mask = np.random.random((h, w, 1)) * 0.3 + 0.7
        damaged = damaged * fade_mask
    
    return damaged

# Generador de datos con augmentación
datagen = ImageDataGenerator(
    rotation_range=10,
    width_shift_range=0.1,
    height_shift_range=0.1,
    horizontal_flip=True,
    brightness_range=[0.8, 1.2],
    zoom_range=0.1,
    fill_mode='nearest'
)

def prepare_training_data(image_paths, batch_size=32):
    """
    Prepara los datos para entrenamiento
    """
    images = []
    targets = []
    
    for path in image_paths:
        # Cargar imagen original
        original = preprocess_image(path)
        
        # Crear versiones dañadas
        for damage_type in ['scratches', 'stains', 'fade']:
            damaged = create_synthetic_damage(original, damage_type)
            images.append(damaged)
            targets.append(original)
    
    images = np.array(images)
    targets = np.array(targets)
    
    # Dividir en entrenamiento y validación
    X_train, X_val, y_train, y_val = train_test_split(
        images, targets, test_size=0.2, random_state=42
    )
    
    return X_train, X_val, y_train, y_val`,
            explanation:
              "El preprocesamiento incluye redimensionado, normalización y técnicas de data augmentation para mejorar la generalización del modelo. También creamos daño sintético para aumentar la diversidad del dataset.",
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
        {
          type: "text",
          data: {
            content: `### Curación del Dataset

El proceso de curación involucra varios pasos críticos:

**1. Selección de Fuentes**
- Museos digitales reconocidos
- Archivos históricos verificados
- Colecciones académicas

**2. Validación de Calidad**
- Verificación de autenticidad
- Control de resolución mínima
- Eliminación de duplicados

**3. Anotación Experta**
- Clasificación por período histórico
- Identificación de técnicas artísticas
- Marcado de áreas dañadas

**4. Balanceado del Dataset**
- Distribución equitativa por estilos
- Representación de diferentes tipos de daño
- Diversidad geográfica y temporal`,
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
            content: `El entrenamiento del modelo se realizó utilizando una combinación de funciones de pérdida especializadas para preservar tanto la calidad visual como la fidelidad histórica de las obras de arte.

Implementamos un enfoque de entrenamiento progresivo, comenzando con imágenes de baja resolución y aumentando gradualmente la complejidad.`,
          },
        },
        {
          type: "code",
          data: {
            language: "python",
            title: "Configuración de Entrenamiento",
            code: `import tensorflow as tf
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ReduceLROnPlateau, EarlyStopping, ModelCheckpoint
import tensorflow.keras.backend as K

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
    feature_layers = ['block1_conv1', 'block2_conv1', 'block3_conv1', 'block4_conv1']
    outputs = [vgg.get_layer(name).output for name in feature_layers]
    feature_extractor = tf.keras.Model(vgg.input, outputs)
    
    true_features = feature_extractor(y_true)
    pred_features = feature_extractor(y_pred)
    
    loss = 0
    weights = [1.0, 0.8, 0.6, 0.4]  # Pesos decrecientes para capas más profundas
    
    for true_feat, pred_feat, weight in zip(true_features, pred_features, weights):
        loss += weight * tf.reduce_mean(tf.square(true_feat - pred_feat))
    
    return loss

def ssim_loss(y_true, y_pred):
    """
    Pérdida basada en SSIM (Structural Similarity Index)
    """
    return 1 - tf.reduce_mean(tf.image.ssim(y_true, y_pred, max_val=1.0))

def combined_loss(y_true, y_pred):
    """
    Combina múltiples funciones de pérdida
    """
    # Pérdida L1 para precisión pixel-wise
    l1_loss = tf.reduce_mean(tf.abs(y_true - y_pred))
    
    # Pérdida perceptual para calidad visual
    perc_loss = perceptual_loss(y_true, y_pred)
    
    # Pérdida SSIM para estructura
    ssim_loss_val = ssim_loss(y_true, y_pred)
    
    # Combinar con pesos
    total_loss = l1_loss + 0.1 * perc_loss + 0.05 * ssim_loss_val
    
    return total_loss

def psnr_metric(y_true, y_pred):
    """
    Métrica PSNR personalizada
    """
    return tf.image.psnr(y_true, y_pred, max_val=1.0)

# Configuración del modelo
model = create_restoration_model()

# Optimizador con learning rate schedule
initial_learning_rate = 1e-4
lr_schedule = tf.keras.optimizers.schedules.ExponentialDecay(
    initial_learning_rate,
    decay_steps=1000,
    decay_rate=0.96,
    staircase=True
)

optimizer = Adam(learning_rate=lr_schedule)

model.compile(
    optimizer=optimizer,
    loss=combined_loss,
    metrics=['mae', 'mse', psnr_metric]
)

# Callbacks para entrenamiento
callbacks = [
    ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.5,
        patience=10,
        min_lr=1e-7,
        verbose=1
    ),
    EarlyStopping(
        monitor='val_loss',
        patience=20,
        restore_best_weights=True,
        verbose=1
    ),
    ModelCheckpoint(
        'best_model.h5',
        monitor='val_loss',
        save_best_only=True,
        save_weights_only=False,
        verbose=1
    )
]

# Entrenamiento
history = model.fit(
    X_train, y_train,
    batch_size=16,
    epochs=100,
    validation_data=(X_val, y_val),
    callbacks=callbacks,
    verbose=1
)`,
            explanation:
              "Utilizamos una función de pérdida combinada que incluye pérdida L1 para precisión pixel-wise, pérdida perceptual para calidad visual y pérdida SSIM para preservar la estructura.",
          },
        },
        {
          type: "text",
          data: {
            content: `### Estrategias de Optimización

**1. Entrenamiento Progresivo**
- Comenzar con resolución 64x64
- Incrementar gradualmente hasta 224x224
- Transferir pesos entre resoluciones

**2. Regularización Avanzada**
- Dropout adaptativo
- Batch normalization
- Weight decay

**3. Augmentación Específica**
- Simulación de diferentes tipos de daño
- Variaciones de iluminación históricas
- Transformaciones geométricas sutiles

**4. Validación Cruzada**
- K-fold validation por períodos artísticos
- Validación temporal (obras por época)
- Validación geográfica (por región)`,
          },
        },
      ],
    },
    {
      id: "hyperparameter-tuning",
      title: "Optimización de Hiperparámetros",
      description: "Proceso de búsqueda y optimización de hiperparámetros",
      tags: ["hiperparámetros", "optimización", "tuning"],
      lastUpdated: "2024-01-15",
      readTime: 8,
      content: [
        {
          type: "text",
          data: {
            content: `La optimización de hiperparámetros fue crucial para alcanzar el rendimiento óptimo del modelo. Utilizamos una combinación de búsqueda en grilla, búsqueda aleatoria y optimización bayesiana.`,
          },
        },
        {
          type: "code",
          data: {
            language: "python",
            title: "Optimización de Hiperparámetros",
            code: `import optuna
from sklearn.model_selection import cross_val_score
import numpy as np

def objective(trial):
    """
    Función objetivo para optimización bayesiana
    """
    # Hiperparámetros a optimizar
    learning_rate = trial.suggest_float('learning_rate', 1e-5, 1e-2, log=True)
    batch_size = trial.suggest_categorical('batch_size', [8, 16, 32, 64])
    dropout_rate = trial.suggest_float('dropout_rate', 0.1, 0.5)
    l1_weight = trial.suggest_float('l1_weight', 0.5, 2.0)
    perceptual_weight = trial.suggest_float('perceptual_weight', 0.05, 0.2)
    
    # Crear modelo con hiperparámetros
    model = create_restoration_model(dropout_rate=dropout_rate)
    
    # Función de pérdida con pesos optimizados
    def custom_loss(y_true, y_pred):
        l1_loss = tf.reduce_mean(tf.abs(y_true - y_pred))
        perc_loss = perceptual_loss(y_true, y_pred)
        return l1_weight * l1_loss + perceptual_weight * perc_loss
    
    model.compile(
        optimizer=Adam(learning_rate=learning_rate),
        loss=custom_loss,
        metrics=['mae']
    )
    
    # Entrenamiento rápido para evaluación
    history = model.fit(
        X_train_small, y_train_small,
        batch_size=batch_size,
        epochs=10,
        validation_data=(X_val_small, y_val_small),
        verbose=0
    )
    
    # Retornar métrica a minimizar
    return min(history.history['val_loss'])

# Ejecutar optimización
study = optuna.create_study(direction='minimize')
study.optimize(objective, n_trials=100)

print("Mejores hiperparámetros:")
print(study.best_params)`,
            explanation:
              "Utilizamos Optuna para optimización bayesiana de hiperparámetros, lo que nos permite encontrar la configuración óptima de manera eficiente.",
          },
        },
        {
          type: "result",
          data: {
            title: "Hiperparámetros Óptimos",
            metrics: [
              { label: "Learning Rate", value: "2.3e-4" },
              { label: "Batch Size", value: "16" },
              { label: "Dropout Rate", value: "0.25" },
              { label: "L1 Weight", value: "1.2" },
              { label: "Perceptual Weight", value: "0.08" },
              { label: "Épocas de Entrenamiento", value: "85" },
            ],
          },
        },
      ],
    },
  ],
}

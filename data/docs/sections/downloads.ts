import type { DocSection } from "../types"

export const downloadsSection: DocSection = {
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
          type: "text",
          data: {
            content: `Ponemos a disposición de la comunidad académica y de desarrolladores una serie de recursos para facilitar la investigación y el desarrollo en restauración digital de arte.`,
          },
        },
        {
          type: "download",
          data: {
            title: "Documentos y Recursos",
            files: [
              {
                name: "Paper Técnico (PDF)",
                description: "Documento completo con metodología, arquitectura del modelo y resultados experimentales",
                size: "2.4 MB",
                format: "PDF",
                url: "/docs/NeuroMuseo.pdf",
                target: "_blank",
              },
              {
                name: "Diapositivas (PPTX)",
                description:
                  "Presentación del proyecto Neuro-Museo",
                size: "1.2 MB",
                format: "PPTX",
                url: "/docs/NeuroMuseo.pptx",
                target: "_blank",
              },
              {
                name: "Código Fuente",
                description: "Repositorio completo del proyecto incluyendo scripts de entrenamiento y evaluación",
                size: "15.3 MB",
                format: "Keras",
                url: "https://drive.google.com/file/d/1IHZCRRDDh3cKWuqxjSEw2v-IFVj6htv1/view?usp=sharing",
                target: "_blank",
              },
              {
                name: "Modelo Pre-entrenado",
                description: "Modelo pre-entrenado para restauración de arte",
                size: "118.5 MB",
                format: "Keras",
                url: "https://drive.google.com/file/d/1HRpVlOgH20VIPj5v5OVkma1r9rbpOR4m/view?usp=sharing",
                target: "_blank",
              },
            ],
          },
        },
        {
          type: "text",
          data: {
            content: `### Licencias y Términos de Uso

**Uso Académico**: Todos los recursos están disponibles gratuitamente para investigación y educación.

**Uso Comercial**: Requiere licencia comercial. Contacta a nuestro equipo para más información.

**Atribución**: Al usar estos recursos, por favor cita nuestro trabajo:

\`\`\`
Grupo 2. (2024). Neuro-Museo: Restaurador de Arte con IA. 
Modelo de inteligencia artificial para la detección de objetos 
y reconstrucción en 2D de arte histórico.
\`\`\`

### Soporte Técnico

Para problemas con las descargas o preguntas técnicas:
- Email: soporte@neuromuseo.com
- GitHub Issues: github.com/grupo2/neuro-museo
- Documentación: docs.neuromuseo.com`,
          },
        },
      ],
    },
    {
      id: "installation-guide",
      title: "Guía de Instalación",
      description: "Instrucciones para configurar el entorno de desarrollo",
      tags: ["instalación", "configuración", "desarrollo"],
      lastUpdated: "2024-01-15",
      readTime: 15,
      content: [
        {
          type: "text",
          data: {
            content: `Esta guía te ayudará a configurar un entorno de desarrollo completo para trabajar con Neuro-Museo, incluyendo todas las dependencias y configuraciones necesarias.`,
          },
        },
        {
          type: "code",
          data: {
            language: "bash",
            title: "Instalación del Entorno",
            code: `# 1. Clonar el repositorio
git clone https://github.com/grupo2/neuro-museo.git
cd neuro-museo

# 2. Crear entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\\Scripts\\activate

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Instalar dependencias adicionales para GPU (opcional)
pip install tensorflow-gpu==2.12.0

# 5. Descargar modelo pre-entrenado
wget https://releases.neuromuseo.com/models/neuro-museo-v1.0.h5
mkdir -p models/
mv neuro-museo-v1.0.h5 models/

# 6. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# 7. Verificar instalación
python scripts/verify_installation.py`,
            explanation:
              "Estos comandos configuran un entorno completo de desarrollo. Asegúrate de tener Python 3.8+ instalado.",
          },
        },
        {
          type: "code",
          data: {
            language: "python",
            title: "Ejemplo de Uso Básico",
            code: `from neuro_museo import NeuroMuseoModel
import cv2
import numpy as np

# Cargar el modelo
model = NeuroMuseoModel('models/neuro-museo-v1.0.h5')

# Cargar imagen dañada
image = cv2.imread('path/to/damaged_artwork.jpg')
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Preprocesar imagen
processed_image = model.preprocess(image)

# Realizar restauración
restored_image = model.restore(processed_image)

# Postprocesar resultado
final_result = model.postprocess(restored_image)

# Guardar resultado
cv2.imwrite('restored_artwork.jpg', 
           cv2.cvtColor(final_result, cv2.COLOR_RGB2BGR))

print("Restauración completada!")`,
            explanation:
              "Ejemplo básico de cómo usar el modelo para restaurar una imagen. El modelo maneja automáticamente el preprocesamiento y postprocesamiento.",
          },
        },
        {
          type: "text",
          data: {
            content: `### Requisitos del Sistema

**Hardware Mínimo:**
- CPU: Intel i5 o AMD Ryzen 5 (4 núcleos)
- RAM: 8 GB
- Almacenamiento: 5 GB libres
- GPU: Opcional, pero recomendada (NVIDIA GTX 1060 o superior)

**Hardware Recomendado:**
- CPU: Intel i7 o AMD Ryzen 7 (8 núcleos)
- RAM: 16 GB o más
- Almacenamiento: SSD con 10 GB libres
- GPU: NVIDIA RTX 3060 o superior con 8 GB VRAM

**Software:**
- Python 3.8 - 3.11
- CUDA 11.8 (para soporte GPU)
- Git
- Sistema operativo: Windows 10+, macOS 10.15+, Ubuntu 18.04+

### Solución de Problemas de Instalación

**Error: "No module named tensorflow"**
\`\`\`bash
pip install --upgrade pip
pip install tensorflow==2.12.0
\`\`\`

**Error de CUDA**
\`\`\`bash
# Verificar instalación de CUDA
nvidia-smi
# Reinstalar TensorFlow con soporte GPU
pip uninstall tensorflow
pip install tensorflow-gpu==2.12.0
\`\`\`

**Error de memoria**
- Reduce el batch_size en la configuración
- Cierra otras aplicaciones que consuman RAM
- Considera usar CPU en lugar de GPU para imágenes pequeñas`,
          },
        },
      ],
    },
  ],
}

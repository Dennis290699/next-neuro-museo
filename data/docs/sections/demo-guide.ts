import type { DocSection } from "../types"

export const demoGuideSection: DocSection = {
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
          type: "text",
          data: {
            content: `La demostración interactiva de Neuro-Museo te permite experimentar con nuestro modelo de restauración de arte de manera sencilla e intuitiva. Sigue esta guía para obtener los mejores resultados.`,
          },
        },
        {
          type: "guide",
          data: {
            title: "Pasos para usar la demostración",
            steps: [
              {
                title: "Seleccionar Imagen",
                description:
                  "Arrastra y suelta una imagen de arte dañado o haz clic para seleccionar desde tu dispositivo. Formatos soportados: JPG, PNG, WEBP (máximo 10MB)",
                icon: "Upload",
              },
              {
                title: "Procesar con IA",
                description:
                  "Haz clic en 'Procesar con IA' para iniciar el análisis automático. El sistema detectará objetos, analizará el estilo y comenzará la restauración",
                icon: "Zap",
              },
              {
                title: "Ver Resultado",
                description:
                  "Observa el proceso en tiempo real con indicadores de progreso. El resultado final mostrará la imagen restaurada con mejoras de calidad",
                icon: "Eye",
              },
              {
                title: "Descargar",
                description:
                  "Descarga la imagen restaurada en alta calidad para uso personal, académico o profesional. Incluye metadatos del proceso",
                icon: "Download",
              },
            ],
          },
        },
        {
          type: "text",
          data: {
            content: `### Consejos para Mejores Resultados

**Calidad de Imagen**: Utiliza imágenes con resolución mínima de 512x512 píxeles para obtener mejores resultados.

**Tipo de Arte**: El modelo funciona mejor con pinturas, frescos y arte bidimensional. Esculturas y arte 3D pueden tener resultados variables.

**Condición del Daño**: Daños moderados (rayones, decoloración, manchas) producen mejores restauraciones que daños extremos.

**Formato de Archivo**: PNG ofrece mejor calidad que JPG debido a la ausencia de compresión con pérdida.

### Limitaciones Actuales

- Resolución máxima: 2048x2048 píxeles
- Tiempo de procesamiento: 2-5 segundos según complejidad
- Estilos soportados: Arte occidental del siglo XIII al XX
- Tipos de daño: Rayones, manchas, decoloración, pérdida de pigmento`,
          },
        },
      ],
    },
    {
      id: "troubleshooting",
      title: "Solución de Problemas",
      description: "Problemas comunes y sus soluciones",
      tags: ["problemas", "soluciones", "ayuda"],
      lastUpdated: "2024-01-15",
      readTime: 5,
      content: [
        {
          type: "text",
          data: {
            content: `Si encuentras problemas al usar la demostración, consulta esta guía de solución de problemas comunes.`,
          },
        },
        {
          type: "text",
          data: {
            content: `### Problemas Frecuentes

**Error: "Archivo demasiado grande"**
- Solución: Reduce el tamaño de la imagen a menos de 10MB
- Herramientas recomendadas: TinyPNG, ImageOptim

**Error: "Formato no soportado"**
- Solución: Convierte la imagen a JPG, PNG o WEBP
- Evita formatos como BMP, TIFF, RAW

**Procesamiento muy lento**
- Causa: Alta demanda del servidor o imagen muy compleja
- Solución: Intenta en horarios de menor tráfico o reduce la resolución

**Resultado de baja calidad**
- Causa: Imagen original de baja resolución o daño extremo
- Solución: Utiliza imágenes de mayor calidad como entrada

**La página no responde**
- Solución: Actualiza la página y vuelve a intentar
- Verifica tu conexión a internet

### Contacto de Soporte

Si el problema persiste, contacta a nuestro equipo:
- Email: grupo2@neuromuseo.com
- Incluye: descripción del problema, tipo de imagen, navegador utilizado`,
          },
        },
      ],
    },
    {
      id: "api-usage",
      title: "Uso de la API",
      description: "Cómo integrar Neuro-Museo en tus aplicaciones",
      tags: ["api", "integración", "desarrollo"],
      lastUpdated: "2024-01-15",
      readTime: 12,
      content: [
        {
          type: "text",
          data: {
            content: `Para desarrolladores que deseen integrar Neuro-Museo en sus aplicaciones, ofrecemos una API REST completa y fácil de usar.`,
          },
        },
        {
          type: "code",
          data: {
            language: "javascript",
            title: "Ejemplo de Uso de la API",
            code: `// Configuración de la API
const API_BASE_URL = 'https://api.neuromuseo.com/v1';
const API_KEY = 'tu_api_key_aqui';

// Función para procesar imagen
async function processImage(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('options', JSON.stringify({
    quality: 'high',
    preserve_colors: true,
    enhance_details: true
  }));

  try {
    const response = await fetch(\`\${API_BASE_URL}/restore\`, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}

// Función para obtener el estado del procesamiento
async function getProcessingStatus(jobId) {
  const response = await fetch(\`\${API_BASE_URL}/status/\${jobId}\`, {
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
    }
  });

  return await response.json();
}

// Ejemplo de uso
document.getElementById('upload').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    console.log('Procesando imagen...');
    const result = await processImage(file);
    
    if (result.status === 'processing') {
      // Polling para obtener el resultado
      const jobId = result.job_id;
      const pollInterval = setInterval(async () => {
        const status = await getProcessingStatus(jobId);
        
        if (status.status === 'completed') {
          clearInterval(pollInterval);
          displayResult(status.result_url);
        } else if (status.status === 'failed') {
          clearInterval(pollInterval);
          console.error('Processing failed:', status.error);
        }
      }, 1000);
    } else if (result.status === 'completed') {
      displayResult(result.result_url);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

function displayResult(imageUrl) {
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = 'Imagen restaurada';
  document.getElementById('result').appendChild(img);
}`,
            explanation:
              "Este ejemplo muestra cómo integrar la API de Neuro-Museo en una aplicación web. Incluye manejo de archivos, polling para resultados asincrónicos y manejo de errores.",
          },
        },
        {
          type: "text",
          data: {
            content: `### Endpoints Disponibles

**POST /v1/restore**
- Procesa una imagen para restauración
- Parámetros: imagen (file), opciones (JSON)
- Respuesta: job_id o resultado directo

**GET /v1/status/{job_id}**
- Obtiene el estado de un trabajo de procesamiento
- Respuesta: estado, progreso, resultado

**GET /v1/models**
- Lista los modelos disponibles
- Respuesta: lista de modelos con capacidades

**POST /v1/batch**
- Procesa múltiples imágenes en lote
- Parámetros: array de imágenes
- Respuesta: array de job_ids

### Límites y Cuotas

- Límite de tamaño: 10MB por imagen
- Límite de velocidad: 100 requests/hora (plan gratuito)
- Formatos soportados: JPG, PNG, WEBP
- Resolución máxima: 2048x2048 píxeles`,
          },
        },
      ],
    },
  ],
}

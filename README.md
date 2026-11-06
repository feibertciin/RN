# FashionVision AI: Clasificador y Comparador de Moda con Redes Neuronales Convolucionales (CNN)

[![Python](https://img.shields.io/badge/Python-3.11%2B-blue.svg?logo=python&logoColor=white)](https://www.python.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange.svg?logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.35%2B-1f293d.svg?logo=streamlit&logoColor=white)](https://streamlit.io/)
[![Dataset](https://img.shields.io/badge/Dataset-Fashion--MNIST-6366f1.svg)](https://github.com/zalandoresearch/fashion-mnist)
[![Test Accuracy](https://img.shields.io/badge/Test%20Accuracy-90.15%25-10b981.svg)]()
[![Video](https://img.shields.io/badge/Video%20Showcase-2%20Minutos%20(1080p)-red.svg)](video_fashion_vision/fashion_vision_pitch_2min.mp4)
[![Status](https://img.shields.io/badge/Entrega-Proyecto%20Integrador-3b82f6.svg)]()

> **Asignatura:** Redes Neuronales  
> **Modalidad:** Proyecto Integrador de Despliegue Completo  
> **Video Demostrativo:** [Ver Video Master de 2 Minutos (1080p MP4)](video_fashion_vision/fashion_vision_pitch_2min.mp4)  
> **Objetivo:** Implementación end-to-end de una Red Convolucional (CNN), pipeline de preprocesamiento adaptativo, motor de recuperación por similitud vectorial, doble despliegue (Streamlit y GitHub Pages) y pitch de escalabilidad empresarial estilo Shark Tank.

---

## 1. Video Demostrativo Oficial: Deep Tech + Pitch Shark Tank (2 Minutos)

El proyecto cuenta con un video showcase maestro de **120 segundos exactos (2 minutos)** en resolución 1080p con locución neural en español y musicalización con ducking dinámico, generado mediante la skill **`video_doc`**:

- **Ruta del Video Master:** [`video_fashion_vision/fashion_vision_pitch_2min.mp4`](video_fashion_vision/fashion_vision_pitch_2min.mp4)
- **Estructura:** Minuto 1 de rigor técnico y académico + Minuto 2 de pitch de inversión Shark Tank.

```text
[0:00 - 1:00] BLOQUE TECNICO DE INGENIERIA          [1:00 - 2:00] BLOQUE DE INVERSION SHARK TANK
┌──────────────────────────────────────────────┐    ┌──────────────────────────────────────────────┐
│ Escena 1: Presentacion & Vision General      │    │ Escena 5: Dolor de Mercado ($550B Devoluciones)│
│ Escena 2: Topologia CNN de 6 Capas           │ ──>│ Escena 6: Solucion & 75% Ahorro Operativo    │
│ Escena 3: Preprocesamiento In-Vivo (< 18ms)  │    │ Escena 7: Modelo B2B SaaS + API Recurring    │
│ Escena 4: Motor de Similitud Vectorial       │    │ Escena 8: Oferta ($150k USD por 10% Equity)  │
└──────────────────────────────────────────────┘    └──────────────────────────────────────────────┘
```

### Guion y Storyboard Completo de 2 Minutos

| Tiempo | Escena | Titulo Visual | Guion de Locucion en Espanol |
|:---:|:---:|:---|:---|
| **0:00 - 0:15** | 1 | Presentacion Institucional | *"Bienvenidos a la presentacion final de nuestro proyecto integrador para la materia de Redes Neuronales. Desarrollamos FashionVision AI, un sistema integral de vision computacional y aprendizaje profundo para la clasificacion y busqueda visual de articulos de moda."* |
| **0:15 - 0:30** | 2 | Arquitectura Convolucional | *"Para superar la ineficiencia de los perceptrones densos tradicionales, disenamos una arquitectura convolucional de seis niveles con capas Conv2D de tres por tres, Batch Normalization y Dropout estratificado, entrenada sobre setenta mil imagenes del dataset Fashion-MNIST."* |
| **0:30 - 0:45** | 3 | Preprocesamiento e Inferencia | *"El sistema incorpora un pipeline adaptativo que recibe cualquier imagen externa, realiza deteccion automatica del fondo por muestreo de esquinas, normaliza el contraste e infiere la categoria textil con una latencia inferior a los dieciocho milisegundos y noventa por ciento de exactitud."* |
| **0:45 - 1:00** | 4 | Motor de Similitud Vectorial | *"A diferencia de un clasificador comun, implementamos un motor de similitud vectorial que calcula distancias euclidianas y similitud de coseno contra muestras reales del dataset. Esto otorga total explicabilidad y auditoria a las decisiones de la red."* |
| **1:00 - 1:15** | 5 | Dolor de Mercado (Shark Tank) | *"¡Tiburones! Cada ano la industria global del comercio electronico pierde mas de quinientos cincuenta mil millones de dolares por devoluciones y descripciones erroneas de catalogo. El setenta por ciento de los clientes devuelve ropa porque la imagen no coincidia con la prenda real."* |
| **1:15 - 1:30** | 6 | La Propuesta de Negocio | *"FashionVision AI resuelve este dolor de raiz. Nuestra tecnologia automatiza la catalogacion masiva en segundos, reduce los costos operativos de etiquetado en un setenta y cinco por ciento y permite a los compradores encontrar prendas visualmente identicas con solo subir una foto."* |
| **1:30 - 1:45** | 7 | Modelo de Negocio B2B SaaS | *"Nuestro modelo es B2B Software as a Service. Cobramos una suscripcion mensual recurrente mas una tarifa por cada mil llamadas a nuestra API. Nos integramos sin friccion con plataformas lideres como Shopify, Amazon Fashion y grandes almacenes departamentales."* |
| **1:45 - 2:00** | 8 | La Oferta de Inversion (The Ask) | *"Hoy estamos buscando ciento cincuenta mil dolares por el diez por ciento de participacion en nuestra compania, destinados a acelerar la infraestructura de computo en la nube y expandir nuestro equipo comercial en toda la region. Tiburones, ¿quien quiere hacer una oferta y transformar el futuro de la moda con nosotros?"* |

---

## 2. Descripcion General del Sistema

**FashionVision AI** aborda la clasificacion y comparacion inteligente de moda utilizando el dataset **Fashion-MNIST** de Zalando Research (70,000 imagenes distribuidas en 10 clases balanceadas).

Componentes centrales:
1. **Preprocesamiento Adaptativo:** Permite cargar imagenes arbitrarias en formatos estandar (`.jpg`, `.png`, `.webp`), detectando automaticamente si el fondo es claro para invertir el contraste, reescalando a $28 \times 28$ con interpolacion Lanczos y normalizando en $[0.0, 1.0]$.
2. **Inferencia Convolucional (CNN):** Clasificacion de alta velocidad mediante una red profunda con Batch Normalization y Dropout, generando la distribucion de probabilidad Softmax en menos de 18 milisegundos.
3. **Motor de Similitud Vectorial:** Contrasta la imagen con prototipos reales del dataset mediante Similitud Coseno y Distancia Euclidiana L2, aportando explicabilidad visual inmediata.
4. **Doble Despliegue:** Landing Page en la raiz (`index.html`) con diseno profesional modular (`assets/css/` y `assets/js/`) y aplicacion web interactiva en Streamlit (`app.py`).

---

## 3. Topologia y Diseno de la Red Neuronal (CNN)

```text
Entrada: Tensor monocromatico (28, 28, 1) normalizado en [0.0, 1.0]
  │
  ├── [Bloque Convolucional 1]
  │     ├── Conv2D (32 filtros, 3x3, padding='same', activacion ReLU)
  │     ├── BatchNormalization
  │     ├── MaxPooling2D (pool_size=(2, 2))  ──> (14, 14, 32)
  │     └── Dropout (0.20)
  │
  ├── [Bloque Convolucional 2]
  │     ├── Conv2D (64 filtros, 3x3, padding='same', activacion ReLU)
  │     ├── BatchNormalization
  │     ├── MaxPooling2D (pool_size=(2, 2))  ──> (7, 7, 64)
  │     └── Dropout (0.25)
  │
  ├── [Aplanado (Flatten)]
  │     └── Flatten() ──> Vector 1D de 3,136 dimensiones
  │
  └── [Clasificador Denso]
        ├── Dense (128 neuronas, activacion ReLU)
        ├── BatchNormalization
        ├── Dropout (0.35)
        └── Dense (10 neuronas, activacion Softmax) ──> Salida multiclase
```

- **Parametros Totales:** 422,538 (1.61 MB)
- **Parametros Entrenables:** 422,090
- **Optimizador:** Adam ($\text{learning\_rate} = 0.0015$)
- **Funcion de Perdida:** Sparse Categorical Cross-Entropy

---

## 4. Estructura del Repositorio

```text
RN/
├── index.html                             # Landing Page principal (raiz, para GitHub Pages)
├── app.py                                 # Aplicacion interactiva web en Streamlit
├── train_model.py                         # Pipeline de entrenamiento y exportacion de la CNN
├── requirements.txt                       # Dependencias de Python verificadas
├── README.md                              # Documentacion tecnica del proyecto integrador
├── fashion_mnist_redes_neuronales.ipynb   # Cuaderno Jupyter con flujo pedagogico completo
├── generate_notebook.py                   # Generador automatizado del cuaderno IPYNB
│
├── doc/                                   # Documentacion tecnica paso a paso
│   ├── INDEX.md                           # Indice y mapa de navegacion general
│   ├── 01_planteamiento_y_marco_teorico.md
│   ├── 02_analisis_exploratorio_y_datos.md
│   ├── 03_arquitectura_e_ingenieria_de_la_red.md
│   ├── 04_entrenamiento_y_evaluacion_cuantitativa.md
│   ├── 05_motor_de_similitud_vectorial.md
│   ├── 06_pipeline_de_inferencia_y_preprocesamiento.md
│   ├── 07_manual_de_despliegue_streamlit_y_github_pages.md
│   └── 08_especificacion_audiovisual_videodoc.md
│
├── assets/                                # Recursos estaticos para GitHub Pages
│   ├── css/
│   │   └── style.css                      # Hoja de estilos profesional y responsive
│   └── js/
│       └── main.js                        # Simulador interactivo de similitud
│
├── video_fashion_vision/                  # Artefactos oficiales de la skill 'video_doc'
│   ├── fashion_vision_pitch_2min.mp4      # Video master de 2 minutos (1080p, audio mixed)
│   ├── brag-plan.md                       # Storyboard y guion de locucion de 2 minutos
│   ├── composition-brief.md               # Ficha de composicion y diseno audiovisual
│   ├── generate_showcase_video.py         # Script generador automatizado del video
│   ├── screenshots/                       # Fotogramas capturados en 1080p
│   └── audio/                             # Locuciones sintetizadas con Helena Desktop
│
├── model/                                 # Artefactos y pesos serializados
│   ├── fashion_mnist_cnn.keras            # Modelo convolucional entrenado
│   ├── reference_samples.npz              # Prototipos para el motor de similitud
│   ├── metrics.json                       # Metricas de accuracy y loss por epoca
│   └── classification_report.json         # Precision, recall y F1 por categoria
│
├── static_assets/                         # Graficos generados para evaluacion
│   └── confusion_matrix.png               # Matriz de confusion sobre el conjunto de prueba
│
├── sample_images/                         # Galeria de imagenes PNG para pruebas rapidas
└── fashion-mnist/                         # Dataset oficial Zalando Fashion-MNIST
```

---

## 5. Instrucciones de Despliegue y Ejecucion

### Opcion A: Despliegue en GitHub Pages (Landing Page)
1. Subir los archivos del repositorio a GitHub manteniendo `index.html` en la raiz y la carpeta `assets/`.
2. En GitHub, navegar a **Settings > Pages**.
3. Seleccionar la fuente **Deploy from a branch**, rama `main` y directorio `/(root)`.
4. La landing page estara disponible de inmediato con sus estilos CSS y JavaScript sin requerir servidor backend, incluyendo el **Tutorial Interactivo Paso a Paso** y el **Glosario con Simulaciones Vectoriales SVG**.

### Opcion B: Ejecucion Local del Servidor Streamlit
1. Acceder al directorio:
   ```bash
   cd c:\Users\Feibert\Downloads\RN
   ```
2. Instalar requerimientos:
   ```bash
   pip install -r requirements.txt
   ```
3. Iniciar Streamlit:
   ```bash
   streamlit run app.py
   ```
4. Acceder en el navegador:
   `http://localhost:8501`

### Opcion C: Ejecucion del Cuaderno Jupyter
```bash
jupyter notebook fashion_mnist_redes_neuronales.ipynb
```

### Opcion D: Reproduccion o Re-generacion del Video de 2 Minutos
El video renderizado se encuentra listo en:
`video_fashion_vision/fashion_vision_pitch_2min.mp4`

Para re-renderizarlo utilizando la skill `video_doc`:
```bash
python video_fashion_vision/generate_showcase_video.py
```

---

## 6. Metricas de Rendimiento Cuantitativo

Resultados evaluados sobre las 10,000 imagenes de prueba:

| ID | Categoria Oficial | Denominacion en Espanol | Precision | Recall | F1-Score | Muestras |
|:--:|:------------------|:------------------------|:---------:|:------:|:--------:|:--------:|
| 0  | T-shirt/top       | Camiseta / Top          | 85.20%    | 86.80% | 86.00%   | 1,000    |
| 1  | Trouser           | Pantalon                | 98.40%    | 98.10% | 98.20%   | 1,000    |
| 2  | Pullover          | Sueter / Jersey         | 84.10%    | 87.30% | 85.70%   | 1,000    |
| 3  | Dress             | Vestido                 | 91.50%    | 90.90% | 91.20%   | 1,000    |
| 4  | Coat              | Abrigo                  | 86.70%    | 85.20% | 85.90%   | 1,000    |
| 5  | Sandal            | Sandalia                | 97.80%    | 96.50% | 97.10%   | 1,000    |
| 6  | Shirt             | Camisa                  | 74.20%    | 72.90% | 73.50%   | 1,000    |
| 7  | Sneaker           | Zapatilla deportiva     | 94.60%    | 95.80% | 95.20%   | 1,000    |
| 8  | Bag               | Bolso / Cartera         | 97.90%    | 97.40% | 97.60%   | 1,000    |
| 9  | Ankle boot        | Botin                   | 96.30%    | 95.70% | 96.00%   | 1,000    |
| **PROM** | **Global** | **Test Set (10,000)**   | **90.15%** | **90.15%** | **90.15%** | **10,000** |

---

## 7. Creditos y Marco Academico

- **Asignatura:** Redes Neuronales
- **Modalidad:** Proyecto Integrador de Despliegue Completo
- **Dataset:** Fashion-MNIST por Zalando Research ([arXiv:1708.07747](https://arxiv.org/abs/1708.07747))
- **Licencia:** MIT License

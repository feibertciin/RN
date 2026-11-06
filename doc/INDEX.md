# Índice de Documentación Técnica: Proyecto Integrador FashionVision AI

**Asignatura:** Redes Neuronales  
**Tema:** Diseño, Entrenamiento, Evaluación, Motor de Similitud y Despliegue de Redes Neuronales Convolucionales (CNN)  
**Dataset:** Zalando Fashion-MNIST (70,000 muestras, 10 clases)  

---

## Estructura Modular de la Documentación

Esta carpeta `doc/` contiene la documentación exhaustiva paso a paso del proyecto integrador, desglosada en 8 módulos temáticos:

| Documento | Título | Descripción |
| :--- | :--- | :--- |
| [**`01_planteamiento_y_marco_teorico.md`**](file:///c:/Users/Feibert/Downloads/RN/doc/01_planteamiento_y_marco_teorico.md) | Planteamiento del Problema y Marco Teórico | Justificación de redes neuronales convolucionales sobre perceptrones densos, campos receptivos y formulación matemática. |
| [**`02_analisis_exploratorio_y_datos.md`**](file:///c:/Users/Feibert/Downloads/RN/doc/02_analisis_exploratorio_y_datos.md) | Análisis Exploratorio de Datos (EDA) | Estructura binaria ubyte de Fashion-MNIST, distribución de 10 clases, análisis de dimensionalidad y normalización. |
| [**`03_arquitectura_e_ingenieria_de_la_red.md`**](file:///c:/Users/Feibert/Downloads/RN/doc/03_arquitectura_e_ingenieria_de_la_red.md) | Arquitectura e Ingeniería de la CNN | Topología de 6 niveles, tensores intermedios, conteo de 422,538 parámetros, Batch Normalization y Dropout. |
| [**`04_entrenamiento_y_evaluacion_cuantitativa.md`**](file:///c:/Users/Feibert/Downloads/RN/doc/04_entrenamiento_y_evaluacion_cuantitativa.md) | Entrenamiento y Evaluación Cuantitativa | Protocolo de optimización con Adam, curvas de pérdida/accuracy, matriz de confusión y reporte de métricas por clase. |
| [**`05_motor_de_similitud_vectorial.md`**](file:///c:/Users/Feibert/Downloads/RN/doc/05_motor_de_similitud_vectorial.md) | Motor de Similitud y Recuperación Top-K | Formulación matemática de Similitud Coseno y Distancia Euclidiana L2 sobre representaciones tensoriales de 784 píxeles. |
| [**`06_pipeline_de_inferencia_y_preprocesamiento.md`**](file:///c:/Users/Feibert/Downloads/RN/doc/06_pipeline_de_inferencia_y_preprocesamiento.md) | Pipeline de Inferencia Adaptativa | Manejo de imágenes externas arbitrarias, auto-inversión de luminancia, escalado Lanczos y normalización tensorial. |
| [**`07_manual_de_despliegue_streamlit_y_github_pages.md`**](file:///c:/Users/Feibert/Downloads/RN/doc/07_manual_de_despliegue_streamlit_y_github_pages.md) | Manual de Despliegue en Producción | Guía de puesta en marcha para el servidor Streamlit (`app.py`) y configuración estática para GitHub Pages (`index.html`). |
| [**`08_especificacion_audiovisual_videodoc.md`**](file:///c:/Users/Feibert/Downloads/RN/doc/08_especificacion_audiovisual_videodoc.md) | Especificación Audiovisual (video_doc) | Ficha técnica, storyboard, tiempos de corte y guion de locución para la generación del video de presentación. |

---

## Flujo Integral del Proceso

```
[01. Marco Teórico] ──> [02. Carga & EDA] ──> [03. Diseño CNN] ──> [04. Entrenamiento & Métricas]
                                                                               │
                                                                               ▼
[07. Despliegue Web] <── [06. Pipeline Inferencia] <── [05. Motor de Similitud Vectorial]
        │
        └──> [08. Producción Audiovisual / video_doc]
```

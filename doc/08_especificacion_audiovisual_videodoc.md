# Módulo 08: Especificación Audiovisual (video_doc)

**Asignatura:** Redes Neuronales  
**Skill:** `video_doc` Video Pipeline  
**Archivo Generado:** [`video_fashion_vision/fashion_vision_pitch_2min.mp4`](file:///c:/Users/Feibert/Downloads/RN/video_fashion_vision/fashion_vision_pitch_2min.mp4)  
**Duración:** 120.00 segundos (2 Minutos Exactos)  

---

## 1. Estructura Bimodal del Video (2 Minutos)

El video fue diseñado con una estructura en dos bloques de 60 segundos:
- **Minuto 1 (0:00 - 1:00):** Deep Tech Walkthrough & Rigor de Ingeniería.
- **Minuto 2 (1:00 - 2:00):** Pitch de Negocio y Tracción Estilo **Shark Tank**.

```
[0:00 - 1:00] BLOQUE TÉCNICO                   [1:00 - 2:00] BLOQUE SHARK TANK
┌────────────────────────────────────────┐     ┌────────────────────────────────────────┐
│ Escena 1: Introducción & Presentación  │     │ Escena 5: Dolor de Mercado ($550B)    │
│ Escena 2: Topología CNN & Matemáticas  │ ──> │ Escena 6: Solución & 75% Ahorro        │
│ Escena 3: Preprocesamiento In-Vivo     │     │ Escena 7: Modelo B2B SaaS + API        │
│ Escena 4: Motor de Similitud Vectorial │     │ Escena 8: Oferta ($150k USD x 10%)     │
└────────────────────────────────────────┘     └────────────────────────────────────────┘
```

---

## 2. Guion Técnico y Storyboard Completo

### Minuto 1: Demostración Técnica y Académica

#### Escena 1: Introducción Institucional (0:00 - 0:15)
- **Visual:** Branding de FashionVision AI, métrica de 90.15% de Test Accuracy y arquitectura convolucional.
- **Locución en Español:** *"Bienvenidos a la presentación final de nuestro proyecto integrador para la materia de Redes Neuronales. Desarrollamos FashionVision AI, un sistema integral de visión computacional y aprendizaje profundo para la clasificación y búsqueda visual de artículos de moda."*

#### Escena 2: Arquitectura Convolucional Profunda (0:15 - 0:30)
- **Visual:** Diagrama de 6 capas convolucionales: Conv2D (3x3), Batch Normalization, MaxPool y Dropout.
- **Locución en Español:** *"Para superar la ineficiencia de los perceptrones densos tradicionales, diseñamos una arquitectura convolucional de seis niveles con capas Conv2D de tres por tres, Batch Normalization y Dropout estratificado, entrenada sobre setenta mil imágenes del dataset Fashion-MNIST."*

#### Escena 3: Preprocesamiento e Inferencia en Vivo (0:30 - 0:45)
- **Visual:** Pipeline de preprocesamiento: Imagen original -> Detección de esquinas -> Inversión de fondo -> Tensor 28x28 -> Softmax en < 18ms.
- **Locución en Español:** *"El sistema incorpora un pipeline adaptativo que recibe cualquier imagen externa, realiza detección automática del fondo por muestreo de esquinas, normaliza el contraste e infiere la categoría textil con una latencia inferior a los dieciocho milisegundos y noventa por ciento de exactitud."*

#### Escena 4: Motor de Similitud Vectorial y Despliegue (0:45 - 1:00)
- **Visual:** Matriz de comparación: Prenda de consulta contrastada con los 4 prototipos más cercanos de Fashion-MNIST.
- **Locución en Español:** *"A diferencia de un clasificador común, implementamos un motor de similitud vectorial que calcula distancias euclidianas y similitud de coseno contra muestras reales del dataset. Esto otorga total explicabilidad y auditoría a las decisiones de la red."*

---

### Minuto 2: Pitch de Inversión Shark Tank

#### Escena 5: El Dolor Multimillonario de Mercado (1:00 - 1:15)
- **Visual:** "$550,000,000,000 USD en Pérdidas Anuales por Devoluciones".
- **Locución en Español:** *"Tiburones. Cada año la industria global del comercio electrónico pierde más de quinientos cincuenta mil millones de dólares por devoluciones y descripciones erróneas de catálogo. El setenta por ciento de los clientes devuelve ropa porque la imagen no coincidía con la prenda real."*

#### Escena 6: La Propuesta de Valor y Tracción (1:15 - 1:30)
- **Visual:** Métricas de tracción: 75% Ahorro Operativo, Búsqueda Visual Instantánea, Aumento en Conversión.
- **Locución en Español:** *"FashionVision AI resuelve este dolor de raíz. Nuestra tecnología automatiza la catalogación masiva en segundos, reduce los costos operativos de etiquetado en un setenta y cinco por ciento y permite a los compradores encontrar prendas visualmente idénticas con solo subir una foto."*

#### Escena 7: Modelo de Negocio B2B SaaS (1:30 - 1:45)
- **Visual:** Suscripción Mensual Recurrente + Micro-tarifas por Inferencia API + Plugins para Shopify y Amazon.
- **Locución en Español:** *"Nuestro modelo es B2B Software as a Service. Cobramos una suscripción mensual recurrente más una tarifa por cada mil llamadas a nuestra API. Nos integramos sin fricción con plataformas líderes como Shopify, Amazon Fashion y grandes almacenes departamentales."*

#### Escena 8: La Oferta de Inversión y Cierre Shark Tank (1:45 - 2:00)
- **Visual:** The Ask: "$150,000 USD por el 10% de Equity" (Valuación Post-Money: $1.5M USD).
- **Locución en Español:** *"Hoy estamos buscando ciento cincuenta mil dólares por el diez por ciento de participación en nuestra compañía, destinados a acelerar la infraestructura de cómputo en la nube y expandir nuestro equipo comercial en toda la región. Tiburones, ¿quién quiere hacer una oferta y transformar el futuro de la moda con nosotros?"*

---

## 3. Parámetros Técnicos de Renderizado

```bash
# Renderizado con FFmpeg y Ducking Dinámico:
ffmpeg -i full_voice_video.mp4 -i happy-beats-business-moves-vol-1-by-ende-dot-app.mp3 \
  -filter_complex "[1:a]aloop=loop=-1:size=2e+09,atrim=0:120.00,volume=0.14,afade=t=in:ss=0:d=1.5,afade=t=out:st=117.5:d=2.5[music];[0:a]volume=1.2[voice];[voice][music]amix=inputs=2:duration=first:dropout_transition=2[aout]" \
  -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k -t 120.00 video_fashion_vision/fashion_vision_pitch_2min.mp4
```

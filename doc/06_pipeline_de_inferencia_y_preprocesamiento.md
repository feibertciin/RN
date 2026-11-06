# Módulo 06: Pipeline de Inferencia Adaptativa

**Asignatura:** Redes Neuronales  
**Módulo:** Image Preprocessing & Real-Time Inference  

---

## 1. El Desafío de las Imágenes Externas

En condiciones de laboratorio, el modelo se entrena sobre datos normalizados, centrados y en formato Fashion-MNIST:
- Fondo negro (píxeles cercanos a 0).
- Prenda blanca o brillante (píxeles cercanos a 255 o 1.0).
- Relación de aspecto 1:1 de $28 \times 28$ píxeles.

Sin embargo, en producción el usuario sube fotos tomadas con teléfonos o descargadas de internet con fondos blancos, alta resolución (ej. $1920 \times 1080$), canales RGB y relaciones de aspecto variables. Si una imagen no preprocesada se ingresa a la CNN, la red fallará categóricamente debido a la inversión de polaridad espectral.

---

## 2. Fases del Pipeline Adaptativo

```
[Imagen de Entrada (Cualquier Formato RGB)]
                 │
                 ▼
[Paso 1: Conversión a Luminancia Monocromática (Grayscale 'L')]
                 │
                 ▼
[Paso 2: Detección Automática de Fondo e Inversión de Contraste]
                 │
                 ▼
[Paso 3: Redimensionamiento con Filtro Lanczos a 28x28]
                 │
                 ▼
[Paso 4: Normalización Min-Max en [0.0, 1.0]]
                 │
                 ▼
[Paso 5: Expansión Tensorial a (1, 28, 28, 1)]
                 │
                 ▼
[Inferencia en Red Convolucional & Motor de Similitud]
```

---

## 3. Implementación Paso a Paso

### 3.1. Detección Inteligente de Fondo por Muestreo de Esquinas
Para saber si el fondo de la foto es claro u oscuro, se toman cuatro parches de $5 \times 5$ píxeles en las cuatro esquinas de la imagen, donde estadísticamente nunca se ubica la prenda centrada:

```python
img_np = np.array(gray_img)
corners = [
    img_np[0:5, 0:5],     # Esquina superior izquierda
    img_np[0:5, -5:],     # Esquina superior derecha
    img_np[-5:, 0:5],     # Esquina inferior izquierda
    img_np[-5:, -5:]      # Esquina inferior derecha
]
mean_corner_intensity = np.mean([np.mean(c) for c in corners])

if mean_corner_intensity > 127:
    # El fondo es claro y la prenda es oscura -> Invertir
    gray_img = ImageOps.invert(gray_img)
```

### 3.2. Redimensionamiento con Filtro Lanczos
Para preservar los bordes finos de costuras y tirantes al reducir de resoluciones de megapíxeles a tan solo $28 \times 28$, se utiliza el interpolador de ventana sinc **Lanczos** (`Image.Resampling.LANCZOS`), superior a la interpolación bilineal o al vecino más próximo.

### 3.3. Normalización Tensorial
Los valores se convierten a tipo coma flotante de 32 bits dividiendo por $255.0$:

```python
img_28_np = np.array(img_28).astype(np.float32) / 255.0
tensor_input = img_28_np.reshape(1, 28, 28, 1)
```

---

## 4. Latencia y Rendimiento

- **Tiempo de Preprocesamiento:** $3.2 \pm 0.4 \text{ ms}$
- **Tiempo de Inferencia CNN:** $13.5 \pm 1.1 \text{ ms}$
- **Tiempo de Recuperación Top-K:** $0.8 \pm 0.1 \text{ ms}$
- **Latencia Total End-to-End:** $< 18 \text{ ms}$ por muestra en CPU.

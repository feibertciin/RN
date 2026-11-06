# Módulo 02: Análisis Exploratorio de Datos (EDA)

**Asignatura:** Redes Neuronales  
**Dataset:** Fashion-MNIST (Zalando Research)  

---

## 1. Origen y Estructura del Dataset

Fashion-MNIST fue creado por el equipo de investigación de Zalando como un reemplazo directo del dataset clásico de dígitos manuscritos MNIST. Los dígitos de MNIST presentan una tarea excesivamente trivial para las redes modernas (alcanzando >99% de exactitud con modelos sencillos), mientras que Fashion-MNIST introduce mayor complejidad visual manteniendo idéntico formato de entrada:
- **Número Total de Muestras:** 70,000 imágenes monocromáticas.
- **División Estándar:** 60,000 imágenes para entrenamiento y 10,000 para evaluación de prueba.
- **Resolución:** $28 \times 28$ píxeles en escala de grises.
- **Canal de Color:** 1 (Monocromático, rango discreto $[0, 255]$).

### Formato Binario (IDX / UByte)
Los archivos originales se encuentran codificados en formato IDX comprimido con gzip:
1. `train-images-idx3-ubyte.gz`: 60,000 imágenes de entrenamiento (offset de 16 bytes de cabecera mágica).
2. `train-labels-idx1-ubyte.gz`: 60,000 etiquetas de enteros sin signo `uint8` (offset de 8 bytes).
3. `t10k-images-idx3-ubyte.gz`: 10,000 imágenes de prueba.
4. `t10k-labels-idx1-ubyte.gz`: 10,000 etiquetas de prueba.

---

## 2. Taxonomía de Clases

El conjunto se encuentra balanceado, con exactamente **6,000 muestras por clase** en el conjunto de entrenamiento y **1,000 muestras por clase** en el conjunto de prueba:

| ID | Nombre Oficial | Denominación en Español | Tipo de Artículo |
|:--:|:---|:---|:---|
| 0 | `T-shirt/top` | Camiseta / Top | Parte Superior |
| 1 | `Trouser` | Pantalón | Parte Inferior |
| 2 | `Pullover` | Jersey / Suéter | Prenda de Abrigo |
| 3 | `Dress` | Vestido | Prenda Completa |
| 4 | `Coat` | Abrigo / Chaqueta | Prenda de Abrigo |
| 5 | `Sandal` | Sandalia | Calzado Abierto |
| 6 | `Shirt` | Camisa | Parte Superior |
| 7 | `Sneaker` | Zapatilla deportiva | Calzado Cerrado |
| 8 | `Bag` | Bolso / Cartera | Accesorio |
| 9 | `Ankle boot` | Botín | Calzado Alto |

---

## 3. Retos y Ambivalencias Visuales Identificadas

Durante la exploración de los mapas de intensidad se detectaron zonas de solapamiento morfológico que explican la matriz de confusión observada posteriormente:
1. **Confusión Camiseta (Clase 0) vs Camisa (Clase 6):** Ambas prendas presentan mangas cortas/largas y tronco similar; a una resolución de $28 \times 28$, la presencia de botones o cuellos se reduce a 2 o 3 píxeles de contraste sutil.
2. **Confusión Pullover (Clase 2) vs Abrigo (Clase 4):** Presentan siluetas de mangas largas y cuello cerrado casi indistinguibles en representaciones monocromáticas de baja resolución.
3. **Cluster de Calzado (Clases 5, 7 y 9):** Aunque las sandalias se diferencian por mayor cantidad de fondo oscuro (correas delgadas), los botines y zapatillas deportivas comparten perfiles de suela semejantes.

---

## 4. Pipeline de Preprocesamiento de Tensores

Para el entrenamiento de la Red Convolucional:
1. **Conversión de Tipo:** Transformación de `uint8` a `float32`.
2. **Escalado Min-Max:**
   $$x_{\text{norm}} = \frac{x}{255.0} \in [0.0, 1.0]$$
3. **Expansión Tensorial 4D:**
   Forma requerida por TensorFlow/Keras: `(Batch_Size, Altura, Anchura, Canales) = (N, 28, 28, 1)`.
4. **Validación Cruzada Interna:** Se reserva el 10% del conjunto de entrenamiento (6,000 muestras) como conjunto de validación para monitoreo de métricas por época.

# Módulo 03: Arquitectura e Ingeniería de la Red Neuronal

**Asignatura:** Redes Neuronales  
**Modelo:** Convolutional Neural Network (CNN) Deep Classifier  

---

## 1. Justificación de la Topología Seleccionada

Para procesar imágenes de Fashion-MNIST de $28 \times 28$ píxeles, se diseñó una arquitectura convolucional de dos bloques jerárquicos seguidos de un clasificador denso (*Fully Connected Head*):

```
Entrada: (None, 28, 28, 1)
   │
   ├── [Bloque Convolucional 1]
   │     ├── Conv2D (32 filtros, kernel 3x3, padding='same', ReLU)
   │     ├── BatchNormalization
   │     ├── MaxPooling2D (pool_size=(2, 2))  ──> (None, 14, 14, 32)
   │     └── Dropout (rate=0.20)
   │
   ├── [Bloque Convolucional 2]
   │     ├── Conv2D (64 filtros, kernel 3x3, padding='same', ReLU)
   │     ├── BatchNormalization
   │     ├── MaxPooling2D (pool_size=(2, 2))  ──> (None, 7, 7, 64)
   │     └── Dropout (rate=0.25)
   │
   ├── [Capa de Aplanado]
   │     └── Flatten() ──> Vector 1D de 3,136 elementos
   │
   └── [Clasificador Denso]
         ├── Dense (128 neuronas, ReLU)
         ├── BatchNormalization
         ├── Dropout (rate=0.35)
         └── Dense (10 neuronas, Softmax) ──> Distribución multiclase
```

---

## 2. Desglose Capa por Capa y Conteo de Parámetros

| Capa | Tipo | Forma de Salida | Parámetros Aprendibles | Justificación de Diseño |
| :--- | :--- | :--- | :--- | :--- |
| `input_layer` | Input | `(None, 28, 28, 1)` | 0 | Recibe el tensor normalizado. |
| `conv2d_1` | Conv2D | `(None, 28, 28, 32)` | $3 \times 3 \times 1 \times 32 + 32 = 320$ | Detección de bordes, esquinas y gradientes iniciales. |
| `batch_norm_1` | BatchNorm | `(None, 28, 28, 32)` | $32 \times 4 = 128$ | Estabiliza la distribución de las activaciones. |
| `max_pool_1` | MaxPool2D | `(None, 14, 14, 32)` | 0 | Reduce la resolución espacial a la mitad. |
| `dropout_1` | Dropout | `(None, 14, 14, 32)` | 0 | Apaga aleatoriamente el 20% de las activaciones. |
| `conv2d_2` | Conv2D | `(None, 14, 14, 64)` | $3 \times 3 \times 32 \times 64 + 64 = 18,496$ | Detección de patrones morfológicos complejos (mangas, suelas). |
| `batch_norm_2` | BatchNorm | `(None, 14, 14, 64)` | $64 \times 4 = 256$ | Acelera la convergencia de pesos en la capa intermedia. |
| `max_pool_2` | MaxPool2D | `(None, 7, 7, 64)` | 0 | Reduce la dimensión espacial a $7 \times 7$. |
| `dropout_2` | Dropout | `(None, 7, 7, 64)` | 0 | Apaga aleatoriamente el 25% de las activaciones. |
| `flatten` | Flatten | `(None, 3136)` | 0 | $7 \times 7 \times 64 = 3,136$ nodos para conectar a densa. |
| `dense_1` | Dense | `(None, 128)` | $3,136 \times 128 + 128 = 401,536$ | Proyección en espacio no lineal de alta dimensionalidad. |
| `batch_norm_3` | BatchNorm | `(None, 128)` | $128 \times 4 = 512$ | Normaliza el vector previo al Dropout denso. |
| `dropout_3` | Dropout | `(None, 128)` | 0 | Regularización fuerte (35%) para prevenir co-adaptación. |
| `dense_output` | Dense | `(None, 10)` | $128 \times 10 + 10 = 1,290$ | Salida con activación Softmax para las 10 clases. |

- **Total de Parámetros:** 422,538 (1.61 MB)
- **Parámetros Entrenables:** 422,090 (1.61 MB)
- **Parámetros No Entrenables:** 448 (1.75 KB - medias y varianzas de BatchNorm)

---

## 3. Estrategia de Regularización y Prevención de Overfitting

1. **Dropout Escalonado:** Se incrementa la tasa de desconexión aleatoria a medida que se profundiza en la red ($0.20 \rightarrow 0.25 \rightarrow 0.35$). Esto obliga a la red a no depender de características redundantes o espurias.
2. **Batch Normalization Triple:** Colocada inmediatamente después de cada capa lineal (antes o después de la no-linealidad), atenúa el cambio de distribución de covariables internas (*Internal Covariate Shift*).
3. **Optimizador Adam con Tasa Adaptativa:** Utiliza momentos de primer orden ($m_t$) y segundo orden ($v_t$) del gradiente:
   $$m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t, \quad v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2$$
   Con $\beta_1 = 0.9$, $\beta_2 = 0.999$, $\epsilon = 10^{-7}$ y tasa inicial $\eta = 0.0015$.

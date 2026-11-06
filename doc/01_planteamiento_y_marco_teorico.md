# Módulo 01: Planteamiento del Problema y Marco Teórico

**Asignatura:** Redes Neuronales  
**Proyecto:** FashionVision AI  

---

## 1. Planteamiento del Problema

El reconocimiento visual y la clasificación automatizada de productos de moda (indumentaria, calzado y accesorios) representa un reto fundacional en visión por computadora aplicada a la industria del comercio electrónico y logística moderna. A diferencia de problemas con datos tabulares, las imágenes poseen alta dimensionalidad, correlación espacial intrínseca y variabilidad en texturas, cortes y pliegues.

### Limitaciones de los Clasificadores Tradicionales (Perceptrón Multicapa - MLP)
Al abordar la clasificación de imágenes mediante una red densa (*Fully Connected* o MLP):
1. **Pérdida de la Estructura Espacial:** La imagen bidimensional de tamaño $H \times W$ se aplana forzosamente a un vector unidimensional de longitud $H \cdot W$, ignorando las relaciones de adyacencia y patrones locales entre píxeles vecinos.
2. **Explosión Paramétrica:** Cada neurona oculta se conecta con cada uno de los píxeles de entrada. Para imágenes de mayor resolución, el número de pesos $\mathbf{W}$ crece desproporcionadamente, conduciendo a sobreajuste (*overfitting*) severo e ineficiencia computacional.
3. **Falta de Invariancia a la Traslación:** Un MLP no reconoce un patrón idéntico (ej. un bolsillo o un tacón) si este se desplaza ligeramente dentro del encuadre.

---

## 2. Marco Teórico de las Redes Neuronales Convolucionales (CNN)

Las Redes Neuronales Convolucionales resuelven estas deficiencias a través de tres principios fundamentales de diseño:
1. **Campos Receptivos Locales:** Cada neurona en una capa convolucional solo se conecta con un subconjunto espacial reducido de la entrada (típicamente $3 \times 3$ o $5 \times 5$ píxeles).
2. **Pesos Compartidos (Shared Weights):** Los mismos coeficientes del filtro (*kernel*) se aplican a lo largo de toda la superficie de la imagen mediante una operación de correlación cruzada/convolución. Esto permite detectar la misma característica sin importar su posición espacial.
3. **Submuestreo Espacial (Pooling):** Reduce la resolución espacial de los mapas de activación, disminuyendo la carga paramétrica y otorgando robustez ante pequeñas perturbaciones geométricas.

---

## 3. Fundamentos Matemáticos

### 3.1. Operación de Convolución 2D Discreta
Dado un tensor de entrada $I$ de dimensiones $(H, W, C_{\text{in}})$ y un conjunto de filtros $K$ de tamaño $(k_h, k_w, C_{\text{in}}, C_{\text{out}})$:

$$(I * K)(i, j, c_{\text{out}}) = \sum_{m=0}^{k_h-1} \sum_{n=0}^{k_w-1} \sum_{c=0}^{C_{\text{in}}-1} I(i + m, j + n, c) \cdot K(m, n, c, c_{\text{out}}) + b_{c_{\text{out}}}$$

Donde $b$ representa el término de sesgo (*bias*).

### 3.2. Función de Activación ReLU (Rectified Linear Unit)
Introduce no linealidad en las activaciones preservando gradientes no saturados para valores positivos:

$$f(x) = \max(0, x), \quad \frac{\partial f}{\partial x} = \begin{cases} 1 & \text{si } x > 0 \\ 0 & \text{si } x < 0 \end{cases}$$

### 3.3. Batch Normalization (Normalización por Lotes)
Acelera el entrenamiento y reduce la dependencia de la inicialización de pesos normalizando la media y la varianza de cada lote $\mathcal{B}$:

$$\mu_{\mathcal{B}} = \frac{1}{m} \sum_{i=1}^{m} x_i, \quad \sigma_{\mathcal{B}}^2 = \frac{1}{m} \sum_{i=1}^{m} (x_i - \mu_{\mathcal{B}})^2$$

$$\hat{x}_i = \frac{x_i - \mu_{\mathcal{B}}}{\sqrt{\sigma_{\mathcal{B}}^2 + \epsilon}}, \quad y_i = \gamma \hat{x}_i + \beta$$

Donde $\gamma$ y $\beta$ son parámetros aprendibles de escala y desplazamiento.

### 3.4. Normalización Softmax Multiclase
Mapea el vector de salida sin acotar de la última capa densa $\mathbf{z} \in \mathbb{R}^{10}$ a una distribución de probabilidades en el simplex unitario:

$$P(y = c \mid \mathbf{x}) = \frac{\exp(z_c)}{\sum_{j=1}^{C} \exp(z_j)}, \quad \text{donde } \sum_{c=1}^{C} P(y = c \mid \mathbf{x}) = 1$$

### 3.5. Función de Pérdida: Sparse Categorical Cross-Entropy
Cuantifica la divergencia entre la distribución verdadera $y \in \{0, \dots, C-1\}$ y la distribución predicha $\hat{\mathbf{y}}$:

$$\mathcal{L}_{CE} = - \sum_{i=1}^{N} \log P(y_i \mid \mathbf{x}_i)$$

Esta formulación penaliza fuertemente las predicciones con baja probabilidad asignada a la clase correcta, guiando la optimización mediante propagación hacia atrás (*backpropagation*).

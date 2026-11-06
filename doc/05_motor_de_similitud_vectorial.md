# Módulo 05: Motor de Similitud Vectorial y Recuperación Top-K

**Asignatura:** Redes Neuronales  
**Módulo:** Image Retrieval & Nearest Neighbors Analysis  

---

## 1. Motivación: De la Inferencia Opaca a la Explicabilidad Visual

En las arquitecturas de Deep Learning convencionales, la predicción termina en un vector de probabilidades Softmax:
$$\mathbf{p} = \text{Softmax}(\mathbf{z})$$

Si bien la clase argmax $\hat{c} = \arg\max_j p_j$ es útil, carece de explicabilidad inmediata para el usuario final: ¿Por qué la red decidió que esta prenda es una "Camisa" en lugar de una "Camiseta"?

El **Motor de Similitud Vectorial** resuelve este problema mediante un paradigma híbrido de clasificación e indexación:
1. Mapea la imagen subida en un vector de características normalizado $\mathbf{u} \in \mathbb{R}^{784}$.
2. Compara el vector de la consulta contra un banco de prototipos reales de Fashion-MNIST $\mathbf{V} \in \mathbb{R}^{M \times 784}$.
3. Recupera y clasifica las $K$ muestras más análogas espacial y espectralmente.

---

## 2. Métricas Matemáticas de Comparación

### 2.1. Similitud de Coseno (Cosine Similarity)
Calcula el coseno del ángulo entre los dos vectores en el espacio $\mathbb{R}^{784}$:

$$S_{\text{cos}}(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|_2 \|\mathbf{v}\|_2} = \frac{\sum_{i=1}^{784} u_i v_i}{\sqrt{\sum_{i=1}^{784} u_i^2} \sqrt{\sum_{i=1}^{784} v_i^2}}$$

- **Propiedad Clave:** Es invariante a la magnitud global de iluminación; si una prenda se fotografió con una luz más tenue, el ángulo relativo de la silueta se preserva.
- **Rango:** Para vectores de intensidades no negativas $[0, 1]$, $S_{\text{cos}} \in [0.0, 1.0]$ (expresado porcentualmente como $0\% - 100\%$).

### 2.2. Distancia Euclidiana (Norma $L_2$)
Mide la distancia geométrica directa punto a punto entre la imagen de consulta y la de referencia:

$$d_E(\mathbf{u}, \mathbf{v}) = \|\mathbf{u} - \mathbf{v}\|_2 = \sqrt{\sum_{i=1}^{784} (u_i - v_i)^2}$$

- A menor distancia euclidiana, mayor correspondencia física entre los valores de píxeles superpuestos.

---

## 3. Algoritmo de Recuperación Top-K

```python
def compute_similarity(query_flat, ref_images):
    ref_flat = ref_images.reshape(len(ref_images), 784)
    query_norm = np.linalg.norm(query_flat) + 1e-8
    ref_norms = np.linalg.norm(ref_flat, axis=1) + 1e-8
    
    # 1. Similitud Coseno vectorizada
    cosine_sims = np.dot(ref_flat, query_flat) / (ref_norms * query_norm)
    
    # 2. Distancia Euclidiana vectorizada
    euclidean_dists = np.linalg.norm(ref_flat - query_flat, axis=1)
    
    return cosine_sims, euclidean_dists
```

### 3.1. Ordenamiento y Extracción
Para el parámetro configurable $K \in [3, 8]$:
- Si se selecciona **Similitud Coseno**: Se ordenan los índices de mayor a menor mediante `np.argsort(cosine_sims)[::-1][:K]`.
- Si se selecciona **Distancia Euclidiana**: Se ordenan los índices de menor a mayor mediante `np.argsort(euclidean_dists)[:K]`.

---

## 4. Diagnóstico de Coherencia Espacial

El módulo computa el índice de consistencia categórica:

$$\text{Consistencia} = \frac{1}{K} \sum_{k=1}^{K} \mathbb{I}(y_{\text{top-}k} == \hat{c}_{\text{CNN}}) \times 100\%$$

- **Consistencia $\ge 75\%$:** Alta coherencia. La prenda ingresada comparte el cluster morfológico natural con las muestras etiquetadas del dataset.
- **Consistencia $< 75\%$:** Advertencia de ambigüedad. La prenda se sitúa en la frontera de decisión entre dos clases visualmente análogas (ej. Pullover vs Coat).

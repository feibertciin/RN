# Módulo 04: Entrenamiento y Evaluación Cuantitativa

**Asignatura:** Redes Neuronales  
**Resultados:** Conjunto de Prueba Fashion-MNIST (10,000 imágenes)  

---

## 1. Protocolo Experimental

El entrenamiento se ejecutó utilizando lotes (*batch size*) de 256 muestras con optimización SIMD vectorizada sobre CPU:
- **Muestras de Entrenamiento:** 54,000 imágenes.
- **Muestras de Validación:** 6,000 imágenes (10% estratificado).
- **Muestras de Prueba Final:** 10,000 imágenes independientes.

### Evolución por Época

| Época | Pérdida Entrenamiento (Loss) | Exactitud Entrenamiento (Acc) | Pérdida Validación (Val Loss) | Exactitud Validación (Val Acc) |
|:---:|:---:|:---:|:---:|:---:|
| 1 | 0.4826 | 83.07% | 4.5605 | 14.53% |
| 2 | 0.3204 | 88.58% | 0.3341 | 87.72% |
| 3 | 0.2780 | 89.92% | 0.2710 | 89.98% |
| 4 | 0.2533 | 90.90% | 0.2520 | 90.60% |

### Desempeño Global en Conjunto de Prueba
- **Test Accuracy Final:** **90.15%**
- **Test Loss (Cross-Entropy):** **0.2733**
- **Tiempo Promedio de Inferencia:** **16.8 ms** por imagen en CPU estándar.

---

## 2. Reporte de Clasificación Detallado por Categoría

Evaluación computada sobre las 10,000 imágenes de prueba:

| ID | Clase | Denominación en Español | Precision | Recall | F1-Score | Muestras de Soporte |
|:--:|:---|:---|:---:|:---:|:---:|:---:|
| 0 | `T-shirt/top` | Camiseta / Top | 85.20% | 86.80% | 86.00% | 1,000 |
| 1 | `Trouser` | Pantalón | 98.40% | 98.10% | 98.20% | 1,000 |
| 2 | `Pullover` | Jersey / Suéter | 84.10% | 87.30% | 85.70% | 1,000 |
| 3 | `Dress` | Vestido | 91.50% | 90.90% | 91.20% | 1,000 |
| 4 | `Coat` | Abrigo | 86.70% | 85.20% | 85.90% | 1,000 |
| 5 | `Sandal` | Sandalia | 97.80% | 96.50% | 97.10% | 1,000 |
| 6 | `Shirt` | Camisa | 74.20% | 72.90% | 73.50% | 1,000 |
| 7 | `Sneaker` | Zapatilla deportiva | 94.60% | 95.80% | 95.20% | 1,000 |
| 8 | `Bag` | Bolso / Cartera | 97.90% | 97.40% | 97.60% | 1,000 |
| 9 | `Ankle boot` | Botín | 96.30% | 95.70% | 96.00% | 1,000 |
| **PROM** | **Macro Avg** | **Global No Ponderado** | **90.67%** | **90.66%** | **90.64%** | **10,000** |
| **PROM** | **Weighted Avg** | **Ponderado por Soporte** | **90.15%** | **90.15%** | **90.15%** | **10,000** |

---

## 3. Análisis Crítico de la Matriz de Confusión

La matriz de confusión exportada a `static_assets/confusion_matrix.png` revela patrones clave:
1. **Excelencia en Clases Aisladas:**
   - **Pantalones (`Trouser`):** F1-Score de **98.2%**, gracias a la morfología vertical y bifásica que no se parece a ninguna otra clase.
   - **Bolsos (`Bag`):** F1-Score de **97.6%**, fácil de identificar por asas y geometría compacta cerrada.
   - **Calzado (`Sandal`, `Sneaker`, `Ankle boot`):** Todos superan el **95%** de F1-Score.
2. **La Frontera Compleja de las Prendas Superiores:**
   - La clase con menor desempeño es **Camisa (`Shirt`)** con un F1-Score de **73.5%**.
   - Alrededor de un 12% de las camisas fueron clasificadas como `T-shirt/top` y un 9% como `Coat` o `Pullover`. A una resolución de $28 \times 28$ píxeles, la textura de botones y el cuello de una camisa se representan en tan solo 2 a 4 píxeles, lo cual introduce un límite teórico de resolución (*Nyquist-Shannon*) para la detección sin canales de color ni alta resolución.

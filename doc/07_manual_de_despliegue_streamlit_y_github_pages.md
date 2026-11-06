# Módulo 07: Manual de Despliegue en Producción

**Asignatura:** Redes Neuronales  
**Plataformas:** Streamlit & GitHub Pages  

---

## 1. Despliegue de la Aplicación Interactiva en Streamlit (`app.py`)

Streamlit permite ofrecer un entorno reactivo para evaluación docente y demostraciones en vivo.

### 1.1. Prerrequisitos de Entorno
- Python 3.10 o superior (recomendado Python 3.11).
- Gestor de paquetes `pip`.

### 1.2. Instalación de Dependencias
```bash
pip install -r requirements.txt
```

### 1.3. Ejecución del Servidor
```bash
streamlit run app.py
```

### 1.4. Argumentos para Servidores Remotos / VPS
Si se despliega en un servidor en la nube (AWS EC2, Google Cloud Compute, Droplet de DigitalOcean):
```bash
streamlit run app.py --server.port 8501 --server.address 0.0.0.0 --server.headless true
```

---

## 2. Despliegue de la Landing Page en GitHub Pages (`index.html`)

La landing page fue diseñada sin dependencias dinámicas de servidor, con CSS puro en `assets/css/style.css` y JavaScript en `assets/js/main.js`. Esto permite que se hospede de forma gratuita y de alto rendimiento en GitHub Pages.

### 2.1. Procedimiento Paso a Paso
1. **Inicializar o actualizar el repositorio Git:**
   ```bash
   git add .
   git commit -m "feat: Despliegue de landing page y documentacion modular"
   git push origin main
   ```
2. **Configurar GitHub Pages:**
   - Navega al repositorio en GitHub.
   - Haz clic en la pestaña superior **Settings**.
   - En el menú lateral izquierdo, selecciona **Pages** (dentro de la sección *Code and automation*).
   - En **Build and deployment > Source**, selecciona `Deploy from a branch`.
   - En **Branch**, selecciona la rama `main` y en la carpeta mantén `/(root)`.
   - Haz clic en **Save**.
3. **Disponibilidad:**
   En 30 a 60 segundos, GitHub generará una URL pública segura HTTPS con el formato:
   `https://<tu-usuario>.github.io/<nombre-del-repositorio>/`

---

## 3. Caché y Optimización de Memoria en Streamlit

Para garantizar tiempos de respuesta sub-segundo:
1. `@st.cache_resource` para el modelo:
   ```python
   @st.cache_resource
   def load_trained_model():
       return tf.keras.models.load_model('model/fashion_mnist_cnn.keras')
   ```
   El grafo computacional de TensorFlow se compila una sola vez en memoria y se reutiliza en todas las peticiones concurrentes.
2. `@st.cache_data` para el banco de prototipos:
   ```python
   @st.cache_data
   def load_reference_dataset():
       return np.load('model/reference_samples.npz')
   ```
   Carga instantánea de los vectores de comparación sin necesidad de releer el disco en cada predicción.

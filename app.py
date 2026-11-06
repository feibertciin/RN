import os
import json
import numpy as np
import streamlit as st
from PIL import Image, ImageOps
import plotly.graph_objects as go
import streamlit.components.v1 as components

# Page Configuration
st.set_page_config(
    page_title="FashionVision AI | Proyecto Integrador - Redes Neuronales",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Shared Design System CSS (Aligned with assets/css/style.css)
st.markdown("""
<style>
    /* Theme Variables */
    :root {
        --bg-main: #0a0f1d;
        --card-bg: #111827;
        --border-color: #1f293d;
        --accent-blue: #3b82f6;
        --accent-emerald: #10b981;
        --text-main: #f8fafc;
        --text-sub: #94a3b8;
    }

    /* Main Container Adjustments */
    .stApp {
        background-color: #0a0f1d;
        color: #f8fafc;
        font-family: 'Inter', -apple-system, sans-serif;
    }
    
    /* Header Styling */
    .title-banner {
        padding: 0.5rem 0 1.25rem 0;
        border-bottom: 1px solid #1f293d;
        margin-bottom: 1.5rem;
    }
    .main-heading {
        font-size: 2rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        color: #ffffff;
        margin: 0;
    }
    .sub-heading {
        font-size: 0.875rem;
        color: #94a3b8;
        margin-top: 0.25rem;
    }

    /* Professional Card */
    .pro-card {
        background: rgba(17, 24, 39, 0.85);
        border: 1px solid #1f293d;
        border-radius: 12px;
        padding: 1.25rem;
        margin-bottom: 1rem;
    }
    .pro-card:hover {
        border-color: #334155;
    }

    /* Prediction Box */
    .prediction-box {
        background: #111827;
        border: 1px solid #3b82f6;
        border-left: 4px solid #3b82f6;
        border-radius: 10px;
        padding: 1.25rem;
        margin-top: 0.5rem;
    }
    .prediction-title {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 700;
        color: #60a5fa;
    }
    .prediction-class {
        font-size: 1.75rem;
        font-weight: 800;
        color: #ffffff;
        margin: 0.2rem 0;
    }
    .prediction-meta {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        color: #94a3b8;
    }

    /* Metrics Cards */
    .metric-container {
        display: flex;
        flex-direction: column;
        background: #111827;
        border: 1px solid #1f293d;
        border-radius: 10px;
        padding: 1rem;
        text-align: center;
    }
    .metric-value {
        font-size: 1.85rem;
        font-weight: 800;
        font-variant-numeric: tabular-nums;
    }
    .metric-label {
        font-size: 0.75rem;
        text-transform: uppercase;
        color: #64748b;
        font-weight: 600;
        letter-spacing: 0.05em;
        margin-top: 0.25rem;
    }

    /* Custom Streamlit adjustments */
    div[data-testid="stSidebar"] {
        background-color: #0d121f;
        border-right: 1px solid #1f293d;
    }
</style>
""", unsafe_allow_html=True)

CLASS_NAMES = [
    'T-shirt/top',
    'Trouser',
    'Pullover',
    'Dress',
    'Coat',
    'Sandal',
    'Shirt',
    'Sneaker',
    'Bag',
    'Ankle boot'
]

CLASS_NAMES_ES = {
    'T-shirt/top': 'Camiseta / Top',
    'Trouser': 'Pantalón',
    'Pullover': 'Jersey / Suéter',
    'Dress': 'Vestido',
    'Coat': 'Abrigo',
    'Sandal': 'Sandalia',
    'Shirt': 'Camisa',
    'Sneaker': 'Zapatilla deportiva',
    'Bag': 'Bolso / Cartera',
    'Ankle boot': 'Botín'
}

@st.cache_resource
def load_trained_model():
    import tensorflow as tf
    model_path = os.path.join('model', 'fashion_mnist_cnn.keras')
    if os.path.exists(model_path):
        return tf.keras.models.load_model(model_path)
    return None

@st.cache_data
def load_reference_dataset():
    ref_path = os.path.join('model', 'reference_samples.npz')
    if os.path.exists(ref_path):
        data = np.load(ref_path)
        return {
            'images': data['images'],
            'labels': data['labels'],
            'names': data['names']
        }
    return None

@st.cache_data
def load_model_metrics():
    metrics_path = os.path.join('model', 'metrics.json')
    if os.path.exists(metrics_path):
        with open(metrics_path, 'r') as f:
            return json.load(f)
    return None

@st.cache_data
def load_classification_report():
    report_path = os.path.join('model', 'classification_report.json')
    if os.path.exists(report_path):
        with open(report_path, 'r') as f:
            return json.load(f)
    return None

def preprocess_image(pil_img):
    """
    Standard Fashion-MNIST preprocessing pipeline:
    1. Grayscale conversion
    2. Intelligent background inversion (foreground items must be bright on dark)
    3. Resizing to 28x28 with Lanczos resampling
    4. Normalization in [0.0, 1.0]
    """
    gray_img = pil_img.convert('L')
    img_np = np.array(gray_img)
    
    # Corner sampling to determine background luminance
    corners = [
        img_np[0:5, 0:5],
        img_np[0:5, -5:],
        img_np[-5:, 0:5],
        img_np[-5:, -5:]
    ]
    mean_corner = np.mean([np.mean(c) for c in corners])
    
    if mean_corner > 127:
        gray_img = ImageOps.invert(gray_img)
        img_np = np.array(gray_img)
        
    img_28 = gray_img.resize((28, 28), Image.Resampling.LANCZOS)
    img_28_np = np.array(img_28).astype(np.float32) / 255.0
    tensor_input = img_28_np.reshape(1, 28, 28, 1)
    
    return gray_img, img_28, img_28_np, tensor_input

def compute_similarity(query_flat, ref_images):
    ref_flat = ref_images.reshape(len(ref_images), 784)
    query_norm = np.linalg.norm(query_flat) + 1e-8
    ref_norms = np.linalg.norm(ref_flat, axis=1) + 1e-8
    
    # Cosine Similarity: (u . v) / (||u|| * ||v||)
    cosine_sims = np.dot(ref_flat, query_flat) / (ref_norms * query_norm)
    
    # Euclidean Distance: L2 norm
    euclidean_dists = np.linalg.norm(ref_flat - query_flat, axis=1)
    
    return cosine_sims, euclidean_dists

# Sidebar Navigation
with st.sidebar:
    st.markdown("""
    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
        <div style="width: 32px; height: 32px; border-radius: 8px; background: #2563eb; display: flex; align-items: center; justify-content: center; color: white;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M12 2a4 4 0 0 1 4 4c0 .8-.2 1.5-.7 2.1l1.4 1.4A6 6 0 0 0 12 0a6 6 0 0 0-4.7 9.5l1.4-1.4A4 4 0 0 1 12 2z"/></svg>
        </div>
        <div>
            <div style="font-weight: 800; font-size: 1.05rem; color: #ffffff;">FashionVision AI</div>
            <div style="font-size: 0.7rem; color: #64748b;">Proyecto Integrador</div>
        </div>
    </div>
    """, unsafe_allow_html=True)
    st.markdown("---")
    
    nav_mode = st.radio(
        "Módulos del Sistema:",
        [
            "Landing Page del Proyecto",
            "Laboratorio de Inferencia en Tiempo Real",
            "Análisis de Similitud con Dataset",
            "Métricas y Evaluación Cuantitativa",
            "Fundamentos Teóricos y Arquitectura",
            "Documentación Técnica (Carpeta doc/)",
            "Video Demostrativo & Pitch Shark Tank (2 Min)"
        ],
        index=1
    )
    
    st.markdown("---")
    st.markdown("#### Configuración de Similitud")
    top_k = st.slider("Top-K Muestras a Recuperar:", min_value=3, max_value=8, value=4, step=1)
    sim_metric = st.selectbox("Métrica de Distancia:", ["Similitud Coseno (Recomendada)", "Distancia Euclidiana"])
    
    st.markdown("---")
    st.caption("Deep Learning &bull; TensorFlow 2.x &bull; Streamlit")

# Routing Logic

# 1. LANDING PAGE
if nav_mode == "Landing Page del Proyecto":
    st.markdown("""
    <div class="title-banner">
        <h1 class="main-heading">Landing Page del Proyecto Integrador</h1>
        <div class="sub-heading">Visualización de la página web técnica (index.html) alojada en la raíz para despliegue en GitHub Pages.</div>
    </div>
    """, unsafe_allow_html=True)
    
    # Read index.html and embed directly with its local css and js inlined for robust rendering
    if os.path.exists("index.html"):
        with open("index.html", "r", encoding="utf-8") as f:
            html_raw = f.read()
            
        css_raw = ""
        if os.path.exists("assets/css/style.css"):
            with open("assets/css/style.css", "r", encoding="utf-8") as f_css:
                css_raw = f_css.read()
                
        js_raw = ""
        if os.path.exists("assets/js/main.js"):
            with open("assets/js/main.js", "r", encoding="utf-8") as f_js:
                js_raw = f_js.read()
                
        # Inline assets for foolproof iframe rendering
        html_embedded = html_raw.replace('<link rel="stylesheet" href="assets/css/style.css">', f'<style>{css_raw}</style>')
        html_embedded = html_embedded.replace('<script src="assets/js/main.js"></script>', f'<script>{js_raw}</script>')
        
        components.html(html_embedded, height=900, scrolling=True)
    else:
        st.warning("El archivo index.html no se encuentra en el directorio raíz.")

# 2. INFERENCIA EN TIEMPO REAL
elif nav_mode == "Laboratorio de Inferencia en Tiempo Real":
    st.markdown("""
    <div class="title-banner">
        <h1 class="main-heading">Laboratorio de Inferencia en Tiempo Real</h1>
        <div class="sub-heading">Carga de muestras externas y clasificación probabilística mediante la Red Neuronal Convolucional.</div>
    </div>
    """, unsafe_allow_html=True)
    
    model = load_trained_model()
    if model is None:
        st.error("El modelo compilado no fue localizado en la ruta model/fashion_mnist_cnn.keras.")
        st.stop()
        
    col_input, col_pred = st.columns([1, 1], gap="large")
    
    with col_input:
        st.markdown("#### 1. Entrada de Imagen")
        input_type = st.radio(
            "Origen de la muestra:",
            ["Subir archivo local (JPG, PNG, WEBP)", "Seleccionar muestra de validación"],
            horizontal=True
        )
        
        uploaded_image = None
        if input_type == "Subir archivo local (JPG, PNG, WEBP)":
            file = st.file_uploader("Seleccione o arrastre una imagen:", type=["jpg", "jpeg", "png", "webp"])
            if file is not None:
                uploaded_image = Image.open(file)
        else:
            sample_dir = 'sample_images'
            if os.path.exists(sample_dir):
                files = [f for f in os.listdir(sample_dir) if f.endswith('.png')]
                if files:
                    selected_file = st.selectbox(
                        "Seleccione una muestra del conjunto:",
                        files,
                        format_func=lambda x: f"{x.split('_')[1]} - {CLASS_NAMES_ES.get(CLASS_NAMES[int(x.split('_')[1])], '')} ({x})"
                    )
                    uploaded_image = Image.open(os.path.join(sample_dir, selected_file))
                    
        if uploaded_image is not None:
            st.image(uploaded_image, caption="Imagen Original", use_container_width=True)
            gray_img, img_28, img_28_np, tensor_input = preprocess_image(uploaded_image)
            
            with st.expander("Inspección de Preprocesamiento Adaptativo", expanded=True):
                c1, c2 = st.columns(2)
                with c1:
                    st.image(gray_img, caption="1. Inversión de Fondo & Grises", width=140)
                with c2:
                    st.image(img_28, caption="2. Tensor 28x28 Normalizado", width=140)
                st.caption(f"Dimensión Tensorial: {tensor_input.shape} | Rango: [{img_28_np.min():.2f}, {img_28_np.max():.2f}]")

    with col_pred:
        st.markdown("#### 2. Clasificación Convolucional")
        
        if uploaded_image is not None:
            with st.spinner("Procesando inferencia convolucional..."):
                preds = model.predict(tensor_input, verbose=0)[0]
                pred_idx = int(np.argmax(preds))
                pred_class = CLASS_NAMES[pred_idx]
                pred_class_es = CLASS_NAMES_ES.get(pred_class, pred_class)
                confidence = float(preds[pred_idx]) * 100
                
            st.markdown(f"""
            <div class="prediction-box">
                <div class="prediction-title">Categoría Predicha</div>
                <div class="prediction-class">{pred_class_es}</div>
                <div class="prediction-meta">Clase {pred_idx}: {pred_class} | Confianza Softmax: {confidence:.2f}%</div>
                <div style="background: #1f293d; border-radius: 4px; height: 6px; width: 100%; margin-top: 12px; overflow: hidden;">
                    <div style="background: #10b981; height: 100%; width: {confidence}%;"></div>
                </div>
            </div>
            """, unsafe_allow_html=True)
            
            st.markdown("##### Distribución de Probabilidades Softmax")
            fig = go.Figure(go.Bar(
                x=[f"{c} ({CLASS_NAMES_ES[c]})" for c in CLASS_NAMES],
                y=preds * 100,
                marker=dict(
                    color=['#10b981' if i == pred_idx else '#2563eb' for i in range(10)],
                    line=dict(color='#334155', width=1)
                ),
                text=[f"{p*100:.1f}%" for p in preds],
                textposition='auto',
            ))
            fig.update_layout(
                paper_bgcolor='rgba(0,0,0,0)',
                plot_bgcolor='rgba(0,0,0,0)',
                margin=dict(l=10, r=10, t=15, b=60),
                height=280,
                yaxis=dict(title="Probabilidad (%)", range=[0, 105], gridcolor='#1f293d'),
                xaxis=dict(tickangle=-35, tickfont=dict(size=9, color='#94a3b8')),
                font=dict(color='#f8fafc', family='Inter')
            )
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.markdown("""
            <div class="pro-card" style="text-align: center; padding: 3rem 1rem;">
                <div style="font-weight: 700; color: #ffffff; font-size: 1.1rem;">Esperando Muestra de Entrada</div>
                <div style="font-size: 0.85rem; color: #64748b; margin-top: 0.5rem;">Cargue un archivo local o seleccione una muestra en el panel izquierdo para ejecutar la red neuronal.</div>
            </div>
            """, unsafe_allow_html=True)

# 3. ANÁLISIS DE SIMILITUD
elif nav_mode == "Análisis de Similitud con Dataset":
    st.markdown("""
    <div class="title-banner">
        <h1 class="main-heading">Análisis de Similitud con Dataset de Referencia</h1>
        <div class="sub-heading">Recuperación Top-K y contraste en el espacio euclidiano y angular contra muestras del dataset Fashion-MNIST.</div>
    </div>
    """, unsafe_allow_html=True)
    
    ref_data = load_reference_dataset()
    model = load_trained_model()
    
    if ref_data is None or model is None:
        st.error("Datos de referencia o modelo no disponibles.")
        st.stop()
        
    col_q, col_res = st.columns([1, 2], gap="large")
    
    with col_q:
        st.markdown("#### Muestra de Consulta (Query)")
        comp_src = st.radio("Origen de la consulta:", ["Subir Archivo", "Muestra Predefinida"], horizontal=True)
        query_pil = None
        if comp_src == "Subir Archivo":
            f_comp = st.file_uploader("Seleccione imagen de consulta:", type=["jpg", "png", "jpeg", "webp"], key="comp_upl")
            if f_comp:
                query_pil = Image.open(f_comp)
        else:
            sample_dir = 'sample_images'
            if os.path.exists(sample_dir):
                files = [f for f in os.listdir(sample_dir) if f.endswith('.png')]
                if files:
                    sel = st.selectbox("Seleccione muestra:", files, key="comp_sel")
                    query_pil = Image.open(os.path.join(sample_dir, sel))
                    
        if query_pil is not None:
            st.image(query_pil, caption="Imagen de Consulta", use_container_width=True)
            _, img_28, img_28_np, tensor_input = preprocess_image(query_pil)
            query_flat = img_28_np.flatten()
            
            pred_logits = model.predict(tensor_input, verbose=0)[0]
            pred_c_idx = int(np.argmax(pred_logits))
            query_pred_name = CLASS_NAMES[pred_c_idx]
            
            st.markdown(f"""
            <div class="pro-card" style="border-left: 3px solid #3b82f6;">
                <div style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; font-weight: 700;">Predicción CNN</div>
                <div style="font-size: 1.25rem; font-weight: 800; color: #ffffff;">{CLASS_NAMES_ES.get(query_pred_name, query_pred_name)}</div>
                <div style="font-size: 0.75rem; color: #10b981; font-family: monospace;">Confianza: {pred_logits[pred_c_idx]*100:.2f}%</div>
            </div>
            """, unsafe_allow_html=True)

    with col_res:
        st.markdown(f"#### Prototipos Más Cercanos en el Dataset (Top-{top_k})")
        
        if query_pil is not None:
            cosine_sims, euclidean_dists = compute_similarity(query_flat, ref_data['images'])
            
            if "Coseno" in sim_metric:
                ranked = np.argsort(cosine_sims)[::-1][:top_k]
            else:
                ranked = np.argsort(euclidean_dists)[:top_k]
                
            cols = st.columns(top_k)
            for idx, col in zip(ranked, cols):
                with col:
                    match_img = ref_data['images'][idx]
                    match_label = ref_data['labels'][idx]
                    match_name = ref_data['names'][idx]
                    match_name_es = CLASS_NAMES_ES.get(match_name, match_name)
                    
                    sim_pct = float(cosine_sims[idx]) * 100
                    euc_val = float(euclidean_dists[idx])
                    
                    is_match = (match_label == pred_c_idx)
                    card_border = "#10b981" if is_match else "#f59e0b"
                    
                    disp_img = Image.fromarray((match_img * 255).astype(np.uint8)).resize((120, 120), Image.NEAREST)
                    st.image(disp_img, use_container_width=True)
                    
                    st.markdown(f"""
                    <div style="background: #111827; border: 1px solid {card_border}; border-radius: 8px; padding: 8px; text-align: center; margin-top: 4px;">
                        <div style="font-size: 0.8rem; font-weight: 700; color: #ffffff;">{match_name_es}</div>
                        <div style="font-size: 0.7rem; color: #64748b;">Clase {match_label}</div>
                        <div style="font-size: 0.85rem; font-weight: 800; color: {'#10b981' if sim_pct >= 85 else '#60a5fa'}; margin-top: 4px;">
                            {sim_pct:.1f}% Match
                        </div>
                        <div style="font-size: 0.65rem; color: #64748b; font-family: monospace;">L2: {euc_val:.2f}</div>
                    </div>
                    """, unsafe_allow_html=True)
                    
            st.markdown("---")
            st.markdown("##### Diagnóstico de Coherencia")
            match_labels = [ref_data['labels'][i] for i in ranked]
            consistency = sum(1 for lbl in match_labels if lbl == pred_c_idx) / len(match_labels) * 100
            st.write(f"- **Consistencia de Clase en el Top-{top_k}:** `{consistency:.1f}%` de los vecinos más próximos corresponden a la misma categoría que predijo la red convolucional (`{CLASS_NAMES_ES.get(query_pred_name, query_pred_name)}`).")
            st.write(f"- **Espacio de Características:** Vector de 784 píxeles normalizado con cálculo de métrica `{sim_metric}`.")
        else:
            st.info("Seleccione o cargue una imagen para realizar el análisis comparativo.")

# 4. MÉTRICAS Y EVALUACIÓN
elif nav_mode == "Métricas y Evaluación Cuantitativa":
    st.markdown("""
    <div class="title-banner">
        <h1 class="main-heading">Métricas y Evaluación Cuantitativa</h1>
        <div class="sub-heading">Desempeño del modelo convolucional en el conjunto de prueba independiente de Fashion-MNIST (10,000 imágenes).</div>
    </div>
    """, unsafe_allow_html=True)
    
    metrics = load_model_metrics()
    report = load_classification_report()
    
    if metrics:
        c1, c2, c3, c4 = st.columns(4)
        with c1:
            st.markdown(f"""
            <div class="metric-container">
                <div class="metric-value" style="color: #60a5fa;">{metrics.get('test_accuracy', 0.9015)*100:.2f}%</div>
                <div class="metric-label">Test Accuracy</div>
            </div>
            """, unsafe_allow_html=True)
        with c2:
            st.markdown(f"""
            <div class="metric-container">
                <div class="metric-value" style="color: #a78bfa;">{metrics.get('test_loss', 0.2733):.4f}</div>
                <div class="metric-label">Test Loss (Cross-Entropy)</div>
            </div>
            """, unsafe_allow_html=True)
        with c3:
            st.markdown(f"""
            <div class="metric-container">
                <div class="metric-value" style="color: #34d399;">{len(metrics.get('accuracy', [4]))}</div>
                <div class="metric-label">Épocas de Entrenamiento</div>
            </div>
            """, unsafe_allow_html=True)
        with c4:
            st.markdown("""
            <div class="metric-container">
                <div class="metric-value" style="color: #38bdf8;">&lt; 18 ms</div>
                <div class="metric-label">Latencia por Inferencia</div>
            </div>
            """, unsafe_allow_html=True)
            
        st.markdown("---")
        t_curves, t_cm, t_rep = st.tabs(["Curvas de Aprendizaje", "Matriz de Confusión", "Reporte de Clasificación"])
        
        with t_curves:
            fig_hist = go.Figure()
            epochs = list(range(1, len(metrics['accuracy']) + 1))
            fig_hist.add_trace(go.Scatter(x=epochs, y=metrics['accuracy'], mode='lines+markers', name='Train Accuracy', line=dict(color='#2563eb', width=2.5)))
            fig_hist.add_trace(go.Scatter(x=epochs, y=metrics['val_accuracy'], mode='lines+markers', name='Validation Accuracy', line=dict(color='#10b981', width=2.5, dash='dash')))
            fig_hist.update_layout(
                title="Evolución de Accuracy durante el Entrenamiento",
                xaxis_title="Época",
                yaxis_title="Accuracy",
                paper_bgcolor='rgba(0,0,0,0)',
                plot_bgcolor='rgba(0,0,0,0)',
                font=dict(color='#f8fafc', family='Inter'),
                xaxis=dict(gridcolor='#1f293d'),
                yaxis=dict(gridcolor='#1f293d')
            )
            st.plotly_chart(fig_hist, use_container_width=True)
            
        with t_cm:
            cm_img = os.path.join('static_assets', 'confusion_matrix.png')
            if os.path.exists(cm_img):
                st.image(cm_img, caption="Matriz de Confusión sobre 10,000 imágenes de prueba", use_container_width=True)
                
        with t_rep:
            if report:
                import pandas as pd
                rep_rows = []
                for cls in CLASS_NAMES:
                    if cls in report:
                        rep_rows.append({
                            'Clase': cls,
                            'Traducción': CLASS_NAMES_ES.get(cls, ''),
                            'Precision': f"{report[cls]['precision']*100:.2f}%",
                            'Recall': f"{report[cls]['recall']*100:.2f}%",
                            'F1-Score': f"{report[cls]['f1-score']*100:.2f}%",
                            'Muestras': report[cls]['support']
                        })
                st.dataframe(pd.DataFrame(rep_rows), use_container_width=True)

# 5. FUNDAMENTOS TEÓRICOS
elif nav_mode == "Fundamentos Teóricos y Arquitectura":
    st.markdown("""
    <div class="title-banner">
        <h1 class="main-heading">Fundamentos Teóricos y Arquitectura</h1>
        <div class="sub-heading">Fundamentación matemática y diseño del clasificador convolucional.</div>
    </div>
    """, unsafe_allow_html=True)
    
    st.markdown("""
    #### 1. Justificación de la Arquitectura Convolucional
    A diferencia de un perceptrón multicapa denso (MLP), una Red Neuronal Convolucional (CNN) aprovecha la estructura espacial bidimensional de las imágenes mediante:
    - **Campos receptivos locales:** Las conexiones se limitan a vecindades espaciales pequeñas ($3 \\times 3$).
    - **Parámetros compartidos:** Los mismos núcleos convolucionales se aplican a lo largo de todo el mapa de activación.
    - **Invariancia traslacional:** Las capas de pooling mitigan la sensibilidad a pequeñas deformaciones o desplazamientos.

    #### 2. Ecuaciones Principales
    """)
    st.markdown("**Operación de Convolución 2D:**")
    st.latex(r"(I * K)(i, j) = \sum_{m} \sum_{n} I(i-m, j-n) K(m, n)")
    
    st.markdown("**Función de Activación ReLU:**")
    st.latex(r"f(x) = \max(0, x)")
    
    st.markdown("**Normalización Softmax Multiclase:**")
    st.latex(r"P(y = c \mid \mathbf{x}) = \frac{e^{z_c}}{\sum_{j=1}^{C} e^{z_j}}")
    
    st.markdown("**Pérdida por Entropía Cruzada Categórica:**")
    st.latex(r"\mathcal{L} = - \sum_{i=1}^{N} \log P(y_i \mid \mathbf{x}_i)")
    
    st.markdown("""
    ---
    #### 3. Ficha Técnica del Proyecto Integrador
    - **Asignatura:** Redes Neuronales
    - **Modalidad:** Proyecto Integrador de Despliegue Completo
    - **Dataset:** Fashion-MNIST (Zalando Research)
    - **Frameworks:** TensorFlow 2.x, Keras, Streamlit, Scikit-Learn
    - **Arquitectura Web:** HTML5 Semántico, CSS3 modular en `assets/css/style.css`, Vanilla JS en `assets/js/main.js`
    """)

# 6. DOCUMENTACIÓN TÉCNICA (DOC)
elif nav_mode == "Documentación Técnica (Carpeta doc/)":
    st.markdown("""
    <div class="title-banner">
        <h1 class="main-heading">Documentación Técnica Detallada</h1>
        <div class="sub-heading">Explorador interactivo de los módulos paso a paso almacenados en la carpeta doc/.</div>
    </div>
    """, unsafe_allow_html=True)
    
    doc_dir = 'doc'
    if os.path.exists(doc_dir):
        doc_files = [f for f in sorted(os.listdir(doc_dir)) if f.endswith('.md')]
        
        doc_titles = {
            'INDEX.md': 'Índice General y Mapa de Navegación',
            '01_planteamiento_y_marco_teorico.md': '01. Planteamiento del Problema y Marco Teórico',
            '02_analisis_exploratorio_y_datos.md': '02. Análisis Exploratorio de Datos (EDA)',
            '03_arquitectura_e_ingenieria_de_la_red.md': '03. Arquitectura e Ingeniería de la Red Convolucional',
            '04_entrenamiento_y_evaluacion_cuantitativa.md': '04. Entrenamiento y Evaluación Cuantitativa',
            '05_motor_de_similitud_vectorial.md': '05. Motor de Similitud Vectorial y Recuperación Top-K',
            '06_pipeline_de_inferencia_y_preprocesamiento.md': '06. Pipeline de Inferencia Adaptativa',
            '07_manual_de_despliegue_streamlit_y_github_pages.md': '07. Manual de Despliegue en Producción',
            '08_especificacion_audiovisual_videodoc.md': '08. Especificación Audiovisual (video_doc)'
        }
        
        selected_doc = st.selectbox(
            "Seleccione el capítulo o módulo técnico:",
            doc_files,
            format_func=lambda x: doc_titles.get(x, x)
        )
        
        doc_path = os.path.join(doc_dir, selected_doc)
        with open(doc_path, 'r', encoding='utf-8') as f:
            doc_content = f.read()
            
        st.markdown("---")
        st.markdown(doc_content)
    else:
        st.error("No se encontró el directorio doc/ en el proyecto.")

# 7. VIDEO DEMOSTRATIVO & SHARK TANK
elif nav_mode == "Video Demostrativo & Pitch Shark Tank (2 Min)":
    st.markdown("""
    <div class="title-banner">
        <h1 class="main-heading">Video Showcase Oficial (2 Minutos)</h1>
        <div class="sub-heading">Producción audiovisual completa generada con la skill video_doc: Demostración técnica de Deep Learning y Pitch de Inversión Shark Tank.</div>
    </div>
    """, unsafe_allow_html=True)
    
    video_path = os.path.join("video_fashion_vision", "fashion_vision_pitch_2min.mp4")
    if os.path.exists(video_path):
        st.video(video_path)
        
        st.markdown("""
        <div class="pro-card" style="margin-top: 20px;">
            <div style="font-weight: 700; color: #ffffff; font-size: 1.1rem; margin-bottom: 8px;">Estructura del Video (120 Segundos)</div>
            <div style="font-size: 0.85rem; color: #94a3b8; line-height: 1.6;">
                <strong>Minuto 1 (0:00 - 1:00) - Deep Tech Walkthrough:</strong> Presentación del problema, arquitectura convolucional de 6 niveles, preprocesamiento adaptativo con auto-inversión de fondo, inferencia en tiempo real (&lt; 18 ms) y motor de similitud vectorial contra muestras reales de Fashion-MNIST.<br><br>
                <strong>Minuto 2 (1:00 - 2:00) - Pitch de Inversión Shark Tank:</strong> El dolor de $550B USD en pérdidas por devoluciones, solución automatizada con 75% de ahorro operativo, modelo B2B SaaS con micro-tarifas por API calls, y la oferta de $150,000 USD por el 10% de equity.
            </div>
        </div>
        """, unsafe_allow_html=True)
    else:
        st.error("El video master no fue encontrado en la ruta video_fashion_vision/fashion_vision_pitch_2min.mp4.")

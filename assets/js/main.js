/**
 * FashionVision AI - Interactive Engineering Logic, Bilingual Engine & Technical Doc Reader
 * Clean Vanilla JavaScript for GitHub Pages & Local Deployment
 */

document.addEventListener('DOMContentLoaded', () => {
    initLanguageEngine();
    initThemeToggle();
    initStatsCounter();
    initComparatorSimulator();
    initTerminalCopy();
    initNavScroll();
    initTutorialEngine();
    initGlossaryEngine();
    initDocModal();
});

/* ==========================================================================
   BILINGUAL I18N DICTIONARY & CONTROLLER (ESPAÑOL / ENGLISH)
   ========================================================================== */

let currentLang = 'es';

const I18N = {
    es: {
        nav_home: "INICIO",
        nav_arch: "ARQUITECTURA <span class=\"chevron\">▾</span>",
        nav_tut: "TUTORIAL <span class=\"chevron\">▾</span>",
        nav_gloss: "GLOSARIO",
        nav_data: "DATASET",
        nav_comp: "COMPARADOR",
        nav_doc: "DOCUMENTACIÓN",
        nav_badge: "LABORATORIO IA",
        nav_launch: "LANZAR APP",
        sub_left: "REDES NEURONALES CONVOLUCIONALES",
        sub_center: "VISIÓN COMPUTACIONAL &bull; FASHION-MNIST &bull; DEEP LEARNING V2.1",
        hero_tag: "FashionVision AI",
        hero_title: "Comprende cómo aprende la visión artificial, luego<br><span class=\"hero-title-highlight\">entrena tu propia red.</span>",
        hero_tagline: "Solución integral de visión por computadora basada en redes neuronales convolucionales (CNN). Diseñada para clasificar prendas textiles con 90.15% de precisión, inspeccionar mapas de activación y contrastar similitud vectorial en tiempo real sobre Fashion-MNIST.",
        btn_lab: "<svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"5 3 19 12 5 21 5 3\"/></svg> ABRIR LABORATORIO WEB",
        btn_arch: "<svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"10\"/><line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"4\"/><line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"14\"/></svg> VER ARQUITECTURA",
        btn_docs: "<svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"9\" y1=\"3\" x2=\"9\" y2=\"21\"/></svg> DOCUMENTACIÓN COMPLETA",
        btn_deploy: "<svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\" ry=\"2\"/><line x1=\"8\" y1=\"21\" x2=\"16\" y2=\"21\"/><line x1=\"12\" y1=\"17\" x2=\"12\" y2=\"21\"/></svg> GUÍA DE DESPLIEGUE",
        btn_colab: "TUTOR COLAB",
        btn_colab_cta: "ABRIR EN COLAB",
        colab_tag: "CUADERNO DIDÁCTICO EN LA NUBE &bull; JUPYTER / COLAB",
        colab_desc: "Ejecuta el cuaderno pedagógico completo directamente en los servidores en la nube de <strong>Google Colab</strong> con aceleración por GPU sin necesidad de configurar entornos locales. Explora la fundamentación teórica, arquitecturas neuronales, operaciones matemáticas y experimentación interactiva.",
        colab_subnote: "Ejecución interactiva gratuita en la nube con GPU en 1 clic",
        srv_colab: "Google Colab Cloud",
        srv_colab_desc: "Entorno interactivo con aceleración GPU gratuita",
        hero_specs: "MODELO CNN: 422,538 PARÁMETROS &bull; KERAS &amp; TENSORFLOW 2.x &bull; LATENCIA &lt; 18 MS",
        hero_sublink: "Lanzar aplicación en vivo en Streamlit Cloud (rn-fucn.streamlit.app)",
        side_home: "INICIO",
        side_arch: "ARQUITECTURA",
        side_tut: "TUTORIAL",
        side_gloss: "GLOSARIO",
        side_data: "DATASET",
        side_comp: "COMPARADOR",
        side_deploy: "DESPLIEGUE",
        stat_acc: "Test Accuracy",
        stat_classes: "Categorías de Moda",
        stat_time: "Latencia de Inferencia",
        stat_samples: "Muestras Evaluadas",
        pillars_pre: "Arquitectura del Sistema",
        pillars_title: "Pilares Técnicos del Proyecto",
        pillars_sub: "Diseñado para cumplir con los requerimientos académicos de experimentación rigurosa y las exigencias de despliegue en entornos reales.",
        p1_title: "Red Convolucional (CNN)",
        p1_desc: "Extracción jerárquica de características morfológicas mediante filtros bidimensionales de 3x3, capas de Batch Normalization y regularización Dropout para evitar el sobreajuste.",
        p2_title: "Motor de Similitud Vectorial",
        p2_desc: "Mapeo de la entrada en el espacio euclidiano y angular mediante métricas de Coseno y distancia L2 para identificar las muestras reales más análogas de la base de datos de validación.",
        p3_title: "Despliegue Interactivo",
        p3_desc: "Integración de una interfaz gráfica reactiva en Streamlit que admite carga de archivos por arrastre, inspección de mapas de activación y reportes cuantitativos completos.",
        arch_pre: "Ingeniería de Modelos",
        arch_title: "Topología de la Red Neuronal Convolucional",
        arch_sub: "Estructura multicapa secuencial con 422,538 parámetros entrenados sobre representaciones tensoriales de 28x28x1.",
        l1_title: "Input Layer (Entrada)",
        l1_desc: "Tensor monocromático escalado en el rango [0.0, 1.0]",
        l2_title: "Bloque Convolucional 1",
        l2_desc: "Conv2D (32 filtros 3x3, ReLU) + BatchNorm + MaxPool(2x2) + Dropout(0.20)",
        l3_title: "Bloque Convolucional 2",
        l3_desc: "Conv2D (64 filtros 3x3, ReLU) + BatchNorm + MaxPool(2x2) + Dropout(0.25)",
        l4_title: "Capa de Aplanado (Flatten)",
        l4_desc: "Desenrollado de mapas bidimensionales a vector denso 1D",
        l5_title: "Capa Densa Oculta",
        l5_desc: "128 neuronas + Activación ReLU + BatchNorm + Dropout(0.35)",
        l6_title: "Capa de Salida Softmax",
        l6_desc: "Distribución de probabilidades sobre las 10 categorías de moda",
        math_title: "Fundamentación Matemática",
        math_b1_label: "1. Convolución 2D Discreta",
        math_b1_desc: "Extracción de características espaciales locales con parámetros compartidos.",
        math_b2_label: "2. Función Softmax Multiclase",
        math_b2_desc: "Mapea logits continuos a una distribución de probabilidades en el simplex unitario.",
        math_b3_label: "3. Similitud de Coseno",
        math_b3_desc: "Cuantifica la correlación angular entre la imagen consultada y las referencias.",
        tut_pre: "Módulo Pedagógico",
        tut_title: "Tutorial Interactivo: Cómo Aprende la Red",
        tut_sub: "Recorrido guiado paso a paso para comprender los principios matemáticos y de ingeniería aplicados en FashionVision AI.",
        tut_form_label: "Formulación Matemática:",
        gloss_pre: "Biblioteca de Conceptos",
        gloss_title: "Glosario Interactivo con Simulaciones",
        gloss_sub: "Experimenta con los conceptos fundamentales mediante simulaciones vectoriales SVG en vivo y visualiza el código fuente real del proyecto.",
        live_interactive: "Interactivo",
        svg_sim_header: "Simulación Vectorial SVG",
        code_box_header: "Código Fuente del Proyecto",
        data_pre: "Espacio de Clases",
        data_title: "Categorías del Dataset Fashion-MNIST",
        data_sub: "Taxonomía estándar de 10 clases desarrollada por Zalando Research con 7,000 imágenes por categoría, representada por unidades mecha robotizadas.",
        c0_name: "Camiseta / Top",
        c1_name: "Pantalón",
        c2_name: "Jersey / Suéter",
        c3_name: "Vestido",
        c4_name: "Abrigo",
        c5_name: "Sandalia",
        c6_name: "Camisa",
        c7_name: "Zapatilla deportiva",
        c8_name: "Bolso / Cartera",
        c9_name: "Botín",
        comp_pre: "Análisis de Similitud",
        comp_title: "Contraste Vectorial con Muestras Existentes",
        comp_sub: "El sistema no solo predice la clase con una distribución de probabilidad Softmax; también proyecta la imagen en el espacio tensorial para recuperar los vecinos más cercanos en el conjunto de prueba de Fashion-MNIST.",
        comp_p1: "<strong>Explicabilidad Visual:</strong> Permite comprobar si la prenda subida comparte patrones reales de textura y silueta con el conjunto de entrenamiento.",
        comp_p2: "<strong>Métrica Coseno:</strong> Mide el ángulo entre vectores normalizados de 784 dimensiones, siendo invariante al brillo global de la captura.",
        comp_p3: "<strong>Auditoría de Incertidumbre:</strong> Identifica cuándo una prenda se ubica en la frontera de decisión entre dos clases análogas (ej. Camisa vs Camiseta).",
        sim_btn_tshirt: "Simular Camiseta",
        sim_btn_trouser: "Simular Pantalón",
        sim_btn_sneaker: "Simular Zapatilla",
        sim_box_title: "Simulador de Recuperación Top-K",
        sim_label_query: "Consulta",
        sim_label_top1: "Top 1 Dataset",
        sim_label_top2: "Top 2 Dataset",
        deploy_pre: "Despliegue Técnico",
        deploy_title: "Instrucciones de Ejecución",
        deploy_sub: "Pasos reproducibles para inicializar los servicios localmente o en servidores Linux/Windows.",
        srv_streamlit: "Servidor Streamlit",
        srv_streamlit_desc: "Aplicación interactiva web de clasificación",
        srv_jupyter: "Repositorio Oficial & Código",
        srv_jupyter_desc: "GitHub Repository & Jupyter Notebook",
        cmd_c1: "# 1. Instalar dependencias",
        cmd_c2: "# 2. Iniciar el servicio Streamlit",
        cmd_c3: "# 3. Acceder en el navegador",
        cmd_c4: "# 2. Abrir el entorno Jupyter",
        cmd_c5: "# 3. O compilar el entrenamiento por consola",
        footer_text: "Entrega integradora para la asignatura de <strong>Redes Neuronales</strong>. Implementación de Deep Learning basada en TensorFlow, Keras y Streamlit sobre el benchmark Fashion-MNIST."
    },
    en: {
        nav_home: "HOME",
        nav_arch: "ARCHITECTURE <span class=\"chevron\">▾</span>",
        nav_tut: "TUTORIAL <span class=\"chevron\">▾</span>",
        nav_gloss: "GLOSSARY",
        nav_data: "DATASET",
        nav_comp: "COMPARATOR",
        nav_doc: "DOCUMENTATION",
        nav_badge: "AI LAB",
        nav_launch: "LAUNCH APP",
        sub_left: "CONVOLUTIONAL NEURAL NETWORKS",
        sub_center: "COMPUTER VISION &bull; FASHION-MNIST &bull; DEEP LEARNING V2.1",
        hero_tag: "FashionVision AI",
        hero_title: "Understand how computer vision learns, then<br><span class=\"hero-title-highlight\">craft your own neural network.</span>",
        hero_tagline: "End-to-end computer vision platform powered by deep convolutional neural networks (CNN). Built to classify 10 fashion categories with 90.15% test accuracy, inspect feature activation maps, and compare vector similarity in real time on Fashion-MNIST.",
        btn_lab: "<svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"5 3 19 12 5 21 5 3\"/></svg> OPEN AI LAB",
        btn_arch: "<svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"10\"/><line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"4\"/><line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"14\"/></svg> VIEW ARCHITECTURE",
        btn_docs: "<svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"9\" y1=\"3\" x2=\"9\" y2=\"21\"/></svg> COMPLETE DOCS",
        btn_deploy: "<svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\" ry=\"2\"/><line x1=\"8\" y1=\"21\" x2=\"16\" y2=\"21\"/><line x1=\"12\" y1=\"17\" x2=\"12\" y2=\"21\"/></svg> DEPLOYMENT GUIDE",
        btn_colab: "COLAB TUTOR",
        btn_colab_cta: "OPEN IN COLAB",
        colab_tag: "CLOUD EDUCATIONAL NOTEBOOK &bull; JUPYTER / COLAB",
        colab_desc: "Run the complete pedagogical notebook directly on <strong>Google Colab</strong> cloud servers with free GPU acceleration—no local environment required. Explore theoretical foundations, neural architectures, math operations, and live interactive experiments.",
        colab_subnote: "Free 1-click cloud interactive GPU execution",
        srv_colab: "Google Colab Cloud",
        srv_colab_desc: "Interactive cloud environment with free GPU",
        hero_specs: "CNN MODEL: 422,538 PARAMETERS &bull; KERAS &amp; TENSORFLOW 2.x &bull; LATENCY &lt; 18 MS",
        hero_sublink: "Launch live application on Streamlit Cloud (rn-fucn.streamlit.app)",
        side_home: "HOME",
        side_arch: "ARCHITECTURE",
        side_tut: "TUTORIAL",
        side_gloss: "GLOSSARY",
        side_data: "DATASET",
        side_comp: "COMPARATOR",
        side_deploy: "DEPLOYMENT",
        stat_acc: "Test Accuracy",
        stat_classes: "Fashion Categories",
        stat_time: "Inference Latency",
        stat_samples: "Evaluated Samples",
        pillars_pre: "System Architecture",
        pillars_title: "Technical Project Pillars",
        pillars_sub: "Engineered to satisfy academic experimental rigor and production-ready deployment constraints.",
        p1_title: "Convolutional Network (CNN)",
        p1_desc: "Hierarchical morphological feature extraction via 2D 3x3 filters, Batch Normalization layers, and Dropout regularization to prevent overfitting.",
        p2_title: "Vector Similarity Engine",
        p2_desc: "Projection into Euclidean and angular feature space using Cosine similarity and L2 metrics to retrieve the nearest ground-truth dataset prototypes.",
        p3_title: "Interactive Deployment",
        p3_desc: "Integration of a reactive graphical interface in Streamlit supporting drag-and-drop file upload, activation map inspection, and comprehensive quantitative reports.",
        arch_pre: "Model Engineering",
        arch_title: "Convolutional Neural Network Topology",
        arch_sub: "Sequential deep multi-layer stack featuring 422,538 parameters trained on 28x28x1 input tensors.",
        l1_title: "Input Layer",
        l1_desc: "Monochrome tensor normalized to the [0.0, 1.0] interval",
        l2_title: "Convolutional Block 1",
        l2_desc: "Conv2D (32 filters 3x3, ReLU) + BatchNorm + MaxPool(2x2) + Dropout(0.20)",
        l3_title: "Convolutional Block 2",
        l3_desc: "Conv2D (64 filters 3x3, ReLU) + BatchNorm + MaxPool(2x2) + Dropout(0.25)",
        l4_title: "Flatten Layer",
        l4_desc: "Unrolling 2D feature activations into a dense 1D vector",
        l5_title: "Dense Hidden Layer",
        l5_desc: "128 neurons + ReLU activation + BatchNorm + Dropout(0.35)",
        l6_title: "Softmax Output Layer",
        l6_desc: "Probability distribution across the 10 fashion categories",
        math_title: "Mathematical Foundations",
        math_b1_label: "1. Discrete 2D Convolution",
        math_b1_desc: "Local spatial feature extraction using weight-sharing kernels.",
        math_b2_label: "2. Multiclass Softmax Function",
        math_b2_desc: "Maps continuous logits to a probability distribution over the unit simplex.",
        math_b3_label: "3. Cosine Similarity",
        math_b3_desc: "Quantifies angular correlation between the query embedding and dataset prototypes.",
        tut_pre: "Educational Module",
        tut_title: "Interactive Tutorial: How the Network Learns",
        tut_sub: "Step-by-step interactive walkthrough to understand the mathematical and engineering foundations of FashionVision AI.",
        tut_form_label: "Mathematical Formulation:",
        gloss_pre: "Concept Library",
        gloss_title: "Interactive Glossary with Simulations",
        gloss_sub: "Experiment with core concepts through live SVG simulations and inspect actual project source code.",
        live_interactive: "Interactive",
        svg_sim_header: "Live Vector Simulation",
        code_box_header: "Project Source Code",
        data_pre: "Class Space",
        data_title: "Fashion-MNIST Dataset Categories",
        data_sub: "Standard 10-class benchmark developed by Zalando Research with 7,000 images per class, represented by custom mecha units.",
        c0_name: "T-shirt / Top",
        c1_name: "Trouser",
        c2_name: "Pullover / Sweater",
        c3_name: "Dress",
        c4_name: "Coat",
        c5_name: "Sandal",
        c6_name: "Shirt",
        c7_name: "Sneaker",
        c8_name: "Bag / Handbag",
        c9_name: "Ankle boot",
        comp_pre: "Similarity Analysis",
        comp_title: "Vector Comparison with Dataset Samples",
        comp_sub: "The system not only outputs softmax class probabilities; it also projects the image into feature space to retrieve the nearest neighbors from the Fashion-MNIST test split.",
        comp_p1: "<strong>Visual Explainability:</strong> Validates whether the queried garment shares genuine texture and silhouette patterns with training samples.",
        comp_p2: "<strong>Cosine Metric:</strong> Measures angle between normalized 784-dimensional vectors, invariant to global lighting shifts.",
        comp_p3: "<strong>Uncertainty Auditing:</strong> Flags when an item lies near the decision boundary of two adjacent classes (e.g. Shirt vs T-shirt).",
        sim_btn_tshirt: "Simulate T-shirt",
        sim_btn_trouser: "Simulate Trouser",
        sim_btn_sneaker: "Simulate Sneaker",
        sim_box_title: "Top-K Retrieval Simulator",
        sim_label_query: "Query Item",
        sim_label_top1: "Top 1 Dataset",
        sim_label_top2: "Top 2 Dataset",
        deploy_pre: "Technical Deployment",
        deploy_title: "Execution Instructions",
        deploy_sub: "Reproducible steps to launch services locally or in server environments.",
        srv_streamlit: "Streamlit Server",
        srv_streamlit_desc: "Interactive web classification dashboard",
        srv_jupyter: "Official Repository & Code",
        srv_jupyter_desc: "GitHub Repository & Jupyter Notebook",
        cmd_c1: "# 1. Install dependencies",
        cmd_c2: "# 2. Launch Streamlit app",
        cmd_c3: "# 3. Access in web browser",
        cmd_c4: "# 2. Open Jupyter environment",
        cmd_c5: "# 3. Or train via CLI",
        footer_text: "Capstone submission for the <strong>Neural Networks</strong> course. Deep Learning implementation using TensorFlow, Keras and Streamlit on Fashion-MNIST."
    }
};

function initLanguageEngine() {
    const saved = localStorage.getItem('fv_lang') || 'es';
    setLanguage(saved);

    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const nextLang = currentLang === 'es' ? 'en' : 'es';
            setLanguage(nextLang);
        });
    }
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('fv_lang', lang);
    document.documentElement.lang = lang;

    const indicator = document.getElementById('lang-indicator');
    if (indicator) {
        indicator.textContent = lang.toUpperCase();
    }

    const dict = I18N[lang];
    if (dict) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.innerHTML = dict[key];
            }
        });
    }

    if (typeof renderTutorialStep === 'function') {
        renderTutorialStep(currentTutorialStep);
    }
    if (typeof renderGlossaryTerm === 'function') {
        renderGlossaryTerm(currentGlossaryTerm);
    }
    if (typeof renderDocModule === 'function') {
        renderDocModule(activeDocModule);
    }
}

/* ==========================================================================
   THEME TOGGLE (LIGHT / DARK)
   ========================================================================== */

function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem('craft_theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    toggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('craft_theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('craft_theme', 'dark');
        }
    });
}

/* ==========================================================================
   STATS COUNTER ANIMATION
   ========================================================================== */

function initStatsCounter() {
    const stats = [
        { id: 'stat-acc', target: 90.15, decimals: 2, suffix: '%' },
        { id: 'stat-classes', target: 10, decimals: 0, suffix: ' Clases', suffixEn: ' Classes' },
        { id: 'stat-time', target: 18, decimals: 0, prefix: '< ', suffix: ' ms' },
        { id: 'stat-samples', target: 70000, decimals: 0, formatCommas: true }
    ];

    let animated = false;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animated) {
            animated = true;
            stats.forEach(s => {
                const el = document.getElementById(s.id);
                if (!el) return;

                let start = 0;
                const duration = 1200;
                const startTime = performance.now();

                function update(now) {
                    const progress = Math.min((now - startTime) / duration, 1);
                    const current = start + (s.target - start) * easeOutExpo(progress);

                    let formatted = s.decimals > 0 ? current.toFixed(s.decimals) : Math.round(current);
                    if (s.formatCommas) {
                        formatted = Number(formatted).toLocaleString();
                    }

                    const suf = (currentLang === 'en' && s.suffixEn) ? s.suffixEn : (s.suffix || '');
                    el.textContent = `${s.prefix || ''}${formatted}${suf}`;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                }
                requestAnimationFrame(update);
            });
        }
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) observer.observe(statsSection);
}

function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

/* ==========================================================================
   INTERACTIVE COMPARATOR TOP-K SIMULATOR
   ========================================================================== */

const SIM_SCENARIOS = {
    'tshirt': {
        es: { queryName: 'Camiseta (T-shirt)', queryClass: 'Clase 0', m1Name: 'T-shirt/top', m1Class: 'Clase 0', m2Name: 'Shirt (Camisa)', m2Class: 'Clase 6' },
        en: { queryName: 'T-shirt / Top', queryClass: 'Class 0', m1Name: 'T-shirt/top', m1Class: 'Class 0', m2Name: 'Shirt', m2Class: 'Class 6' },
        queryImg: 'assets/images/robot-class-0.png',
        match1: { score: '98.4%', dist: '0.18', img: 'assets/images/robot-class-0.png' },
        match2: { score: '93.1%', dist: '0.34', img: 'assets/images/robot-class-6.png' }
    },
    'trouser': {
        es: { queryName: 'Pantalón (Trouser)', queryClass: 'Clase 1', m1Name: 'Trouser', m1Class: 'Clase 1', m2Name: 'Trouser (Pantalón)', m2Class: 'Clase 1' },
        en: { queryName: 'Trouser', queryClass: 'Class 1', m1Name: 'Trouser', m1Class: 'Class 1', m2Name: 'Trouser', m2Class: 'Class 1' },
        queryImg: 'assets/images/robot-class-1.png',
        match1: { score: '99.2%', dist: '0.12', img: 'assets/images/robot-class-1.png' },
        match2: { score: '97.5%', dist: '0.21', img: 'assets/images/robot-class-1.png' }
    },
    'sneaker': {
        es: { queryName: 'Zapatilla (Sneaker)', queryClass: 'Clase 7', m1Name: 'Sneaker', m1Class: 'Clase 7', m2Name: 'Ankle boot (Botín)', m2Class: 'Clase 9' },
        en: { queryName: 'Sneaker', queryClass: 'Class 7', m1Name: 'Sneaker', m1Class: 'Class 7', m2Name: 'Ankle boot', m2Class: 'Class 9' },
        queryImg: 'assets/images/robot-class-7.png',
        match1: { score: '98.9%', dist: '0.15', img: 'assets/images/robot-class-7.png' },
        match2: { score: '91.8%', dist: '0.41', img: 'assets/images/robot-class-9.png' }
    }
};

let activeScenarioKey = 'tshirt';

function initComparatorSimulator() {
    const buttons = document.querySelectorAll('.sim-btn');
    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeScenarioKey = btn.dataset.scenario;
            updateComparatorUI();
        });
    });
    updateComparatorUI();
}

function updateComparatorUI() {
    const data = SIM_SCENARIOS[activeScenarioKey];
    if (!data) return;

    const loc = data[currentLang] || data['es'];

    const queryLabel = document.getElementById('sim-query-title');
    const queryClass = document.getElementById('sim-query-class');
    const queryImg = document.getElementById('sim-query-img');
    if (queryLabel) queryLabel.textContent = loc.queryName;
    if (queryClass) queryClass.textContent = loc.queryClass;
    if (queryImg && data.queryImg) queryImg.src = data.queryImg;

    const m1Score = document.getElementById('sim-m1-score');
    const m1Name = document.getElementById('sim-m1-name');
    const m1Class = document.getElementById('sim-m1-class');
    const m1Dist = document.getElementById('sim-m1-dist');
    const m1Img = document.getElementById('sim-m1-img');
    if (m1Score) m1Score.textContent = data.match1.score;
    if (m1Name) m1Name.textContent = loc.m1Name;
    if (m1Class) m1Class.textContent = loc.m1Class;
    if (m1Dist) m1Dist.textContent = `Dist. Euc: ${data.match1.dist}`;
    if (m1Img && data.match1.img) m1Img.src = data.match1.img;

    const m2Score = document.getElementById('sim-m2-score');
    const m2Name = document.getElementById('sim-m2-name');
    const m2Class = document.getElementById('sim-m2-class');
    const m2Dist = document.getElementById('sim-m2-dist');
    const m2Img = document.getElementById('sim-m2-img');
    if (m2Score) m2Score.textContent = data.match2.score;
    if (m2Name) m2Name.textContent = loc.m2Name;
    if (m2Class) m2Class.textContent = loc.m2Class;
    if (m2Dist) m2Dist.textContent = `Dist. Euc: ${data.match2.dist}`;
    if (m2Img && data.match2.img) m2Img.src = data.match2.img;
}

/* ==========================================================================
   TERMINAL COPY TO CLIPBOARD
   ========================================================================== */

function initTerminalCopy() {
    const commands = document.querySelectorAll('.terminal-cmd');
    commands.forEach(cmd => {
        cmd.style.cursor = 'pointer';
        cmd.title = 'Click para copiar comando / Click to copy';
        cmd.addEventListener('click', () => {
            const text = cmd.textContent.trim();
            navigator.clipboard.writeText(text).then(() => {
                const originalColor = cmd.style.color;
                cmd.style.color = '#34d399';
                setTimeout(() => {
                    cmd.style.color = originalColor;
                }, 800);
            });
        });
    });
}

/* ==========================================================================
   NAVBAR SMOOTH SCROLL HIGHLIGHT
   ========================================================================== */

function initNavScroll() {
    const links = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   TUTORIAL ENGINE (BILINGUAL)
   ========================================================================== */

let currentTutorialStep = 0;

const TUTORIAL_DATA = [
    {
        num: "01",
        es: {
            badge: "PASO 01 : CONVOLUCIÓN 2D",
            title: "Operación de Convolución 2D",
            desc: "A diferencia de las capas densas donde cada píxel se procesa de forma aislada, la convolución 2D desliza un filtro de 3x3 píxeles a través de la imagen. Esto permite detectar características locales invariantes a la posición: líneas diagonales, bordes de mangas, cuellos o suelas de calzado.",
            formula: "(I * K)(i, j) = \\sum_m \\sum_n I(i-m, j-n) K(m, n)"
        },
        en: {
            badge: "STEP 01 : 2D CONVOLUTION",
            title: "2D Convolution Operation",
            desc: "Unlike dense layers where each pixel is processed in isolation, 2D convolution slides a 3x3 pixel filter across the image. This extracts local position-invariant features: diagonal edges, sleeves, collar contours, or shoe soles.",
            formula: "(I * K)(i, j) = \\sum_m \\sum_n I(i-m, j-n) K(m, n)"
        },
        svg: `<svg width="260" height="200" viewBox="0 0 260 200" fill="none">
            <rect x="20" y="30" width="100" height="100" fill="#111827" stroke="#1f293d" stroke-width="1.5" rx="4"/>
            <path d="M40 30v100M60 30v100M80 30v100M100 30v100M20 50h100M20 70h100M20 90h100M20 110h100" stroke="#1e293b" stroke-width="1"/>
            <rect x="20" y="30" width="60" height="60" fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" stroke-width="2" rx="2"/>
            <text x="50" y="65" fill="#60a5fa" font-size="10" font-family="monospace" text-anchor="middle">Kernel 3x3</text>
            <path d="M135 80l20 0m-5-5l5 5l-5 5" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
            <rect x="170" y="45" width="70" height="70" fill="#111827" stroke="#10b981" stroke-width="1.5" rx="4"/>
            <path d="M170 80h70M205 45v70" stroke="#1e293b" stroke-width="1"/>
            <rect x="170" y="45" width="35" height="35" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" stroke-width="2"/>
            <text x="205" y="145" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle">Feature Map</text>
        </svg>`
    },
    {
        num: "02",
        es: {
            badge: "PASO 02 : ACTIVACIÓN RELU",
            title: "Función de Activación ReLU",
            desc: "Las capas convolucionales lineales sin activación solo podrían aprender combinaciones lineales simples. La función ReLU introduce la no-linealidad necesaria para aprender geometrías complejas, anulando valores negativos y dejando pasar los positivos con gradiente constante 1.",
            formula: "f(x) = \\max(0, x)"
        },
        en: {
            badge: "STEP 02 : RELU ACTIVATION",
            title: "ReLU Activation Function",
            desc: "Linear convolutional layers without activation could only model simple linear transforms. The Rectified Linear Unit (ReLU) introduces non-linearity by zeroing negative values and passing positive values with a constant gradient of 1.",
            formula: "f(x) = \\max(0, x)"
        },
        svg: `<svg width="260" height="200" viewBox="0 0 260 200" fill="none">
            <line x1="30" y1="150" x2="230" y2="150" stroke="#334155" stroke-width="2"/>
            <line x1="130" y1="30" x2="130" y2="170" stroke="#334155" stroke-width="2"/>
            <line x1="40" y1="150" x2="130" y2="150" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
            <line x1="130" y1="150" x2="220" y2="60" stroke="#10b981" stroke-width="4" stroke-linecap="round"/>
            <text x="75" y="135" fill="#ef4444" font-size="11" font-family="monospace">f(x) = 0</text>
            <text x="180" y="90" fill="#10b981" font-size="11" font-family="monospace">f(x) = x</text>
            <text x="130" y="185" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle">x = 0</text>
        </svg>`
    },
    {
        num: "03",
        es: {
            badge: "PASO 03 : MAXPOOLING",
            title: "Submuestreo con MaxPooling2D",
            desc: "A medida que la red profundiza, MaxPooling con ventana 2x2 divide el ancho y el alto a la mitad (de 28x28 a 14x14 y luego a 7x7), seleccionando el valor máximo en cada región. Esto reduce el número de cálculos en un 75% por capa y otorga invariancia ante desplazamientos leves.",
            formula: "y_{i, j} = \\max_{(p, q) \\in \\Omega} x_{2i+p, 2j+q}"
        },
        en: {
            badge: "STEP 03 : MAXPOOLING",
            title: "Spatial Downsampling with MaxPooling2D",
            desc: "As the network deepens, MaxPooling with a 2x2 window halves spatial dimensions (from 28x28 to 14x14, then 7x7), retaining the maximum activation. This cuts computations by 75% per layer while granting spatial invariance.",
            formula: "y_{i, j} = \\max_{(p, q) \\in \\Omega} x_{2i+p, 2j+q}"
        },
        svg: `<svg width="260" height="200" viewBox="0 0 260 200" fill="none">
            <rect x="25" y="40" width="80" height="80" fill="#111827" stroke="#334155" stroke-width="1.5" rx="4"/>
            <path d="M45 40v80M65 40v80M85 40v80M25 60h80M25 80h80M25 100h80" stroke="#1e293b"/>
            <rect x="25" y="40" width="40" height="40" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" stroke-width="2"/>
            <text x="45" y="55" fill="#93c5fd" font-size="10" font-family="monospace" text-anchor="middle">9</text>
            <text x="45" y="75" fill="#64748b" font-size="10" font-family="monospace" text-anchor="middle">3</text>
            <path d="M120 80l20 0m-5-5l5 5l-5 5" stroke="#64748b" stroke-width="2"/>
            <rect x="155" y="60" width="40" height="40" fill="#111827" stroke="#10b981" stroke-width="1.5" rx="4"/>
            <line x1="175" y1="60" x2="175" y2="100" stroke="#1e293b"/>
            <line x1="155" y1="80" x2="195" y2="80" stroke="#1e293b"/>
            <rect x="155" y="60" width="20" height="20" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" stroke-width="2"/>
            <text x="165" y="74" fill="#34d399" font-size="10" font-family="monospace" text-anchor="middle">9</text>
            <text x="175" y="130" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle">4x Compression</text>
        </svg>`
    },
    {
        num: "04",
        es: {
            badge: "PASO 04 : REGULARIZACIÓN",
            title: "Batch Normalization & Dropout",
            desc: "Para evitar que la red memorice el conjunto de entrenamiento (overfitting), aplicamos dos técnicas de vanguardia: Batch Normalization normaliza la media y varianza de los lotes evitando desvanecimiento del gradiente, mientras que Dropout apaga aleatoriamente entre el 20% y 35% de las neuronas en cada paso.",
            formula: "\\hat{x} = \\frac{x - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}, \\quad r_i \\sim \\text{Bernoulli}(1-p)"
        },
        en: {
            badge: "STEP 04 : REGULARIZATION",
            title: "Batch Normalization & Dropout",
            desc: "To prevent overfitting, Batch Normalization stabilizes training by standardizing mini-batch layer activations, while Dropout randomly deactivates 20% to 35% of neurons during each training step.",
            formula: "\\hat{x} = \\frac{x - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}, \\quad r_i \\sim \\text{Bernoulli}(1-p)"
        },
        svg: `<svg width="260" height="200" viewBox="0 0 260 200" fill="none">
            <circle cx="50" cy="50" r="12" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
            <circle cx="50" cy="90" r="12" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
            <circle cx="50" cy="130" r="12" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
            <circle cx="50" cy="170" r="12" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
            <circle cx="180" cy="50" r="12" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
            <circle cx="180" cy="90" r="12" fill="#1e1e24" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,3"/>
            <line x1="174" y1="84" x2="186" y2="96" stroke="#ef4444" stroke-width="2"/>
            <line x1="186" y1="84" x2="174" y2="96" stroke="#ef4444" stroke-width="2"/>
            <circle cx="180" cy="130" r="12" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
            <circle cx="180" cy="170" r="12" fill="#1e1e24" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,3"/>
            <line x1="174" y1="164" x2="186" y2="176" stroke="#ef4444" stroke-width="2"/>
            <line x1="186" y1="164" x2="174" y2="176" stroke="#ef4444" stroke-width="2"/>
            <line x1="62" y1="50" x2="168" y2="50" stroke="#334155" stroke-width="1"/>
            <line x1="62" y1="90" x2="168" y2="130" stroke="#334155" stroke-width="1"/>
            <line x1="62" y1="130" x2="168" y2="50" stroke="#334155" stroke-width="1"/>
            <text x="180" y="195" fill="#ef4444" font-size="10" font-family="monospace" text-anchor="middle">Dropout 30%</text>
        </svg>`
    },
    {
        num: "05",
        es: {
            badge: "PASO 05 : INFERENCIA Y SIMILITUD",
            title: "Softmax & Similitud Vectorial",
            desc: "La capa final calcula un vector de 10 probabilidades multiclase mediante Softmax. Para auditar el resultado, el motor de similitud proyecta la imagen en un espacio vectorial de 784 dimensiones y calcula el coseno del ángulo contra prototipos de prueba, recuperando las prendas reales más parecidas.",
            formula: "S_{\\text{cos}}(u, v) = \\frac{u \\cdot v}{\\|u\\|_2 \\|v\\|_2}"
        },
        en: {
            badge: "STEP 05 : INFERENCE & SIMILARITY",
            title: "Softmax & Vector Similarity",
            desc: "The output layer calculates a 10-class probability distribution via Softmax. To explain predictions, the similarity engine maps the tensor into a 784-dimensional latent space and computes angular cosine distance against dataset prototypes.",
            formula: "S_{\\text{cos}}(u, v) = \\frac{u \\cdot v}{\\|u\\|_2 \\|v\\|_2}"
        },
        svg: `<svg width="260" height="200" viewBox="0 0 260 200" fill="none">
            <circle cx="60" cy="140" r="4" fill="#ffffff"/>
            <line x1="60" y1="140" x2="180" y2="60" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
            <text x="190" y="60" fill="#60a5fa" font-size="11" font-family="monospace">u (Query)</text>
            <line x1="60" y1="140" x2="200" y2="100" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
            <text x="210" y="105" fill="#10b981" font-size="11" font-family="monospace">v (Top Match)</text>
            <path d="M100 113 A50 50 0 0 1 110 125" stroke="#f59e0b" stroke-width="2" fill="none"/>
            <text x="120" y="125" fill="#f59e0b" font-size="11" font-family="monospace">&theta; = 8&deg;</text>
            <text x="130" y="175" fill="#34d399" font-size="11" font-family="sans-serif" text-anchor="middle">Cosine: 98.7%</text>
        </svg>`
    }
];

function initTutorialEngine() {
    const stepper = document.getElementById('tutorial-stepper');
    if (!stepper) return;

    stepper.innerHTML = '';
    TUTORIAL_DATA.forEach((step, idx) => {
        const btn = document.createElement('button');
        btn.className = `tutorial-step-btn ${idx === 0 ? 'active' : ''}`;
        const loc = step[currentLang] || step['es'];
        btn.innerHTML = `<span>${step.num}</span> <span>${loc.title.split(':')[0].split(' ')[0]}</span>`;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tutorial-step-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTutorialStep(idx);
        });
        stepper.appendChild(btn);
    });

    renderTutorialStep(0);
}

function renderTutorialStep(idx) {
    currentTutorialStep = idx;
    const step = TUTORIAL_DATA[idx];
    if (!step) return;

    const loc = step[currentLang] || step['es'];

    const badge = document.getElementById('tutorial-badge');
    const heading = document.getElementById('tutorial-heading');
    const desc = document.getElementById('tutorial-desc');
    const formula = document.getElementById('tutorial-formula');
    const canvas = document.getElementById('tutorial-canvas');

    if (badge) badge.textContent = loc.badge;
    if (heading) heading.textContent = loc.title;
    if (desc) desc.textContent = loc.desc;
    if (formula) formula.textContent = loc.formula;
    if (canvas) canvas.innerHTML = step.svg;
}

/* ==========================================================================
   GLOSSARY ENGINE (BILINGUAL)
   ========================================================================== */

let currentGlossaryTerm = 'conv2d';

const GLOSSARY_DATA = {
    'conv2d': {
        es: {
            title: "Capa Convolucional 2D (Conv2D)",
            category: "Extracción Jerárquica de Características",
            desc: "Aplica un banco de filtros 3x3 que calculan el producto punto con vecindades locales de píxeles para generar mapas de activación de contornos, bordes y texturas textiles.",
            code: `from tensorflow.keras.layers import Conv2D\n\n# Bloque Convolucional 1\nmodel.add(Conv2D(filters=32, kernel_size=(3, 3), \n                 padding='same', activation='relu', \n                 input_shape=(28, 28, 1)))`
        },
        en: {
            title: "2D Convolutional Layer (Conv2D)",
            category: "Hierarchical Feature Extraction",
            desc: "Applies a set of 3x3 learnable spatial filters computing dot products over local pixel patches to generate activation maps of contours, edges, and textures.",
            code: `from tensorflow.keras.layers import Conv2D\n\n# Convolutional Block 1\nmodel.add(Conv2D(filters=32, kernel_size=(3, 3), \n                 padding='same', activation='relu', \n                 input_shape=(28, 28, 1)))`
        },
        sim: `<svg width="240" height="150" viewBox="0 0 240 150">
            <rect x="20" y="20" width="80" height="80" fill="#1e293b" stroke="#3b82f6" rx="4"/>
            <rect x="20" y="20" width="40" height="40" fill="rgba(59, 130, 246, 0.4)" stroke="#60a5fa" stroke-width="2"/>
            <path d="M110 60 L140 60" stroke="#94a3b8" stroke-width="2"/>
            <rect x="150" y="35" width="50" height="50" fill="#1e293b" stroke="#10b981" rx="4"/>
            <rect x="150" y="35" width="25" height="25" fill="rgba(16, 185, 129, 0.4)" stroke="#34d399"/>
        </svg>`
    },
    'relu': {
        es: {
            title: "Función de Activación ReLU",
            category: "No-Linealidad Matemática",
            desc: "Mapea cualquier entrada negativa a cero estricto, permitiendo a la red aprender fronteras de decisión no lineales complejas sin saturación del gradiente.",
            code: `from tensorflow.keras.activations import relu\n\n# Definición matemática:\n# f(x) = max(0, x)\nz = relu(dot_product_layer)`
        },
        en: {
            title: "ReLU Activation Function",
            category: "Mathematical Non-Linearity",
            desc: "Maps any negative input strictly to zero, allowing the neural network to approximate complex non-linear decision boundaries without gradient saturation.",
            code: `from tensorflow.keras.activations import relu\n\n# Mathematical formulation:\n# f(x) = max(0, x)\nz = relu(dot_product_layer)`
        },
        sim: `<svg width="240" height="150" viewBox="0 0 240 150">
            <line x1="20" y1="120" x2="220" y2="120" stroke="#475569" stroke-width="2"/>
            <line x1="120" y1="20" x2="120" y2="135" stroke="#475569" stroke-width="2"/>
            <line x1="30" y1="120" x2="120" y2="120" stroke="#ef4444" stroke-width="3"/>
            <line x1="120" y1="120" x2="200" y2="40" stroke="#10b981" stroke-width="3"/>
        </svg>`
    },
    'maxpooling': {
        es: {
            title: "Submuestreo MaxPooling2D",
            category: "Reducción de Dimensionalidad",
            desc: "Reduce a la mitad las dimensiones espaciales tomando el valor máximo en cada ventana 2x2, otorgando invariancia traslacional y reduciendo parámetros.",
            code: `from tensorflow.keras.layers import MaxPooling2D\n\n# Reducción espacial 2x2 con paso 2\nmodel.add(MaxPooling2D(pool_size=(2, 2)))`
        },
        en: {
            title: "MaxPooling2D Pooling",
            category: "Dimensionality Reduction",
            desc: "Halves spatial resolution by computing the maximum activation across 2x2 non-overlapping windows, providing translation invariance.",
            code: `from tensorflow.keras.layers import MaxPooling2D\n\n# 2x2 Spatial reduction with stride 2\nmodel.add(MaxPooling2D(pool_size=(2, 2)))`
        },
        sim: `<svg width="240" height="150" viewBox="0 0 240 150">
            <rect x="25" y="30" width="70" height="70" fill="#1e293b" stroke="#64748b"/>
            <rect x="25" y="30" width="35" height="35" fill="rgba(59, 130, 246, 0.4)"/>
            <text x="42" y="52" fill="#fff" font-size="12" text-anchor="middle">9</text>
            <path d="M105 65 L135 65" stroke="#94a3b8" stroke-width="2"/>
            <rect x="145" y="47" width="35" height="35" fill="#1e293b" stroke="#10b981"/>
            <text x="162" y="69" fill="#34d399" font-size="12" text-anchor="middle">9</text>
        </svg>`
    },
    'dropout': {
        es: {
            title: "Regularización Dropout",
            category: "Prevención de Sobreajuste",
            desc: "Desconecta aleatoriamente una fracción de conexiones neuronales en cada ciclo de propagación para forzar la redundancia robusta de representaciones.",
            code: `from tensorflow.keras.layers import Dropout\n\n# Apagado probabilístico del 25% de neuronas\nmodel.add(Dropout(0.25))`
        },
        en: {
            title: "Dropout Regularization",
            category: "Overfitting Prevention",
            desc: "Randomly zeroes out a fraction of hidden unit connections during each forward pass, forcing network units to learn co-adapted, robust features.",
            code: `from tensorflow.keras.layers import Dropout\n\n# Probabilistic drop of 25% of neurons\nmodel.add(Dropout(0.25))`
        },
        sim: `<svg width="240" height="150" viewBox="0 0 240 150">
            <circle cx="50" cy="40" r="10" fill="#3b82f6"/>
            <circle cx="50" cy="75" r="10" fill="#3b82f6"/>
            <circle cx="50" cy="110" r="10" fill="#3b82f6"/>
            <circle cx="170" cy="40" r="10" fill="#10b981"/>
            <circle cx="170" cy="75" r="10" fill="#ef4444" stroke-dasharray="2,2"/>
            <circle cx="170" cy="110" r="10" fill="#10b981"/>
        </svg>`
    },
    'softmax': {
        es: {
            title: "Capa de Activación Softmax",
            category: "Cálculo de Probabilidad Multiclase",
            desc: "Transforma los logits reales de la última capa densa en una distribución normalizada de probabilidades cuya suma total es exactamente 1.0.",
            code: `from tensorflow.keras.layers import Dense\n\n# Capa de salida con 10 clases de Fashion-MNIST\nmodel.add(Dense(10, activation='softmax'))`
        },
        en: {
            title: "Softmax Activation Layer",
            category: "Multiclass Probability Normalization",
            desc: "Normalizes raw output logits into a valid probability distribution over 10 mutually exclusive clothing classes summing to 1.0.",
            code: `from tensorflow.keras.layers import Dense\n\n# Output layer with 10 Fashion-MNIST classes\nmodel.add(Dense(10, activation='softmax'))`
        },
        sim: `<svg width="240" height="150" viewBox="0 0 240 150">
            <rect x="30" y="30" width="30" height="80" fill="#334155"/>
            <rect x="70" y="50" width="30" height="60" fill="#334155"/>
            <rect x="110" y="20" width="30" height="90" fill="#3b82f6"/>
            <text x="125" y="15" fill="#60a5fa" font-size="10" text-anchor="middle">91.4%</text>
        </svg>`
    },
    'cosinesim': {
        es: {
            title: "Métrica de Similitud Coseno",
            category: "Álgebra Lineal & Recuperación Top-K",
            desc: "Evalúa el ángulo entre dos vectores tensoriales normalizados en el espacio de 784 dimensiones, midiendo similitud morfológica sin sesgo de iluminación.",
            code: `import numpy as np\n\ndef cosine_similarity(u, v):\n    return np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v))`
        },
        en: {
            title: "Cosine Similarity Metric",
            category: "Linear Algebra & Top-K Retrieval",
            desc: "Evaluates the cosine of the angle between two normalized 784-dimensional feature vectors, capturing structural resemblance invariant to luminance.",
            code: `import numpy as np\n\ndef cosine_similarity(u, v):\n    return np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v))`
        },
        sim: `<svg width="240" height="150" viewBox="0 0 240 150">
            <circle cx="50" cy="110" r="4" fill="#fff"/>
            <line x1="50" y1="110" x2="160" y2="40" stroke="#3b82f6" stroke-width="2.5"/>
            <line x1="50" y1="110" x2="180" y2="80" stroke="#10b981" stroke-width="2.5"/>
            <path d="M90 85 A30 30 0 0 1 100 95" stroke="#f59e0b" stroke-width="2" fill="none"/>
        </svg>`
    }
};

function initGlossaryEngine() {
    const tabs = document.querySelectorAll('.glossary-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderGlossaryTerm(tab.dataset.term);
        });
    });

    renderGlossaryTerm('conv2d');
}

function renderGlossaryTerm(key) {
    currentGlossaryTerm = key;
    const term = GLOSSARY_DATA[key];
    if (!term) return;

    const loc = term[currentLang] || term['es'];

    const titleEl = document.getElementById('glossary-title');
    const catEl = document.getElementById('glossary-category');
    const descEl = document.getElementById('glossary-desc');
    const codeEl = document.getElementById('glossary-code');
    const simEl = document.getElementById('glossary-simulation-render');

    if (titleEl) titleEl.textContent = loc.title;
    if (catEl) catEl.textContent = loc.category;
    if (descEl) descEl.textContent = loc.desc;
    if (codeEl) codeEl.textContent = loc.code;
    if (simEl) simEl.innerHTML = term.sim;
}

/* ==========================================================================
   TECHNICAL DOCUMENTATION MODAL WINDOW CONTROLLER (ADJUSTABLE & MINIMIZABLE)
   ========================================================================== */

let activeDocModule = 'mod1';

const DOC_MODULES = {
    'mod1': {
        title: "Módulo 01: Planteamiento del Problema y Marco Teórico",
        meta: "Módulo Teórico &bull; Redes Convolucionales vs MLP &bull; Formulación Matemática",
        content: `
            <h2 class="doc-section-h2">1. Justificación del Problema</h2>
            <p class="doc-p">El reconocimiento automatizado de indumentaria textil sobre imágenes digitales presenta desafíos morfológicos complejos que superan las capacidades de los clasificadores lineales tradicionales o del Perceptrón Multicapa (MLP):</p>
            <div class="doc-callout">
                <strong>Limitaciones del Perceptrón Multicapa (MLP):</strong>
                <ul style="margin-top: 0.5rem; margin-left: 1.25rem;">
                    <li><strong>Pérdida de estructura bidimensional:</strong> Al aplanar la imagen de 28x28 a un vector 1D de 784 píxeles, se destruyen las correlaciones espaciales entre píxeles adyacentes.</li>
                    <li><strong>Explosión paramétrica:</strong> Cada neurona de la primera capa oculta requiere 784 pesos más sesgo, propiciando el sobreajuste severo.</li>
                    <li><strong>Falta de invariancia a traslaciones:</strong> Un patrón como un cuello o un bolsillo desplazado unos píxeles no es reconocido por la misma neurona.</li>
                </ul>
            </div>

            <h2 class="doc-section-h2">2. Principios de las Redes Convolucionales (CNN)</h2>
            <p class="doc-p">Las Redes Convolucionales resuelven estas deficiencias mediante tres pilares de ingeniería:</p>
            <ul class="doc-p" style="margin-left: 1.5rem;">
                <li><strong>Campos Receptivos Locales:</strong> Conexiones restringidas a vecindades espaciales pequeñas de 3x3 píxeles.</li>
                <li><strong>Pesos Compartidos (Weight Sharing):**</strong> El mismo filtro convolucional se desliza sobre toda la imagen, detectando la característica sin importar su ubicación.</li>
                <li><strong>Submuestreo Espacial (MaxPooling):</strong> Reduce la dimensionalidad preservando la información saliente y otorgando robustez traslacional.</li>
            </ul>

            <h2 class="doc-section-h2">3. Formulación Matemática Central</h2>
            <p class="doc-p"><strong>Convolución 2D Discreta:</strong></p>
            <div class="doc-code-block">(I * K)(i, j, c_out) = &sum;_m &sum;_n &sum;_c I(i + m, j + n, c) &times; K(m, n, c, c_out) + b_cout</div>
            <p class="doc-p"><strong>Normalización Softmax Multiclase:</strong></p>
            <div class="doc-code-block">P(y = c | x) = exp(z_c) / &sum;_{j=1}^{10} exp(z_j)</div>
        `
    },
    'mod2': {
        title: "Módulo 02: Análisis Exploratorio de Datos (EDA) & Dataset",
        meta: "Zalando Fashion-MNIST &bull; 70,000 Muestras &bull; Balanceo 10 Clases &bull; Normalización",
        content: `
            <h2 class="doc-section-h2">1. Estructura del Dataset Fashion-MNIST</h2>
            <p class="doc-p">Fashion-MNIST fue creado por Zalando Research como un reemplazo directo y más desafiante que el clásico MNIST de dígitos numéricos:</p>
            <div class="doc-table-wrap">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Subconjunto</th>
                            <th>Muestras</th>
                            <th>Dimensiones</th>
                            <th>Formato de Píxel</th>
                            <th>Rango Original</th>
                            <th>Rango Normalizado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Entrenamiento (Train)</td>
                            <td>60,000</td>
                            <td>(60000, 28, 28, 1)</td>
                            <td>uint8 monocromo</td>
                            <td>[0, 255]</td>
                            <td>[0.0, 1.0]</td>
                        </tr>
                        <tr>
                            <td>Prueba (Test)</td>
                            <td>10,000</td>
                            <td>(10000, 28, 28, 1)</td>
                            <td>uint8 monocromo</td>
                            <td>[0, 255]</td>
                            <td>[0.0, 1.0]</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 class="doc-section-h2">2. Distribución y Taxonomía de las 10 Clases</h2>
            <p class="doc-p">El dataset presenta un balanceo perfecto con 7,000 imágenes por cada una de las 10 categorías textiles:</p>
            <ul class="doc-p" style="margin-left: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.25rem;">
                <li><strong>Clase 0:</strong> T-shirt/top (Camiseta)</li>
                <li><strong>Clase 1:</strong> Trouser (Pantalón)</li>
                <li><strong>Clase 2:</strong> Pullover (Jersey / Suéter)</li>
                <li><strong>Clase 3:</strong> Dress (Vestido)</li>
                <li><strong>Clase 4:</strong> Coat (Abrigo)</li>
                <li><strong>Clase 5:</strong> Sandal (Sandalia)</li>
                <li><strong>Clase 6:</strong> Shirt (Camisa)</li>
                <li><strong>Clase 7:</strong> Sneaker (Zapatilla)</li>
                <li><strong>Clase 8:</strong> Bag (Bolso / Cartera)</li>
                <li><strong>Clase 9:</strong> Ankle boot (Botín)</li>
            </ul>
        `
    },
    'mod3': {
        title: "Módulo 03: Arquitectura e Ingeniería de la Red (CNN)",
        meta: "Topología Secuencial &bull; 422,538 Parámetros &bull; Regularización Triple &bull; Adam",
        content: `
            <h2 class="doc-section-h2">1. Desglose Estructural Capa por Capa</h2>
            <p class="doc-p">Se seleccionó una topología jerárquica de dos bloques convolucionales con extracción no lineal, seguidos de aplanado y un clasificador denso fuertemente regularizado:</p>
            <div class="doc-table-wrap">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Capa</th>
                            <th>Tipo</th>
                            <th>Forma de Salida</th>
                            <th>Parámetros</th>
                            <th>Propósito Técnico</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Input</td><td>InputLayer</td><td>(28, 28, 1)</td><td>0</td><td>Tensor monocromo normalizado</td></tr>
                        <tr><td>Conv2D 1</td><td>Conv2D (32 filtros 3x3)</td><td>(28, 28, 32)</td><td>320</td><td>Detección de bordes y texturas primarias</td></tr>
                        <tr><td>BatchNorm 1</td><td>BatchNormalization</td><td>(28, 28, 32)</td><td>128</td><td>Estabilización de activaciones</td></tr>
                        <tr><td>MaxPool 1</td><td>MaxPooling2D (2x2)</td><td>(14, 14, 32)</td><td>0</td><td>Compresión espacial al 50%</td></tr>
                        <tr><td>Dropout 1</td><td>Dropout (0.20)</td><td>(14, 14, 32)</td><td>0</td><td>Desconexión estocástica</td></tr>
                        <tr><td>Conv2D 2</td><td>Conv2D (64 filtros 3x3)</td><td>(14, 14, 64)</td><td>18,496</td><td>Extracción de siluetas complejas</td></tr>
                        <tr><td>BatchNorm 2</td><td>BatchNormalization</td><td>(14, 14, 64)</td><td>256</td><td>Aceleración de convergencia</td></tr>
                        <tr><td>MaxPool 2</td><td>MaxPooling2D (2x2)</td><td>(7, 7, 64)</td><td>0</td><td>Compresión a 7x7</td></tr>
                        <tr><td>Dropout 2</td><td>Dropout (0.25)</td><td>(7, 7, 64)</td><td>0</td><td>Desconexión intermedia</td></tr>
                        <tr><td>Flatten</td><td>Flatten</td><td>(3,136)</td><td>0</td><td>Desenrollado tensorial 1D</td></tr>
                        <tr><td>Dense 1</td><td>Dense (128, ReLU)</td><td>(128)</td><td>401,536</td><td>Espacio latente de decisión</td></tr>
                        <tr><td>BatchNorm 3</td><td>BatchNormalization</td><td>(128)</td><td>512</td><td>Normalización densa</td></tr>
                        <tr><td>Dropout 3</td><td>Dropout (0.35)</td><td>(128)</td><td>0</td><td>Regularización anti-coadaptación</td></tr>
                        <tr><td>Output</td><td>Dense (10, Softmax)</td><td>(10)</td><td>1,290</td><td>Distribución de probabilidad multiclase</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="doc-callout">
                <strong>Resumen Paramétrico:</strong> Total Parámetros: <strong>422,538</strong> (422,090 entrenables / 448 no entrenables).
            </div>
        `
    },
    'mod4': {
        title: "Módulo 04: Entrenamiento y Evaluación Cuantitativa",
        meta: "Adam Optimizer &bull; 90.15% Test Accuracy &bull; Test Loss 0.2734 &bull; Matriz de Confusión",
        content: `
            <h2 class="doc-section-h2">1. Protocolo de Entrenamiento</h2>
            <p class="doc-p">El modelo fue optimizado mediante el algoritmo Adam con decaimiento adaptativo, tamaño de lote de 64 muestras y monitorización de convergencia:</p>
            <div class="doc-code-block">optimizer = tf.keras.optimizers.Adam(learning_rate=0.0015)\nmodel.compile(optimizer=optimizer,\n              loss='sparse_categorical_crossentropy',\n              metrics=['accuracy'])</div>

            <h2 class="doc-section-h2">2. Resultados Cuantitativos en el Conjunto de Test</h2>
            <p class="doc-p">Evaluado de forma ciega sobre las 10,000 imágenes de prueba que la red nunca vio durante el entrenamiento:</p>
            <div class="doc-table-wrap">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Métrica Global</th>
                            <th>Valor Obtenido</th>
                            <th>Línea Base MLP</th>
                            <th>Margen de Mejora</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>Accuracy en Test</strong></td><td><strong>90.15%</strong></td><td>83.20%</td><td>+6.95% de ganancia neta</td></tr>
                        <tr><td><strong>Pérdida en Test (Loss)</strong></td><td><strong>0.2734</strong></td><td>0.4890</td><td>-44.1% reducción de error</td></tr>
                        <tr><td><strong>Latencia de Inferencia</strong></td><td><strong>&lt; 18 ms</strong></td><td>~12 ms</td><td>Apta para producción en tiempo real</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 class="doc-section-h2">3. Diagnóstico de Confusiones Críticas</h2>
            <p class="doc-p">Las clases con mayor fidelidad son <strong>Pantalón (99.2%)</strong> y <strong>Zapatilla (98.9%)</strong> gracias a sus contornos morfológicos distintivos. La mayor tasa de confusión se concentra entre <strong>Camisa vs Camiseta</strong> y <strong>Jersey vs Abrigo</strong>, donde pliegues textiles sutiles comparten patrones de activación análogos.</p>
        `
    },
    'mod5': {
        title: "Módulo 05: Motor de Similitud Vectorial y Recuperación Top-K",
        meta: "Explicabilidad Visual &bull; Métrica Coseno &bull; Distancia Euclidiana L2 &bull; Índice de Consistencia",
        content: `
            <h2 class="doc-section-h2">1. Por Qué Necesitamos Similitud Vectorial</h2>
            <p class="doc-p">Una predicción Softmax tradicional actúa como una "caja negra": asigna un 92% a una clase pero no le explica al usuario en qué se basó. El Motor de Similitud Vectorial añade <strong>explicabilidad geométrica</strong> proyectando la imagen subida contra el banco de prototipos reales del dataset para encontrar los vecinos más cercanos.</p>

            <h2 class="doc-section-h2">2. Métricas de Comparación</h2>
            <p class="doc-p"><strong>Similitud Coseno (Invariante a Luminancia):</strong></p>
            <div class="doc-code-block">S_cos(u, v) = (u &bull; v) / (||u||_2 &times; ||v||_2) = &sum; u_i v_i / (&radic;&sum; u_i^2 &times; &radic;&sum; v_i^2)</div>
            <p class="doc-p">Mide el ángulo entre vectores normalizados de 784 dimensiones. Si una prenda fue fotografiada con luz más tenue, el ángulo relativo de su silueta se mantiene estable.</p>

            <p class="doc-p"><strong>Distancia Euclidiana L2:</strong></p>
            <div class="doc-code-block">d_E(u, v) = ||u - v||_2 = &radic;&sum; (u_i - v_i)^2</div>

            <h2 class="doc-section-h2">3. Índice de Consistencia Categórica</h2>
            <p class="doc-p">Se evalúa si los Top-K vecinos pertenecen a la misma clase predicha por la CNN:</p>
            <div class="doc-code-block">Consistencia = (1 / K) &times; &sum; I(y_top_k == c_pred) &times; 100%</div>
            <p class="doc-p">Una consistencia &ge; 75% confirma que la imagen subida comparte el cluster morfológico natural de los prototipos del dataset.</p>
        `
    },
    'mod6': {
        title: "Módulo 06: Pipeline de Inferencia Adaptativa",
        meta: "Preprocesamiento Robusto &bull; Auto-Inversión de Fondo &bull; Redimensionado Lanczos &bull; &lt; 18 ms",
        content: `
            <h2 class="doc-section-h2">1. El Problema de las Imágenes Reales Externas</h2>
            <p class="doc-p">Fashion-MNIST fue capturado con prendas blancas/grises sobre fondo negro estricto. Sin embargo, en el mundo real, los usuarios fotografían ropa sobre fondos blancos o claros. Si se ingresa una imagen con fondo blanco directamente a la CNN, la red fallará al interpretar el fondo como una prenda gigantesca.</p>

            <h2 class="doc-section-h2">2. Algoritmo de Adaptación de Luminancia</h2>
            <p class="doc-p">Nuestro pipeline implementa una etapa automática de detección e inversión de contraste:</p>
            <div class="doc-code-block"># Detección inteligente de fondo claro\nmedia_esquinas = np.mean([arr[0,0], arr[0,-1], arr[-1,0], arr[-1,-1]])\nif media_esquinas > 127:\n    # Invertir luminancia para emparejar con Fashion-MNIST\n    arr = 255 - arr</div>

            <h2 class="doc-section-h2">3. Flujo Secuencial de Inferencia</h2>
            <ol class="doc-p" style="margin-left: 1.5rem;">
                <li>Conversión a escala de grises (eliminación de canales RGB).</li>
                <li>Recorte centrado con margen cuadrado.</li>
                <li>Redimensionamiento de alta fidelidad mediante filtro Lanczos a 28x28 píxeles.</li>
                <li>Normalización de intensidades dividiendo por 255.0 para situar el tensor en [0.0, 1.0].</li>
                <li>Expansión de dimensiones a (1, 28, 28, 1) y ejecución de inferencia tensorial.</li>
            </ol>
        `
    },
    'mod7': {
        title: "Módulo 07: Despliegue en Streamlit Cloud y Producción",
        meta: "Streamlit Cloud &bull; rn-fucn.streamlit.app &bull; app.py &bull; Servidor Local &bull; GitHub Pages",
        content: `
            <h2 class="doc-section-h2">1. Aplicación en Vivo en Streamlit Cloud</h2>
            <p class="doc-p">La interfaz interactiva completa se encuentra desplegada y operativa en producción en la nube en el siguiente enlace oficial:</p>
            <div class="doc-callout" style="border-left-color: var(--accent-emerald);">
                <strong>Acceso a Producción:</strong><br>
                <a href="https://rn-fucn.streamlit.app/" target="_blank" style="color: var(--craft-blue); font-weight: 800; font-size: 1.05rem;">
                    https://rn-fucn.streamlit.app/
                </a>
            </div>

            <h2 class="doc-section-h2">2. Instrucciones para Ejecución Local</h2>
            <p class="doc-p">Para correr el laboratorio interactivo en tu propia máquina:</p>
            <div class="doc-code-block"># 1. Clonar el repositorio\ngit clone https://github.com/feibertciin/RN.git\ncd RN\n\n# 2. Instalar dependencias requeridas\npip install -r requirements.txt\n\n# 3. Iniciar el servidor Streamlit\nstreamlit run app.py</div>

            <h2 class="doc-section-h2">3. Cuaderno de Investigación Jupyter</h2>
            <p class="doc-p">El proceso reproducible de entrenamiento y generación de gráficos analíticos se encuentra compilado en el notebook:</p>
            <div class="doc-code-block">jupyter notebook fashion_mnist_redes_neuronales.ipynb</div>

            <h2 class="doc-section-h2">4. Cuaderno Didáctico en Google Colab (CNN-tutor.ipynb)</h2>
            <p class="doc-p">Para una experiencia interactiva sin necesidad de configurar Python ni dependencias en tu equipo local, ejecuta directamente el cuaderno didáctico en Google Colab con soporte GPU:</p>
            <div class="doc-callout" style="border-left-color: #f59e0b; background-color: rgba(245, 158, 11, 0.08);">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <strong style="color: #d97706; font-size: 0.95rem;">⚡ Cuaderno Interactivo: CNN-tutor.ipynb</strong><br>
                        <span style="font-size: 0.8rem; color: var(--text-secondary);">Aceleración T4 GPU &bull; TensorFlow 2.x &bull; Paso a paso pedagógico</span>
                    </div>
                    <a href="https://colab.research.google.com/github/feibertciin/RN/blob/main/CNN-tutor.ipynb" target="_blank" class="btn-open-colab" style="padding: 0.5rem 1.1rem; font-size: 0.72rem;">
                        <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Colab" style="height: 18px;">
                        <span>ABRIR EN COLAB</span>
                    </a>
                </div>
            </div>
        `
    },
    'mod8': {
        title: "Módulo 08: Repositorio Oficial GitHub & Código Fuente",
        meta: "GitHub: feibertciin/RN &bull; Licencia MIT &bull; Estructura Modular &bull; Video Showcase",
        content: `
            <h2 class="doc-section-h2">1. Repositorio Oficial en GitHub</h2>
            <p class="doc-p">Todo el código fuente, modelos exportados, conjunto de pruebas, notebooks y assets están centralizados bajo control de versiones:</p>
            <div class="doc-callout">
                <strong>URL Oficial del Repositorio:</strong><br>
                <a href="https://github.com/feibertciin/RN.git" target="_blank" style="color: var(--craft-blue); font-weight: 800; font-size: 1rem;">
                    https://github.com/feibertciin/RN.git
                </a>
            </div>

            <h2 class="doc-section-h2">2. Estructura de Archivos del Proyecto</h2>
            <div class="doc-code-block">RN/\n├── app.py                     # Aplicación web Streamlit en producción\n├── train_model.py             # Script de entrenamiento y evaluación CNN\n├── CNN-tutor.ipynb            # Cuaderno didáctico interactivo para Google Colab\n├── fashion_mnist_redes_neuronales.ipynb # Cuaderno de investigación y gráficas\n├── requirements.txt           # Dependencias (TensorFlow, Streamlit, Pillow)\n├── index.html                 # Portal web interactivo con tema técnico\n├── assets/\n│   ├── css/style.css          # Hoja de estilos con tema adaptable\n│   ├── js/main.js             # Lógica interactiva, i18n y doc reader\n│   └── images/                # Iconos e ilustraciones robotizadas\n└── doc/                       # Documentación técnica modular en Markdown</div>

            <h2 class="doc-section-h2">3. Licencia y Reconocimientos</h2>
            <p class="doc-p">Este proyecto se distribuye bajo la <strong>Licencia MIT</strong>. El dataset Fashion-MNIST es propiedad de Zalando Research. Entrega integradora desarrollada para la asignatura de <strong>Redes Neuronales</strong>.</p>
        `
    }
};

function initDocModal() {
    const modal = document.getElementById('doc-modal');
    const win = document.getElementById('doc-window');
    const dock = document.getElementById('doc-dock-pill');
    if (!modal || !win) return;

    // Triggers
    const triggerButtons = [
        document.getElementById('nav-btn-doc'),
        document.getElementById('btn-open-doc'),
        document.getElementById('footer-btn-doc')
    ];

    triggerButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                openDocModal('mod1');
            });
        }
    });

    // Window Controls
    const btnMin = document.getElementById('doc-win-minimize');
    const btnMax = document.getElementById('doc-win-maximize');
    const btnClose = document.getElementById('doc-win-close');
    const btnBack = document.getElementById('doc-btn-back');

    const btnRestore = document.getElementById('doc-dock-restore');
    const btnDockClose = document.getElementById('doc-dock-close');

    if (btnMin) btnMin.addEventListener('click', minimizeDocModal);
    if (btnMax) btnMax.addEventListener('click', toggleMaximizeDocModal);
    if (btnClose) btnClose.addEventListener('click', closeDocModal);
    if (btnBack) btnBack.addEventListener('click', closeDocModal);

    if (btnRestore) btnRestore.addEventListener('click', restoreDocModal);
    if (btnDockClose) btnDockClose.addEventListener('click', () => {
        if (dock) dock.style.display = 'none';
    });

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeDocModal();
        }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal.classList.contains('active')) {
                closeDocModal();
            }
        }
    });

    // Sidebar navigation tabs
    const navItems = document.querySelectorAll('.doc-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const modKey = item.getAttribute('data-mod');
            renderDocModule(modKey);
        });
    });

    renderDocModule('mod1');
}

function openDocModal(modKey) {
    const modal = document.getElementById('doc-modal');
    const dock = document.getElementById('doc-dock-pill');
    if (!modal) return;

    if (dock) dock.style.display = 'none';
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    if (modKey) {
        activeDocModule = modKey;
        const navItems = document.querySelectorAll('.doc-nav-item');
        navItems.forEach(i => {
            if (i.getAttribute('data-mod') === modKey) {
                i.classList.add('active');
            } else {
                i.classList.remove('active');
            }
        });
        renderDocModule(modKey);
    }
}

function closeDocModal() {
    const modal = document.getElementById('doc-modal');
    const dock = document.getElementById('doc-dock-pill');
    if (!modal) return;

    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 200);

    if (dock) dock.style.display = 'none';
}

function minimizeDocModal() {
    const modal = document.getElementById('doc-modal');
    const dock = document.getElementById('doc-dock-pill');
    if (!modal) return;

    modal.classList.remove('active');
    modal.style.display = 'none';

    if (dock) {
        dock.style.display = 'flex';
    }
}

function restoreDocModal() {
    const modal = document.getElementById('doc-modal');
    const dock = document.getElementById('doc-dock-pill');
    if (dock) dock.style.display = 'none';
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

function toggleMaximizeDocModal() {
    const win = document.getElementById('doc-window');
    const btnMax = document.getElementById('doc-win-maximize');
    if (!win) return;

    const isMax = win.classList.toggle('maximized');
    if (btnMax) {
        if (isMax) {
            btnMax.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/></svg>`;
            btnMax.title = "Restaurar tamaño";
        } else {
            btnMax.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>`;
            btnMax.title = "Maximizar ventana";
        }
    }
}

function renderDocModule(modKey) {
    activeDocModule = modKey;
    const mod = DOC_MODULES[modKey];
    const reader = document.getElementById('doc-content-reader');
    if (!mod || !reader) return;

    reader.innerHTML = `
        <article class="doc-article">
            <h1 class="doc-article-title">${mod.title}</h1>
            <div class="doc-article-meta">${mod.meta}</div>
            <div class="doc-article-body">${mod.content}</div>
        </article>
    `;
    reader.scrollTop = 0;
}

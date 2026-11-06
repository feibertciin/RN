/**
 * FashionVision AI - Interactive Engineering Logic
 * Clean Vanilla JavaScript for GitHub Pages & Local Deployment
 */

document.addEventListener('DOMContentLoaded', () => {
    initStatsCounter();
    initComparatorSimulator();
    initTerminalCopy();
    initNavScroll();
});

/**
 * Animated numerical stats on scroll
 */
function initStatsCounter() {
    const stats = [
        { id: 'stat-acc', target: 90.15, decimals: 2, suffix: '%' },
        { id: 'stat-classes', target: 10, decimals: 0, suffix: ' Clases' },
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
                    
                    el.textContent = `${s.prefix || ''}${formatted}${s.suffix || ''}`;

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

/**
 * Interactive Query Simulation for Comparator
 */
const SIM_SCENARIOS = {
    'tshirt': {
        queryName: 'Camiseta (T-shirt)',
        queryClass: 'Clase 0',
        match1: { name: 'T-shirt/top', class: 'Clase 0', score: '98.4%', dist: '0.18' },
        match2: { name: 'Shirt', class: 'Clase 6', score: '93.1%', dist: '0.34' }
    },
    'trouser': {
        queryName: 'Pantalón (Trouser)',
        queryClass: 'Clase 1',
        match1: { name: 'Trouser', class: 'Clase 1', score: '99.2%', dist: '0.12' },
        match2: { name: 'Trouser', class: 'Clase 1', score: '97.5%', dist: '0.21' }
    },
    'sneaker': {
        queryName: 'Zapatilla (Sneaker)',
        queryClass: 'Clase 7',
        match1: { name: 'Sneaker', class: 'Clase 7', score: '98.9%', dist: '0.15' },
        match2: { name: 'Ankle boot', class: 'Clase 9', score: '91.8%', dist: '0.41' }
    }
};

function initComparatorSimulator() {
    const buttons = document.querySelectorAll('.sim-btn');
    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const key = btn.dataset.scenario;
            const data = SIM_SCENARIOS[key];
            if (!data) return;

            // Update Query
            const queryLabel = document.getElementById('sim-query-title');
            const queryClass = document.getElementById('sim-query-class');
            if (queryLabel) queryLabel.textContent = data.queryName;
            if (queryClass) queryClass.textContent = data.queryClass;

            // Update Match 1
            const m1Score = document.getElementById('sim-m1-score');
            const m1Name = document.getElementById('sim-m1-name');
            const m1Class = document.getElementById('sim-m1-class');
            const m1Dist = document.getElementById('sim-m1-dist');
            if (m1Score) m1Score.textContent = data.match1.score;
            if (m1Name) m1Name.textContent = data.match1.name;
            if (m1Class) m1Class.textContent = data.match1.class;
            if (m1Dist) m1Dist.textContent = `Dist. Euc: ${data.match1.dist}`;

            // Update Match 2
            const m2Score = document.getElementById('sim-m2-score');
            const m2Name = document.getElementById('sim-m2-name');
            const m2Class = document.getElementById('sim-m2-class');
            const m2Dist = document.getElementById('sim-m2-dist');
            if (m2Score) m2Score.textContent = data.match2.score;
            if (m2Name) m2Name.textContent = data.match2.name;
            if (m2Class) m2Class.textContent = data.match2.class;
            if (m2Dist) m2Dist.textContent = `Dist. Euc: ${data.match2.dist}`;
        });
    });
}

/**
 * Copy terminal commands to clipboard
 */
function initTerminalCopy() {
    const commands = document.querySelectorAll('.terminal-cmd');
    commands.forEach(cmd => {
        cmd.style.cursor = 'pointer';
        cmd.title = 'Click para copiar comando';
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

/**
 * Navbar smooth scroll highlight
 */
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
   TUTORIAL & INTERACTIVE GLOSSARY ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTutorialEngine();
    initGlossaryEngine();
});

const TUTORIAL_DATA = [
    {
        num: "01",
        badge: "Fundamento Convolucional",
        title: "Operación de Convolución 2D",
        desc: "A diferencia de las capas densas donde cada píxel se procesa de forma aislada, la convolución 2D desliza un filtro o 'kernel' de 3x3 píxeles a través de la imagen. Esto permite detectar características locales invariantes a la posición: líneas diagonales, bordes de mangas, cuellos o suelas de calzado.",
        formula: "(I * K)(i, j) = \\sum_m \\sum_n I(i-m, j-n) K(m, n)",
        svg: `<svg width="260" height="200" viewBox="0 0 260 200" fill="none">
            <!-- 5x5 Input Grid -->
            <rect x="20" y="30" width="100" height="100" fill="#111827" stroke="#1f293d" stroke-width="1.5" rx="4"/>
            <path d="M40 30v100M60 30v100M80 30v100M100 30v100M20 50h100M20 70h100M20 90h100M20 110h100" stroke="#1e293b" stroke-width="1"/>
            <!-- 3x3 Kernel Focus -->
            <rect x="20" y="30" width="60" height="60" fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" stroke-width="2" rx="2"/>
            <text x="50" y="65" fill="#60a5fa" font-size="10" font-family="monospace" text-anchor="middle">Kernel 3x3</text>
            <!-- Arrow -->
            <path d="M135 80l20 0m-5-5l5 5l-5 5" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
            <!-- Feature Map Output -->
            <rect x="170" y="45" width="70" height="70" fill="#111827" stroke="#10b981" stroke-width="1.5" rx="4"/>
            <path d="M170 80h70M205 45v70" stroke="#1e293b" stroke-width="1"/>
            <rect x="170" y="45" width="35" height="35" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" stroke-width="2"/>
            <text x="205" y="145" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle">Mapa de Activación</text>
        </svg>`
    },
    {
        num: "02",
        badge: "Activación No Lineal",
        title: "Función de Activación ReLU",
        desc: "Las capas convolucionales lineales sin activación solo podrían aprender combinaciones lineales simples. La función ReLU (Rectified Linear Unit) introduce la no-linealidad necesaria para aprender geometrías complejas, anulando valores negativos y dejando pasar los positivos con gradiente constante 1.",
        formula: "f(x) = \\max(0, x)",
        svg: `<svg width="260" height="200" viewBox="0 0 260 200" fill="none">
            <!-- Axes -->
            <line x1="30" y1="150" x2="230" y2="150" stroke="#334155" stroke-width="2"/>
            <line x1="130" y1="30" x2="130" y2="170" stroke="#334155" stroke-width="2"/>
            <!-- Zero flat line (negative) -->
            <line x1="40" y1="150" x2="130" y2="150" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
            <!-- Active 45 deg line (positive) -->
            <line x1="130" y1="150" x2="220" y2="60" stroke="#10b981" stroke-width="4" stroke-linecap="round"/>
            <!-- Labels -->
            <text x="75" y="135" fill="#ef4444" font-size="11" font-family="monospace">f(x) = 0</text>
            <text x="180" y="90" fill="#10b981" font-size="11" font-family="monospace">f(x) = x</text>
            <text x="130" y="185" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle">x = 0 (Umbral de activación)</text>
        </svg>`
    },
    {
        num: "03",
        badge: "Reducción Espacial",
        title: "Submuestreo con MaxPooling2D",
        desc: "A medida que la red profundiza, MaxPooling con ventana 2x2 divide el ancho y el alto a la mitad (de 28x28 a 14x14 y luego a 7x7), seleccionando el valor máximo en cada región. Esto reduce el número de cálculos en un 75% por capa y otorga invariancia ante desplazamientos leves.",
        formula: "y_{i, j} = \\max_{(p, q) \\in \\Omega} x_{2i+p, 2j+q}",
        svg: `<svg width="260" height="200" viewBox="0 0 260 200" fill="none">
            <!-- 4x4 Grid -->
            <rect x="25" y="40" width="80" height="80" fill="#111827" stroke="#334155" stroke-width="1.5" rx="4"/>
            <path d="M45 40v80M65 40v80M85 40v80M25 60h80M25 80h80M25 100h80" stroke="#1e293b"/>
            <!-- Highlight Quad 1 -->
            <rect x="25" y="40" width="40" height="40" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" stroke-width="2"/>
            <text x="45" y="55" fill="#93c5fd" font-size="10" font-family="monospace" text-anchor="middle">9</text>
            <text x="45" y="75" fill="#64748b" font-size="10" font-family="monospace" text-anchor="middle">3</text>
            <!-- Arrow -->
            <path d="M120 80l20 0m-5-5l5 5l-5 5" stroke="#64748b" stroke-width="2"/>
            <!-- 2x2 Reduced Output -->
            <rect x="155" y="60" width="40" height="40" fill="#111827" stroke="#10b981" stroke-width="1.5" rx="4"/>
            <line x1="175" y1="60" x2="175" y2="100" stroke="#1e293b"/>
            <line x1="155" y1="80" x2="195" y2="80" stroke="#1e293b"/>
            <rect x="155" y="60" width="20" height="20" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" stroke-width="2"/>
            <text x="165" y="74" fill="#34d399" font-size="10" font-family="monospace" text-anchor="middle">9</text>
            <text x="175" y="130" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle">Compresión 4x</text>
        </svg>`
    },
    {
        num: "04",
        badge: "Regularización",
        title: "Batch Normalization & Dropout",
        desc: "Para evitar que la red memorice el conjunto de entrenamiento (overfitting), aplicamos dos técnicas de vanguardia: Batch Normalization normaliza la media y varianza de los lotes evitando desvanecimiento del gradiente, mientras que Dropout apaga aleatoriamente entre el 20% y 35% de las neuronas en cada paso.",
        formula: "\\hat{x} = \\frac{x - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}, \\quad r_i \\sim \\text{Bernoulli}(1-p)",
        svg: `<svg width="260" height="200" viewBox="0 0 260 200" fill="none">
            <!-- Normal Neurons (Left Column) -->
            <circle cx="50" cy="50" r="12" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
            <circle cx="50" cy="90" r="12" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
            <circle cx="50" cy="130" r="12" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
            <circle cx="50" cy="170" r="12" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
            <!-- Output Layer with Dropout (Right Column) -->
            <circle cx="180" cy="50" r="12" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
            <circle cx="180" cy="90" r="12" fill="#1e1e24" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,3"/>
            <line x1="174" y1="84" x2="186" y2="96" stroke="#ef4444" stroke-width="2"/>
            <line x1="186" y1="84" x2="174" y2="96" stroke="#ef4444" stroke-width="2"/>
            <circle cx="180" cy="130" r="12" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
            <circle cx="180" cy="170" r="12" fill="#1e1e24" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,3"/>
            <line x1="174" y1="164" x2="186" y2="176" stroke="#ef4444" stroke-width="2"/>
            <line x1="186" y1="164" x2="174" y2="176" stroke="#ef4444" stroke-width="2"/>
            <!-- Connections -->
            <line x1="62" y1="50" x2="168" y2="50" stroke="#334155" stroke-width="1"/>
            <line x1="62" y1="90" x2="168" y2="130" stroke="#334155" stroke-width="1"/>
            <line x1="62" y1="130" x2="168" y2="50" stroke="#334155" stroke-width="1"/>
            <text x="180" y="195" fill="#ef4444" font-size="10" font-family="monospace" text-anchor="middle">Dropout 30%</text>
        </svg>`
    },
    {
        num: "05",
        badge: "Inferencia y Diagnóstico",
        title: "Softmax & Similitud Vectorial",
        desc: "La capa final de la red calcula un vector de 10 probabilidades multiclase mediante la función Softmax. Para auditar el resultado, el motor de similitud proyecta la imagen en un espacio vectorial de 784 dimensiones y calcula el coseno del ángulo contra prototipos de prueba, recuperando las prendas reales más parecidas.",
        formula: "S_{\\text{cos}}(u, v) = \\frac{u \\cdot v}{\\|u\\|_2 \\|v\\|_2}",
        svg: `<svg width="260" height="200" viewBox="0 0 260 200" fill="none">
            <!-- Origin -->
            <circle cx="60" cy="140" r="4" fill="#ffffff"/>
            <!-- Vector U (Query) -->
            <line x1="60" y1="140" x2="180" y2="60" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
            <text x="190" y="60" fill="#60a5fa" font-size="11" font-family="monospace">u (Query)</text>
            <!-- Vector V (Dataset Prototipo) -->
            <line x1="60" y1="140" x2="200" y2="100" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
            <text x="210" y="105" fill="#10b981" font-size="11" font-family="monospace">v (Top Match)</text>
            <!-- Angle Arc -->
            <path d="M100 113 A50 50 0 0 1 110 125" stroke="#f59e0b" stroke-width="2" fill="none"/>
            <text x="120" y="125" fill="#f59e0b" font-size="11" font-family="monospace">&theta; = 8&deg;</text>
            <text x="130" y="175" fill="#34d399" font-size="11" font-family="sans-serif" text-anchor="middle">Similitud Coseno: 98.7%</text>
        </svg>`
    }
];

function initTutorialEngine() {
    const stepperContainer = document.getElementById('tutorial-stepper');
    if (!stepperContainer) return;

    // Render step buttons
    stepperContainer.innerHTML = TUTORIAL_DATA.map((step, idx) => `
        <button class="tutorial-step-btn ${idx === 0 ? 'active' : ''}" data-step="${idx}">
            <span class="step-num">${step.num}</span>
            <span>${step.badge}</span>
        </button>
    `).join('');

    const buttons = stepperContainer.querySelectorAll('.tutorial-step-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const stepIdx = parseInt(btn.dataset.step, 10);
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTutorialStep(stepIdx);
        });
    });

    renderTutorialStep(0);
}

function renderTutorialStep(idx) {
    const data = TUTORIAL_DATA[idx];
    if (!data) return;

    const badgeEl = document.getElementById('tutorial-badge');
    const titleEl = document.getElementById('tutorial-heading');
    const descEl = document.getElementById('tutorial-desc');
    const formulaEl = document.getElementById('tutorial-formula');
    const canvasEl = document.getElementById('tutorial-canvas');

    if (badgeEl) badgeEl.textContent = `PASO ${data.num} : ${data.badge}`;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (formulaEl) formulaEl.textContent = data.formula;
    if (canvasEl) canvasEl.innerHTML = data.svg;
}

/* --------------------------------------------------------------------------
   INTERACTIVE GLOSSARY SIMULATIONS
   -------------------------------------------------------------------------- */

const GLOSSARY_TERMS = {
    'conv2d': {
        title: 'Capa Convolucional 2D (Conv2D)',
        category: 'Extracción de Características',
        code: `# En train_model.py (Línea 67)
layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
layers.BatchNormalization(),
layers.MaxPooling2D((2, 2)),
layers.Dropout(0.20)`,
        desc: 'Aplica un banco de filtros 3x3 que calculan el producto punto con vecindades locales de píxeles para generar mapas de activación de contornos y siluetas.',
        simHtml: `
            <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 8px;">Mueva el kernel 3x3 sobre el mapa de entrada 5x5:</div>
            <div id="conv-sim-container" style="display: flex; justify-content: center; margin-bottom: 12px;"></div>
            <div class="simulation-control-bar">
                <span>Posición Kernel (Columna):</span>
                <input type="range" min="0" max="2" value="0" id="conv-slider" class="sim-slider">
                <span id="conv-val-label" style="font-family: monospace; color: #60a5fa;">Posición: X=0</span>
            </div>
        `,
        init: () => {
            const slider = document.getElementById('conv-slider');
            const label = document.getElementById('conv-val-label');
            const container = document.getElementById('conv-sim-container');
            if (!slider || !container) return;

            function updateConv(val) {
                const kx = parseInt(val, 10);
                label.textContent = `Posición: X=${kx}`;
                container.innerHTML = `
                <svg width="240" height="150" viewBox="0 0 240 150">
                    <rect x="10" y="15" width="100" height="100" fill="#111827" stroke="#1e293b" rx="4"/>
                    <!-- 5x5 grid cells -->
                    ${Array.from({length: 25}).map((_, i) => {
                        const r = Math.floor(i / 5), c = i % 5;
                        return `<rect x="${10 + c*20}" y="${15 + r*20}" width="20" height="20" fill="none" stroke="#1f293d"/>`;
                    }).join('')}
                    <!-- Kernel Box (kx*20 offset) -->
                    <rect x="${10 + kx*20}" y="15" width="60" height="60" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" stroke-width="2" rx="2"/>
                    <!-- Arrow -->
                    <path d="M125 65l20 0m-4-4l4 4l-4 4" stroke="#64748b" stroke-width="2"/>
                    <!-- Result 3x3 Output -->
                    <rect x="160" y="35" width="60" height="60" fill="#111827" stroke="#10b981" rx="4"/>
                    <rect x="${160 + kx*20}" y="35" width="20" height="20" fill="rgba(16, 185, 129, 0.4)" stroke="#10b981" stroke-width="2"/>
                </svg>`;
            }
            slider.addEventListener('input', (e) => updateConv(e.target.value));
            updateConv(0);
        }
    },
    'relu': {
        title: 'Rectified Linear Unit (ReLU)',
        category: 'Función de Activación',
        code: `# En train_model.py
layers.Dense(128, activation='relu'),

# Matemática en NumPy:
def relu(x):
    return np.maximum(0, x)`,
        desc: 'Elimina componentes negativas transformando valores menores a cero en exactamente cero, y preservando valores positivos con gradiente unitario.',
        simHtml: `
            <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 8px;">Ajuste el valor de entrada x para evaluar f(x) = max(0, x):</div>
            <div id="relu-sim-container" style="display: flex; justify-content: center; margin-bottom: 12px;"></div>
            <div class="simulation-control-bar">
                <span>Entrada x:</span>
                <input type="range" min="-50" max="50" value="25" id="relu-slider" class="sim-slider">
                <span id="relu-val-label" style="font-family: monospace; color: #10b981;">x = 2.5 &bull; f(x) = 2.5</span>
            </div>
        `,
        init: () => {
            const slider = document.getElementById('relu-slider');
            const label = document.getElementById('relu-val-label');
            const container = document.getElementById('relu-sim-container');
            if (!slider || !container) return;

            function updateRelu(rawVal) {
                const x = parseFloat(rawVal) / 10.0;
                const y = Math.max(0, x);
                label.innerHTML = `x = ${x.toFixed(1)} &bull; <strong style="color: ${y > 0 ? '#34d399' : '#ef4444'}">f(x) = ${y.toFixed(1)}</strong>`;
                
                // SVG mapping: x in [-5, 5] -> px in [30, 210]
                const px = 120 + x * 18;
                const py = 120 - y * 18;

                container.innerHTML = `
                <svg width="240" height="150" viewBox="0 0 240 150">
                    <line x1="20" y1="120" x2="220" y2="120" stroke="#334155" stroke-width="1.5"/>
                    <line x1="120" y1="20" x2="120" y2="140" stroke="#334155" stroke-width="1.5"/>
                    <!-- ReLU Line -->
                    <line x1="20" y1="120" x2="120" y2="120" stroke="#ef4444" stroke-width="3"/>
                    <line x1="120" y1="120" x2="210" y2="30" stroke="#10b981" stroke-width="3"/>
                    <!-- Dynamic Point -->
                    <circle cx="${px}" cy="${py}" r="6" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
                    <text x="${px}" y="${py - 10}" fill="#60a5fa" font-size="10" font-family="monospace" text-anchor="middle">(${x.toFixed(1)}, ${y.toFixed(1)})</text>
                </svg>`;
            }
            slider.addEventListener('input', (e) => updateRelu(e.target.value));
            updateRelu(25);
        }
    },
    'maxpooling': {
        title: 'MaxPooling 2D (Submuestreo)',
        category: 'Compresión Espacial',
        code: `# En train_model.py
layers.MaxPooling2D((2, 2)),
# Reduce la dimensionalidad espacial a la mitad:
# (None, 28, 28, 32) -> (None, 14, 14, 32)`,
        desc: 'Divide el tensor espacial en cuadrantes de 2x2 píxeles y retiene únicamente el valor de activación más alto, descartando información redundante.',
        simHtml: `
            <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 8px;">Región 4x4 reducida a 2x2 extrayendo los máximos:</div>
            <div id="pool-sim-container" style="display: flex; justify-content: center; margin-bottom: 12px;"></div>
            <div class="simulation-control-bar">
                <button id="pool-rand-btn" class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">Generar Nuevos Valores</button>
            </div>
        `,
        init: () => {
            const btn = document.getElementById('pool-rand-btn');
            const container = document.getElementById('pool-sim-container');
            if (!container) return;

            function renderPool() {
                const vals = Array.from({length: 16}, () => Math.floor(Math.random() * 9) + 1);
                // Quadrant maxes:
                const q1 = Math.max(vals[0], vals[1], vals[4], vals[5]);
                const q2 = Math.max(vals[2], vals[3], vals[6], vals[7]);
                const q3 = Math.max(vals[8], vals[9], vals[12], vals[13]);
                const q4 = Math.max(vals[10], vals[11], vals[14], vals[15]);

                container.innerHTML = `
                <svg width="240" height="140" viewBox="0 0 240 140">
                    <!-- 4x4 Matrix -->
                    <rect x="15" y="15" width="80" height="80" fill="#111827" stroke="#334155" rx="4"/>
                    <rect x="15" y="15" width="40" height="40" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6"/>
                    <rect x="55" y="15" width="40" height="40" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981"/>
                    <rect x="15" y="55" width="40" height="40" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b"/>
                    <rect x="55" y="55" width="40" height="40" fill="rgba(168, 85, 247, 0.15)" stroke="#a855f7"/>
                    
                    <text x="35" y="40" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">Max:${q1}</text>
                    <text x="75" y="40" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">Max:${q2}</text>
                    <text x="35" y="80" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">Max:${q3}</text>
                    <text x="75" y="80" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">Max:${q4}</text>

                    <!-- Arrow -->
                    <path d="M115 55l20 0m-4-4l4 4l-4 4" stroke="#64748b" stroke-width="2"/>

                    <!-- 2x2 Result -->
                    <rect x="150" y="35" width="40" height="40" fill="#111827" stroke="#334155" rx="4"/>
                    <rect x="150" y="35" width="20" height="20" fill="rgba(59, 130, 246, 0.35)"/>
                    <text x="160" y="49" fill="#93c5fd" font-size="10" font-family="monospace" text-anchor="middle">${q1}</text>
                    <rect x="170" y="35" width="20" height="20" fill="rgba(16, 185, 129, 0.35)"/>
                    <text x="180" y="49" fill="#34d399" font-size="10" font-family="monospace" text-anchor="middle">${q2}</text>
                    <rect x="150" y="55" width="20" height="20" fill="rgba(245, 158, 11, 0.35)"/>
                    <text x="160" y="69" fill="#fcd34d" font-size="10" font-family="monospace" text-anchor="middle">${q3}</text>
                    <rect x="170" y="55" width="20" height="20" fill="rgba(168, 85, 247, 0.35)"/>
                    <text x="180" y="69" fill="#d8b4fe" font-size="10" font-family="monospace" text-anchor="middle">${q4}</text>
                </svg>`;
            }
            if (btn) btn.addEventListener('click', renderPool);
            renderPool();
        }
    },
    'dropout': {
        title: 'Dropout (Desconexión Aleatoria)',
        category: 'Regularización de Pesos',
        code: `# En train_model.py
layers.Dropout(0.35),
# Durante el entrenamiento, 35% de neuronas
# se apagan aleatoriamente para evitar co-adaptación`,
        desc: 'Técnica de regularización que simula el entrenamiento de un ensamble exponencial de sub-redes al apagar aleatoriamente conexiones neuronales en cada época.',
        simHtml: `
            <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 8px;">Haga clic en 'Re-muestrear' para ver qué nodos se apagan al 35%:</div>
            <div id="drop-sim-container" style="display: flex; justify-content: center; margin-bottom: 12px;"></div>
            <div class="simulation-control-bar">
                <button id="drop-resample-btn" class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">Re-muestrear Dropout</button>
                <span id="drop-active-count" style="font-family: monospace; color: #10b981;">Activos: 5 / 8</span>
            </div>
        `,
        init: () => {
            const btn = document.getElementById('drop-resample-btn');
            const countLabel = document.getElementById('drop-active-count');
            const container = document.getElementById('drop-sim-container');
            if (!container) return;

            function renderDropout() {
                const states = Array.from({length: 8}, () => Math.random() > 0.35);
                const activeCount = states.filter(Boolean).length;
                if (countLabel) countLabel.textContent = `Activos: ${activeCount} / 8 (${(activeCount/8*100).toFixed(0)}%)`;

                container.innerHTML = `
                <svg width="240" height="140" viewBox="0 0 240 140">
                    ${states.map((active, i) => {
                        const col = i < 4 ? 0 : 1;
                        const row = i % 4;
                        const cx = col === 0 ? 60 : 180;
                        const cy = 25 + row * 30;
                        if (active) {
                            return `<circle cx="${cx}" cy="${cy}" r="10" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                                    <circle cx="${cx}" cy="${cy}" r="4" fill="#3b82f6"/>`;
                        } else {
                            return `<circle cx="${cx}" cy="${cy}" r="10" fill="#111827" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3"/>
                                    <line x1="${cx-5}" y1="${cy-5}" x2="${cx+5}" y2="${cy+5}" stroke="#ef4444" stroke-width="1.5"/>
                                    <line x1="${cx+5}" y1="${cy-5}" x2="${cx-5}" y2="${cy+5}" stroke="#ef4444" stroke-width="1.5"/>`;
                        }
                    }).join('')}
                    <!-- Central Connections -->
                    <line x1="72" y1="25" x2="168" y2="25" stroke="#334155" stroke-width="1"/>
                    <line x1="72" y1="55" x2="168" y2="85" stroke="#334155" stroke-width="1"/>
                    <line x1="72" y1="85" x2="168" y2="55" stroke="#334155" stroke-width="1"/>
                    <line x1="72" y1="115" x2="168" y2="115" stroke="#334155" stroke-width="1"/>
                </svg>`;
            }
            if (btn) btn.addEventListener('click', renderDropout);
            renderDropout();
        }
    },
    'softmax': {
        title: 'Función Softmax Multiclase',
        category: 'Capa de Clasificación',
        code: `# En app.py (Inferencia)
preds = model.predict(tensor_input, verbose=0)[0]
# Transforma logits z en probabilidades en [0.0, 1.0]:
# sum(preds) == 1.0`,
        desc: 'Calcula la exponencial normalizada de los logits de salida para producir una distribución de probabilidades interpretable sobre las 10 categorías de prendas.',
        simHtml: `
            <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 8px;">Ajuste el logit z1 para ver cómo cambian las probabilidades de las 3 clases:</div>
            <div id="soft-sim-container" style="display: flex; justify-content: center; margin-bottom: 12px;"></div>
            <div class="simulation-control-bar">
                <span>Logit Clase 1 (z1):</span>
                <input type="range" min="0" max="60" value="35" id="soft-slider" class="sim-slider">
                <span id="soft-val-label" style="font-family: monospace; color: #10b981;">P1: 82.5%</span>
            </div>
        `,
        init: () => {
            const slider = document.getElementById('soft-slider');
            const label = document.getElementById('soft-val-label');
            const container = document.getElementById('soft-sim-container');
            if (!slider || !container) return;

            function updateSoftmax(rawZ) {
                const z1 = parseFloat(rawZ) / 10.0;
                const z2 = 1.5;
                const z3 = 0.8;

                const e1 = Math.exp(z1);
                const e2 = Math.exp(z2);
                const e3 = Math.exp(z3);
                const sumE = e1 + e2 + e3;

                const p1 = (e1 / sumE) * 100;
                const p2 = (e2 / sumE) * 100;
                const p3 = (e3 / sumE) * 100;

                label.textContent = `P(Clase 1): ${p1.toFixed(1)}%`;

                container.innerHTML = `
                <svg width="240" height="130" viewBox="0 0 240 130">
                    <!-- Bar 1 -->
                    <text x="50" y="115" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Clase 1</text>
                    <rect x="35" y="${100 - p1}" width="30" height="${p1}" fill="#3b82f6" rx="2"/>
                    <text x="50" y="${95 - p1}" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">${p1.toFixed(0)}%</text>

                    <!-- Bar 2 -->
                    <text x="120" y="115" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Clase 2</text>
                    <rect x="105" y="${100 - p2}" width="30" height="${p2}" fill="#64748b" rx="2"/>
                    <text x="120" y="${95 - p2}" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">${p2.toFixed(0)}%</text>

                    <!-- Bar 3 -->
                    <text x="190" y="115" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Clase 3</text>
                    <rect x="175" y="${100 - p3}" width="30" height="${p3}" fill="#64748b" rx="2"/>
                    <text x="190" y="${95 - p3}" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">${p3.toFixed(0)}%</text>
                    <line x1="20" y1="100" x2="220" y2="100" stroke="#334155" stroke-width="1"/>
                </svg>`;
            }
            slider.addEventListener('input', (e) => updateSoftmax(e.target.value));
            updateSoftmax(35);
        }
    },
    'cosinesim': {
        title: 'Similitud de Coseno',
        category: 'Motor de Comparación',
        code: `# En app.py
def compute_similarity(query_flat, ref_images):
    ref_flat = ref_images.reshape(len(ref_images), 784)
    # Cosine Similarity:
    cosine_sims = np.dot(ref_flat, query_flat) / (ref_norms * query_norm)`,
        desc: 'Métrica que evalúa la orientación angular entre dos vectores en el espacio latente de 784 dimensiones, siendo robusta ante variaciones de iluminación global.',
        simHtml: `
            <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 8px;">Varíe el ángulo &theta; entre la consulta y el prototipo:</div>
            <div id="cos-sim-container" style="display: flex; justify-content: center; margin-bottom: 12px;"></div>
            <div class="simulation-control-bar">
                <span>Ángulo &theta;:</span>
                <input type="range" min="0" max="90" value="15" id="cos-slider" class="sim-slider">
                <span id="cos-val-label" style="font-family: monospace; color: #10b981;">Similitud: 96.6%</span>
            </div>
        `,
        init: () => {
            const slider = document.getElementById('cos-slider');
            const label = document.getElementById('cos-val-label');
            const container = document.getElementById('cos-sim-container');
            if (!slider || !container) return;

            function updateCosine(deg) {
                const angleDeg = parseFloat(deg);
                const angleRad = (angleDeg * Math.PI) / 180.0;
                const sim = Math.cos(angleRad) * 100;
                label.innerHTML = `&theta; = ${angleDeg.toFixed(0)}&deg; &bull; <strong style="color: ${sim >= 80 ? '#34d399' : '#f59e0b'}">Sim: ${sim.toFixed(1)}%</strong>`;

                const v2x = 50 + 90 * Math.cos(angleRad);
                const v2y = 110 - 90 * Math.sin(angleRad);

                container.innerHTML = `
                <svg width="240" height="140" viewBox="0 0 240 140">
                    <circle cx="50" cy="110" r="4" fill="#ffffff"/>
                    <!-- Vector 1 (Base horizontal) -->
                    <line x1="50" y1="110" x2="150" y2="110" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
                    <text x="155" y="113" fill="#60a5fa" font-size="10" font-family="monospace">u (Query)</text>
                    <!-- Vector 2 (Rotated) -->
                    <line x1="50" y1="110" x2="${v2x}" y2="${v2y}" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
                    <text x="${v2x + 5}" y="${v2y}" fill="#10b981" font-size="10" font-family="monospace">v (Ref)</text>
                    <!-- Arc -->
                    <path d="M75 110 A25 25 0 0 0 ${50 + 25*Math.cos(angleRad)} ${110 - 25*Math.sin(angleRad)}" stroke="#f59e0b" stroke-width="1.5" fill="none"/>
                </svg>`;
            }
            slider.addEventListener('input', (e) => updateCosine(e.target.value));
            updateCosine(15);
        }
    }
};

function initGlossaryEngine() {
    const tabs = document.querySelectorAll('.glossary-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const termKey = tab.dataset.term;
            loadGlossaryTerm(termKey);
        });
    });

    loadGlossaryTerm('conv2d');
}

function loadGlossaryTerm(key) {
    const term = GLOSSARY_TERMS[key];
    if (!term) return;

    const titleEl = document.getElementById('glossary-title');
    const catEl = document.getElementById('glossary-category');
    const descEl = document.getElementById('glossary-desc');
    const codeEl = document.getElementById('glossary-code');
    const simBox = document.getElementById('glossary-simulation-render');

    if (titleEl) titleEl.textContent = term.title;
    if (catEl) catEl.textContent = term.category;
    if (descEl) descEl.textContent = term.desc;
    if (codeEl) codeEl.textContent = term.code;
    if (simBox) {
        simBox.innerHTML = term.simHtml;
        if (typeof term.init === 'function') {
            term.init();
        }
    }
}

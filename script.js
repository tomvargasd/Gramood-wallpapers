const generateBtn = document.getElementById('generate-btn');
            const downloadBtn = document.getElementById('download-btn');
            const outputSection = document.getElementById('output-section');
            const wallpaperEl = document.getElementById('wallpaper');

            // Emociones y sus correspondientes características
            const moodAttributes = {
                "feliz": {
                    complexity: 0.9,
                    opacity: 0.85,
                    speed: 2.0,
                    gradientType: "linear", // colores brillantes en diagonal
                    direction: "to right bottom",
                    contrastBoost: 1.2,
                    useAccentFirst: true
                },
                "tranquilo": {
                    complexity: 0.3,
                    opacity: 0.6,
                    speed: 0.5,
                    gradientType: "linear",
                    direction: "to bottom",
                    contrastBoost: 0.6,
                    useAccentFirst: false
                },
                "melancólico": {
                    complexity: 0.4,
                    opacity: 0.95,
                    speed: 0.4,
                    gradientType: "radial", // centro oscuro
                    direction: "center",
                    contrastBoost: 0.5,
                    useAccentFirst: false
                },
                "enérgico": {
                    complexity: 1.0,
                    opacity: 0.9,
                    speed: 2.5,
                    gradientType: "linear",
                    direction: "to top right",
                    contrastBoost: 1.5,
                    useAccentFirst: true
                },
                "soñador": {
                    complexity: 0.6,
                    opacity: 0.75,
                    speed: 0.9,
                    gradientType: "radial",
                    direction: "center",
                    contrastBoost: 1.0,
                    useAccentFirst: true
                },
                "nostálgico": {
                    complexity: 0.5,
                    opacity: 0.85,
                    speed: 0.5,
                    gradientType: "linear",
                    direction: "to left bottom",
                    contrastBoost: 0.7,
                    useAccentFirst: false
                },
                "inspirado": {
                    complexity: 0.8,
                    opacity: 0.8,
                    speed: 1.5,
                    gradientType: "linear",
                    direction: "135deg",
                    contrastBoost: 1.3,
                    useAccentFirst: true
                },
                "confundido": {
                    complexity: 0.7,
                    opacity: 0.95,
                    speed: 1.0,
                    gradientType: "radial",
                    direction: "center",
                    contrastBoost: 1.4,
                    useAccentFirst: false
                },
                "enamorado": {
                    complexity: 0.6,
                    opacity: 0.85,
                    speed: 1.2,
                    gradientType: "linear",
                    direction: "to right",
                    contrastBoost: 1.2,
                    useAccentFirst: true
                },
                "misterioso": {
                    complexity: 0.8,
                    opacity: 0.95,
                    speed: 0.7,
                    gradientType: "radial",
                    direction: "center",
                    contrastBoost: 1.6,
                    useAccentFirst: false
                }
                };


            // Paletas de colores para cada opción
            const colorPalettes = {
  "azul": [
    "#003566",  // base: confianza, serenidad
    "#FFD60A",  // acento: amarillo optimista, contrasta y equilibra lo serio
    "#4CC9F0"   // acento: cian brillante, aporta frescura tecnológica
  ],
  "cian": [
    "#00B4D8",  // base: limpieza, renovación
    "#F15BB5",  // acento: rosa vibrante, emocionalmente creativo
    "#FFE066"   // acento: amarillo claro, luz y optimismo suave
  ],
  "morado": [
    "#7B2CBF",  // base: misterio, introspección
    "#F72585",  // acento: rosa neón, fantasía y provocación emocional
    "#00F5D4"   // acento: aqua eléctrico, rompe la densidad con frescura
  ],
  "rosa": [
    "#FF4D6D",  // base: ternura, pasión suave
    "#8338EC",  // acento: púrpura profundo, introspección y deseo
    "#FFB703"   // acento: naranja brillante, alegría juguetona
  ],
  "rojo": [
    "#D00000",  // base: pasión, alerta, deseo
    "#FAA307",  // acento: naranja encendido, energía contagiosa
    "#F72585"   // acento: rosa intenso, sensualidad emocional
  ],
  "naranja": [
    "#F48C06",  // base: vitalidad, entusiasmo
    "#7209B7",  // acento: púrpura audaz, dramatismo elegante
    "#F94144"   // acento: rojo brillante, fuerza emocional y presencia
  ],
  "amarillo": [
    "#FFD60A",  // base: alegría, creatividad
    "#00BBF9",  // acento: cian puro, limpio y positivo
    "#FF4D6D"   // acento: rosa fuerte, estimulación emocional
  ],
  "verde": [
    "#2ECC71",  // base: naturaleza, estabilidad
    "#F9C80E",  // acento: amarillo cálido, optimismo radiante
    "#00A8E8"   // acento: azul vibrante, equilibrio tecnológico
  ],
  "turquesa": [
    "#00A896",  // base: frescura, balance tropical
    "#F15BB5",  // acento: rosa brillante, romanticismo con energía
    "#FFD166"   // acento: amarillo mango, calidez emocional sutil
  ]
};





            // Palabras clave para detectar estados de ánimo
            const moodKeywords = {
                "feliz": ["feliz", "contento", "alegre", "dichoso", "entusiasta", "optimista", "jubiloso", "radiante", "felicidad"],
                "tranquilo": ["tranquilo", "relajado", "calmado", "sereno", "pacífico", "quieto", "apacible", "zen", "paz"],
                "melancólico": ["melancólico", "triste", "nostálgico", "pensativo", "reflexivo", "añoranza", "melancolía", "pena"],
                "enérgico": ["enérgico", "activo", "vigoroso", "dinámico", "potente", "vivo", "fuerte", "intenso", "poderoso"],
                "soñador": ["soñador", "fantasioso", "ilusionado", "esperanzado", "imaginativo", "fantasía", "sueños"],
                "nostálgico": ["nostálgico", "recuerdos", "añoranza", "pasado", "memoria", "nostalgia", "remembranza"],
                "inspirado": ["inspirado", "creativo", "motivado", "iluminado", "estimulado", "creación", "inspiración"],
                "confundido": ["confundido", "perdido", "desorientado", "dudoso", "indeciso", "confusión", "incertidumbre"],
                "enamorado": ["enamorado", "amor", "pasión", "cariño", "afecto", "romance", "enamoramiento", "corazón"],
                "misterioso": ["misterioso", "enigmático", "secreto", "oculto", "intrigante", "misterio", "enigma", "incógnita"]
            };

            // Detectar el estado de ánimo basado en texto ingresado
            function detectMood(text) {
                text = text.toLowerCase();

                for (const mood in moodKeywords) {
                    for (const keyword of moodKeywords[mood]) {
                        if (text.includes(keyword)) {
                            return mood;
                        }
                    }
                }

                // Si no se encuentra ninguna coincidencia, devolver un estado de ánimo aleatorio
                const moods = Object.keys(moodKeywords);
                return moods[Math.floor(Math.random() * moods.length)];
            }

            // Crear una curva SVG con el efecto de onda
            function createWavePath(width, height, complexity, seed) {
                let path = `M0,${height/2}`;

                const segments = Math.floor(10 + complexity * 15);
                const segmentWidth = width / segments;

                // Crear puntos de control para la curva
                for (let i = 1; i <= segments; i++) {
                    const x = i * segmentWidth;
                    const y = height/2 + Math.sin(i * 0.5 + seed) * (50 + complexity * 70);
                    const cp1x = x - segmentWidth / 2;
                    const cp1y = height/2 + Math.sin((i - 0.5) * 0.5 + seed) * (70 + complexity * 90);

                    path += ` C${cp1x},${cp1y} ${cp1x},${cp1y} ${x},${y}`;
                }

                // Completar el path para formar una forma cerrada
                path += ` L${width},${height} L0,${height} Z`;

                return path;
            }

            // Nueva función para generar gradientes SVG artísticos
            generateBtn.addEventListener('click', function () {
    outputSection.style.display = 'block';

    requestAnimationFrame(() => {
        const moodInput = document.getElementById('mood').value;
        const colorChoice = document.getElementById('color').value;

        const timedom = document.getElementById('time');
        const datedom = document.getElementById('date');
        const date = new Date();
        console.log(date);
        //pm or am hidden
        let timeformated = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
        let dateformated = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        timedom.textContent = timeformated;
        datedom.textContent = dateformated;

        if (!moodInput) {
            alert('Por favor, ingresa cómo te sientes.');
            // Consider hiding outputSection again if input is missing, or handle appropriately
            // outputSection.style.display = 'none';
            return;
        }

        while (wallpaperEl.firstChild) {
            wallpaperEl.removeChild(wallpaperEl.firstChild);
        }

        const detectedMood = detectMood(moodInput);

        const {
            complexity,
            opacity,
            gradientType,
            direction,
            contrastBoost,
            useAccentFirst
        } = moodAttributes[detectedMood];

        const palette = colorPalettes[colorChoice];

        // El primer color (paleta[0]) es el color predominante
        const colorStart = palette[0];
        // Para contraste visual, tomamos uno de los complementarios
        const colorEnd = palette[1]; // o palette[2], o uno aleatorio complementario

        const width = wallpaperEl.offsetWidth;
        const height = wallpaperEl.offsetHeight;
        const svgNS = "http://www.w3.org/2000/svg";

        if (width === 0 || height === 0) {
            // Fallback or error message if dimensions are still zero
            console.error("Wallpaper dimensions are zero. SVG cannot be generated.");
            alert("Error: No se pudieron obtener las dimensiones para generar el wallpaper. Intenta de nuevo.");
            // outputSection.style.display = 'none'; // Optionally hide if generation fails
            return;
        }

        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

        const defs = document.createElementNS(svgNS, "defs");

        let gradient;
        if (gradientType === "radial") {
            gradient = document.createElementNS(svgNS, "radialGradient");
            gradient.setAttribute("id", "grad1");
            gradient.setAttribute("cx", "50%");
            gradient.setAttribute("cy", "50%");
            gradient.setAttribute("r", "70%");
        } else {
            gradient = document.createElementNS(svgNS, "linearGradient");
            gradient.setAttribute("id", "grad1");
            gradient.setAttribute("x1", "0%");
            gradient.setAttribute("y1", "0%");
            gradient.setAttribute("x2", "100%");
            gradient.setAttribute("y2", "100%");
        }

        const stop1 = document.createElementNS(svgNS, "stop");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("stop-color", colorStart);

        const stop2 = document.createElementNS(svgNS, "stop");
        stop2.setAttribute("offset", "100%");
        stop2.setAttribute("stop-color", colorEnd);

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);

        const filter = document.createElementNS(svgNS, "filter");
        filter.setAttribute("id", "blur1");
        filter.setAttribute("x", "-10%");
        filter.setAttribute("y", "-10%");
        filter.setAttribute("width", "120%");
        filter.setAttribute("height", "120%");

        const gaussian = document.createElementNS(svgNS, "feGaussianBlur");
        gaussian.setAttribute("in", "SourceGraphic");
        gaussian.setAttribute("stdDeviation", 50 + contrastBoost * 10);
        filter.appendChild(gaussian);
        defs.appendChild(filter);
        svg.appendChild(defs);

        const background = document.createElementNS(svgNS, "rect");
        background.setAttribute("width", width);
        background.setAttribute("height", height);
        background.setAttribute("fill", "url(#grad1)");
        svg.appendChild(background);

        const g = document.createElementNS(svgNS, "g");
        g.setAttribute("filter", "url(#blur1)");

        const numCircles = 3 + Math.floor(complexity * 6);
        for (let i = 0; i < numCircles; i++) {
            const circle = document.createElementNS(svgNS, "circle");
            const radius = 150 + Math.random() * 120 * contrastBoost;
            const cx = Math.random() * width;
            const cy = Math.random() * height;

            // Solo usar colores de acento (excluyendo el predominante)
            const fill = palette[1 + Math.floor(Math.random() * (palette.length - 1))];

            circle.setAttribute("r", radius);
            circle.setAttribute("cx", cx);
            circle.setAttribute("cy", cy);
            circle.setAttribute("fill", fill + Math.floor(opacity * 255).toString(16)); // ajuste de opacidad

            g.appendChild(circle);
        }

        svg.appendChild(g);
        wallpaperEl.appendChild(svg);

        outputSection.scrollIntoView({ behavior: 'smooth' });
    });
});



downloadBtn.addEventListener('click', function () {
    let svgEl = wallpaperEl.querySelector('svg');

    // Serializa el SVG
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = function () {
        const canvas = document.createElement('canvas');
        const width = 1200;
        const height = 2100;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000'; // Fondo negro por defecto si hay transparencia
        ctx.fillRect(0, 0, width, height);

        // Dibuja la imagen escalada
        ctx.drawImage(img, 0, 0, width, height);

        const link = document.createElement('a');
        link.download = 'gramood-wallpaper.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        URL.revokeObjectURL(url);
    };

    img.onerror = function () {
        alert('Error al cargar la imagen del SVG.');
    };

    // Asegura que la imagen respete los filtros y gradientes
    img.src = url;
});


            // Custom color selector functionality
            const colorStyledSelect = document.getElementById('color-select-styled');
            const colorOptions = document.getElementById('color-select-options');
            const hiddenSelect = document.getElementById('color');

            // Show/hide options on click
            colorStyledSelect.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
                colorOptions.classList.toggle('active');
            });

            // Handle option selection
            colorOptions.querySelectorAll('li').forEach(option => {
                option.addEventListener('click', function() {
                    // Update styled select
                    const colorPreview = this.querySelector('.color-preview').style.backgroundColor;
                    colorStyledSelect.querySelector('.color-preview').style.backgroundColor = colorPreview;
                    colorStyledSelect.querySelector('span').textContent = this.textContent;

                    // Update hidden select value
                    hiddenSelect.value = this.getAttribute('data-value');

                    // Hide dropdown
                    colorOptions.classList.remove('active');
                    colorStyledSelect.classList.remove('active');
                });
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function() {
                colorOptions.classList.remove('active');
                colorStyledSelect.classList.remove('active');
            });

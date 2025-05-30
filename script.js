const dice = document.getElementById('dice');
            let currentDiceRoll = 1; // To store the result of the dice roll (1-6)

            // Define the target rotations for each face to be "up" (front-facing)
            // These might need adjustment based on your initial dice orientation and face definitions
            const faceRotations = {
                1: 'rotateY(0deg) rotateX(0deg)',              // Front face (face-1)
                2: 'rotateX(-90deg) rotateY(0deg)',           // Top face (face-2)
                3: 'rotateY(-90deg) rotateX(0deg)',           // Right face (face-3)
                4: 'rotateY(90deg) rotateX(0deg)',            // Left face (face-4)
                5: 'rotateX(90deg) rotateY(0deg)',            // Bottom face (face-5)
                6: 'rotateY(180deg) rotateX(0deg)'            // Back face (face-6)
            };

            if (dice) {
                dice.addEventListener('click', () => {
                    // 1. Initial "tumbling" animation
                    const randomX = Math.floor(Math.random() * 4) + 1; // 1 to 4
                    const randomY = Math.floor(Math.random() * 4) + 1; // 1 to 4

                    // Apply a random spin for visual effect
                    dice.style.transform = `rotateX(${randomX * 360}deg) rotateY(${randomY * 360}deg)`;

                    // 2. Determine the final "up" face
                    // For this version, we'll pick a random face result (1-6)
                    // and then snap to the rotation that shows that face.
                    const resultFace = Math.floor(Math.random() * 6) + 1;
                    currentDiceRoll = resultFace; // Store the result

                    // 3. After the spin, apply the transform for the chosen face
                    // Use a timeout to allow the spin animation to play
                    setTimeout(() => {
                        dice.style.transition = 'transform 0.7s ease-out'; // Smoother snap
                        dice.style.transform = faceRotations[resultFace];
                        console.log("Dado lanzado:", currentDiceRoll);

                        // Trigger wallpaper generation with random mood and color
                        const randomMoodKey = Object.keys(moodAttributes)[Math.floor(Math.random() * Object.keys(moodAttributes).length)];
                        const randomColorKey = Object.keys(colorPalettes)[Math.floor(Math.random() * Object.keys(colorPalettes).length)];

                        // Update the UI to reflect the randomly selected mood and color
                        document.getElementById('mood').value = randomMoodKey; // Optional: update input field

                        // Update custom color selector UI
                        const selectedColorOption = Array.from(colorOptions.querySelectorAll('li')).find(li => li.getAttribute('data-value') === randomColorKey);
                        if (selectedColorOption) {
                            const colorPreview = selectedColorOption.querySelector('.color-preview').style.backgroundColor;
                            colorStyledSelect.querySelector('.color-preview').style.backgroundColor = colorPreview;
                            colorStyledSelect.querySelector('span').textContent = selectedColorOption.textContent;
                            hiddenSelect.value = randomColorKey;
                        }

                        generateWallpaperAndUpdateUI(randomMoodKey, randomColorKey);

                    }, 1500); // Wait for the 1.5s roll animation to mostly complete
                });
            }

            const generateBtn = document.getElementById('generate-btn');
            // const moodInputEl = document.getElementById('mood'); // Already declared effectively by getElementById('mood').value
            // const colorSelectEl = document.getElementById('color'); // Already declared effectively by getElementById('color').value
            const downloadBtn = document.getElementById('download-btn');
            const outputSection = document.getElementById('output-section');
            const wallpaperEl = document.getElementById('wallpaper');
            // Custom color selector elements are already globally available: colorStyledSelect, colorOptions, hiddenSelect

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
            function generateWallpaperAndUpdateUI(moodKey, colorKey) {
                const timedom = document.getElementById('time');
                const datedom = document.getElementById('date');
                const date = new Date();
                //pm or am hidden
                let timeformated = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
                let dateformated = date.toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' });
                timedom.textContent = timeformated;
                datedom.textContent = dateformated;

                outputSection.style.display = 'block';

                const width = wallpaperEl.offsetWidth;
                const height = wallpaperEl.offsetHeight;

                while (wallpaperEl.firstChild) {
                    wallpaperEl.removeChild(wallpaperEl.firstChild);
                }

                // Use the provided moodKey directly, no need for detectMood if mood is already a key
                const currentMoodAttributes = moodAttributes[moodKey];
                if (!currentMoodAttributes) {
                    console.error("Mood key not found:", moodKey);
                    alert("Error: No se encontraron atributos para el estado de ánimo: " + moodKey);
                    return;
                }

                const {
                    complexity,
                    opacity,
                    gradientType,
                    direction,
                    contrastBoost,
                    useAccentFirst
                } = currentMoodAttributes;

                const palette = colorPalettes[colorKey];
                if (!palette) {
                    console.error("Color key not found:", colorKey);
                    alert("Error: No se encontró la paleta de colores para: " + colorKey);
                    return;
                }

                const colorStart = palette[0];
                const colorEnd = palette[1];

                const width = wallpaperEl.offsetWidth;
                const height = wallpaperEl.offsetHeight;
                const svgNS = "http://www.w3.org/2000/svg";

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
                    gradient.setAttribute("y2", "100%"); // This was y1, corrected to y2 for linear gradient
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

                    const fill = palette[1 + Math.floor(Math.random() * (palette.length - 1))];

                    circle.setAttribute("r", radius);
                    circle.setAttribute("cx", cx);
                    circle.setAttribute("cy", cy);
                    circle.setAttribute("fill", fill + Math.floor(opacity * 255).toString(16));

                    g.appendChild(circle);
                }

                svg.appendChild(g);
                wallpaperEl.appendChild(svg);

                outputSection.scrollIntoView({ behavior: 'smooth' });
            }

            generateBtn.addEventListener('click', function () {
                const moodInputVal = document.getElementById('mood').value;
                const colorChoiceVal = document.getElementById('color').value;

                if (!moodInputVal) {
                    alert('Por favor, ingresa cómo te sientes.');
                    return;
                }
                const detectedMoodKey = detectMood(moodInputVal); // detectMood returns a key
                generateWallpaperAndUpdateUI(detectedMoodKey, colorChoiceVal);
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

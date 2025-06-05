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
                    gradientType: "linear",
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
                    gradientType: "radial",
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
    "#003566",  // base
    "#FFD60A",  // accent
    "#4CC9F0"   // accent
  ],
  "cian": [
    "#00B4D8",
    "#F15BB5",
    "#FFE066"
  ],
  "morado": [
    "#7B2CBF",
    "#F72585",
    "#00F5D4"
  ],
  "rosa": [
    "#FF4D6D",
    "#8338EC",
    "#FFB703"
  ],
  "rojo": [
    "#D00000",
    "#FAA307",
    "#F72585"
  ],
  "naranja": [
    "#F48C06",
    "#7209B7",
    "#F94144"
  ],
  "amarillo": [
    "#FFD60A",
    "#00BBF9",
    "#FF4D6D"
  ],
  "verde": [
    "#2ECC71",
    "#F9C80E",
    "#00A8E8"
  ],
  "turquesa": [
    "#00A896",
    "#F15BB5",
    "#FFD166"
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

            function detectMood(text) {
                text = text.toLowerCase();
                for (const mood in moodKeywords) {
                    for (const keyword of moodKeywords[mood]) {
                        if (text.includes(keyword)) return mood;
                    }
                }
                const moods = Object.keys(moodKeywords);
                return moods[Math.floor(Math.random() * moods.length)];
            }

            function generateAbstractWallpaper(detectedMoodParams, palette, width, height, wallpaperElement) {
                const svgNS = "http://www.w3.org/2000/svg";
                const { complexity, opacity, gradientType, contrastBoost } = detectedMoodParams;
                const colorStart = palette[0];
                const colorEnd = palette[1]; // Abstract uses first two colors for gradient

                const svg = document.createElementNS(svgNS, "svg");
                svg.setAttribute("width", "100%");
                svg.setAttribute("height", "100%");
                svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
                const defs = document.createElementNS(svgNS, "defs");

                let gradient;
                if (gradientType === "radial") {
                    gradient = document.createElementNS(svgNS, "radialGradient");
                    gradient.setAttribute("id", "grad1"); // ID can be consistent as it's local to this SVG
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
                filter.setAttribute("id", "blur1"); // Similar ID, local to this SVG
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

                const backgroundRect = document.createElementNS(svgNS, "rect");
                backgroundRect.setAttribute("width", width);
                backgroundRect.setAttribute("height", height);
                backgroundRect.setAttribute("fill", "url(#grad1)");
                svg.appendChild(backgroundRect);

                const g = document.createElementNS(svgNS, "g");
                g.setAttribute("filter", "url(#blur1)");
                const numCircles = 3 + Math.floor(complexity * 6);
                for (let i = 0; i < numCircles; i++) {
                    const circle = document.createElementNS(svgNS, "circle");
                    const radius = 150 + Math.random() * 120 * contrastBoost;
                    const cx = Math.random() * width;
                    const cy = Math.random() * height;
                    // Abstract circles use accent colors beyond the first one for variety
                    const fill = palette[1 + Math.floor(Math.random() * (palette.length - 1))] || palette[0];
                    circle.setAttribute("r", radius);
                    circle.setAttribute("cx", cx);
                    circle.setAttribute("cy", cy);
                    circle.setAttribute("fill", fill + Math.floor(opacity * 255).toString(16));
                    g.appendChild(circle);
                }
                svg.appendChild(g);
                wallpaperElement.appendChild(svg);
            }

            function generateWavesWallpaper(detectedMoodParams, palette, width, height, wallpaperElement) {
                const svgNS = "http://www.w3.org/2000/svg";
                const { complexity, speed, useAccentFirst } = detectedMoodParams;
                const moodDirection = detectedMoodParams.direction;

                let currentPalette = [...palette];
                if (useAccentFirst && currentPalette.length > 1) {
                    let temp = currentPalette[0];
                    currentPalette[0] = currentPalette[1];
                    currentPalette[1] = temp;
                }

                const svg = document.createElementNS(svgNS, "svg");
                svg.setAttribute("width", "100%");
                svg.setAttribute("height", "100%");
                svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

                let numWaves = 3 + Math.floor(complexity * 4);
                if (numWaves < 1) numWaves = 1;

                for (let i = 0; i < numWaves; i++) {
                    const path = document.createElementNS(svgNS, "path");
                    const waveColor = currentPalette[i % currentPalette.length];

                    let calculatedOpacity = detectedMoodParams.opacity - (i / numWaves) * (detectedMoodParams.opacity * 0.6);
                    calculatedOpacity = Math.max(0.2, Math.min(1, calculatedOpacity));
                    path.setAttribute("fill-opacity", calculatedOpacity);

                    const yStart = height * (0.2 + (i / numWaves) * 0.5);

                    let cpOffsetX = 0;
                    if (moodDirection) {
                        if (moodDirection.includes("right")) {
                            cpOffsetX = width * 0.15;
                        } else if (moodDirection.includes("left")) {
                            cpOffsetX = -width * 0.15;
                        }
                    }
                    const cpX = width / 2 + cpOffsetX;
                    const yControl = yStart + (Math.random() - 0.5) * height * 0.25 * (complexity + 0.5) * ( (speed || 1) * 0.4 + 0.3);

                    const d = `M0,${yStart} Q${cpX},${yControl} ${width},${yStart} L${width},${height} L0,${height} Z`;
                    path.setAttribute("d", d);
                    path.setAttribute("fill", waveColor);
                    svg.appendChild(path);
                }
                wallpaperElement.appendChild(svg);
            }

            generateBtn.addEventListener('click', function () {
                outputSection.style.display = 'block';

                requestAnimationFrame(() => {
                    const moodInput = document.getElementById('mood').value;
                    const colorChoice = document.getElementById('color').value; // This is the key like "azul", "cian"
                    const selectedStyle = document.querySelector('input[name="wallpaper_style"]:checked').value;

                    const timedom = document.getElementById('time');
                    const datedom = document.getElementById('date');
                    const date = new Date();
                    let timeformated = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
                    let dateformated = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
                    timedom.textContent = timeformated;
                    datedom.textContent = dateformated;

                    if (!moodInput) {
                        alert('Por favor, ingresa cómo te sientes.');
                        return;
                    }

                    while (wallpaperEl.firstChild) {
                        wallpaperEl.removeChild(wallpaperEl.firstChild);
                    }

                    const detectedMoodKey = detectMood(moodInput);
                    const currentMoodParams = moodAttributes[detectedMoodKey]; // Object with complexity, opacity etc.
                    const selectedPaletteArray = colorPalettes[colorChoice];     // Array of colors e.g. ["#003566", "#FFD60A", "#4CC9F0"]

                    const width = wallpaperEl.offsetWidth;
                    const height = wallpaperEl.offsetHeight;

                    if (width === 0 || height === 0) {
                        console.error("Wallpaper dimensions are zero. SVG cannot be generated.");
                        alert("Error: No se pudieron obtener las dimensiones para generar el wallpaper. Intenta de nuevo.");
                        return;
                    }

                    if (selectedStyle === 'abstract') {
                        generateAbstractWallpaper(currentMoodParams, selectedPaletteArray, width, height, wallpaperEl);
                    } else if (selectedStyle === 'waves') {
                        generateWavesWallpaper(currentMoodParams, selectedPaletteArray, width, height, wallpaperEl);
                    }

                    outputSection.scrollIntoView({ behavior: 'smooth' });
                });
            });

            downloadBtn.addEventListener('click', function () {
                let svgEl = wallpaperEl.querySelector('svg');
                if (!svgEl) {
                    alert('Primero genera un wallpaper para poder descargarlo.');
                    return;
                }

                const svgData = new XMLSerializer().serializeToString(svgEl);
                const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(svgBlob);

                const img = new Image();
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const downloadWidth = 1200;
                    const downloadHeight = 2100;
                    canvas.width = downloadWidth;
                    canvas.height = downloadHeight;

                    const ctx = canvas.getContext('2d');

                    // Determine background color for download canvas based on selected style & palette
                    const colorChoice = document.getElementById('color').value;
                    const selectedPaletteArray = colorPalettes[colorChoice];
                    let downloadBgColor = selectedPaletteArray[0] || '#000000'; // Default to first color or black

                    // For abstract style, the SVG itself has a gradient background.
                    // For waves style, we might want the first color of the (potentially swapped) palette.
                    const selectedStyle = document.querySelector('input[name="wallpaper_style"]:checked').value;
                    if (selectedStyle === 'waves') {
                        const detectedMoodKey = detectMood(document.getElementById('mood').value);
                        const currentMoodParams = moodAttributes[detectedMoodKey];
                        if (currentMoodParams.useAccentFirst && selectedPaletteArray.length > 1) {
                            downloadBgColor = selectedPaletteArray[1]; // Use the swapped first color (original accent)
                        }
                    }
                    // However, the abstract style's SVG already includes a full background rect.
                    // The waves style paths are opaque and layered, so the first one effectively forms a background.
                    // The most reliable background for the PNG is the one visually present in the SVG.
                    // A simpler approach is to let the SVG render as is, and if its own background isn't sufficient (e.g. transparent areas),
                    // then a canvas fill is important. Since both styles aim for full coverage, this might be okay.
                    // The current fillRect uses the *original* first palette color.
                    // Let's keep it simple: use the original base color of the selected palette for canvas background.
                    ctx.fillStyle = colorPalettes[document.getElementById('color').value][0] || '#000000';
                    ctx.fillRect(0, 0, downloadWidth, downloadHeight);

                    ctx.drawImage(img, 0, 0, downloadWidth, downloadHeight);

                    const link = document.createElement('a');
                    link.download = 'gramood-wallpaper.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();

                    URL.revokeObjectURL(url);
                };
                img.onerror = function () {
                    alert('Error al cargar la imagen del SVG para la descarga.');
                    URL.revokeObjectURL(url);
                };
                img.src = url;
            });

            // Custom color selector functionality
            const colorStyledSelect = document.getElementById('color-select-styled');
            const colorOptions = document.getElementById('color-select-options');
            const hiddenSelect = document.getElementById('color');

            colorStyledSelect.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
                colorOptions.classList.toggle('active');
            });

            colorOptions.querySelectorAll('li').forEach(option => {
                option.addEventListener('click', function() {
                    const colorPreview = this.querySelector('.color-preview').style.backgroundColor;
                    colorStyledSelect.querySelector('.color-preview').style.backgroundColor = colorPreview;
                    colorStyledSelect.querySelector('span').textContent = this.textContent;
                    hiddenSelect.value = this.getAttribute('data-value');
                    colorOptions.classList.remove('active');
                    colorStyledSelect.classList.remove('active');
                });
            });

            document.addEventListener('click', function() {
                colorOptions.classList.remove('active');
                colorStyledSelect.classList.remove('active');
            });

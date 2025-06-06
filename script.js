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
                    direction: "135deg", // Interpreted as "to top right" or similar by gradient logic
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
                const colorEnd = palette[1];

                const svg = document.createElementNS(svgNS, "svg");
                svg.setAttribute("width", "100%");
                svg.setAttribute("height", "100%");
                svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
                const defs = document.createElementNS(svgNS, "defs");

                let gradient;
                if (gradientType === "radial") {
                    gradient = document.createElementNS(svgNS, "radialGradient");
                    gradient.setAttribute("id", "abstractGrad");
                    gradient.setAttribute("cx", "50%");
                    gradient.setAttribute("cy", "50%");
                    gradient.setAttribute("r", "70%");
                } else {
                    gradient = document.createElementNS(svgNS, "linearGradient");
                    gradient.setAttribute("id", "abstractGrad");
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
                filter.setAttribute("id", "abstractBlur");
                filter.setAttribute("x", "-10%");
                filter.setAttribute("y", "-10%");
                filter.setAttribute("width", "120%");
                filter.setAttribute("height", "120%");
                const gaussian = document.createElementNS(svgNS, "feGaussianBlur");
                gaussian.setAttribute("in", "SourceGraphic");
                gaussian.setAttribute("stdDeviation", 50 + contrastBoost * 10); // Abstract style has a larger blur
                filter.appendChild(gaussian);
                defs.appendChild(filter);
                svg.appendChild(defs);

                const backgroundRectEl = document.createElementNS(svgNS, "rect");
                backgroundRectEl.setAttribute("width", width);
                backgroundRectEl.setAttribute("height", height);
                backgroundRectEl.setAttribute("fill", "url(#abstractGrad)");
                svg.appendChild(backgroundRectEl);

                const g = document.createElementNS(svgNS, "g");
                g.setAttribute("filter", "url(#abstractBlur)");
                const numCircles = 3 + Math.floor(complexity * 6);
                for (let i = 0; i < numCircles; i++) {
                    const circle = document.createElementNS(svgNS, "circle");
                    const radius = 150 + Math.random() * 120 * contrastBoost;
                    const cx = Math.random() * width;
                    const cy = Math.random() * height;
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
                const moodDirection = detectedMoodParams.direction || "to bottom";

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

                const defs = document.createElementNS(svgNS, "defs");
                svg.appendChild(defs);

                // Define blur filter once
                const filter = document.createElementNS(svgNS, "filter");
                filter.setAttribute("id", "waveBlurFilter");
                filter.setAttribute("x", "-10%");
                filter.setAttribute("y", "-10%");
                filter.setAttribute("width", "120%");
                filter.setAttribute("height", "120%");
                const gaussianBlur = document.createElementNS(svgNS, "feGaussianBlur");
                gaussianBlur.setAttribute("in", "SourceGraphic");
                gaussianBlur.setAttribute("stdDeviation", "3"); // Subtle blur
                filter.appendChild(gaussianBlur);
                defs.appendChild(filter);

                const backgroundRect = document.createElementNS(svgNS, "rect");
                backgroundRect.setAttribute("x", "0");
                backgroundRect.setAttribute("y", "0");
                backgroundRect.setAttribute("width", width);
                backgroundRect.setAttribute("height", height);
                backgroundRect.setAttribute("fill", currentPalette[0] || '#000000');
                svg.appendChild(backgroundRect);

                let numWaves = 3 + Math.floor(complexity * 4);
                if (numWaves < 1) numWaves = 1;

                for (let i = 0; i < numWaves; i++) {
                    const path = document.createElementNS(svgNS, "path");
                    const gradientId = `waveGradient${i}`;

                    const linearGradient = document.createElementNS(svgNS, "linearGradient");
                    linearGradient.setAttribute("id", gradientId);

                    let x1 = "0%", y1 = "0%", x2 = "0%", y2 = "100%";
                    let effectiveDirection = moodDirection;
                    if (effectiveDirection === "135deg") effectiveDirection = "to top right";
                    else if (effectiveDirection === "45deg") effectiveDirection = "to bottom right";
                    else if (effectiveDirection === "225deg") effectiveDirection = "to bottom left";
                    else if (effectiveDirection === "315deg") effectiveDirection = "to top left";

                    if (effectiveDirection.includes("left") && effectiveDirection.includes("right")) {
                        x1 = "50%"; y1 = "0%"; x2 = "50%"; y2 = "100%";
                    } else if (effectiveDirection.includes("left")) {
                        x1 = "100%"; x2 = "0%";
                    } else if (effectiveDirection.includes("right")) {
                        x1 = "0%"; x2 = "100%";
                    } else {
                        x1 = "0%"; x2 = "0%";
                    }

                    if (effectiveDirection.includes("top") && effectiveDirection.includes("bottom")) {
                         y1 = "50%"; y2 = "50%";
                    } else if (effectiveDirection.includes("top")) {
                        y1 = "100%"; y2 = "0%";
                    } else if (effectiveDirection.includes("bottom")) {
                        y1 = "0%"; y2 = "100%";
                    } else {
                        y1 = "0%"; y2 = "0%";
                    }

                    if (x1 === x2 && y1 === y2) {
                        x1 = "0%"; y1 = "0%"; x2 = "0%"; y2 = "100%";
                    }

                    linearGradient.setAttribute("x1", x1);
                    linearGradient.setAttribute("y1", y1);
                    linearGradient.setAttribute("x2", x2);
                    linearGradient.setAttribute("y2", y2);

                    const stopColor1 = currentPalette[i % currentPalette.length];
                    const stopColor2 = currentPalette[(i + 1) % currentPalette.length];

                    const stop1El = document.createElementNS(svgNS, "stop"); // Renamed variable
                    stop1El.setAttribute("offset", "0%");
                    stop1El.setAttribute("stop-color", stopColor1);
                    linearGradient.appendChild(stop1El);

                    const stop2El = document.createElementNS(svgNS, "stop"); // Renamed variable
                    stop2El.setAttribute("offset", "100%");
                    stop2El.setAttribute("stop-color", stopColor2);
                    linearGradient.appendChild(stop2El);

                    defs.appendChild(linearGradient);

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
                    path.setAttribute("fill", `url(#${gradientId})`);
                    path.setAttribute("filter", "url(#waveBlurFilter)"); // Apply blur to each wave path
                    svg.appendChild(path);
                }
                wallpaperElement.appendChild(svg);
            }

            generateBtn.addEventListener('click', function () {
                outputSection.style.display = 'block';

                requestAnimationFrame(() => {
                    const moodInput = document.getElementById('mood').value;
                    const colorChoice = document.getElementById('color').value;
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
                    const currentMoodParams = moodAttributes[detectedMoodKey];
                    const selectedPaletteArray = colorPalettes[colorChoice];

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
                    ctx.fillStyle = '#FFFFFF';
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

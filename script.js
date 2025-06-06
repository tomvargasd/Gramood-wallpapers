const generateBtn = document.getElementById('generate-btn');
            const downloadBtn = document.getElementById('download-btn');
            const outputSection = document.getElementById('output-section');
            const wallpaperEl = document.getElementById('wallpaper');

            const SVG_TARGET_WIDTH = 1920;
            const SVG_TARGET_HEIGHT = 1080;

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

            // Width and height parameters are removed as they are now fixed internally
            function generateAbstractWallpaper(detectedMoodParams, palette, wallpaperElement) {
                const svgNS = "http://www.w3.org/2000/svg";
                const { complexity, opacity, gradientType, contrastBoost } = detectedMoodParams;
                const colorStart = palette[0];
                const colorEnd = palette[1];

                const svg = document.createElementNS(svgNS, "svg");
                svg.setAttribute("width", "100%");
                svg.setAttribute("height", "100%");
                svg.setAttribute("viewBox", `0 0 ${SVG_TARGET_WIDTH} ${SVG_TARGET_HEIGHT}`);
                svg.setAttribute("preserveAspectRatio", "xMaxYMid slice");
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
                gaussian.setAttribute("stdDeviation", 50 + contrastBoost * 10);
                filter.appendChild(gaussian);
                defs.appendChild(filter);
                svg.appendChild(defs);

                const backgroundRectEl = document.createElementNS(svgNS, "rect");
                backgroundRectEl.setAttribute("width", SVG_TARGET_WIDTH); // Use fixed width
                backgroundRectEl.setAttribute("height", SVG_TARGET_HEIGHT); // Use fixed height
                backgroundRectEl.setAttribute("fill", "url(#abstractGrad)");
                svg.appendChild(backgroundRectEl);

                const g = document.createElementNS(svgNS, "g");
                g.setAttribute("filter", "url(#abstractBlur)");
                const numCircles = 3 + Math.floor(complexity * 6);
                // Scale factor for circle radius, assuming original design was for a smaller canvas, e.g., 500px width
                const radiusScaleFactor = SVG_TARGET_WIDTH / 600; // Adjusted from 500 to 600 for potentially larger base size
                for (let i = 0; i < numCircles; i++) {
                    const circle = document.createElementNS(svgNS, "circle");
                    // Scale radius: (base + random_range) * scale_factor * boost
                    const baseRadius = SVG_TARGET_WIDTH / 10; // e.g., 192 for 1920
                    const randomRadiusPart = Math.random() * (SVG_TARGET_WIDTH / 12); // e.g., up to 160
                    const radius = (baseRadius + randomRadiusPart) * (1 + (contrastBoost -1 ) * 0.5) * radiusScaleFactor * 0.3; // Adjusted scaling

                    const cx = Math.random() * SVG_TARGET_WIDTH;
                    const cy = Math.random() * SVG_TARGET_HEIGHT;
                    const fill = palette[1 + Math.floor(Math.random() * (palette.length - 1))] || palette[0];
                    circle.setAttribute("r", radius.toFixed(0));
                    circle.setAttribute("cx", cx.toFixed(0));
                    circle.setAttribute("cy", cy.toFixed(0));
                    circle.setAttribute("fill", fill + Math.floor(opacity * 255).toString(16));
                    g.appendChild(circle);
                }
                svg.appendChild(g);
                wallpaperElement.appendChild(svg);
            }

            // Width and height parameters are removed
            function generateWavesWallpaper(detectedMoodParams, palette, wallpaperElement) {
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
                svg.setAttribute("viewBox", `0 0 ${SVG_TARGET_WIDTH} ${SVG_TARGET_HEIGHT}`);
                svg.setAttribute("preserveAspectRatio", "xMaxYMid slice");


                const defs = document.createElementNS(svgNS, "defs");
                svg.appendChild(defs);

                const backgroundRect = document.createElementNS(svgNS, "rect");
                backgroundRect.setAttribute("x", "0");
                backgroundRect.setAttribute("y", "0");
                backgroundRect.setAttribute("width", SVG_TARGET_WIDTH);
                backgroundRect.setAttribute("height", SVG_TARGET_HEIGHT);
                backgroundRect.setAttribute("fill", currentPalette[0] || '#000000');
                svg.appendChild(backgroundRect);

                let numComplexPaths = 3 + Math.floor(complexity * 4);
                if (numComplexPaths < 2) numComplexPaths = 2;

                for (let i = 0; i < numComplexPaths; i++) {
                    const path = document.createElementNS(svgNS, "path");
                    const gradientId = `complexWaveGradient${i}`;

                    const linearGradient = document.createElementNS(svgNS, "linearGradient");
                    linearGradient.setAttribute("id", gradientId);

                    let gradX1 = "0%", gradY1 = "0%", gradX2 = "0%", gradY2 = "100%";
                    const direction = moodDirection;
                    if (direction) {
                        const dirHorizontal = direction.includes("left") || direction.includes("right");
                        const dirVertical = direction.includes("top") || direction.includes("bottom");
                        let effectiveDirection = direction;

                        if (effectiveDirection === "135deg") effectiveDirection = "to top right";
                        else if (effectiveDirection === "45deg") effectiveDirection = "to bottom right";
                        else if (effectiveDirection === "225deg") effectiveDirection = "to bottom left";
                        else if (effectiveDirection === "315deg") effectiveDirection = "to top left";
                        else if (effectiveDirection === "center") effectiveDirection = "to bottom";

                        if (dirHorizontal && !dirVertical) {
                            gradX1 = effectiveDirection.includes("left") ? "100%" : "0%";
                            gradX2 = effectiveDirection.includes("left") ? "0%" : "100%";
                            gradY1 = "50%"; gradY2 = "50%";
                        } else if (dirVertical && !dirHorizontal) {
                            gradY1 = effectiveDirection.includes("top") ? "100%" : "0%";
                            gradY2 = effectiveDirection.includes("top") ? "0%" : "100%";
                            gradX1 = "50%"; gradX2 = "50%";
                        } else if (dirHorizontal && dirVertical) {
                            gradX1 = effectiveDirection.includes("left") ? "100%" : "0%";
                            gradY1 = effectiveDirection.includes("top") ? "100%" : "0%";
                            gradX2 = effectiveDirection.includes("right") ? "100%" : (effectiveDirection.includes("left") ? "0%" : "100%");
                            if (gradX2 === gradX1 && (effectiveDirection.includes("left") || effectiveDirection.includes("right"))) {
                                gradX2 = effectiveDirection.includes("left") ? "0%" : "100%";
                            }
                            gradY2 = effectiveDirection.includes("bottom") ? "100%" : (effectiveDirection.includes("top") ? "0%" : "100%");
                            if (gradY2 === gradY1 && (effectiveDirection.includes("top") || effectiveDirection.includes("bottom"))) {
                                gradY2 = effectiveDirection.includes("top") ? "0%" : "100%";
                            }
                        }
                        if (gradX1 === gradX2 && gradY1 === gradY2) {
                           gradX1 = "0%"; gradY1 = "0%"; gradX2 = "0%"; gradY2 = "100%";
                        }
                    }
                    linearGradient.setAttribute("x1", gradX1);
                    linearGradient.setAttribute("y1", gradY1);
                    linearGradient.setAttribute("x2", gradX2);
                    linearGradient.setAttribute("y2", gradY2);

                    const stop1 = document.createElementNS(svgNS, "stop");
                    stop1.setAttribute("offset", "0%");
                    const color1 = currentPalette[i % currentPalette.length];
                    stop1.setAttribute("stop-color", color1);
                    linearGradient.appendChild(stop1);

                    const stop2 = document.createElementNS(svgNS, "stop");
                    let stop2Offset = 0.1 + (complexity * 0.8);
                    stop2Offset = Math.min(0.95, Math.max(0.1, stop2Offset));
                    stop2.setAttribute("offset", stop2Offset.toFixed(2));
                    const darkColor = "hsl(300, 40%, 8%)";
                    stop2.setAttribute("stop-color", darkColor);
                    linearGradient.appendChild(stop2);

                    defs.appendChild(linearGradient);
                    path.setAttribute("fill", `url(#${gradientId})`);

                    let pathOpacity = 0.6 + complexity * 0.4;
                    pathOpacity -= (i / numComplexPaths) * 0.3;
                    pathOpacity = Math.max(0.3, Math.min(1, pathOpacity));
                    path.setAttribute("fill-opacity", pathOpacity.toFixed(2));

                    const numAnchors = 4 + Math.floor(complexity * 2);
                    let anchors = [];
                    for (let j = 0; j < numAnchors; j++) {
                        const x = (SVG_TARGET_WIDTH / (numAnchors - 1)) * j;
                        const baseY = SVG_TARGET_HEIGHT * 0.2 + (SVG_TARGET_HEIGHT * 0.6 / numComplexPaths) * i;
                        const undulation = (Math.sin(j * 0.5 + i * 0.3 + (speed || 1)) * SVG_TARGET_HEIGHT * 0.1 * (complexity + 0.5)) * (j % 2 === 0 ? 1 : -1.2);
                        const y = Math.max(-SVG_TARGET_HEIGHT * 0.2, Math.min(SVG_TARGET_HEIGHT * 1.2, baseY + undulation));
                        anchors.push({ x, y });
                    }

                    let d = `M ${anchors[0].x} ${anchors[0].y}`;
                    for (let j = 0; j < anchors.length - 1; j++) {
                        const p0 = anchors[j];
                        const p1 = anchors[j+1];
                        const midX = p0.x + (p1.x - p0.x) / 2;
                        d += ` C ${midX} ${p0.y} ${midX} ${p1.y} ${p1.x} ${p1.y}`;
                    }
                    d += ` L ${SVG_TARGET_WIDTH} ${SVG_TARGET_HEIGHT} L 0 ${SVG_TARGET_HEIGHT} Z`;
                    path.setAttribute("d", d);

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

                    // Check if wallpaperEl is visible and has dimensions
                    // This check is important before calling generation functions
                    if (wallpaperEl.offsetWidth === 0 || wallpaperEl.offsetHeight === 0) {
                        console.error("Wallpaper container dimensions are zero. Cannot generate wallpaper yet.");
                        alert("Error: No se pudieron obtener las dimensiones para generar el wallpaper. Intenta de nuevo o asegúrate de que la sección de salida es visible.");
                        return;
                    }

                    if (selectedStyle === 'abstract') {
                        // Pass fixed dimensions to abstract wallpaper generator
                        generateAbstractWallpaper(currentMoodParams, selectedPaletteArray, wallpaperEl);
                    } else if (selectedStyle === 'waves') {
                        // Pass fixed dimensions to waves wallpaper generator
                        generateWavesWallpaper(currentMoodParams, selectedPaletteArray, wallpaperEl);
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
                // Set crossOrigin to anonymous if loading SVGs with external resources (not the case here, but good practice)
                // img.crossOrigin = 'anonymous';
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    // For download, it's better to use the SVG's intrinsic aspect ratio from viewBox
                    // or a standard high-resolution output size.
                    // Let's use a fixed download size that matches the 16:9 aspect ratio of the viewBox.
                    const downloadWidth = 1920; // Or a user-selectable size
                    const downloadHeight = 1080;
                    canvas.width = downloadWidth;
                    canvas.height = downloadHeight;

                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, downloadWidth, downloadHeight);

                    // Draw the image, respecting preserveAspectRatio (browser handles this when drawing image from SVG source)
                    // To better control scaling for download, if SVG is designed for 1920x1080, render at that.
                    ctx.drawImage(img, 0, 0, downloadWidth, downloadHeight);

                    const link = document.createElement('a');
                    link.download = 'gramood-wallpaper.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();

                    URL.revokeObjectURL(url);
                };
                img.onerror = function (e) {
                    console.error("Error loading SVG image for download:", e);
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

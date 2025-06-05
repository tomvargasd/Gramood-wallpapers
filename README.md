<!-- GitAds-Verify: 9L8AEOI59CHW88LK3Y3I9368NH7QD5ZE -->
# Gramood

Gramood is a web application that generates abstract wallpapers based on your current mood and preferred color.

## GitAds Sponsored
[![Sponsored by GitAds](https://gitads.dev/v1/ad-serve?source=tomvargasd/gramood-wallpapers@github)](https://gitads.dev/v1/ad-track?source=tomvargasd/gramood-wallpapers@github)

## Features

- Mood-based wallpaper generation
- Customizable color palettes
- Abstract art style using SVG
- Downloadable wallpapers (PNG format)
- Responsive design for various screen sizes
- User-friendly interface with custom color selector

## Project Structure

The project consists of the following main files:

-   `index.html`: The main HTML file containing the page structure and user interface elements.
-   `style.css`: Contains all the styles for the application, defining the visual appearance and layout.
-   `script.js`: Handles the dynamic wallpaper generation, user interactions, color palette logic, mood detection, and SVG to PNG conversion for download.

## How to Use

1.  Open `index.html` in your web browser.
2.  Enter your current mood in the text field (e.g., "happy", "calm", "energetic").
3.  Select a base color from the dropdown that you feel matches your mood.
4.  Click the "Generar mi wallpaper" (Generate my wallpaper) button.
5.  Your personalized abstract wallpaper will be displayed, along with a simulated phone lock screen showing the current time and date.
6.  Click the "Descargar wallpaper" (Download wallpaper) button to save it as a PNG image.

## Wallpaper Generation Logic

The wallpaper generation uses SVG (Scalable Vector Graphics) to create dynamic and abstract visuals. Based on the detected mood from the user's input, different parameters such as complexity, opacity, and gradient types are algorithmically determined.

Colors are chosen from predefined palettes that complement the user-selected base color. The script then generates a series of SVG elements, primarily circles with varying sizes and positions, and applies blur effects to them. These shapes are layered on top of a dynamically generated gradient background (linear or radial, depending on the mood). The combination of these elements produces the final unique and abstract wallpaper. The lock screen overlay with time and date is an HTML/CSS feature for presentational purposes.

## Contributing

Contributions are welcome! If you have ideas for new features, improvements, or bug fixes, please feel free to contribute.

### How to contribute:

1.  **Fork the repository** (if you are on a platform like GitHub) or download the code directly.
2.  **Create a new branch** for your changes (e.g., `git checkout -b feature/your-new-feature` or `fix/bug-description`).
3.  **Make your changes** in your separate branch or local copy.
4.  **Test your changes thoroughly** to ensure they work as expected and don't introduce new issues.
5.  **(If on GitHub/GitLab etc.) Submit a pull request** to the `main` branch with a clear description of your changes, why they are needed, and any relevant details.

### Coding Style:

-   Try to follow the existing coding style (indentation, variable naming, etc.).
-   Ensure your code is well-commented, especially for complex logic.
-   Make sure your commit messages are clear and descriptive.

### Reporting Bugs:

If you find a bug, please provide a detailed description of the issue. Include:
- Steps to reproduce the bug.
- Expected behavior.
- Actual behavior.
- Your browser and operating system, if relevant.
- Screenshots, if they help illustrate the problem.

You can report bugs by opening an issue on the project's issue tracker (if available).

## License

This project is licensed under the terms of the MIT License. See the `LICENSE` file for details.

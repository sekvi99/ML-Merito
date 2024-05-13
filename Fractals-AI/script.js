const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let rotation = 0; // Initial rotation angle

// Function to draw fractal
function drawFractal(x, y, size, rotation) {
    if (size < 1) return;

    ctx.save(); // Save the current transformation state
    ctx.translate(x, y); // Translate to the center of the square
    ctx.rotate(rotation); // Rotate the canvas
    ctx.strokeRect(-size / 2, -size / 2, size, size); // Draw the square
    ctx.restore(); // Restore the previous transformation state

    const newSize = size / 2;

    // Recursively draw the four quadrants with slightly rotated angles
    drawFractal(x - newSize / 2, y, newSize, rotation + Math.PI / 4);
    drawFractal(x + newSize / 2, y, newSize, rotation - Math.PI / 4);
    drawFractal(x, y - newSize / 2, newSize, rotation + Math.PI / 4);
    drawFractal(x, y + newSize / 2, newSize, rotation - Math.PI / 4);
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Center the fractal on the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Set stroke style
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;

    // Draw the fractal with rotation
    drawFractal(centerX, centerY, 400, rotation);

    rotation += 0.5; // Increment rotation for faster animation effect

    requestAnimationFrame(animate);
}

// Start animation
animate();

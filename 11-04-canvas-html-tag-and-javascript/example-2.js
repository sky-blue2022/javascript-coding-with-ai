const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let hue1 = 0;
let hue2 = 180;

function drawGradient() {
  // Create a linear gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, `hsl(${hue1}, 70%, 50%)`);
  gradient.addColorStop(1, `hsl(${hue2}, 70%, 50%)`);

  // Fill the canvas with the gradient
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Increment the hues for animation
  hue1 = (hue1 + 0.5) % 360;
  hue2 = (hue2 + 0.5) % 360;

  requestAnimationFrame(drawGradient);
}

// Start the gradient animation
drawGradient();

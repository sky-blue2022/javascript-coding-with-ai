const canvas = document.getElementById("pendulumCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

let angle = Math.PI / 4; // Starting angle
let angleVelocity = 0; // Angular velocity
let angleAcceleration = 0; // Angular acceleration
const gravity = 0.02; // Gravitational constant
const length = 150; // Pendulum string length
const pivotX = canvas.width / 2;
const pivotY = 50;
let isDragging = false;

// Mouse tracking variables
let mouseX = 0;
let mouseY = 0;

function drawPendulum() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw pivot
  ctx.beginPath();
  ctx.arc(pivotX, pivotY, 5, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();

  // Draw pendulum string
  const bobX = pivotX + length * Math.sin(angle);
  const bobY = pivotY + length * Math.cos(angle);
  ctx.beginPath();
  ctx.moveTo(pivotX, pivotY);
  ctx.lineTo(bobX, bobY);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw pendulum bob
  ctx.beginPath();
  ctx.arc(bobX, bobY, 15, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();

  if (!isDragging) {
    angleAcceleration = (-gravity / length) * Math.sin(angle);
    angleVelocity += angleAcceleration;
    angleVelocity *= 0.99; // Damping
    angle += angleVelocity;
  }

  requestAnimationFrame(drawPendulum);
}

// Mouse event handlers
canvas.addEventListener("mousedown", (event) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;

  const bobX = pivotX + length * Math.sin(angle);
  const bobY = pivotY + length * Math.cos(angle);

  const distance = Math.sqrt((mouseX - bobX) ** 2 + (mouseY - bobY) ** 2);
  if (distance < 15) {
    isDragging = true;
  }
});

canvas.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

    const dx = mouseX - pivotX;
    const dy = mouseY - pivotY;
    angle = Math.atan2(dx, dy) - Math.PI / 2; // Calculate angle based on mouse position
  }
});

canvas.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    angleVelocity = 0; // Reset velocity to avoid sudden jumps
  }
});

// Start the simulation
drawPendulum();

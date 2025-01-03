const canvas = document.getElementById("textCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 200;

let x = 50;
let y = 100;
let dx = 3;
let dy = 2;
const text = "Hello, Canvas!";
const fontSize = 40;

function drawText() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set text properties
  ctx.font = `${fontSize}px 'Roboto', sans-serif`;
  ctx.fillStyle = "#FFDD44"; // Yellowish text color
  ctx.shadowColor = "#FFF176"; // Lighter yellow shadow
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillText(text, x, y);

  // Bounce logic
  if (x + ctx.measureText(text).width > canvas.width || x < 0) {
    dx = -dx;
  }
  if (y > canvas.height || y < fontSize) {
    dy = -dy;
  }

  x += dx;
  y += dy;

  requestAnimationFrame(drawText);
}

drawText();

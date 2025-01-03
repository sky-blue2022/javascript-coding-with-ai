const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

const penColorInput = document.getElementById("penColor");
const penSizeInput = document.getElementById("penSize");
const fileNameInput = document.getElementById("fileName");
const clearButton = document.getElementById("clearCanvas");
const exportButton = document.getElementById("exportImage");

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Drawing variables
let drawing = false;
let penColor = "#000000";
let penSize = 5;

// Event listeners for drawing
canvas.addEventListener("mousedown", () => (drawing = true));
canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mousemove", draw);

penColorInput.addEventListener("input", (e) => (penColor = e.target.value));
penSizeInput.addEventListener("input", (e) => (penSize = e.target.value));

// Clear canvas
clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Export image
exportButton.addEventListener("click", () => {
  // Get the file name from the input field or use a default name
  const fileName = fileNameInput.value.trim() || "drawing";

  // Convert the canvas content to a Blob
  canvas.toBlob((blob) => {
    // Create a new object URL for the Blob
    const objectUrl = URL.createObjectURL(blob);

    // Create a temporary link element for the download
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = `${fileName}.png`; // Set the filename here
    link.click();

    // Revoke the object URL after download
    URL.revokeObjectURL(objectUrl);
  }, "image/png");
});

// Drawing function
function draw(e) {
  if (!drawing) return;

  ctx.strokeStyle = penColor;
  ctx.lineWidth = penSize;
  ctx.lineCap = "round";

  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
}

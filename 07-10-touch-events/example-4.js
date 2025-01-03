const button = document.getElementById("multi-touch-button");
const status = document.getElementById("status");

button.addEventListener("touchstart", (e) => {
  if (e.touches.length === 2) {
    status.textContent = "Two-finger press detected!";
    button.style.backgroundColor = "#4CAF50";
  } else {
    status.textContent = "Use two fingers!";
  }
});

button.addEventListener("touchend", () => {
  button.style.backgroundColor = "#ff9800";
});

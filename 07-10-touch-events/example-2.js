const button = document.getElementById("long-press-button");
const status = document.getElementById("status");
let pressTimer;

button.addEventListener("touchstart", (e) => {
  e.preventDefault(); // Prevent default OS behavior like text selection
  pressTimer = setTimeout(() => {
    status.textContent = "Action confirmed!";
    button.style.backgroundColor = "#4CAF50";
  }, 2000);
});

button.addEventListener("touchend", () => {
  clearTimeout(pressTimer);
});

button.addEventListener("touchcancel", () => {
  clearTimeout(pressTimer);
});

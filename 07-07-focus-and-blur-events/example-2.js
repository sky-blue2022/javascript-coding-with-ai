const button = document.getElementById("tooltip-button");
const tooltip = document.getElementById("tooltip");

button.addEventListener("focus", () => (tooltip.style.display = "block"));
button.addEventListener("blur", () => (tooltip.style.display = "none"));

const button = document.getElementById("pulsate-btn");
let iterationCount = 0;

button.addEventListener("animationiteration", () => {
  iterationCount++;
  if (iterationCount >= 3) {
    button.style.animation = "none"; // Stop animation after 3 iterations
  }
});

button.addEventListener("mouseover", () => {
  iterationCount = 0; // Reset count when hovered again
  button.style.animation = "pulsate 0.8s ease-out infinite";
});

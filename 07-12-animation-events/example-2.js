const button = document.getElementById("confetti-btn");
const confettiContainer = document.getElementById("confetti-container");

button.addEventListener("click", () => {
  for (let i = 0; i < 150; i++) {
    // Increased particle count for better effect
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.setProperty("--confetti-color", getRandomColor());
    confetti.style.setProperty(
      "--x-distance",
      `${getRandomPosition(-window.innerWidth / 2, window.innerWidth / 2)}px`
    );
    confetti.style.setProperty(
      "--y-distance",
      `${getRandomPosition(-window.innerHeight / 2, window.innerHeight / 2)}px`
    );
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `${Math.random() * 100}%`;

    confettiContainer.appendChild(confetti);

    // Remove confetti after animation ends
    setTimeout(() => {
      confetti.remove();
    }, 2000);
  }
});

// Helper function to generate random bright colors
function getRandomColor() {
  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#4caf50",
    "#ffeb3b",
    "#ff9800",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Helper function to generate random positions
function getRandomPosition(min, max) {
  return Math.random() * (max - min) + min;
}

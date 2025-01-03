let holdTimer;
let isActivated = false;

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !isActivated) {
    // Check for Space key and avoid re-activation
    holdTimer = setTimeout(() => {
      const button = document.querySelector("#holdButton");
      button.classList.add("active");
      button.textContent = "Activated!";
      isActivated = true; // Prevent multiple activations
    }, 1000); // Trigger after 1 second
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    clearTimeout(holdTimer);
    if (!isActivated) {
      const button = document.querySelector("#holdButton");
      button.classList.remove("active");
      button.textContent = "Hold Me";
    }
  }
});

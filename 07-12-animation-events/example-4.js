const button = document.getElementById("cancel-btn");

// Start animation on click
button.addEventListener("click", () => {
  button.classList.add("animate");
});

// Cancel animation on mouse leave
button.addEventListener("mouseleave", () => {
  button.classList.remove("animate");
});

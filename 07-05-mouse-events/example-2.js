const toggleButton = document.getElementById("theme-toggle-btn");

// Add double-click event listener to toggle theme
toggleButton.addEventListener("dblclick", () => {
  document.body.classList.toggle("light-mode");
  document.body.classList.toggle("dark-mode");
});

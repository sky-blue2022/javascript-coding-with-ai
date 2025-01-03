const toggleButton = document.getElementById("darkModeToggle");
const clearButton = document.getElementById("clearStorage");

// Event listener to toggle Dark Mode
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  // Save the theme to local storage
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});

// Event listener to clear local storage while keeping the current theme
clearButton.addEventListener("click", () => {
  localStorage.removeItem("theme");
  alert("Local storage cleared. The current theme remains unchanged.");
});

// Load the saved theme from local storage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

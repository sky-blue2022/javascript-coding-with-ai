window.addEventListener("load", () => {
  const button = document.getElementById("loadButton");

  // Simulate a delay of 5 seconds after the page load
  setTimeout(() => {
    button.textContent = "Ready to Click";
    button.disabled = false;
    button.classList.add("enabled");
  }, 5000); // 5000ms = 5 seconds
});

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "b") {
    // Ctrl + B
    const button = document.querySelector("#toggleButton");
    button.classList.toggle("hidden");
  }
});

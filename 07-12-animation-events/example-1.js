const button = document.getElementById("loading-btn");

button.addEventListener("click", () => {
  button.classList.add("loading");

  // Simulate an asynchronous operation
  setTimeout(() => {
    button.classList.remove("loading");
  }, 3000); // Spinner lasts for 3 seconds
});

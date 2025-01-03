const button = document.getElementById("exitButton");

button.addEventListener("click", () => {
  window.addEventListener("beforeunload", (event) => {
    event.preventDefault();
    event.returnValue = ""; // Required for most browsers to show confirmation dialog
  });
  alert("Exit confirmation enabled. Try closing or refreshing the page.");
});

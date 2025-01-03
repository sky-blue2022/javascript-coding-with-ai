const button = document.getElementById("dynamic-button");
button.addEventListener("focus", () => {
  button.textContent = "Focused!";
  button.style.backgroundColor = "green";
});
button.addEventListener("blur", () => {
  button.textContent = "Button";
  button.style.backgroundColor = "";
});

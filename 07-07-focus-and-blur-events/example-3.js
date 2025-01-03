const confirmButton = document.getElementById("confirm-button");

let timer;
confirmButton.addEventListener("focus", () => {
  timer = setTimeout(() => alert("Are you sure?"), 2000);
});
confirmButton.addEventListener("blur", () => clearTimeout(timer));

const button = document.getElementById("context-menu-btn");
const menu = document.getElementById("custom-menu");

button.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  menu.style.display = "block";
  menu.style.left = `${event.clientX}px`;
  menu.style.top = `${event.clientY}px`;
});

document.addEventListener("click", () => {
  menu.style.display = "none";
});

const ball = document.querySelector("#ball");
let x = 0,
  y = 0;

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      y = Math.max(0, y - 10);
      break;
    case "ArrowDown":
      y = Math.min(350, y + 10); // Keep within boundaries
      break;
    case "ArrowLeft":
      x = Math.max(0, x - 10);
      break;
    case "ArrowRight":
      x = Math.min(350, x + 10); // Keep within boundaries
      break;
  }
  ball.style.transform = `translate(${x}px, ${y}px)`;
});

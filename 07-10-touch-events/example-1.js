const button = document.getElementById("swipe-button");
const container = document.getElementById("swipe-container");
let startX = 0;

button.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

button.addEventListener("touchmove", (e) => {
  const currentX = e.touches[0].clientX;
  const offset = Math.min(
    container.offsetWidth - button.offsetWidth,
    currentX - startX
  );
  button.style.transform = `translateX(${offset}px)`;
});

button.addEventListener("touchend", () => {
  const currentOffset =
    parseInt(button.style.transform.replace("translateX(", "")) || 0;

  if (currentOffset >= container.offsetWidth - button.offsetWidth - 10) {
    alert("Unlocked!");
  } else {
    button.style.transform = "translateX(0)";
  }
});

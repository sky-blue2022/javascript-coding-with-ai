const button = document.getElementById("swipe-button");
const container = document.getElementById("swipe-container");
let startX = 0;

function handleMove(currentX) {
  const offset = Math.min(
    container.offsetWidth - button.offsetWidth,
    currentX - startX
  );
  button.style.transform = `translateX(${offset}px)`;
}

function handleEnd() {
  const currentOffset =
    parseInt(button.style.transform.replace("translateX(", "")) || 0;

  if (currentOffset >= container.offsetWidth - button.offsetWidth - 10) {
    alert("Unlocked!");
  } else {
    button.style.transform = "translateX(0)";
  }
}

// Touch Events
button.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

button.addEventListener("touchmove", (e) => {
  handleMove(e.touches[0].clientX);
});

button.addEventListener("touchend", handleEnd);

// Mouse Events
button.addEventListener("mousedown", (e) => {
  startX = e.clientX;

  const onMouseMove = (event) => {
    handleMove(event.clientX);
  };

  const onMouseUp = () => {
    handleEnd();
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

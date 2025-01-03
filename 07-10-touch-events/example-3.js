const box = document.getElementById("resizable-box");

let startWidth, startHeight, startX, startY;

box.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  startWidth = box.offsetWidth;
  startHeight = box.offsetHeight;
  startX = touch.clientX;
  startY = touch.clientY;

  e.preventDefault(); // Prevent scrolling while resizing
});

box.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  const newWidth = startWidth + (touch.clientX - startX);
  const newHeight = startHeight + (touch.clientY - startY);

  box.style.width = `${newWidth}px`;
  box.style.height = `${newHeight}px`;
});

const resizableBox = document.querySelector(".resizable-box");
const resizeHandle = document.querySelector(".resize-handle");
let isResizing = false;

resizeHandle.addEventListener("mousedown", (event) => {
  isResizing = true;
});

document.addEventListener("mousemove", (event) => {
  if (isResizing) {
    const boxRect = resizableBox.getBoundingClientRect();
    resizableBox.style.width = `${event.clientX - boxRect.left}px`;
    resizableBox.style.height = `${event.clientY - boxRect.top}px`;
  }
});

document.addEventListener("mouseup", () => {
  isResizing = false;
});

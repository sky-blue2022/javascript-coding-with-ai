const items = document.querySelectorAll(".sortable-item");
let draggingItem = null;

// Desktop Drag-and-Drop
items.forEach((item) => {
  item.addEventListener("dragstart", () => {
    draggingItem = item;
    item.classList.add("dragging");
  });

  item.addEventListener("dragover", (event) => {
    event.preventDefault();
    const overItem = event.target;
    if (overItem !== draggingItem) {
      const rect = overItem.getBoundingClientRect();
      const offset = event.clientY - rect.top;

      if (offset > rect.height / 2) {
        overItem.parentNode.insertBefore(draggingItem, overItem.nextSibling);
      } else {
        overItem.parentNode.insertBefore(draggingItem, overItem);
      }
    }
  });

  item.addEventListener("dragend", () => {
    draggingItem.classList.remove("dragging");
    draggingItem = null;
  });
});

// Mobile Touch Events
items.forEach((item) => {
  item.addEventListener("touchstart", (event) => {
    draggingItem = item;
    draggingItem.classList.add("dragging");
  });

  item.addEventListener("touchmove", (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    const overItem = document.elementFromPoint(touch.clientX, touch.clientY);
    if (
      overItem &&
      overItem !== draggingItem &&
      overItem.classList.contains("sortable-item")
    ) {
      const rect = overItem.getBoundingClientRect();
      const offset = touch.clientY - rect.top;

      if (offset > rect.height / 2) {
        overItem.parentNode.insertBefore(draggingItem, overItem.nextSibling);
      } else {
        overItem.parentNode.insertBefore(draggingItem, overItem);
      }
    }
  });

  item.addEventListener("touchend", () => {
    if (draggingItem) {
      draggingItem.classList.remove("dragging");
      draggingItem = null;
    }
  });
});

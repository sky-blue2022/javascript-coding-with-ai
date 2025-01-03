const items = document.querySelectorAll(".sortable-item");
let draggingItem = null;

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

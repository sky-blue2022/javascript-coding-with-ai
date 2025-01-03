const boxes = document.querySelectorAll(".box");
const sections = document.querySelectorAll(".section");

boxes.forEach((box) => {
  box.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", box.textContent);
    setTimeout(() => box.classList.add("hidden"), 0);
  });

  box.addEventListener("dragend", () => {
    box.classList.remove("hidden");
  });
});

sections.forEach((section) => {
  section.addEventListener("dragover", (event) => {
    event.preventDefault();
    section.classList.add("highlight");
  });

  section.addEventListener("dragleave", () => {
    section.classList.remove("highlight");
  });

  section.addEventListener("drop", (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const box = Array.from(boxes).find((b) => b.textContent === data);
    if (box) {
      section.appendChild(box);
      section.classList.remove("highlight");
    }
  });
});

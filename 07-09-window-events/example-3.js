const button = document.getElementById("resizeButton");

function handleResize() {
  if (window.innerWidth < 600) {
    button.textContent = "Small Screen!";
    button.classList.add("small");
    button.classList.remove("large");
  } else {
    button.textContent = "Large Screen!";
    button.classList.add("large");
    button.classList.remove("small");
  }
}

window.addEventListener("resize", handleResize);

// Initialize button state on page load
handleResize();

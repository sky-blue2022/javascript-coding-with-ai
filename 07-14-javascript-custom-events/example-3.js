const hoverBox = document.getElementById("hoverBox");
const hoverCounter = document.getElementById("hoverCounter");
const hoverMessage = document.getElementById("hoverMessage");

let hoverCount = 0;

// Listen for hover events
hoverBox.addEventListener("mouseenter", () => {
  hoverCount++;
  hoverCounter.textContent = `Hover Count: ${hoverCount}`;

  // Trigger custom event on third hover
  if (hoverCount === 3) {
    const hoverEvent = new CustomEvent("threeHovers");
    hoverBox.dispatchEvent(hoverEvent);
  }
});

// Handle the custom threeHovers event
hoverBox.addEventListener("threeHovers", () => {
  hoverMessage.textContent = "You hovered 3 times! Event triggered!";
});

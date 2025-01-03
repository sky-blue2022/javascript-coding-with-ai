const button = document.getElementById("tripleClickButton");
const message = document.getElementById("message");

let clickCount = 0;
let clickTimer = null;

button.addEventListener("click", () => {
  clickCount++;
  clearTimeout(clickTimer);
  clickTimer = setTimeout(() => (clickCount = 0), 1000);

  if (clickCount === 3) {
    const tripleClickEvent = new CustomEvent("tripleClick");
    button.dispatchEvent(tripleClickEvent);
    clickCount = 0;
  }
});

button.addEventListener("tripleClick", () => {
  message.textContent = "Triple-click detected!";
});

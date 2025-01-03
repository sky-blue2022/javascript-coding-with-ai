const holdButton = document.getElementById("hold-button");
const progressBar = document.getElementById("progress-bar");

let timer;

holdButton.addEventListener("mousedown", () => {
  progressBar.style.transition = "width 2s linear";
  progressBar.style.width = "100%";
  timer = setTimeout(() => {
    alert("Action Confirmed!");
    progressBar.style.width = "0";
  }, 2000);
});

holdButton.addEventListener("mouseup", () => {
  clearTimeout(timer);
  progressBar.style.transition = "width 0.3s ease-out";
  progressBar.style.width = "0";
});

holdButton.addEventListener("mouseleave", () => {
  clearTimeout(timer);
  progressBar.style.transition = "width 0.3s ease-out";
  progressBar.style.width = "0";
});

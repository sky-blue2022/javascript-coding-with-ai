document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.querySelector("#myButton").click();
  }
});

document.querySelector("#myButton").addEventListener("click", () => {
  alert("Button clicked!");
});

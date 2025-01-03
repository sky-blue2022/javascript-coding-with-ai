const button = document.getElementById("triggerButton");
const message1 = document.getElementById("message1");
const message2 = document.getElementById("message2");

button.addEventListener("click", () => {
  const event1 = new CustomEvent("customAction1", {
    detail: { message: "Action 1 Triggered!" },
  });
  const event2 = new CustomEvent("customAction2", {
    detail: { message: "Action 2 Triggered!" },
  });

  message1.dispatchEvent(event1);
  message2.dispatchEvent(event2);
});

message1.addEventListener("customAction1", (e) => {
  message1.textContent = e.detail.message;
});

message2.addEventListener("customAction2", (e) => {
  message2.textContent = e.detail.message;
});

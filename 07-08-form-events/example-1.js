document.getElementById("email").addEventListener("input", function (event) {
  const email = event.target.value;
  const feedback = document.getElementById("emailFeedback");
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    feedback.textContent = "Valid email!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "Invalid email!";
    feedback.style.color = "red";
  }
});

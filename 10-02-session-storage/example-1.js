document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");

  // Load saved data
  nameInput.value = sessionStorage.getItem("name") || "";
  emailInput.value = sessionStorage.getItem("email") || "";

  // Save data on input change
  nameInput.addEventListener("input", () => {
    sessionStorage.setItem("name", nameInput.value);
  });

  emailInput.addEventListener("input", () => {
    sessionStorage.setItem("email", emailInput.value);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission for this example
    alert("Form data saved in session storage!");
  });
});

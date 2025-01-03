const inputs = document.querySelectorAll("#formValidation input");
const submitButton = document.getElementById("submitButton");

function checkFields() {
  const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
  submitButton.disabled = !allFilled;
}

inputs.forEach(input => {
  input.addEventListener("input", checkFields);
});

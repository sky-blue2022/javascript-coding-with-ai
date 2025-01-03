document
  .getElementById("customForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent actual submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    alert(`Form Submitted!\nName: ${name}\nEmail: ${email}`);
  });

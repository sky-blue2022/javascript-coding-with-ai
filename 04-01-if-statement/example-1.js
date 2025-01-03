let username = "JohnDoe";
let password = "securepass123";

if (username.length < 5) {
  console.log("Username must be at least 5 characters.");
} else if (password.length < 8) {
  console.log("Password must be at least 8 characters.");
} else {
  console.log("Signup successful!");
}

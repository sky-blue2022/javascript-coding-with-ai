function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

function setCookie(name, value, minutes) {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000); // 1 minute in milliseconds
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${date.toUTCString()}; path=/`;
}

function displayWelcomeMessage() {
  const lastVisit = getCookie("lastVisit");
  const now = new Date().toLocaleString();
  const messageElement = document.getElementById("message");

  if (lastVisit) {
    messageElement.textContent = `Welcome back! Your last visit was on ${lastVisit}.`;
    messageElement.className = "welcome-back"; // Apply blue styling for "Welcome Back"
  } else {
    messageElement.textContent =
      "Welcome to our website! We're glad you're here.";
    messageElement.className = "welcome"; // Apply green styling for the first welcome
  }

  setCookie("lastVisit", now, 1); // Cookie expires in 1 minute
}

window.addEventListener("load", displayWelcomeMessage);

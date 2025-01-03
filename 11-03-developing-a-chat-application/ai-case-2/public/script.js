const socket = io();

// Display Logged-in Username
function displayUsername() {
  const username = localStorage.getItem("username");
  if (username) {
    document.getElementById("username-display").textContent = username;
  } else {
    window.location.href = "index.html"; // Redirect to login if no username is found
  }
}

// Check Login
function checkLogin() {
  const username = localStorage.getItem("username");
  if (!username) {
    window.location.href = "index.html";
  }
}

// Logout Functionality
function setupLogoutButton() {
  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("username"); // Remove username from localStorage
    window.location.href = "index.html"; // Redirect to login page
  });
}

// Send Message
function setupSendMessage() {
  const sendMessageButton = document.getElementById("send-message");
  const messageInput = document.getElementById("message");

  sendMessageButton.addEventListener("click", () => {
    const content = messageInput.value.trim();
    const username = localStorage.getItem("username");

    if (!content) {
      alert("Message cannot be empty");
      return;
    }

    socket.emit("send-message", { username, content });
    messageInput.value = "";
  });
}

// Setup Chat Page
function setupChatPage() {
  checkLogin();
  displayUsername();
  setupLogoutButton();
  setupSendMessage();

  socket.on("receive-message", (message) => {
    const chatBox = document.getElementById("chat-box");
    const msgDiv = document.createElement("div");
    msgDiv.textContent = `${message.username}: ${message.content}`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

// Initialize
if (document.getElementById("chat-page")) {
  setupChatPage();
}

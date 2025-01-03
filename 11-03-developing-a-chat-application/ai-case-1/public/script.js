const socket = io(); // Connect to the Socket.IO server

// Send Message
function setupSendMessage() {
  const sendMessageButton = document.getElementById("send-message");
  const messageInput = document.getElementById("message");

  sendMessageButton.addEventListener("click", () => {
    const content = messageInput.value.trim();

    if (!content) {
      alert("Message cannot be empty");
      return;
    }

    // Emit the 'send-message' event to the server
    socket.emit("send-message", { content });

    // Debugging
    console.log("Message sent:", { content });

    // Clear input field
    messageInput.value = "";
  });
}

// Setup Chat Page
function setupChatPage() {
  setupSendMessage();

  // Listen for 'receive-message' events from the server
  socket.on("receive-message", (message) => {
    console.log("Message received:", message); // Debugging

    const chatBox = document.getElementById("chat-box");
    const msgDiv = document.createElement("div");
    msgDiv.textContent = message.content; // Display only the message content
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

// Initialize
if (document.getElementById("chat-page")) {
  setupChatPage();
}

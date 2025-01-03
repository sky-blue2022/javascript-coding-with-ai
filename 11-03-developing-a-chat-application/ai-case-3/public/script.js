const socket = io();
let currentThreadId = null;

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

// Load Threads
function loadThreads() {
  fetch("/api/threads")
    .then((res) => res.json())
    .then((threads) => {
      const threadList = document.getElementById("thread-list");
      threadList.innerHTML = "";
      threads.forEach((thread) => {
        const li = document.createElement("li");
        li.classList.add("thread-item");

        const threadName = document.createElement("span");
        threadName.textContent = thread.name;
        threadName.addEventListener("click", () => {
          switchThread(thread._id, thread.name);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-thread");
        deleteButton.addEventListener("click", () => {
          if (
            confirm(
              `Are you sure you want to delete the thread "${thread.name}"?`
            )
          ) {
            deleteThread(thread._id);
          }
        });

        li.appendChild(threadName);
        li.appendChild(deleteButton);
        threadList.appendChild(li);
      });
    })
    .catch((err) => console.error("Error loading threads:", err));
}

// Delete Thread
function deleteThread(threadId) {
  fetch(`/api/threads/${threadId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete thread");
      }
      loadThreads(); // Refresh the thread list
    })
    .catch((err) => console.error("Error deleting thread:", err));
}

// Add a New Thread
function setupAddThread() {
  const addThreadButton = document.getElementById("add-thread");
  const threadInput = document.getElementById("new-thread-name");

  addThreadButton.addEventListener("click", () => {
    const name = threadInput.value.trim();
    if (!name) {
      alert("Thread name cannot be empty");
      return;
    }

    fetch("/api/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then(() => {
        threadInput.value = "";
        loadThreads();
      })
      .catch((err) => console.error("Error adding thread:", err));
  });
}

// Switch Thread
function switchThread(threadId, threadName) {
  currentThreadId = threadId;
  document.getElementById("thread-title").textContent = threadName;
  document.getElementById("chat-box").innerHTML = "";

  socket.emit("join-thread", threadId);
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

    socket.emit("send-message", {
      username,
      content,
      threadId: currentThreadId,
    });
    messageInput.value = "";
  });
}

// Setup Chat Page
function setupChatPage() {
  checkLogin();
  displayUsername(); // Add this function call
  loadThreads();
  setupLogoutButton();
  setupAddThread();
  setupSendMessage();

  socket.on("receive-message", (message) => {
    const chatBox = document.getElementById("chat-box");
    const msgDiv = document.createElement("div");
    msgDiv.textContent = `${message.username}: ${message.content}`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  });

  socket.on("load-messages", (messages) => {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";
    messages.forEach((message) => {
      const msgDiv = document.createElement("div");
      msgDiv.textContent = `${message.username}: ${message.content}`;
      chatBox.appendChild(msgDiv);
    });
  });
}

// Initialize
if (document.getElementById("chat-page")) {
  setupChatPage();
}

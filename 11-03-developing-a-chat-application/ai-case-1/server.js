const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.static(path.join(__dirname, "public")));

// Serve Static Files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // Serve index page
});

// Socket.IO for Real-Time Chat
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for 'send-message' events
  socket.on("send-message", (data) => {
    console.log("Message received from client:", data); // Debugging
    const { content } = data;

    if (!content) {
      console.error("Invalid message data:", data); // Debugging
      return;
    }

    // Broadcast the message to all connected clients
    const newMessage = { content, timestamp: new Date() };
    io.emit("receive-message", newMessage);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start Server
const PORT = 3000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

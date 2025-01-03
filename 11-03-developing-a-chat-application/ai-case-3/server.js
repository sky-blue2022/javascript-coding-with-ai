const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt"); // For password hashing
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/chat-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schemas and Models
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

const ThreadSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Thread = mongoose.model("Thread", ThreadSchema);

const MessageSchema = new mongoose.Schema({
  username: String,
  content: String,
  threadId: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);

// Routes

// User Registration
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// User Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.json({ username: user.username });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get Threads
app.get("/api/threads", async (req, res) => {
  try {
    const threads = await Thread.find();
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// Add Thread
app.post("/api/threads", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Thread name is required" });
  }

  try {
    const newThread = new Thread({ name });
    await newThread.save();
    res.status(201).json(newThread);
  } catch (err) {
    console.error("Error creating thread:", err);
    res.status(500).json({ error: "Failed to create thread" });
  }
});

// Delete Thread
app.delete("/api/threads/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the thread and associated messages
    await Thread.findByIdAndDelete(id);
    await Message.deleteMany({ threadId: id });

    res.status(200).json({ message: "Thread deleted successfully" });
  } catch (err) {
    console.error("Error deleting thread:", err);
    res.status(500).json({ error: "Failed to delete thread" });
  }
});

// Serve Static Files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // Login page as the root
});

app.get("/signup.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html")); // Serve signup page
});

// Socket.IO for Real-Time Chat
io.on("connection", (socket) => {
  console.log("A user connected");

  // Join a thread
  socket.on("join-thread", async (threadId) => {
    socket.join(threadId);
    const messages = await Message.find({ threadId }).sort({ timestamp: 1 });
    socket.emit("load-messages", messages);
  });

  // Send a message
  socket.on("send-message", async (data) => {
    const { username, content, threadId } = data;
    if (!username || !content || !threadId) return;

    const newMessage = new Message({ username, content, threadId });
    await newMessage.save();
    io.to(threadId).emit("receive-message", newMessage);
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

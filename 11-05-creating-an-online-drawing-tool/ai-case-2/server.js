const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize the Express app
const app = express();

// Middleware
app.use(cors()); // Allow CORS if needed
app.use(bodyParser.json({ limit: "10mb" })); // Parse JSON requests with a larger limit for drawings
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(
  session({
    secret: "secretKey", // Replace with a secure secret in production
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static("public")); // Serve static files from the public directory

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/drawingApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Models
// User model
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  })
);

// Drawing model
const Drawing = mongoose.model(
  "Drawing",
  new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dataURL: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  })
);

// Debug session middleware (optional, for debugging purposes)
app.use((req, res, next) => {
  console.log("Session data:", req.session);
  next();
});

// Routes
// User signup
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    await new User({ username, password: hashedPassword }).save();
    res.redirect("/"); // Redirect to login after signup
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("Error registering user");
  }
});

// User login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user._id; // Save user ID in session
      res.redirect("/drawing.html");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Error logging in");
  }
});

// User logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Error logging out");
    }
    res.redirect("/"); // Redirect to the login page
  });
});

// Save drawing route
app.post("/save-drawing", async (req, res) => {
  console.log("Accessing /save-drawing endpoint...");
  if (!req.session.user) {
    console.error("Unauthorized access to /save-drawing");
    return res.status(401).send("Unauthorized");
  }

  try {
    const { dataURL } = req.body;
    if (!dataURL) {
      console.error("No dataURL provided in request body");
      return res.status(400).send("No drawing data provided");
    }

    // Check if a drawing already exists
    const existingDrawing = await Drawing.findOne({ user: req.session.user });
    if (existingDrawing) {
      console.log("Updating existing drawing for user:", req.session.user);
      existingDrawing.dataURL = dataURL;
      await existingDrawing.save();
    } else {
      console.log("Creating a new drawing for user:", req.session.user);
      await new Drawing({ user: req.session.user, dataURL }).save();
    }

    console.log("Drawing saved successfully");
    res.status(200).send("Drawing saved successfully");
  } catch (err) {
    console.error("Error saving drawing:", err);
    res.status(500).send("Error saving drawing");
  }
});

// Load drawing route
app.get("/load-drawing", async (req, res) => {
  console.log("Accessing /load-drawing endpoint...");
  if (!req.session.user) {
    console.error("Unauthorized access to /load-drawing");
    return res.status(401).send("Unauthorized");
  }

  try {
    const drawing = await Drawing.findOne({ user: req.session.user });
    if (drawing) {
      console.log("Drawing found for user:", req.session.user);
      res.json(drawing.dataURL);
    } else {
      console.log("No drawing found for user:", req.session.user);
      res.json(null); // No drawing exists
    }
  } catch (err) {
    console.error("Error loading drawing:", err);
    res.status(500).send("Error loading drawing");
  }
});

// Display username route
app.get("/get-username", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Unauthorized"); // User not logged in
  }

  try {
    const user = await User.findById(req.session.user);
    if (user) {
      res.status(200).json({ username: user.username });
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error("Error fetching username:", err);
    res.status(500).send("Internal server error");
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

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

// Canvas model
const Canvas = mongoose.model(
  "Canvas",
  new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    drawings: [
      {
        dataURL: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
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

// Canvas routes
// Get all canvases for the logged-in user
app.get("/canvases", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const canvases = await Canvas.find({ user: req.session.user });
    res.json(canvases);
  } catch (err) {
    console.error("Error fetching canvases:", err);
    res.status(500).send("Error fetching canvases");
  }
});

// Create a new canvas
app.post("/canvases", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Unauthorized");
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).send("Canvas name is required");
  }

  try {
    const newCanvas = new Canvas({
      user: req.session.user,
      name,
      drawings: [],
    });
    await newCanvas.save();
    res.status(201).json(newCanvas);
  } catch (err) {
    console.error("Error creating canvas:", err);
    res.status(500).send("Error creating canvas");
  }
});

// Delete a canvas
app.delete("/canvases/:id", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Unauthorized");
  }

  const { id } = req.params;

  try {
    const deletedCanvas = await Canvas.findOneAndDelete({
      _id: id,
      user: req.session.user,
    });
    if (deletedCanvas) {
      res.status(200).json(deletedCanvas);
    } else {
      res.status(404).send("Canvas not found");
    }
  } catch (err) {
    console.error("Error deleting canvas:", err);
    res.status(500).send("Error deleting canvas");
  }
});

// Save a draft to a canvas
app.post("/canvases/:id/drafts", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Unauthorized");
  }

  const { id } = req.params;
  const { dataURL } = req.body;

  if (!dataURL) {
    return res.status(400).send("Drawing data is required");
  }

  try {
    const canvas = await Canvas.findOne({ _id: id, user: req.session.user });
    if (!canvas) {
      return res.status(404).send("Canvas not found");
    }

    canvas.drawings.push({ dataURL });
    await canvas.save();
    res.status(201).json(canvas);
  } catch (err) {
    console.error("Error saving draft:", err);
    res.status(500).send("Error saving draft");
  }
});

// Get the most recent draft for a canvas
app.get("/canvases/:id/drafts/latest", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Unauthorized");
  }

  const { id } = req.params;

  try {
    const canvas = await Canvas.findOne({ _id: id, user: req.session.user });
    if (!canvas) {
      return res.status(404).send("Canvas not found");
    }

    const latestDrawing = canvas.drawings.slice(-1)[0] || null;
    res.json(latestDrawing);
  } catch (err) {
    console.error("Error fetching latest draft:", err);
    res.status(500).send("Error fetching latest draft");
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

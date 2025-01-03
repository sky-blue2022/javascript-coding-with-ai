document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("drawingCanvas");
  const ctx = canvas.getContext("2d");
  const penColorInput = document.getElementById("penColor");
  const penSizeInput = document.getElementById("penSize");
  const fileNameInput = document.getElementById("fileName");
  const saveButton = document.getElementById("saveCanvas");
  const exportButton = document.getElementById("exportCanvas");
  const clearButton = document.getElementById("clearCanvas");
  const logoutButton = document.getElementById("logoutButton");
  const usernameDisplay = document.getElementById("usernameDisplay"); // Add this element in HTML

  if (
    !canvas ||
    !ctx ||
    !penColorInput ||
    !penSizeInput ||
    !fileNameInput ||
    !saveButton ||
    !exportButton ||
    !clearButton ||
    !logoutButton ||
    !usernameDisplay
  ) {
    console.error("One or more required elements are missing in the DOM.");
    return;
  }

  // Fetch and display the username
  async function fetchUsername() {
    try {
      const response = await fetch("/get-username");
      if (response.ok) {
        const data = await response.json();
        usernameDisplay.textContent = `Logged in as: ${data.username}`;
      } else {
        console.error("Failed to fetch username:", response.status);
      }
    } catch (err) {
      console.error("Error fetching username:", err);
    }
  }

  fetchUsername();

  // Set up canvas size
  function resizeCanvas() {
    const toolbarHeight = document.getElementById("toolbar").offsetHeight || 50;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - toolbarHeight;
  }
  resizeCanvas();

  // Redraw canvas when resizing
  window.addEventListener("resize", resizeCanvas);

  let drawing = false;

  // Load the latest drawing from the backend when the page loads
  window.onload = async () => {
    try {
      const response = await fetch("/load-drawing");
      if (response.ok) {
        const dataURL = await response.json();
        if (dataURL) {
          const img = new Image();
          img.onload = () => ctx.drawImage(img, 0, 0);
          img.src = dataURL;
        } else {
          console.log("No drawing data found for the user.");
        }
      } else {
        console.error("Failed to load drawing:", response.status);
      }
    } catch (err) {
      console.error("Error loading drawing:", err);
    }
  };

  // Event listeners for drawing
  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });

  canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath(); // Reset the path
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;

    ctx.lineWidth = penSizeInput.value; // Set the pen size
    ctx.strokeStyle = penColorInput.value; // Set the pen color
    ctx.lineCap = "round"; // Smooth line edges

    // Draw line
    ctx.lineTo(e.offsetX, e.offsetY); // Use offsetX and offsetY for accurate positions
    ctx.stroke();
  });

  // Clear canvas
  clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("Canvas cleared.");
  });

  // Save the drawing to the database
  saveButton.addEventListener("click", async () => {
    const dataURL = canvas.toDataURL("image/png");

    console.log("Attempting to save drawing to backend...");
    console.log("dataURL length:", dataURL.length);

    try {
      const response = await fetch("/save-drawing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataURL }),
      });

      console.log("Save response status:", response.status);
      const responseText = await response.text();
      console.log("Save response text:", responseText);

      if (response.ok) {
        alert("Drawing saved successfully!");
      } else {
        alert(`Failed to save drawing: ${responseText}`);
      }
    } catch (err) {
      console.error("Error saving drawing:", err);
      alert("An error occurred while saving the drawing.");
    }
  });

  // Export the drawing as a file
  exportButton.addEventListener("click", () => {
    console.log("Exporting drawing...");
    const fileName = fileNameInput.value.trim() || "drawing";

    canvas.toBlob((blob) => {
      if (!blob) {
        console.error("Failed to create blob for export.");
        return;
      }
      console.log("Blob created for export.");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}.png`;
      link.click();
      URL.revokeObjectURL(link.href);
    }, "image/png");
  });

  // Logout functionality
  logoutButton.addEventListener("click", async () => {
    console.log("Attempting to log out...");
    try {
      const response = await fetch("/logout", { method: "GET" });
      console.log("Logout response status:", response.status);
      if (response.ok) {
        console.log("Logout successful. Redirecting to login page...");
        window.location.href = "/"; // Redirect to the login page
      } else {
        console.error("Logout failed. Status:", response.status);
        alert("Failed to log out.");
      }
    } catch (err) {
      console.error("Error during logout request:", err);
      alert("An error occurred while logging out.");
    }
  });
});

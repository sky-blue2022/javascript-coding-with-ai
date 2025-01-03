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
  const usernameDisplay = document.getElementById("usernameDisplay");
  const canvasList = document.getElementById("canvasList");
  const createCanvasButton = document.getElementById("createCanvasButton");

  let currentCanvasId = null;

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
    !usernameDisplay ||
    !canvasList ||
    !createCanvasButton
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
    canvas.width = window.innerWidth - 220; // Adjust for sidebar width
    canvas.height = window.innerHeight - toolbarHeight;
  }
  resizeCanvas();

  // Redraw canvas when resizing
  window.addEventListener("resize", resizeCanvas);

  let drawing = false;

  // Load canvases into the sidebar
  async function loadCanvases() {
    try {
      const response = await fetch("/canvases");
      const canvases = await response.json();
      canvasList.innerHTML = ""; // Clear the list before reloading
      canvases.forEach((canvas) => {
        const li = document.createElement("li");
        li.textContent = canvas.name;
        li.dataset.id = canvas._id;
        li.className = currentCanvasId === canvas._id ? "active" : "";

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = "deleteCanvasButton";
        deleteButton.textContent = "x";
        deleteButton.addEventListener("click", async (e) => {
          e.stopPropagation(); // Prevent triggering canvas switch
          if (confirm(`Are you sure you want to delete "${canvas.name}"?`)) {
            await deleteCanvas(canvas._id);
          }
        });

        li.appendChild(deleteButton);
        li.addEventListener("click", () => switchCanvas(canvas._id));
        canvasList.appendChild(li);
      });
    } catch (err) {
      console.error("Error loading canvases:", err);
    }
  }

  // Delete a canvas
  async function deleteCanvas(canvasId) {
    try {
      const response = await fetch(`/canvases/${canvasId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        loadCanvases(); // Reload the list after deletion
      } else {
        console.error("Failed to delete canvas");
      }
    } catch (err) {
      console.error("Error deleting canvas:", err);
    }
  }

  // Create a new canvas
  createCanvasButton.addEventListener("click", async () => {
    const canvasName = prompt("Enter the name of the new canvas:");
    if (!canvasName) return;

    try {
      const response = await fetch("/canvases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: canvasName }),
      });

      if (response.ok) {
        loadCanvases();
      } else {
        console.error("Failed to create canvas");
      }
    } catch (err) {
      console.error("Error creating canvas:", err);
    }
  });

  // Switch to a different canvas
  async function switchCanvas(canvasId) {
    currentCanvasId = canvasId;
    try {
      const response = await fetch(`/canvases/${canvasId}/drafts/latest`);
      const latestDraft = await response.json();
      if (latestDraft) {
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
        img.src = latestDraft.dataURL;
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas if no drafts
      }
      loadCanvases(); // Update the sidebar to reflect active canvas
    } catch (err) {
      console.error("Error switching canvas:", err);
    }
  }

  // Save the drawing to the database
  saveButton.addEventListener("click", async () => {
    if (!currentCanvasId) {
      alert("Select a canvas to save.");
      return;
    }
    const dataURL = canvas.toDataURL("image/png");

    console.log("Attempting to save drawing to backend...");
    console.log("dataURL length:", dataURL.length);

    try {
      const response = await fetch(`/canvases/${currentCanvasId}/drafts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataURL }),
      });

      if (response.ok) {
        alert("Draft saved successfully!");
      } else {
        alert("Failed to save draft.");
      }
    } catch (err) {
      console.error("Error saving draft:", err);
    }
  });

  // Load the latest drawing from the backend when the page loads
  window.onload = async () => {
    await loadCanvases();
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

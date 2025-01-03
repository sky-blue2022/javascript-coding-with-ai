const ball = document.getElementById("ball");

let mouseX = 0,
  mouseY = 0; // Mouse pointer position
let ballX = 0,
  ballY = 0; // Ball position

const lag = 0.1; // Amount of delay (0 = no delay, closer to 1 = more delay)

function animateBall() {
  // Gradually move the ball closer to the mouse position
  ballX += (mouseX - ballX) * lag;
  ballY += (mouseY - ballY) * lag;

  // Update the ball's position
  ball.style.transform = `translate(${ballX}px, ${ballY}px)`;

  // Continuously update animation
  requestAnimationFrame(animateBall);
}

// Update mouse position when it moves
document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Start the animation loop
animateBall();

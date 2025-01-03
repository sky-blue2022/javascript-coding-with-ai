const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

// Particle class
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.alpha = 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.01;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Particle system setup
const particles = [];
function addParticle(event) {
  const rect = canvas.getBoundingClientRect();
  for (let i = 0; i < 5; i++) {
    particles.push(
      new Particle(event.clientX - rect.left, event.clientY - rect.top)
    );
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.alpha <= 0) particles.splice(index, 1);
  });
  requestAnimationFrame(animate);
}

// Event listener for mouse movement
canvas.addEventListener("mousemove", addParticle);
animate();

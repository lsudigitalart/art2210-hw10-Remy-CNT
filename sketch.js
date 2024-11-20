// Array of circles.
let circles = [];

function setup() {
  createCanvas(400, 400);

  // Generate 20 circles.
  circlePower();
}

function draw() {
  background("black");

  // Call your new function.
  updateAndDrawCircles();
}

// Define your new function.
function updateAndDrawCircles() {
  for (let circle of circles) {
    // Draw the circle.
    drawRose(circle);

    // Adjust size based on growing or shrinking state.
    if (circle.growing) {
      circle.size += 0.5; // Increase size if growing.
      if (circle.size >= circle.maxSize) {
        circle.growing = false; // Start shrinking when max size is reached.
      }
    } else {
      circle.size -= 0.5; // Decrease size if shrinking.
      if (circle.size <= circle.minSize) {
        circle.growing = true; // Start growing when min size is reached.
      }
    }

    // Reduce lifespan.
    circle.lifespan -= 1;

    if (circle.lifespan <= 0) {
      // Save index of the circle.
      let i = circles.indexOf(circle);

      // Remove wilted circle and replace it with a new one.
      circles.splice(i, 1);
      circles.push(createCircle());
    }
  }
}

// Function to create 20 circles.
function circlePower() {
  for (let i = 0; i < 20; i += 1) {
    // Create a circle in a random location.
    let circle = createCircle();

    // Add the circle to the circles array.
    circles.push(circle);
  }
}

function createCircle() {
  let circle = {
    x: random(20, 380),
    y: random(20, 380),
    size: random(20, 75),
    minSize: random(10, 20), // Minimum size.
    maxSize: random(50, 100), // Maximum size.
    lifespan: random(255, 300),
    growing: random([true, false]), // Start in a random state.
    color: color(random(200, 255), random(0, 100), random(0, 100)), // Red/pink hues.
  };

  return circle;
}

function drawRose(circle) {
  // Draw circles.
  noStroke();
  fill(circle.color);

  // Layered petals for circles effect.
  let petalCount = 6; // Number of petals.
  for (let i = petalCount; i > 0; i--) {
    fill(circle.color.levels[0], circle.color.levels[1], circle.color.levels[2], 150 - i * 20); // Decreasing opacity.
    ellipse(circle.x, circle.y, (circle.size / petalCount) * i, (circle.size / petalCount) * i);
  }

  // Draw center of the circle
  fill(255, 0, 0, 200); // Slightly darker red for the center.
  ellipse(circle.x, circle.y, circle.size / 6);
}

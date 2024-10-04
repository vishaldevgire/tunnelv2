let scaleFactor = 1;
let speed = getURLParameter('speed') ? parseFloat(getURLParameter('speed')) : 0.01; // Speed from URL or default
let rotationAngle = 0; // Initialize rotation angle
let rotationSpeed = 0.01; // Speed of rotation
let shouldRotate = getURLParameter('rotate') !== 'false'; // Rotation enabled unless rotate=false is passed

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(255);
  background(0); // Black background for contrast
}

function draw() {
  background(0); // Clear screen each frame

  // Set the center of rotation to the center of the canvas
  translate(width / 2, height / 2);

  // Apply rotation only if shouldRotate is true
  if (shouldRotate) {
    rotate(rotationAngle);
    rotationAngle += rotationSpeed; // Update rotation angle for the spinning effect
  }

  // Draw triangles infinitely as we "move inward"
  let size = min(width, height) * 0.5 * scaleFactor; // Scale changes dynamically
  drawTunnel(0, 0, size); // The origin is now the center (after translate)

  // Update scaleFactor to create the inward tunnel effect
  scaleFactor *= 1 + speed; // Increasing scaleFactor simulates moving inward
}

function drawTunnel(x, y, size) {
  let depth = 0; // Initialize depth

  // Loop to keep drawing triangles infinitely
  while (size > 1) {
    // Draw the upward triangle at even depths
    if (depth % 2 === 0) {
      drawUpwardTriangle(x, y, size);
    } 
    // Draw the downward triangle at odd depths
    else {
      drawDownwardTriangle(x, y, size);
    }

    // Scale down for the next triangle
    size *= 0.5; // Scale the next triangle down to half the size
    depth++;
  }
}

function drawUpwardTriangle(x, y, size) {
  beginShape();
  for (let i = 0; i < 3; i++) {
    let angle = TWO_PI / 3 * i - PI / 2; // Triangle points upwards
    let vx = x + cos(angle) * size / 2;
    let vy = y + sin(angle) * size / 2;
    vertex(vx, vy);
  }
  endShape(CLOSE);
}

function drawDownwardTriangle(x, y, size) {
  beginShape();
  for (let i = 0; i < 3; i++) {
    let angle = TWO_PI / 3 * i + PI / 2; // Triangle points downwards
    let vx = x + cos(angle) * size / 2;
    let vy = y + sin(angle) * size / 2;
    vertex(vx, vy);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0); // Reset background on resize
}

function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

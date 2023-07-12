const canvasWidth = 1512;
const canvasHeight = 982;
const hexSize = 8;
const hexMargin = 28;
const numColumns = Math.floor(canvasWidth / (hexSize * 1.5 + hexMargin));
const numRows = Math.floor(canvasHeight / (hexSize * Math.sqrt(3) + hexMargin * Math.sqrt(3) / 2));
const hexGrid = [];


function setup() {
  frameRate(30);
  createCanvas(canvasWidth, canvasHeight);
  background(128, 0, 128); // Set background color to purple
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numColumns; col++) {
      const x = col * (hexSize * 1.5 + hexMargin) + (row % 2) * (hexSize * 0.75 + hexMargin);
      const y = row * (hexSize * Math.sqrt(3) + hexMargin * Math.sqrt(3) / 2);
      const spacing = 80; // Adjust the spacing between hexagons
      const speed = random(0.5, 2.5); // Adjust the speed range of hexagons
      hexGrid.push(new Hexagon(x, y, speed, spacing));
    }
  }
}

function draw() {
  background('#FFFFFF');
  for (const hex of hexGrid) {
    hex.move();
    hex.display();
  }

}

class Hexagon {
  constructor(x, y, speed, spacing) {
    this.x = x;
    this.y = y;
    this.speed = speed; // Speed of movement
    this.spacing = spacing; // Spacing between hexagons
    this.angle = random(TWO_PI); // Random starting angle
    this.direction = createVector(cos(this.angle), sin(this.angle)); // Movement direction
  }

  move() {
    this.x += this.direction.x * this.speed;
    this.y += this.direction.y * this.speed;

    // Wrap around screen edges
    if (this.x < -hexSize - this.spacing) {
      this.x = width + hexSize + this.spacing;
    } else if (this.x > width + hexSize + this.spacing) {
      this.x = -hexSize - this.spacing;
    }

    if (this.y < -hexSize - this.spacing) {
      this.y = height + hexSize + this.spacing;
    } else if (this.y > height + hexSize + this.spacing) {
      this.y = -hexSize - this.spacing;
    }
  }

  display() {
  const distFromCursor = dist(mouseX, mouseY, this.x, this.y);
    if (distFromCursor > 140) { // change 50 to the desired range
      push();
      translate(this.x, this.y);
      noStroke();
      fill('#FFB82F'); // Set hexagon fill color
      beginShape();
      for (let i = 0; i < 12; i++) {
        const angle = i * TWO_PI / 6;
        const x = hexSize * cos(angle);
        const y = hexSize * sin(angle);
        curveVertex(x + hexSize * 10 * cos(angle - PI / 6), y + hexSize * 10 * sin(angle - PI / 6));
        curveVertex(x, y);
        curveVertex(x + hexSize * 10 * cos(angle + PI / 6), y + hexSize * 10 * sin(angle + PI / 6));
      }
      endShape(CLOSE);
      pop();
    }
}

}


const textElement = document.querySelector('.typing-element');
const texts = [
  "BEES CAN'T SEE RED"
];
let textIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < texts[textIndex].length) {
    textElement.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100); // Adjust typing speed by changing the timeout value
  } else {
    setTimeout(() => {
      // Erase the typed text
      let eraseInterval = setInterval(() => {
        if (charIndex > 0) {
          textElement.textContent = texts[textIndex].substring(0, charIndex - 1);
          charIndex--;
        } else {
          clearInterval(eraseInterval);
          // Move to the next sentence
          textIndex = (textIndex + 1) % texts.length;
          setTimeout(type, 500); // Wait for 0.5 second before typing the next sentence
        }
      }, 50); // Adjust erasing speed by changing the timeout value
    }, 800); // Wait for 0.8 seconds before starting the erasing process
  }
}

type();


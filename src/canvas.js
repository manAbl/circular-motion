import utils from './utils';

const $ = name => document.querySelector(name);

const canvas = $('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = [
  '#0077FF',
  '#00BFFF',
  '#8324DB'
];

// Event Listeners
addEventListener('mousemove', event => {
  mouse.x = event.clientX
  mouse.y = event.clientY
});

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
});



const randomColors = colors =>
  colors[Math.floor(Math.random() * colors.length)];

const randomNumberForRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);



// Objects
function Particle (x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.1;
  this.centerDistance = randomNumberForRange(50, 120);
  this.lastMousePosition = {
    x: x,
    y: y
  };

  this.update = () => {

    let lastPoint = {
      x: this.x,
      y: this.y
    };

    // we are going to move this points over time
    this.radians += this.velocity;

    // Drag effect

    this.lastMousePosition.x += 0.05 + (mouse.x - this.lastMousePosition.x);
    this.lastMousePosition.y += 0.05 + (mouse.y - this.lastMousePosition.y);


    // We are creating the circle
    // with the same distance
    // so they will create
    // the circular motion
    this.x = this.lastMousePosition.x + Math.cos(this.radians) * this.centerDistance;
    this.y = this.lastMousePosition.y + Math.sin(this.radians) * this.centerDistance;

    this.draw(lastPoint);
  };

  this.draw = lastPoint => {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  };

};


// Implementation
let particles;

(function init() {
  particles = [];

  for (let i = 0; i < 50; i++) {
    let radius = (Math.random() * 2) + 1;
    particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColors(colors)));
  }

}());

// Animation Loop
(function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(255,255,255, .05)';
  c.fillRect(0, 0, canvas.width, canvas.height);

  // animating each particle
  particles.map( particle => particle.update());

}());

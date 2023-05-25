var num = 7500;
var particles = [num];

var fadeBkgd = false;
var clickColorOn = true;
var clickPushOn = false;

var foreColor, bkgdColor;
var colorA = [];

function setup() {
  createCanvas(800, 800);
  
  foreColor = color('#000000');
  bkgdColor = color('#ffffff');
  colorA[0] = color('#ff4842');
  colorA[1] = color('#00b5f7');
  colorA[2] = color('#695cfd');

  background(foreColor);
    
  noStroke();
  for (let i=0; i<num; i++) {
    var loc = createVector(random(width), random(height));
    var angle = 0; //any value to initialize
    var dir = createVector(cos(angle), sin(angle));
    var speed = random(0.5, 2);
    // var speed = 5;
    particles[i]= new Particle0(loc, dir, speed, false, true);
  }
}

function draw() {
  if(fadeBkgd){
    fill(255, 20);
    noStroke();
    rect(0, 0, width, height);
  } else {
    background(bkgdColor);
  }

  for (let i=0; i<particles.length; i++) {
    particles[i].run();
  }

  // fill(255);
  // text(int(frameRate()), width-50, height-50);
}


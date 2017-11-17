var mic;
var fft;

function setup() {
  createCanvas(800,600);
  mic = new p5.AudioIn();
  mic.start();

}

function draw() {
  background(0);
  
  fill(255,0,255);
  
  var ampl = mic.getLevel();
  amp = map(ampl, 0,1,0,2000);

  ellipse(width / 2, height / 2, amp, amp);

}
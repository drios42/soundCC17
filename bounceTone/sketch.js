var bs = [];
var pace = [2, 4, 6, 8, 10, 12,16];

var notes = [130.81, 174.61,196, 220, 261.63, 349.23, 392,440];

//var notes = [130.81, 146.83, 164.81, 185, 196, 220, 246.94];

//var notes = [61.74,65.41,73.42,82.41,87.31,98,103.83,123.47,130.81,146.83,164.81,174.61,196,207.65];

var duration = [64, 128, 166, 250, 500, 750, 1000];
var maxb = [4, 8, 16,24,32,48];
var fade = 2;

function setup() {
  createCanvas(800, 600);


  bs[0] = new mBall(random(1, width - 1), random(1, height - 1), random(255), random(255), random(125), 20, pace[floor(random(pace.length))], false, notes[floor(random(notes.length))], duration[floor(random(duration.length))], 48);
}

function draw() {
  background(0);
  for (var i = 0; i < bs.length; i++) {
    bs[i].bounce();
    bs[i].timer();
    bs[i].render();
    bs[i].playNote();
    bs[i].die();
  }
}

function mousePressed() {
  if (bs.length > 0) {
    bs.push(new mBall(bs[0].x, mouseY, random(255), random(255), random(125), 20, pace[floor(random(pace.length))], false, notes[floor(random(notes.length))], duration[floor(random(duration.length))], maxb[floor(random(maxb.length - 1))]));

    // bs.push(new mBall(bs[bs.length - 1].x, mouseY, color(random(255), random(255), random(255)), 20, pace[floor(random(pace.length))], false, notes[floor(random(notes.length))], duration[floor(random(duration.length))]));
  } else {
    bs.push(new mBall(mouseX, mouseY, random(255), random(255), random(125), 20, pace[floor(random(pace.length))], false, notes[floor(random(notes.length))], duration[floor(random(duration.length))], maxb[floor(random(maxb.length - 1))]));
  }
}

function mBall(x, y, r, g, b, sz, sp, chng, note, d, bounce) {
  this.x = x;
  this.y = y;

  this.r = r;
  this.g = g;
  this.b = b;

  this.sz = sz;
  this.sp = sp;
  this.chng = chng;
  this.duration = d;
  this.maxb = bounce;

  var osc;
  var last;
  var times = 0;
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(note);
  osc.amp(0);
  osc.start();


  this.render = function() {
    fill(this.r, this.g, this.b);
    noStroke();
    ellipse(this.x, this.y, this.sz, this.sz);
    this.r -= fade;
    this.g -= fade;
    this.b -= fade;
  }
  this.bounce = function() {
    this.x = this.x + this.sp;
    if (this.x >= width) {
      // this.r=255;
      // this.g=255;
      // this.b=0;
      this.r = r;
      this.g = g;
      this.b = b;
      this.sp = this.sp * -1;
      // osc.pan(.75,0.5);
      this.chng = true;
      times++
      last = millis();
    }
    if (this.x <= 0) {
      // this.r = 255;
      // this.g = 255;
      // this.b = 0;
      this.r = r;
      this.g = g;
      this.b = b;
      this.sp = this.sp * -1;
      // osc.pan(-.75,0.5);
      this.chng = true;
      times++
      last = millis();
    }
  }

  this.timer = function() {
    if (millis() - last > this.duration) {
      this.chng = false;
    }
  }

  this.die = function() {
    if (times >= this.maxb) {
      osc.amp(0, 0.3);
      bs.splice(bs.indexOf(this), 1);
    }

  }


  this.playNote = function() {
    if (this.chng) {
      osc.amp(.8, .5);

    } else {
      osc.amp(0, .5);

    }
  }
}
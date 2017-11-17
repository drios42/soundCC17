//all code highly based off of Dan Shiffman's processing tutorials https://www.youtube.com/watch?v=IKB1hWWedMk

//SoundFile file;
var fft;
var mic;
var bands = 512; // resolution of the FFT
var spectrum;
var terrain = [];

var lines = 60;
var scl = 8;
var w = 1024;
var h = 60;
var counter = 0;
var flying = 0;

var r = 255;
var g = 0;
var b = 0;
var angle = 0;

var rotZ;
var ext = 10;

function preload() {
 // file = loadSound('assets/cricketsound.wav'); //1-3
  // file = loadSound('assets/04.mp3'); //1-3
  //file = loadSound('assets/Parallels.mp3');
  file = loadSound('assets/lucky_dragons_-_power_melody.mp3');
  // file = loadSound('assets/Damscray_DancingTiger.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  //frameRate(15);


  //terrain = new float [lines][bands];
  // create fft object
  fft = new p5.FFT(0.85, bands);
  // create audion in
  mic = new p5.AudioIn();

 
  // start the Audio Input
 // file.play();
 // file.loop();


  //// start the Audio Input
  mic.start();

  //// patch the AudioIn
  fft.setInput(mic);
  //fft.setInput(file);

  for (var y = 0; y < lines; y++) {
    terrain[y] = [];
    for (var x = 0; x < bands; x++) {
      terrain[y][x] = 0;
    }
  }

}

function draw() {
  background(125);
  rotZ = mouseX;

  flying -= 10;
  var yoff = flying;

  var c = color(0, 255, 255);
  stroke(c);
  noFill();
  translate(-width / 2, 0, -50);
  rotateX(radians(-60));

  translate(0, -80);
  //rotateZ(radians(rotZ));
  //-translate(0, -600);
  var spectrum = fft.analyze();

  // update the terrain
  //terrain[counter] = spectrum;



  for (var y = 0; y < terrain.length; y++) {
    beginShape();
    // for (var x = ext; x > 0; x--) {
    //   if (y > 0) {
    //     vertex(-x * scl, y * scl, 0);
    //     if (y < lines-1) {
    //       vertex(-x * scl, (y + 1) * scl, 0);
    //     }
    //   }
    // }
    //float xoff =0;
    for (var x = 0; x < spectrum.length; x++) {
      //   terrain[x][y] = map(spectrum[x], 0, 10, -100, 8000);
      //   terrain [x][y]= map(noise(xoff, yoff), 0, 1, -scl*5, scl*5) ;
      //  xoff +=.1;
      if (y < lines - 1) {
        if (y > 0) {
          vertex(x * scl, y * scl, terrain[y - 1][x]);
        }
        if (x < bands - 1) {
          vertex(x * scl, (y + 1) * scl, terrain[y][x]);
        }
        if (x < bands - 2) {
          vertex((x + 1) * scl, (y + 1) * scl, terrain[y][x + 1]);
        }
        if (y > 0) {
          vertex(x * scl, y * scl, terrain[y - 1][x]);
        }

      } else {}
    }
    endShape();
    //  yoff+=.1;
  }



  for (var y = lines - 1; y >= 0; y--) {
    //for (var i = 0; i < bands; i++) {
    terrain[0] = spectrum;
    if (y > 0) {
      if (y < lines) {
        terrain[y] = terrain[y - 1];
      }
    }
    // }
  }

  //for (int i = 0; i < terrain.length; i++) {
  //  for (int j = 0; j < bands; j++) {
  //    terrain[i][j]=0; // reset lines at the end of scroll
  //  }
  //}
}
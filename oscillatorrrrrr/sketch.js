var osc;
var freq = 30;
var vol;


function setup() {
	createCanvas(windowWidth, windowHeight);
    
    osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(freq);
    osc.start();
    osc.amp(0, .2);
    
}

function draw() {
    background(0);
    stroke(255);
    fill(255);
    textSize(24);
    text("MY Frequency is: "+ freq, 10,50);
   
    freq = mouseX;
    vol = map(mouseY,height,0, 0,1);
    
    osc.freq(freq);
    osc.amp(vol);
    

}
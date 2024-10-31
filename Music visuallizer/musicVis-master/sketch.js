//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variables for p5 sound objects
var sounds = [];
var currentSoundIndex = 0;
//variable for p5 fast fourier transform
var fourier;

function preload(){
     // Load multiple sound files and push them into the sounds array
    sounds.push(loadSound('assets/stomper_reggae_bit.mp3'));
    sounds.push(loadSound('assets/Sound2.mp3'));
    sounds.push(loadSound('assets/sound3.mp3'));
}

function setup(){
	 createCanvas(windowWidth, windowHeight);
	 background(0);
	 controls = new ControlsAndInput();

	 //instantiate the fft object
	 fourier = new p5.FFT();

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Spectrum());
	 vis.add(new WavePattern());
	 vis.add(new Needles());
     vis.add(new CircularBars()); 
     vis.add(new OrbitalRing());
     vis.add(new DancingSquares());
     vis.add(new RibbonWave());
     vis.add(new PulseWaveGrid);
     vis.add(new RectangularBarsAndSquares());
    
    // Initializing the first sound if the sounds array has any loaded files
    if (sounds.length > 0) {
        sound = sounds[currentSoundIndex];// Setting the current sound
    }
     
}

function draw(){
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}

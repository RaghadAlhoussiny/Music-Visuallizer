// Constructor function for the CircularBars visualizer
function CircularBars() {
    this.name = "circularBars";// Name of the visualizer
    this.numBars = 64; // Number of bars
    this.bars = []; // Array to hold the bar objects

    // Initialize bars
    for (let i = 0; i < this.numBars; i++) {
        this.bars.push(new Bar());// Add a new Bar object to the array
    }

    // Constructor function for individual Bar objects
    function Bar() {
        this.angle = 0;// Initial angle of the bar (used to determine its direction)
        this.length = 0;//Initial Length of the bar
        this.color = [255, 255, 255];//Initial Color of the bar (white)
    }

    // Function to update the properties of each bar based on the frequency spectrum
    this.updateBars = function(spectrum) {
        for (let i = 0; i < this.numBars; i++) {
            let angle = map(i, 0, this.numBars, 0, TWO_PI);// Calculate angle based on bar index
            let length = map(spectrum[i], 0, 255, 50, 300);// Calculate length based on spectrum value
            let color = [spectrum[i], 255 - spectrum[i], 150];// Calculate color based on spectrum value
            
          // Update the properties of the current bar
            this.bars[i].angle = angle;
            this.bars[i].length = length;
            this.bars[i].color = color;
        }
    };

    // Function to draw the visualizer on the canvas
    this.draw = function() {
        let spectrum = fourier.analyze();// Analyze the audio spectrum using FFT
        this.updateBars(spectrum);// Update bars based on spectrum

        push();
        translate(width / 2, height / 2);// Translate to center of the canvas
        for (let i = 0; i < this.numBars; i++) {
            let bar = this.bars[i];
            stroke(bar.color);// Set stroke color to bar's color
            line(0, 0, bar.length * cos(bar.angle), bar.length * sin(bar.angle));// Draw a line representing the bar
        }
        pop();
    };
}
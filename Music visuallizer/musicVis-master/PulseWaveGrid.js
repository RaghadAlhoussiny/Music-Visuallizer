// Constructor function to create a Pulse Wave Grid visualization
function PulseWaveGrid() {
    this.name = "pulseWaveGrid";// Name of the visualization
    this.numCols = 10; // Number of columns
    this.numRows = 10; // Number of rows
    this.gridSize = 50; // Size of each grid cell
    this.maxWaveAmplitude = 50; // Maximum wave amplitude
    this.time = 0; // Time variable for animating the wave

    // Initializing the grid with WaveCell objects
    this.grid = [];
    for (let i = 0; i < this.numCols; i++) {
        let row = [];
        for (let j = 0; j < this.numRows; j++) {
            row.push(new WaveCell());
        }
        this.grid.push(row);
    }

    // WaveCell constructor function to define properties of each wave cell
    function WaveCell() {
        this.amplitude = random(10, this.maxWaveAmplitude); // Random initial amplitude within a defined range
        this.frequency = random(0.01, 0.1); // Random initial frequency within a defined range
        this.color = [random(255), random(255), random(255)]; // Random color for the wave cell
        this.phase = random(TWO_PI);// Random initial phase for the wave cell
        this.speed = random(0.01, 0.05); // Random speed of phase change for the wave cell
    }

    // Function to update the wave cells based on the frequency spectrum
    this.updateGrid = function(spectrum) {
        let spectrumIndex = 0;// Index to iterate through the spectrum array
        // Loop through each cell in the grid
        for (let i = 0; i < this.numCols; i++) {
            for (let j = 0; j < this.numRows; j++) {
                let freq = spectrum[spectrumIndex % spectrum.length];// Get the corresponding frequency value from the spectrum
                 // Map the frequency value to amplitude and frequency for the wave cell
                this.grid[i][j].amplitude = map(freq, 0, 255, 10, this.maxWaveAmplitude);
                this.grid[i][j].frequency = map(freq, 0, 255, 0.01, 0.1);
                
                // Map the frequency value to color for the wave cell
                this.grid[i][j].color = [map(freq, 0, 255, 100, 255), map(freq, 0, 255, 100, 255), 255];
                
                this.grid[i][j].phase += this.grid[i][j].speed;// Updating the phase for animation
                spectrumIndex++;// Move to the next spectrum value
            }
        }
    };

    // Function to draw the grid with pulsing waves
    this.draw = function() {
        let spectrum = fourier.analyze();// Analyze the current frequency spectrum
        this.updateGrid(spectrum);// Update the grid based on the current spectrum

        push();
        translate(width / 2, height / 2); // Translate the drawing origin to the center of the canvas
        let colWidth = this.gridSize; // Width of each column
        let rowHeight = this.gridSize; // Height of each row
        
        // Loop through each cell in the grid
        for (let i = 0; i < this.numCols; i++) {
            for (let j = 0; j < this.numRows; j++) {
                let cell = this.grid[i][j];// Get the current wave cell
                push();
                
                // Translate the position of the current cell
                translate(i * colWidth - (this.numCols * colWidth) / 2,
                          j * rowHeight - (this.numRows * rowHeight) / 2);

                stroke(cell.color);// Set stroke color for the wave
                noFill();// No fill for the shapes
                 // Begin drawing the shape
                beginShape();
                for (let t = 0; t < TWO_PI * 2; t += 0.1) {
                    // Calculate the x and y position for the vertex
                    let x = t * colWidth / (TWO_PI * 2);
                    let y = sin(t * cell.frequency + cell.phase) * cell.amplitude;
                    vertex(x, y);// Add vertex to the shape
                }
                endShape();// End drawing the shape
                pop();
            }
        }
        pop();
        this.time += 0.01; // Incrementing the time variable for continuous animation
    };
}
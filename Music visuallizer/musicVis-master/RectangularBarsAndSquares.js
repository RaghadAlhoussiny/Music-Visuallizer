// Constructor function to create a Rectangular Bars And Squares visualization
function RectangularBarsAndSquares() {
    this.name = "rectangularBarsAndSquares"; // Name of the visualization
    this.numCols = 10; // Number of columns
    this.numRows = 5; // Number of rows for bars
    this.maxBarHeight = 200; // Maximum height of the bars
    this.maxSquareSize = 50; // Maximum size of the squares
    this.barWidth = 50; // Width of each bar, including space between bars
    this.squareSize = 20; // Initial size of the squares
    this.spacing = 10; // Space between rectangles

    // Initializing the grid for bars and squares
    this.grid = [];
    for (let i = 0; i < this.numCols; i++) {
        let col = [];
        for (let j = 0; j < this.numRows; j++) {
            // Creating a new Bar object for each grid cell
            col.push(new Bar());
        }
        this.grid.push(col);
    }

    // Bar object constructor
    function Bar() {
        this.height = random(10, this.maxBarHeight); // Initial height , randomly set between 10 and maxBarHeight
        this.size = random(10, this.maxSquareSize); // Initial square size, randomly set between 10 and maxSquareSize
        this.color = [random(255), random(255), random(255)]; // Random color for the bar and square
    }

    // Function to update the grid based on the frequency spectrum
    this.updateGrid = function(spectrum) {
        let spectrumIndex = 0;
        for (let i = 0; i < this.numCols; i++) {
            for (let j = 0; j < this.numRows; j++) {
                let freq = spectrum[spectrumIndex % spectrum.length]; // Get frequency value for the current cell
                
                // Scale height and size based on frequency
                this.grid[i][j].height = map(freq, 0, 255, 10, this.maxBarHeight);
                this.grid[i][j].size = map(freq, 0, 255, 10, this.maxSquareSize);
                
                // Create gradient color transition based on frequency
                let color1 = map(freq, 0, 255, 100, 255);
                let color2 = map(freq, 0, 255, 150, 255);
                this.grid[i][j].color = [color1, color2, 255 - color1];
                
                spectrumIndex++;
            }
        }
    };

    // Function to draw the bars and squares on the canvas
    this.draw = function() {
        let spectrum = fourier.analyze();// Get the current frequency spectrum
        this.updateGrid(spectrum);// Update the grid based on the frequency spectrum

        push();
        translate(width / 2, height / 2); // Move origin to center of canvas
        let colWidth = this.barWidth; // Width of each column, including spacing
        let rowHeight = this.maxBarHeight + this.spacing; // Height of each row with spacing
        
        // Draw each bar and square in the grid
        for (let i = 0; i < this.numCols; i++) {
            for (let j = 0; j < this.numRows; j++) {
                let bar = this.grid[i][j];
                push();
                // Translate to position of the current bar and square
                translate(i * colWidth - (this.numCols * colWidth) / 2,
                          -j * rowHeight + (this.numRows * rowHeight) / 2);
                
                // Draw bars with dynamic height
                fill(bar.color);
                noStroke();
                rect(0, -bar.height, this.barWidth - this.spacing, bar.height); // Draw upwards

                // Draw squares above the bars with dynamic size
                push();
                translate(0, -bar.height - this.squareSize); // Position above the bar
                fill(bar.color);
                rect(0, 0, bar.size, bar.size);
                pop();
                
                pop();
            }
        }
        pop();
    };
}
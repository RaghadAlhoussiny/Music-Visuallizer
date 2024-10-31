// Constructor function for DancingSquares visualization
function DancingSquares() {
    this.name = "dancingSquares";//Name of the visuallization
    this.numRows = 10;//Number of rows of the square grid
    this.numCols = 10;//Number of columns of the square grid
    this.squares = [];//Empty array to hold the squares

    // Initializing the grid of squares
    for (let i = 0; i < this.numRows; i++) {
        let row = [];//new row array
        for (let j = 0; j < this.numCols; j++) {
            row.push(new Square());//Add new square object to the row
        }
        this.squares.push(row);//Add the row to squares array
    }

    // Constructor function for Square objects
    function Square() {
        this.size = 0;//Initial size of the square
        this.color = [255, 255, 255];//Initial color of the square(White)
    }

    // Function to update the squares based on the frequency spectrum
    this.updateSquares = function(spectrum) {
        let spectrumIndex = 0;// Index to track current position in the spectrum array
        //loop through each square in the grid
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                let freq = spectrum[spectrumIndex % spectrum.length];//Get the frequency value from the spectrum
                let size = map(freq, 0, 255, 20, 100);// Map the frequency value to a size range (20 to 100)
                let color = [freq, 255 - freq, 150];// Create a color based on the frequency value

                this.squares[i][j].size = size;
                this.squares[i][j].color = color;

                spectrumIndex++;// Increment the spectrum index
            }
        }
    };
    
    // Function to draw the squares on the canvas
    this.draw = function() {
        let spectrum = fourier.analyze();// Analyze the audio and get the frequency spectrum
        this.updateSquares(spectrum);// Update the squares based on the spectrum

        push();
        // Loop through each square in the grid
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                // Get the current square
                let square = this.squares[i][j];
                // Calculate the x and y position for the square
                let x = map(j, 0, this.numCols, 0, width);
                let y = map(i, 0, this.numRows, 0, height);

                fill(square.color);// Set the fill color to the square's color
                rect(x, y, square.size, square.size);// Draw the square at the calculated position with its size
            }
        }
        pop();
    };
}
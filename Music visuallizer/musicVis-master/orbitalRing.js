// Constructor function for creating an OrbitalRing visualization
function OrbitalRing() {
    this.name = "orbitalRing"; // Name of the visuallization
    this.numSegments = 120;// Number of segments in the ring
    this.baseRadius = min(width, height) * 0.3; // Base radius for the innermost ring
    this.ringCount = 3; // Number of concentric rings
    this.segmentLength = TWO_PI / this.numSegments;// Angular width of each segment
    this.segments = [];// Array to store all segments of the ring

     // Initializing segments
    for (let i = 0; i < this.numSegments; i++) {
        this.segments.push(new Segment());
    }
    
    // Constructor function for individual segments of the ring
    function Segment() {
        this.angle = 0; // Angle of the segment
        this.radius = 0; // Radius of the segment
        this.color = [255, 255, 255]; // Color of the segment, default white
        this.pulse = 0; // Pulse effect for the segment
        this.jitter = random(-0.5, 0.5); // Random jitter effect for visual variation
    }

    // Function to update the ring based on the spectrum data
    this.updateRing = function(spectrum) {
        for (let i = 0; i < this.numSegments; i++) {
            let theta = i * this.segmentLength;// Calculate the angle of the segment
            let segmentIndex = floor(map(theta, 0, TWO_PI, 0, spectrum.length - 1));// Map the angle to the spectrum index
            let segmentRadius = map(spectrum[segmentIndex], 0, 255, this.baseRadius * 0.5, this.baseRadius * 1.5);// Map spectrum value to segment radius

            // Updating segment properties
            let segment = this.segments[i];
            segment.angle = theta;
            segment.radius = segmentRadius;
            segment.pulse = map(spectrum[segmentIndex], 0, 255, 0, 20);
            
            // Calculating color based on segment angle and time
            let colorAngle = map(theta, 0, TWO_PI, 0, 360);
            segment.color = [
                sin(colorAngle + frameCount / 5) * 127 + 128,
                sin(colorAngle + 120 + frameCount / 10) * 127 + 128,
                sin(colorAngle + 240 + frameCount / 15) * 127 + 128
            ];
        }
    };
    
    // Function to draw the ring visualization
    this.draw = function() {
        let spectrum = fourier.analyze();// Get the current frequency spectrum
        this.updateRing(spectrum);// Update the ring with the new spectrum data

        push();
        translate(width / 2, height / 2);// Center the drawing
        
        // Draw concentric rings
        for (let r = 0; r < this.ringCount; r++) {
            for (let i = 0; i < this.numSegments; i++) {
                let segment = this.segments[i];
                
                // Set stroke properties
                strokeWeight(2);
                stroke(segment.color[0], segment.color[1], segment.color[2], 200);
                
                // Calculate segment endpoints
                let x1 = cos(segment.angle) * (segment.radius + r * 30);
                let y1 = sin(segment.angle) * (segment.radius + r * 30);
                let x2 = cos(segment.angle) * (segment.radius + segment.pulse + r * 30 + segment.jitter);
                let y2 = sin(segment.angle) * (segment.radius + segment.pulse + r * 30 + segment.jitter);
                
                 // Draw line for the segment
                line(x1, y1, x2, y2);
            }
        }
        pop();
    };
}

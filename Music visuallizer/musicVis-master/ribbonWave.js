// Constructor function for creating a Ribbon Wave visualization
function RibbonWave() {
    this.name = "ribbonWave";//Name of the visuallization
    this.numSegments = 100;// Number of segments in the ribbon
    this.segments = [];//Empty array to hold segments

    // Particle system properties
    this.particleSystem = [];
    this.numParticles = 200;// Number of particles in the system
    this.particleMaxSize = 8; // Maximum size of the particles
    
    // loop to create the segments
    for (let i = 0; i < this.numSegments; i++) {
        this.segments.push(new Segment());// Adding a new Segment object to the segments array
    }

    // Loop to create the particle system
    for (let i = 0; i < this.numParticles; i++) {
        this.particleSystem.push(new Particle());// Adding a new Particle object to the particle system array
    }

    // Segment object constructor
    function Segment() {
        this.angle = 0;// Initial angle of the segment
        this.length = 0;// Initial length of the segment
        this.color = [255, 255, 255];// Initial color of the segment (white)
    }

    // Particle object constructor
    function Particle() {
        this.x = random(width);// Initial x position of the particle
        this.y = random(height);// Initial y position of the particle
        this.vx = random(-1, 1);// Initial x velocity of the particle
        this.vy = random(-1, 1);// Initial y velocity of the particle
        this.size = random(3, this.particleMaxSize); // Random initial size of the particle
        this.color = [random(100, 255), random(100, 255), random(100, 255)]; // Random initial color
    }

    // Update the segments based on the frequency spectrum
    this.updateSegments = function(spectrum) {
        // Loop through each segment
        for (let i = 0; i < this.numSegments; i++) {
            let angle = map(i, 0, this.numSegments, 0, TWO_PI);// Map the segment index to an angle
            let length = map(spectrum[i % spectrum.length], 0, 255, 50, 300);// Map the spectrum value to a length range (50 to 300)
            let color = [spectrum[i % spectrum.length], 255 - spectrum[i % spectrum.length], 150];// Create a color based on the spectrum value

            this.segments[i].angle = angle;
            this.segments[i].length = length;
            this.segments[i].color = color;
        }
    };

    // Draw the segments
    this.drawSegments = function() {
        let spectrum = fourier.analyze();// Analyzing the audio and get the frequency spectrum
        this.updateSegments(spectrum);// Updating the segments based on the spectrum

        push();
        translate(width / 2, height / 2);// Move the origin to the center of the canvas
        noFill();
        beginShape();
        // Loop through each segment
        for (let i = 0; i < this.numSegments; i++) {
            let seg = this.segments[i];
            stroke(seg.color);// Set the stroke color to the segment's color
            // Calculating the x and y position for the segment
            let x = seg.length * cos(seg.angle);
            let y = seg.length * sin(seg.angle);
            vertex(x, y);// Creating a vertex at the calculated position
        }
        endShape();
        pop();
    };

    // Draw the particle system
    this.drawParticles = function() {
        let spectrum = fourier.analyze();
        for (let i = 0; i < this.numParticles; i++) {
            let particle = this.particleSystem[i];

            // Updating particle position based on audio amplitude
            let amplitude = fourier.getEnergy("bass");
            let speed = map(amplitude, 0, 255, 1, 5);
            particle.x += particle.vx * speed;
            particle.y += particle.vy * speed;

            // Wrap particles around the canvas
            if (particle.x < 0 || particle.x > width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > height) {
                particle.vy *= -1;
            }

            // Update particle color randomly
            particle.color = [random(100, 255), random(100, 255), random(100, 255)];

            // Draw particle
            push();
            noStroke();
            fill(particle.color);
            ellipse(particle.x, particle.y, particle.size);
            pop();
        }
    };

    // Draw function to integrate with the main sketch
    this.draw = function() {
        this.drawSegments();
        this.drawParticles();
    };
}
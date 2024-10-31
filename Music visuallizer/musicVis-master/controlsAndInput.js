//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	
	this.menuDisplayed = false;
	
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();
    
    // Array of sound selection buttons with different positions and labels
    this.soundButtons = [
        new SoundButton(20, height - 150, "Sound 1"), 
        new SoundButton(20, height - 120, "Sound 2"),
        new SoundButton(20, height - 90, "Sound 3")
    ];

	//make the window fullscreen or revert to windowed
	  this.mousePressed = function(){
        if (!this.playbackButton.hitCheck()) {
            var fs = fullscreen();
            fullscreen(!fs);
        }
         // Check if any sound selection button is clicked
        for (let button of this.soundButtons) {
            if (button.hitCheck()) {
                // Change the sound based on the button clicked
                changeSound(button.soundIndex);
            }
        }
    };

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		console.log(keycode);
		if(keycode == 32){
			this.menuDisplayed = !this.menuDisplayed;
		}

		if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 
		}
	};

	//draws the playback button and potentially the menu
	this.draw = function(){
        push();
        fill("white");
        stroke("black");
        strokeWeight(2);
        textSize(34);

        // Draw playback button
        this.playbackButton.draw();
        // Draw sound selection buttons
        for (let button of this.soundButtons) {
            button.draw();
        }
        // Only draw the menu if menu displayed is set to true.
        if (this.menuDisplayed) {
            fill("white"); 
            text("Select a visualisation:", 100, 30);
            this.menu();
        }    
        pop();
    };

	this.menu = function(){
		//draw out menu items for each visualisation
		for(var i = 0; i < vis.visuals.length; i++){
			var yLoc = 70 + i*40;
			text((i+1) + ":  " +vis.visuals[i].name, 100, yLoc);
		}
	};
}

// Constructor function to create a sound selection button
function SoundButton(x, y, label) {
    this.x = x; // x-coordinate of the button
    this.y = y; // y-coordinate of the button
    this.width = 150; // Width of the button
    this.height = 30; // Height of the button
    this.label = label; // Label displayed on the button
    
    // Determine the index of the sound based on the label
    this.soundIndex = this.label === "Sound 1" ? 0 : this.label === "Sound 2" ? 1 : 2;
    
    // Function to draw the button on the canvas
    this.draw = function() {
        fill(200);// Set fill color for button background
        rect(this.x, this.y, this.width, this.height); // Draw the button rectangle
        fill(0); // Set fill color for button text
        textSize(16); // Set text size for button label
        text(this.label, this.x + 10, this.y + 20); // Draw the button label
    };
    
    // Function to check if the button is clicked
    this.hitCheck = function() {
        // Return true if mouse is within the button's bounds
        return mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height;
    };
}

// Function to change the current sound based on the selected index
function changeSound(index) {
    if (sound) {
        // Preserve the playback state
        const wasPlaying = sound.isPlaying();// Check if the current sound is playing
        sound.stop(); // Stop the current sound
        currentSoundIndex = index; // Update to the new sound
        sound = sounds[currentSoundIndex]; // Load the new sound
        
        // Resume playback if it was playing before
        if (wasPlaying) {
            sound.loop(); // Start playing the new sound
        }
    } else {
        // If no sound was previously loaded, load the new one
        currentSoundIndex = index;
        sound = sounds[currentSoundIndex];
        sound.loop(); // Start playing the new sound
    }
    
    // Update playback button state based on current sound
    controls.playbackButton.playing = sound.isPlaying();
}
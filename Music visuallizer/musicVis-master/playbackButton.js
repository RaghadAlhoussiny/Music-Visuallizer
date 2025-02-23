//displays and handles clicks on the playback button.
function PlaybackButton(){
	
	this.x = 20;
	this.y = 20;
	this.width = 20;
	this.height = 20;
    this.playing = false;

	// Flag to determine whether sound is currently playing or paused
	this.playing = false;

    // Function to draw the button icon based on the current playing state
	this.draw = function(){
		if(this.playing){
			rect(this.x, this.y, this.width/2 - 2, this.height);
			rect(this.x + (this.width/2 + 2), this.y, this.width/2 - 2, this.height);
		}
		else{	
			triangle(this.x, this.y, this.x + this.width, this.y + this.height/2, this.x, this.y+this.height);

		}
	};

	//checks for clicks on the button, starts or pauses playabck.
	//@returns true if clicked false otherwise.
	this.hitCheck = function() {
    if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
        if (sound.isPlaying()) {
            sound.pause();
            this.playing = false;
        } else {
            sound.loop();
            this.playing = true;
        }
        return true;
    }
    return false;
};

}
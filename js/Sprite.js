class Sprite {
    constructor({ position, scale = 1, imageSrc, frames = 1}) {
        this.position = position;
        this.scale = scale;
        this.frames = frames;  // Number of frames in the sprite sheet
        this.currentFrame = 0;  // Index of the current frame
        this.frameCounter = 0;  // Counter to control the frame rate
        this.frameRate = 20;    // Controls how fast the animation plays (adjust as needed)
        
        this.image = new Image();
        this.image.onload = () => {
            // Calculate frame width and height based on the loaded image
            this.frameWidth = this.image.width / this.frames;
            this.frameHeight = this.image.height;
            this.width = this.frameWidth * this.scale;
            this.height = this.frameHeight * this.scale;
            this.loaded = true;
        };
        this.image.src = imageSrc;
        this.loaded = false;
    }

    draw() {
        if (!this.loaded) return;

        // Calculate the source X position of the current frame
        const sourceX = this.currentFrame * this.frameWidth;

        ctx.drawImage(
            this.image,
            sourceX, 0, this.frameWidth, this.frameHeight, // Source
            this.position.x, this.position.y,              // Destination
            this.width, this.height  // Destination dimensions (already scaled)
        );

        // Update the frame counter
        this.frameCounter++;
        if (this.frameCounter >= this.frameRate) {
            this.currentFrame = (this.currentFrame + 1) % this.frames;  // Loop through frames
            this.frameCounter = 0;
        }
    }
}

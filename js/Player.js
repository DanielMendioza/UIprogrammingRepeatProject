class Player extends Sprite {
    constructor({ collisionBlock = [], imageSrc, frames, scale = 1, states }) {
        // Pass the scale to the parent Sprite class
        super({ position: { x: 3 * 64, y: (2 * 64) + 1 }, scale, imageSrc, frames});

        this.velocity = { x: 0, y: 0 };
        // Ensure these dimensions are set after the image is loaded
        this.width = this.frameWidth * this.scale;  // Use scaled frame width
        this.height = this.frameHeight * this.scale;  // Use scaled frame height
        this.gravity = 1;
        this.collisionBlocks = collisionBlock;

        // Initialize FSM states
        
        this.states = states;
        this.currentState = this.states.idle;
        // Initialize sides after width and height are set
        this.sides = {
            bottom: this.position.y + this.height,
        };
    }

    onGround() {
        return this.position.y + this.height >= canvas.height;
    }

    // //restart players position on level change
    // restartPositionLeft(){
    //     this.position.x = 3*64
    //     this.position.y = (4*64) + 1
    // }

    // restartPositionRight(){
    //     this.position.x = 6*64
    //     this.position.y = (2*64) + 1
    // }

    checkDoorCollision() {
        for (let door of this.doorObjects) {
            if (
                this.position.x + this.width >= door.position.x &&
                this.position.x <= door.position.x + door.width &&
                this.position.y < door.position.y + door.height &&
                this.position.y + this.height > door.position.y
            ) {
                this.teleportToNextLevel();
                break;
            }
        }
    }

    teleportToNextLevel() {
        this.levelCounter += 1; 
        loadNextLevel(this.levelCounter);
        this.position.x = 3 * 64; 
        this.position.y = (4 * 64) + 1;
    }

    handleStates() {
        if (this.velocity.y < 0) {
            this.currentState = this.states.jumping;
        } else if (this.velocity.y > 0 && !this.onGround()) {
            this.currentState = this.states.falling;
        } else if (this.controls.left || this.controls.right) {
            this.currentState = this.states.running;
        } else {
            this.currentState = this.states.idle;
        }
    }

    update() {
        this.velocity.y += this.gravity;

        // Update vertical position first
        this.position.y += this.velocity.y;

        // Update sides based on current position and scaled dimensions

        // Handle vertical collisions
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const singleBlock = this.collisionBlocks[i];

            if (this.position.x < singleBlock.position.x + singleBlock.width &&
                this.position.x + this.width > singleBlock.position.x &&
                this.position.y < singleBlock.position.y + singleBlock.height &&
                this.position.y + this.height > singleBlock.position.y) {
                if (this.velocity.y > 0) { // Falling down
                    this.position.y = singleBlock.position.y - this.height;
                    this.velocity.y = 0;
                    break;
                } else if (this.velocity.y < 0) { // Moving up
                    this.position.y = singleBlock.position.y + singleBlock.height;
                    this.velocity.y = 0;
                    break;
                }
            }
        }

        // Update horizontal position
        this.position.x += this.velocity.x;

        // Handle horizontal collisions
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const singleBlock = this.collisionBlocks[i];

            if (this.position.x < singleBlock.position.x + singleBlock.width &&
                this.position.x + this.width > singleBlock.position.x &&
                this.position.y < singleBlock.position.y + singleBlock.height &&
                this.position.y + this.height > singleBlock.position.y) {
                if (this.velocity.x > 0) { // Moving right
                    this.position.x = singleBlock.position.x - this.width - 0.01;
                    this.velocity.x = 0;
                    break;
                } else if (this.velocity.x < 0) { // Moving left
                    this.position.x = singleBlock.position.x + singleBlock.width + 0.01;
                    this.velocity.x = 0;
                    break;
                }
            }
        }

        // Ensure player doesn't go out of canvas bounds
        if (this.onGround()) {
            this.position.y = canvas.height - this.height;
            this.velocity.y = 0;
        }

        this.draw();
    }
}

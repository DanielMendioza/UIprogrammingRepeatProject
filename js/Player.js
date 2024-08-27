class Player extends Sprite {
    constructor({ passCollisionBlock = [], imageSrc, frames, scale = 0.8, states }) {
        // Pass the scale to the parent Sprite class
        super({ position: { x: 3 * 64, y: (2 * 64) + 1 }, scale, imageSrc, frames});

        this.velocity = { x: 0, y: 0 };
        this.width = this.frameWidth * this.scale; 
        this.height = this.frameHeight * this.scale; 
        this.gravity = 1;
        this.collisionObjects = passCollisionBlock.filter(Object => Object instanceof CollisionBlockObject);
        this.doorObjects = passCollisionBlock.filter(Object => Object instanceof DoorObject)
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

    checkDoorCollision() {
        for (let i = 0; i < this.doorObjects.length; i++) {
            const door = this.doorObjects[i];
    
            // Calculates player center positions
            const playerCenterX = this.position.x + (this.width / 2);
            const playerCenterY = this.position.y + (this.height / 2);
    
            // Checks if the player's center is touching the current "door"
            if (
                playerCenterX > door.position.x &&
                playerCenterX < door.position.x + door.width &&
                playerCenterY > door.position.y &&
                playerCenterY < door.position.y + door.height
            ) {
                this.teleportToNextLevel();
                return; 
            }
        }
    }

    teleportToNextLevel() {
        console.log("Teleport!!!")
        loadNextLevel();
        this.position.x = 2 * 64; 
        this.position.y = (4 * 64) + 1;
        //this.restartPositionLeft()
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

    updateLevelArray(levelArray){
        this.collisionObjects = levelArray.filter(obj => obj instanceof CollisionBlockObject);
        this.doorObjects = levelArray.filter(obj => obj instanceof DoorObject);
    }

    update() {
        this.checkDoorCollision();//doesnt break the logic if put up here
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;


        // Handle vertical collisions
        for (let i = 0; i < this.collisionObjects.length; i++) {
            const singleBlock = this.collisionObjects[i];

            if (this.position.x < singleBlock.position.x + singleBlock.width &&
                this.position.x + this.width > singleBlock.position.x &&
                this.position.y < singleBlock.position.y + singleBlock.height &&
                this.position.y + this.height > singleBlock.position.y) {
                if (this.velocity.y > 0) { // down
                    this.position.y = singleBlock.position.y - this.height;
                    this.velocity.y = 0;
                    break;
                } else if (this.velocity.y < 0) { // up
                    this.position.y = singleBlock.position.y + singleBlock.height;
                    this.velocity.y = 0;
                    break;
                }
            }
        }

        // Update horizontal position
        this.position.x += this.velocity.x;

        // Handle horizontal collisions
        for (let i = 0; i < this.collisionObjects.length; i++) {
            const singleBlock = this.collisionObjects[i];

            if (this.position.x < singleBlock.position.x + singleBlock.width &&
                this.position.x + this.width > singleBlock.position.x &&
                this.position.y < singleBlock.position.y + singleBlock.height &&
                this.position.y + this.height > singleBlock.position.y) {
                if (this.velocity.x > 0) { // Moving right
                    this.position.x = singleBlock.position.x - this.width - 0.02;
                    this.velocity.x = 0;
                    break;
                } else if (this.velocity.x < 0) { // Moving left
                    this.position.x = singleBlock.position.x + singleBlock.width + 0.02;
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
    }
}

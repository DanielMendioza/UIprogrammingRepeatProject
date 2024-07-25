class Player {
    constructor(images, scale, {
        collisionBlock = []
    }) {
        this.position = {x: (3*64),y: (7*64)};
        this.velocity = {x: 0,y: 0};

        this.spritesheet = images;
        this.width = 100 * scale;
        this.height = 100 * scale;

        this.sides = {
            bottom: this.position.y + this.height
        };//used exclusively for gravity
        this.gravity = 1;
        this.scale = scale;
        this.collisionBlocks = collisionBlock;
        console.log(this.collisionBlocks)
    }

    draw() {
        ctx.drawImage(this.spritesheet,
            this.position.x,
            this.position.y,
            this.width,
            this.height);
    }

    update() {
        //gravity applied
        if (this.position.x < 0) {//boundary with canvas
            this.position.x = 0.01
        }
        this.velocity.y += this.gravity;

        // Update vertical position firstS
        this.position.y += this.velocity.y;
        this.sides.bottom = this.position.y + this.height;

        //check for horizontal collision
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const singleBlock = this.collisionBlocks[i];
    
            // Check if there's a vertical collision
            if (this.position.x < singleBlock.position.x + singleBlock.width && 
                this.position.x + this.width > singleBlock.position.x && 
                this.position.y < singleBlock.position.y + singleBlock.height && 
                this.sides.bottom > singleBlock.position.y) {
                if (this.velocity.y > 0) { // Falling down
                    this.position.y = singleBlock.position.y - this.height; // Position player on top of the block
                    this.velocity.y = 0; // Stop vertical movement
                    break;
                } else if (this.velocity.y < 0) { // Moving up
                    this.position.y = singleBlock.position.y + singleBlock.height; // Position player below the block
                    this.velocity.y = 0; // Stop vertical movement
                    break;
                }
            }
        }
        //check for horizontal collisions
        this.position.x += this.velocity.x;

        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const singleBlock = this.collisionBlocks[i];
    
            // Check if there's a horizontal collision
            if (this.position.x < singleBlock.position.x + singleBlock.width && 
                this.position.x + this.width > singleBlock.position.x && 
                this.position.y < singleBlock.position.y + singleBlock.height && 
                this.position.y + this.height > singleBlock.position.y) {
                if (this.velocity.x > 0) { // Moving right
                    this.position.x = singleBlock.position.x - this.width - 0.01; // Position player to the left of the block
                    this.velocity.x = 0; // Stop horizontal movement
                    break;
                } else if (this.velocity.x < 0) { // Moving left
                    this.position.x = singleBlock.position.x + singleBlock.width + 0.01; // Position player to the right of the block
                    this.velocity.x = 0; // Stop horizontal movement
                    break;
                }
            }
        }
    
        // Ensure player doesn't go out of canvas bounds
        if (this.position.y + this.height > canvas.height) {
            this.position.y = canvas.height - this.height; // Position player at the bottom of the canvas
            this.velocity.y = 0; // Stop vertical movement
        }
    
    }
}

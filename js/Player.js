class Player {
    constructor(images) {
        this.position = {x: 0,y: 0};
        this.velocity = {x: 0,y: 0};

        this.spritesheet = images;
        this.width = 100;
        this.height = 100;

        this.sides = {
            bottom: this.position.y + this.height
        };
        this.gravity = 1;
    }

    draw() {
        ctx.drawImage(this.spritesheet,
            this.position.x,
            this.position.y,
            this.width,
            this.height);
    }

    update() {
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.sides.bottom = this.position.y + this.height; //always gets called for gravity collision
        if ((this.sides.bottom + this.velocity.y) < canvas.height) {
            this.position.y++;
            this.velocity.y += this.gravity;
        } else {
            this.velocity.y = 0;
        }
    }
}

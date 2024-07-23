class Sprite {
    constructor({ position, scale, imageSrc }) {
        this.position = position;
        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true;
        };
        this.image.src = imageSrc;
        this.scale = scale;
        this.loaded = false;
    }
    draw() {
        if (!this.loaded) return;
        ctx.drawImage(this.image,
            this.position.x,
            this.position.y,
            this.image.width * this.scale,
            this.image.height * this.scale);

    }
}

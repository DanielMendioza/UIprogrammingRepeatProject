class DoorObject {
  constructor({ position }) {
    this.position = position;
    this.width = 64; // Assuming door width is the same as a collision block
    this.height = 64; // Assuming door height is the same as a collision block
  }

  // Optional: Add a method to draw the door or trigger an event
  draw() {
    ctx.fillStyle = `rgba(129, 77, 35,0.5)`;
    ctx.fillRect(this.position.x,
      this.position.y,
      this.width,
      this.height);
  }
}

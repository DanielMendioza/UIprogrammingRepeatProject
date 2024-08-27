class CollisionBlockObject{
    constructor({position}){
        this.position = position
        this.width = 64
        this.height = 64
    }
    draw(){
        ctx.fillStyle = `rgba(128,128,128,0.5)`;
        ctx.fillRect(this.position.x, 
                     this.position.y,
                     this.width,
                     this.height)
    }
}
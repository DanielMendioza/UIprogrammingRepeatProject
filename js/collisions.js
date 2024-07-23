const colissionlevel1 = 
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0
,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];//layout of the main level

Array.prototype.parse2D = function(){
    const rows = [];
    //This loops through the array in steps of 16, the amount of columns
    // Output would be: 
    // [
    //   [1, 2, 3, ..., 16],
    //   [17, 18, 19, ..., 32],
    //   [33, 34, 35, ..., 48],
    //   [49, 50, 51 ... etc]
    // ]
    for (let i = 0; i < this.length; i+=16){
        //the slice method in JavaScript is used to extract a portion of an array into a new array
        //efectively "slicing the 1d Array into a 2D array of 16xZ where Z is the amount of loops"
        rows.push(this.slice(i, i+16))
    }
    return rows;
}

// Parse the collision level array into a 2D array
const parsedCollisions = colissionlevel1.parse2D()

class Collisionblock{
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

// Initialized an empty array to hold all collision blocks
const collisionBlocks = []

//console.log(parsedCollisions)  just an output to see if it prints on console

parsedCollisions.forEach((row, columnHeight)=>{
    row.forEach((symbol, rowWidth) => {
        if (symbol === 1) {// If the symbol is 1, create a new CollisionBlock at the corresponding position
            collisionBlocks.push(new Collisionblock({
                position: {
                    x: rowWidth * 64,
                    y: columnHeight * 64,
                }
            }))
        }
    })
})
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


let yellowButton = document.getElementsByClassName("YellowBtn")[0];
let blueButton = document.getElementsByClassName("BlueBtn")[0];
let redButton = document.getElementsByClassName("RedBtn")[0];
let greenButton = document.getElementsByClassName("GreenBtn")[0];


Array.prototype.CreateObjectsFrom2d = function(){
    const objects = [];//empty array to store 
    this.forEach((row, columnHeight)=>{//same function to chop the array into pieces and create a 2darray
        row.forEach((symbol, rowWidth) => {
            if (symbol === 1) {
                objects.push(new CollisionBlockObject({
                    position: {
                        x: rowWidth * 64,
                        y: columnHeight * 64,
                    }
                }))
            }
        })
    })

    return objects;
}

let collisionBlockArray = [];
// Parse the collision level array into a 2D array
parsedCollisions = colissionlevel1.parse2D()

collisionBlockArray = parsedCollisions.CreateObjectsFrom2d();
//==============================
//         End of Collision
//==============================

let playerImage = new Image();
playerImage.src = "img/orc.png";//placeholder


const keys = {
    w:{
        pressed: false,
    },
    a:{
        pressed: false,
    },
    d:{
        pressed: false,
    },
}

const player = new Player(playerImage, 1, {collisionBlock: collisionBlockArray});

const backgroundLevel1 = new Sprite({
    position: {
        x:0,
        y:0
    },
    scale: 2.13,//aproximate scaling of the background png
    imageSrc: `./img/Background.png`
})

//========================
//      End of variables
//========================


function update() {
    player.update();
    player.velocity.x = 0;
    if (keys.d.pressed) {
        player.velocity.x = 4
    } else if (keys.a.pressed) {
        player.velocity.x = -4
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //console.log("Draw");
    //console.log(player);
    backgroundLevel1.draw()
    collisionBlockArray.forEach(Collisionblock =>{
        Collisionblock.draw()
    })
    player.draw();

}
function gameloop() {
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);
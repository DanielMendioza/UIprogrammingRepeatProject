const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//buttons shown on the webpage
let yellowButton = document.getElementsByClassName("YellowBtn")[0];
let blueButton = document.getElementsByClassName("BlueBtn")[0];
let redButton = document.getElementsByClassName("RedBtn")[0];
let greenButton = document.getElementsByClassName("GreenBtn")[0];

//states
this.states = {
    idle: 'idle',
    running: 'running',
    jumping: 'jumping',
    falling: 'falling',
};

var levelCounter = 1;

//grabs the collision level array and turns it into a 2d array, and builds the collision blocks
Array.prototype.CreateObjectsFrom2d = function() {
    const objects = []; // empty array to store 
    this.forEach((row, columnHeight) => { // iterate over the 2D array
        row.forEach((symbol, rowWidth) => {
            if (symbol === 1) { // Collision block
                objects.push(new CollisionBlockObject({
                    position: {
                        x: rowWidth * 64,
                        y: columnHeight * 64,
                    }
                }));
            }
        });
    });

    return objects;
}

let collisionBlockArray = [];
// Parse the collision level array into a 2D array
switch (levelCounter) {
    case 1:
        parsedCollisions = collisionlevel1.parse2D()
        collisionBlockArray = parsedCollisions.CreateObjectsFrom2d();
        break;
    case 2:
        parsedCollisions = collisionlevel2.parse2D()
        collisionBlockArray = parsedCollisions.CreateObjectsFrom2d();
        break;

    default:
        break;
}
collisionBlockArray = parsedCollisions.CreateObjectsFrom2d();
//==============================
//         End of Collision
//==============================


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

//const player = new Player(playerImage, 1, {collisionBlock: collisionBlockArray});
const player = new Player({
    collisionBlock: collisionBlockArray, // Initialize with any collision blocks if needed
    imageSrc: './img/Punk_idle.png',
    frames: 4, // Specify the number of frames in the sprite sheet
    states,
});
console.log(player);
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

function loadNextLevel(levelCounter) {
    let parsedCollisions, collisionBlockArray, doorObjects;

    switch (levelCounter) {
        case 1:
            parsedCollisions = collisionlevel1.parse2D();
            collisionBlockArray = parsedCollisions.CreateObjectsFrom2d();
            break;
        case 2:
            parsedCollisions = collisionlevel2.parse2D();
            collisionBlockArray = parsedCollisions.CreateObjectsFrom2d();
            break;
        case 3:
            parsedCollisions = collisionlevel3.parse2D();
            collisionBlockArray = parsedCollisions.CreateObjectsFrom2d();
            break;
        default:
            console.log("No more levels!");
            return;
    }

    // Separate out door objects from collision objects
    doorObjects = collisionBlockArray.filter(obj => obj instanceof DoorObject);
    collisionBlockArray = collisionBlockArray.filter(obj => obj instanceof CollisionBlockObject);

    player.collisionBlocks = collisionBlockArray;
    player.doorObjects = doorObjects;
}

function update() {
    player.update();
    player.velocity.x = 0;
    if (keys.d.pressed) {
        player.velocity.x = 4
    } else if (keys.a.pressed) {
        player.velocity.x = -4
    }

    // if (player.position.x + player.width >= canvas.width) {
    //     player.restartPositionLeft();
    //     levelCounter++;
    // }
    // else if(player.position.x + player.width <= 0 && levelCounter > 0){
    //     player.restartPositionRight();
    //     levelCounter--;
    // }
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
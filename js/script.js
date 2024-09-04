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
            if (symbol === 2) { // Collision block
                objects.push(new DoorObject({
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

let LevelBlockArray = [];
// Parse the collision level array into a 2D array

parsedCollisions = collisionlevel1.parse2D()
LevelBlockArray = parsedCollisions.CreateObjectsFrom2d();
        
LevelBlockArray = parsedCollisions.CreateObjectsFrom2d();
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
    passCollisionBlock: LevelBlockArray,
    frames: 4,
    imageSrc: './img/Punk_idle.png',
    states,
});
console.log(player.doorObjects)
console.log(levelCounter)
// if (condition) {//player frames, idle running 
// }
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

function loadNextLevel() {
    console.log("called out")
    
    let parsedCollisions, collisionBlockArray;
    levelCounter++;
    console.log(levelCounter)
    switch (levelCounter) {
        case 1:
            parsedCollisions = collisionlevel1.parse2D();
            break;
        case 2:
            console.log("level 2 loaded!")
            parsedCollisions = collisionlevel2.parse2D();
            console.log(collisionBlockArray)
            break;
        case 3:
            parsedCollisions = collisionlevel3.parse2D();
            break;
        case 4:
            parsedCollisions = collisionlevel4.parse2D();
            break;
        default:
            console.log("No more levels!");
            console.log(levelCounter)
            return;
    }


    LevelBlockArray = [];

    collisionBlockArray = parsedCollisions.CreateObjectsFrom2d();
    LevelBlockArray = collisionBlockArray;
    player.updateLevelArray(LevelBlockArray);
}

function update() {
    player.update();
    player.velocity.x = 0;
    if (keys.d.pressed) {
        player.velocity.x = 5
    } else if (keys.a.pressed) {
        player.velocity.x = -5
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //console.log("Draw");
    //console.log(player);
    backgroundLevel1.draw()
    LevelBlockArray.forEach(Collisionblock =>{
        Collisionblock.draw()
    })
    player.draw();

}
function gameloop() {
    update();
    draw();
    loadButtonControls(player)
    window.requestAnimationFrame(gameloop);
}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);
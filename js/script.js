const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


let yellowButton = document.getElementsByClassName("YellowBtn")[0];
let blueButton = document.getElementsByClassName("BlueBtn")[0];
let redButton = document.getElementsByClassName("RedBtn")[0];
let greenButton = document.getElementsByClassName("GreenBtn")[0];

let playerImage = new Image();
playerImage.src = "img/orc.png";//placeholder

const player = new Player(playerImage);

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
    collisionBlocks.forEach(Collisionblock =>{
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
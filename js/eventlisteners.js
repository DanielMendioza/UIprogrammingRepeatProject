window.addEventListener(`keydown`, (event)=>{
    switch (event.key) {
        case `w`:
            if(player.velocity.y === 0){
                player.velocity.y = -25;
            }
            break;
        case `d`:
            player.spriteSheet = 'right';
            console.log(player.spriteSheet)
            keys.d.pressed = true;
            break;
        case `a`:
            keys.a.pressed = true;
            break;

        default:
            break;
    }
    console.log(event)
})

window.addEventListener(`keyup`, (event)=>{
    //whenever the keys A or D are not being pressed 
    switch (event.key) {
        case `d`:
            keys.d.pressed = false;
            break;
        case `a`:
            keys.a.pressed = false;
            break;
    
        default:
            break;
    }
})


function loadButtonControls(player) {
    const upButton = document.querySelector('.jump.round');
    const leftButton = document.querySelector('.blue.round');
    const rightButton = document.querySelector('.red.round');

    upButton.addEventListener('mousedown', () => {
        if (player.velocity.y === 0) {
            player.velocity.y = -25;
        }
    });

    //logic for when the thumb is down
    leftButton.addEventListener('mousedown', () => {
        keys.a.pressed = true;
    });

    rightButton.addEventListener('mousedown', () => {
        keys.d.pressed = true;
    });

    //logic for when the thumb is up
    leftButton.addEventListener('mouseup', () => {
        keys.a.pressed = false; 
        console.log(this);
    });

    rightButton.addEventListener('mouseup', () => {
        keys.d.pressed = false;
    });
}
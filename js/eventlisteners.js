window.addEventListener(`keydown`, (event)=>{
    switch (event.key) {
        case `w`:
            if(player.velocity.y === 0){
                player.velocity.y = -25;
            }
            break;
        case `d`:
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
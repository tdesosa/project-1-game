console.log('Ready For Landing');

// CREATE GAME GRID

for(let y = 15; y > 0; y--){
    $('.col-8').append(`<div class='row game-row-${y}'></div>`)
    for(let x = 1; x < 16; x++){
        const gameSquare = $('<div/>')
        gameSquare.addClass('square')
        gameSquare.addClass(`square-${x}-${y}`)
        $(`.game-row-${y}`).append(gameSquare)
    }
}

// CREATE CHARACTER AND APPLY ARROW KEY MOVEMENTS

$(`.square-8-15`).attr('id', 'lander')
$('body').keydown((event)=>{
    if(event.which == 40){
        moveDown()
    }else if(event.which == 37){
        moveLeft()
    }else if(event.which == 39){
        moveRight()
    }
    
});

const lander = {
    x: 8,
    y: 15,
    }

const moveDown = () => {
    if(lander.y <= 15 && lander.y > 1){
        const currentSquare = $('#lander');
        currentSquare.removeAttr('id');
        lander.y--;
        $(`.square-${lander.x}-${lander.y}`).attr('id', 'lander');
        console.log("moving on down");
    }
}

const moveLeft = () => {
    if(lander.x <= 15 && lander.x > 1){
        const currentSquare = $('#lander');
        currentSquare.removeAttr('id');
        lander.x--;
        $(`.square-${lander.x}-${lander.y}`).attr('id', 'lander');
    }
}

const moveRight = () => {
    if(lander.x < 15 && lander.x >= 1){
        const currentSquare = $('#lander');
        currentSquare.removeAttr('id');
        lander.x++;
        $(`.square-${lander.x}-${lander.y}`).attr('id', 'lander');
    }
}

// IMPLEMENT A TIMER
let time = 30;

const timePasses = () => {
    
    const interval = setInterval(() => {
        if(time > 0){
        time--;
        $('.metrics').text(`Timer: ${time}s`);

        console.log('timer is working');
        }
      }, 1000);
      moveObstacle();
    };

$('.startButton').on('click', () => {
    timePasses();
});

const obstacle = { 
    x: 1,
    y: 13,
}

$(`.square-1-13`).attr('id', 'obstacle')
    const moveObstacle = () => {
        const interval = setInterval(() => {
            for(let i = 1; i <= 15; i++){
                const currentObstacle = $('#obstacle');
                currentObstacle.removeAttr('id');
                obstacle.x++;
                $(`.square-${obstacle.x}-${obstacle.y}`).attr('id', 'obstacle');
                console.log("watch out");
            }
        }, 2000);   
}


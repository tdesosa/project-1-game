// CREATE GAME GRID

for(let y = 15; y > 0; y--){
 
    $('.col-10').append(`<div class='row game-row-${y}'></div>`)
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
        //moveDown()
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
$('lander').addClass('lander');

// const moveDown = () => {
//     if(lander.y <= 15 && lander.y > 1){
//         const currentSquare = $('#lander');
//         currentSquare.removeAttr('id');
//         lander.y--;
//         $(`.square-${lander.x}-${lander.y}`).attr('id', 'lander');
//         console.log("moving on down");
//     }
// }

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

// IMPLEMENT A TIMER & WIN/LOSE GAME ALERTS & COLLISION DETECTION

let time = 12;

const timePasses = () => {
    const interval = setInterval(() => {
        if(time > 0){
            time--;
            $('.timeDisplay').text(`Timer: ${time}s`).attr('id', 'timer');
            for(let i=0; i < obstacleArray.length; i++){
                moveObstacle(obstacleArray[i]);
            };
            if(time % .5 === 0){
                const yCoordinate = Math.floor(Math.random()* 12 + 3);
                new Obstacle(1, yCoordinate)
            }
            if(time % .5 === 0){
            dropLander();
            }
        }
        if($('.obstacle#lander').length > 0){
            dropLander();
            if(time <= 11){
                $('#swooshSound')[0].play();
                $('.swooshDisplay').text(`Speeding Up!`).attr('id', 'swoosh');
                setTimeout(removeSwooshDisplay, 500);
            }
        }
        else if($('.square-1-1#lander').length > 0 || $('.square-2-1#lander').length > 0 || $('.square-3-1#lander').length > 0 || $('.square-4-1#lander').length > 0 || $('.square-5-1#lander').length > 0 || $('.square-7-1#lander').length > 0 || $('.square-8-1#lander').length > 0 || $('.square-9-1#lander').length > 0 || $('.square-10-1#lander').length > 0 || $('.square-11-1#lander').length > 0 || $('.square-12-1#lander').length > 0 || $('.square-13-1#lander').length > 0 || $('.square-14-1#lander').length > 0 || $('.square-15-1#lander').length > 0){
            $('.missedTargetModal').modal()
            clearInterval(interval);
        }
        else if(time === 0){
            $('.timesUpModal').modal()
            clearInterval(interval);
        }
        else if($('.landingPad#lander').length > 0){
            $('.safeLandingModal').modal()
            clearInterval(interval);
        }
    }, 1000);
};

// START BUTTON

$('.startButton').on('click', () => {
    timePasses();
    $(`.square-6-1`).addClass('landingPad');
});

// RESTART BUTTON

$('.restartButton').on('click', () => {
    window.location.reload(true);
});

// HOW TO PLAY BUTTON

$('.howToPlayButton').on('click', () => {
    $('.howToPlayModal').modal()
});

// TIMES UP MODAL RESTART

$('.timesUpRestartBtn').on('click', () => {
    window.location.reload(true);
});

// MISSED TARGET MODAL RESTART

$('.missedTargetRestartBtn').on('click', () => {
    window.location.reload(true);
});

// CREATE OBSTACLES
const obstacleArray = [];
class Obstacle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        $(`.square-${this.x}-${this.y}`).addClass('obstacle');
        obstacleArray.push(this);
    }
} 

// STATIC IMAGES FOR WHEN PAGE LOADS

$(`.square-1-15`).attr('id', 'sun');
const newObstacleOne = new Obstacle(1, 13);
const newObstacleTwo = new Obstacle(1, 9);
const newObstacleThree = new Obstacle(1, 5);

// MOVE OBSTACLES 

moveObstacle = (newObstacle) => {
    if(newObstacle.x <= 15) {
        $(`.square-${newObstacle.x}-${newObstacle.y}`).removeClass('obstacle');
        newObstacle.x++;
        $(`.square-${newObstacle.x}-${newObstacle.y}`).addClass('obstacle');
    }
};

// LANDER DROPPING MOVEMENT

dropLander = () => {
    if(lander.y <= 15 && lander.y > 1){
        $(`.square-${lander.x}-${lander.y}`).removeAttr('id');
        lander.y--;
        $(`.square-${lander.x}-${lander.y}`).attr('id', 'lander');
    }
};

removeSwooshDisplay = () => {
    $('#swoosh').empty();
    
}




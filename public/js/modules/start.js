
var canvas = document.getElementById("canvas");
// Set canvas and app full screen
canvas.width = window.innerWidth
canvas.height = window.innerHeight
app.width = window.innerWidth
app.height = window.innerHeight

document.body.scrollTop = 0; // <-- pull the page back up to the top
document.body.style.overflow = 'hidden'; // <-- relevant addition

var PlayerOne = new Player('player-one',app,'blue',1)
var PlayerTwo = new Player('player-two',app,'red',2)

var ball = new Ball('ball',app,'black')

var player1Score = new Text('score-two',(app.width/4) * 3, app.height / 4,50,"0",app)
var player2Score = new Text('score-one',app.width / 4, app.height / 4,50,"0",app)
var startText = new Text('start',app.width/2, app.height - 50, 50,"Press 'Enter' to Start",app)
var pauseText = new Text('pause',app.width/2, app.height - 50,50,"",app)
var pauseInst = new Text('pauseInst',app.width/2, app.height - 25,25,"",app)

var state = 'START'

app.onInit = function(){

    document.addEventListener('keydown', (event) => {
        const keyName = event.key
        if(keyName == 'w')
            PlayerOne.moveUp(true)
        if(keyName == 's')
            PlayerOne.moveDown(true)
        

        if(keyName == 'ArrowUp')
            PlayerTwo.moveUp(true)
        if(keyName == 'ArrowDown')
            PlayerTwo.moveDown(true)
    })
    
    document.addEventListener('keyup', (event) => {
        const keyName = event.key
        if(keyName == 'w')
            PlayerOne.moveUp(false)
        if(keyName == 's')
            PlayerOne.moveDown(false)

        if(keyName == 'ArrowUp')
            PlayerTwo.moveUp(false)
        if(keyName == 'ArrowDown')
            PlayerTwo.moveDown(false)
        
        if(keyName == 'Enter'){
            if(state == 'START')
                state = 'GAME'
        }

        if(keyName == ' '){
            if(state == 'GAME' || state == 'PAUSE')
                this.pause()
        }

        if(keyName == 'r'){
            if(state == 'PAUSE')
                this.reset()
        }
    })
};

app.onUpdate = function(time){
    let deltatime = time / (1000/60) //Run 60 frames per second (1000ms)

    switch(state) {
        case 'START':
            break;
        
        case 'GAME':
            startText.setText("")
            gameRuning(deltatime)
            break
        
        case 'PAUSE':
            break
    }
    
};

app.pause = function(){
    if(state == 'GAME'){
        state = 'PAUSE'
        pauseText.setText("Pause")
        pauseInst.setText("press 'R' for reset")
    }
    else{
        state = 'GAME'
        pauseText.setText("")
        pauseInst.setText("")
    }
}

app.reset = function(){
    PlayerOne.reset()
    PlayerTwo.reset()
    player1Score.setText("0")
    player2Score.setText("0")
    ball.reset(true)
    state = 'START'
    pauseText.setText("")
    pauseInst.setText("")
    startText.setText("Press 'Enter' to Start")
}

function gameRuning(deltatime) {
    PlayerOne.update(deltatime)
    PlayerTwo.update(deltatime)

    ball.update(deltatime)
    player1Score.setText(ball.score.one)
    player2Score.setText(ball.score.two)

    if(collision(ball.getNode(),PlayerOne.getNode())){
        changeDirection(ball,PlayerOne,app)
    }
    if(collision(ball.getNode(),PlayerTwo.getNode())){
        changeDirection(ball,PlayerTwo,app)
    }
}

function collision(ball,player) {
    // Check for collision between ball and player
    let pTop = player.y
    let pBottom = (player.y) + player.height
    let pLeft = player.x
    let pRight = (player.x) + player.width

    let bTop = ball.y
    let bBottom = (ball.y) + ball.height
    let bLeft = ball.x
    let bRight = (ball.x) + ball.width

    // boolean for collision
    return bRight > pLeft && bTop < pBottom && bLeft < pRight && bBottom > pTop
}

// Change ball direction once it collides with player
function changeDirection(ball,player,app) {
    let collideHit = ball.getNode().y - (player.getNode().y + player.getNode().height / 2)
    collideHit = collideHit / (player.getNode().height / 2)
    let angle = (Math.PI/4) * collideHit

    let direction = -1
    if(ball.getNode().x < app.width/2){
        direction = 1
    }
    ball.velocityX = direction * ball.speed * Math.cos(angle)
    ball.velocityY = direction * ball.speed * Math.sin(angle)

    ball.speed += 0.5
}

var canvas = document.getElementById("canvas");
// Set canvas and app full screen
canvas.width = window.innerWidth
canvas.height = window.innerHeight
app.width = window.innerWidth
app.height = window.innerHeight

document.body.scrollTop = 0; // <-- pull the page back up to the top
document.body.style.overflow = 'hidden'; // <-- relevant addition

var net = new Net('net',app,'orange')

var PlayerOne = new Player('player-one',app,'blue',1)
var PlayerTwo = new Player('player-two',app,'red',2)

var roundBall = new RoundBall('roundball',app,'green')

var mainText = 50, secondText = 25;
var player1Score = new Text('score-two',(app.width/4) * 3, app.height / 4,50,"0",app)
var player2Score = new Text('score-one',app.width / 4, app.height / 4,50,"0",app)
var startText = new Text('start',app.width/2 + (mainText/2), app.height - 50, mainText,"Press 'Enter' to Start",app)
var pauseText = new Text('pause',app.width/2 + (mainText/2), app.height - 50, mainText,"",app)
var pauseInst = new Text('pauseInst',app.width/2 + (secondText/2), app.height - 25, secondText,"",app)

var state = 'START'

/**
 * Add Game Music Level1.wav
 * Created by https://juhanijunkala.com/
 */
var music = new Sound('sounds/level1.wav', true)


// Init
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
            if(state == 'START'){
                music.play() // Start Game Music
                state = 'GAME'
            }
        }

        if(keyName == ' '){
            if(state == 'GAME' || state == 'PAUSE'){
                this.pause()
            }
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
        music.pause() // Pause Game Music
        state = 'PAUSE'
        pauseText.setText("Pause")
        pauseInst.setText("press 'R' for reset")
    }
    else{
        music.play() // Resume Game Music
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
    roundBall.reset(true)
    state = 'START'
    pauseText.setText("")
    pauseInst.setText("")
    startText.setText("Press 'Enter' to Start")
}

function gameRuning(deltatime) {
    PlayerOne.update(deltatime)
    PlayerTwo.update(deltatime)

    roundBall.update(deltatime)
    player1Score.setText(roundBall.score.one)
    player2Score.setText(roundBall.score.two)

    if(collision(roundBall.getNode(),PlayerOne.getNode())){
        changeDirection(roundBall,PlayerOne,app)
    }
    if(collision(roundBall.getNode(),PlayerTwo.getNode())){
        changeDirection(roundBall,PlayerTwo,app)
    }
}

function collision(ball,player) {
    // Check for collision between ball and player
    let pTop = player.y
    let pBottom = (player.y) + player.height
    let pLeft = player.x
    let pRight = (player.x) + player.width

    let bTop = ball.y - ball.r
    let bBottom = (ball.y) + ball.r
    let bLeft = ball.x - ball.r
    let bRight = (ball.x) + ball.r

    // boolean for collision
    return bRight > pLeft && bTop < pBottom && bLeft < pRight && bBottom > pTop
}

// Change ball direction once it collides with player
function changeDirection(ball,player,app) {
    ball.playBounce() // Play Ball bounce
    let collideHit = ball.getNode().y - (player.getNode().y + player.getNode().height / 2)
    collideHit = collideHit / (player.getNode().height / 2)
    let angle = (Math.PI/4) * collideHit

    let direction = -1
    if(ball.getNode().x < app.width/2){
        direction = 1
    }
    ball.velocityX = direction * ball.speed * Math.cos(angle)
    ball.velocityY = direction * ball.speed * Math.sin(angle)

    ball.speed += 1
}
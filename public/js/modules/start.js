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
        
    })
};

app.onUpdate = function(time){
    let deltatime = time / (1000/60) //Run 60 frames per second (1000ms)

    PlayerOne.update(deltatime)
    PlayerTwo.update(deltatime)
};
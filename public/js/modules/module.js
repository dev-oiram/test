
// Node Player class
class Player {
    constructor(id,app,color,playerNum) {
        this.initialY = app.height/2
        this.speed = 8
        this.move = {
            up : false,
            down : false
        }
        let x = 0
        if(playerNum == 1) {
            x = app.width/20 - (app.width/20) // Player One position
        }
        if(playerNum == 2) {
            x = (app.width) - (app.width/20) // Player Two position
        }
        this.initial = {
            id : id,
            width  : app.width/20,
            height : app.height/4,
            x  : x,
            y  : this.initialY,
            color  : color
        }
        app.nodes.push(this.initial)
        this.node = app.getNode(this.initial.id)
    }

    reset() {
        this.node.y = this.initialY
    }

    moveUp(state) {
        this.move.up = state
    }

    moveDown(state) {
        this.move.down = state
    }

    update(delta) {
        if(this.move.up) {
            this.node.y -= this.speed * delta
         }
 
         if(this.move.down) {
            this.node.y += this.speed * delta
         }
    }

    getNode() { return this.node }
}

// Node RoundBall class
class RoundBall {
    constructor(id,app,color) {
        this.ref = app
        this.speed = 10
        this.velocityX = 7
        this.velocityY = 7
        this.initial = {
            id : id,
            r : 15, // Ball Radius
            x  : app.width/2,
            y  : app.height/2,
            color  : color,
            isball: true
        }
        app.nodes.push(this.initial)
        this.node = app.getNode(this.initial.id)

        this.score = {
            one: 0,
            two: 0
        }
    }

    reset(resetGame) {
        if(resetGame){
            this.score = {
                one: 0,
                two: 0
            }
        }
        this.node.x = this.ref.width/2
        this.node.y = this.ref.height/2
        this.speed = 10
        this.velocityX = 7
        this.velocityY = 7
        this.velocityX = -this.velocityX
    }

    update(deltatime) {
        if(deltatime < 2){
            this.node.x += this.velocityX * deltatime
            this.node.y += this.velocityY * deltatime
        }

        // Change the ball direction when collide with top and botton border
        if(this.node.y + this.node.r > this.ref.height || this.node.y - this.node.r < 0) {
            this.velocityY = -this.velocityY
        }

        // Reset Ball when collide with left or right border to set score
        if(this.node.x < 0) {
            this.score.one ++
            this.reset(false)
        }else if(this.node.x > this.ref.width) {
            this.score.two ++
            this.reset(false)
        }
    }

    getNode() { return this.node }
}


// Node text class
class Text {
    constructor(id,x,y,size,text,app) {
        this.ref = app
        this.initial = {
            id : id,
            size : size,
            x  : x,
            y  : y,
            text  : text,
            istext : true
        }
        app.nodes.push(this.initial)
        this.node = this.ref.getNode(this.initial.id)
    }

    setText(text) {
        this.node.text = text
    }

    getText() { return this.node } // Return text node
}


// Node Net class
class Net {
    constructor(id,app,color) {
        this.initial = {
            id : id,
            width  : 20,
            height : app.height,
            x  : app.width/2 - (10),
            y  : 0,
            color  : color
        }
        app.nodes.push(this.initial)
        this.node = app.getNode(this.initial.id)
    }
}

// Sound Class
class Sound {
    constructor(src,loop) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.setAttribute("loop", loop)
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    play() {
        this.sound.play()
    }

    pause() {
        this.sound.pause()
        this.sound.currentTime = 0
    }
}
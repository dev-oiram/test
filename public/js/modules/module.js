
class Player {
    constructor(id,app,color,playerNum) {
        this.speed = 5
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
            y  : app.height/2,
            color  : color
        }
        app.nodes.push(this.initial)
        this.node = app.getNode(this.initial.id)
    }

    reset() {
        this.node.y = this.initial.y
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


class Ball {
    constructor(id,app,color) {
        this.ref = app
        this.speed = 6
        this.velocityX = 6
        this.velocityY = 6
        this.initial = {
            id : id,
            width  : app.width/30,
            height : app.height/25,
            x  : app.width/2,
            y  : app.height/2,
            color  : color
        }
        app.nodes.push(this.initial)
        this.node = app.getNode(this.initial.id)
    }

    reset() {
        this.node.x = this.app.width/2
        this.node.y = this.app.height/2
        this.speed = 6
    }

    update(deltatime) {
        if(deltatime < 2){
            this.node.x += this.velocityX * deltatime
            this.node.y += this.velocityY * deltatime
        }

        // Change the ball direction when collide with top and botton border
        if(this.node.y + (this.node.height/2) > this.ref.height || this.node.y - (this.node.height/2) < 0) {
            this.velocityY = -this.velocityY
        }
    }

    getNode() { return this.node }
}
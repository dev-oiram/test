
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
const utils = require('./utils')

class Hole {
    constructor(game, x, y, radius, color,start,end,coner) {
        this.game = game;
        this.context = this.game.context;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.start = start;
        this.end = end;
        this.coner = coner;
        this.smallColor = '#3282b8'
    }

    draw() {
        //Large Hole
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, this.start, this.end, false);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();
        
        //Small Hole
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius-5, this.start, this.end, false);
        this.context.fillStyle = this.smallColor;
        this.context.fill();
        this.context.closePath();
    }

    update() {
        this.draw();
    }
}

module.exports = Hole;
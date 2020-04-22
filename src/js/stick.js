class Stick {
    constructor(game, whiteBall) {
        this.game = game;
        this.whiteBall = whiteBall;
        this.x = this.whiteBall.x;
        this.y = this.whiteBall.y;
        this.dx = 15;
        this.dy = 15;
        this.width = 10;
        this.height = 200;
        this.color = '#3282b8';
        this.context = this.game.context;
        this.rotate = 0;
        this.dRectY = 0;
        this.isForce = false;
        this.rectY = this.whiteBall.radius + 10;
    }

    draw() {
        if (this.whiteBall.velocity.x === 0 && this.whiteBall.velocity.y === 0) {
            this.x = this.whiteBall.x;
            this.y = this.whiteBall.y;
            } 

        if (this.isForce === true) {
            this.dRectY = 0.5;
        }
        if (this.isForce === false && this.rectY !== this.whiteBall.radius + 10) {
            this.dRectY = 0;
            this.rectY = this.whiteBall.radius + 10;
        }
        this.context.save();
        this.rectY += this.dRectY;
        this.context.translate(this.x, this.y);
        this.context.rotate(this.rotate);
        this.context.fillStyle = this.color;
        this.context.fillRect(-this.width / 2, this.rectY, this.width, this.height);
        this.context.restore();
    }

    update() {

        this.draw();
    }
}

module.exports = Stick;
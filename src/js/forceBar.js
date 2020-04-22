class ForceBar {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = this.game.canvas.height - 10;
        this.width = 200;
        this.height = 10;
        this.context = this.game.context;
        this.dx = 5;
        this.color = '#bbe1fa';
        this.isForce = false
    }

    draw() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        if (this.isForce && this.width < this.game.canvas.width) {
            this.width += this.dx;
        } else {
            this.width = 0;
        }

        this.draw();
    }
}

module.exports = ForceBar;
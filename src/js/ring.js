class Ring {

    constructor(game, x, y, radius, color) {
        let colors = color.slice(5, color.length - 1).split(',');
        this.r = colors[0];
        this.g = colors[1];
        this.b = colors[2];
        this.a = 0.3;
        const orinalX = x;
        const orinalY = y;
        this.game = game;
        this.context = this.game.context;
        this.x = orinalX;
        this.y = orinalY;
        
        this.radius = radius;
        this.color = `rgba(${this.r},${this.g},${this.b},${this.a})`;
        this.dRadius = 1;
        this.dOpacity = 0.01;
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.context.strokeStyle = this.color;
        this.context.stroke();
        this.context.closePath();
    }

    update() {
        if (this.a > 0) {
            this.radius += this.dRadius;
            this.a -= this.dOpacity;
        } 
        if (this.a < 0){
            this.a = 0
        }

        this.draw();
    }
}

module.exports = Ring;
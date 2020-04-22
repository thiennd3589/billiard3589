
class Table {
    constructor(game, x, y, width, height, color) {
        this.game = game;
        this.context = this.game.context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        
    }

    draw() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x,this.y,this.width,this.height);
    }

    update(){
        this.draw();
    }
}

export default Table;
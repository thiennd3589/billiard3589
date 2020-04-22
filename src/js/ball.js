const utils = require('./utils');
const Ring = require('./ring');

let hits = 0;


class Ball {
    constructor(game, x, y, radius, color, balls, stick, holes, table, lightColor) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.originalPosition = {
            x: x,
            y: y
        }
        this.velocity = {
            x: 0,
            y: 0
        };
        this.mass = 1;
        this.radius = radius;
        this.balls = balls;
        this.friction = 0.1;
        this.color = color;
        this.context = this.game.context;
        this.stick = stick;
        this.holes = holes;
        this.holeCollison = false;
        this.drop = false;
        this.table = table;
        this.rings = [];
        this.beforePostion = 0;
        this.lightColor = lightColor
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();
        //light
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius - 5, -Math.PI / 4, 0, false);
        this.context.lineWidth = 2;
        this.context.strokeStyle = this.lightColor;
        this.context.stroke();
        this.context.closePath();
    }

    update() {
        let point = document.querySelector('.number');
        let pointNumber = parseInt(point.textContent);
        //Collission Detection
        for (let i = 0; i < this.balls.length; i++) {
            if (this === this.balls[i]) continue;
            if (utils.getDistance(this.x, this.y, this.balls[i].x, this.balls[i].y) - this.radius - this.balls[i].radius < 0) {
                utils.resolveCollision(this, this.balls[i]);
            }
        }
        //Add Friction
        const velocityAngle = Math.atan(Math.abs(this.velocity.y / this.velocity.x));
        if (this.velocity.x > 0) {
            this.velocity.x -= this.friction * Math.cos(velocityAngle);
            if (this.velocity.x < 0) {
                this.velocity.x = 0
            }
        } else if (this.velocity.x < 0) {
            this.velocity.x += this.friction * Math.cos(velocityAngle);
            if (this.velocity.x > 0) {
                this.velocity.x = 0
            }
        }


        if (this.velocity.y > 0) {
            this.velocity.y -= this.friction * Math.sin(velocityAngle);
            if (this.velocity.y < 0) {
                this.velocity.y = 0
            }
        } else if (this.velocity.y < 0) {
            this.velocity.y += this.friction * Math.sin(velocityAngle);
            if (this.velocity.y > 0) {
                this.velocity.y = 0
            }
        }

        //Stick Collision
        if (!this.stick) {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        } else {
            if (this.stick.dRectY === 0) {
                this.x += this.velocity.x;
                this.y += this.velocity.y;
            }
        }

        //Holes collission
        if (this.holes) {
            for (let i = 0; i < this.holes.length; i++) {
                if (utils.getDistance(this.x, this.y, this.holes[i].x, this.holes[i].y) < this.holes[i].radius) {
                    this.holeCollison = true;
                    if (this.holes[i].coner) {
                        if (this.stick) {
                            this.velocity.x = 0;
                            this.velocity.y = 0;
                            this.x = this.originalPosition.x;
                            this.y = this.originalPosition.y;
                            point.textContent = pointNumber - 20;
                        } else {
                            point.textContent = pointNumber + 10;
                            this.drop = true;
                        }
                    } else if (utils.getDistance(this.x, this.y, this.holes[i].x, this.holes[i].y) < this.holes[i].radius - this.radius) {
                        if (this.stick) {
                            this.velocity.x = 0;
                            this.velocity.y = 0;
                            this.x = this.originalPosition.x;
                            this.y = this.originalPosition.y;
                            point.textContent = pointNumber - 20;
                        } else {
                            console.log('drop');
                            point.textContent = pointNumber + 10;
                            this.drop = true;
                        }
                    }
                    break;
                } else this.holeCollison = false;
            }

        }

        //Prevent overflow
        if (this.holeCollison) {
            this.velocity = this.velocity
        }
        else {
            if (this.x - this.radius < this.table.x || this.x + this.radius > this.table.width + this.holes[0].radius) {
                this.velocity.x = - this.velocity.x;
            }

            if (this.y - this.radius < this.table.y || this.y + this.radius > this.table.height + this.holes[0].radius) {
                this.velocity.y = - this.velocity.y;
            }
        };
        //Prevent stuck 
        if (this.x - this.radius < this.holes[0].x && this.velocity.x === 0 && this.velocity.y === 0) {
            if (this.stick) {
                this.velocity.x = 0;
                this.velocity.y = 0;
                this.x = this.originalPosition.x;
                this.y = this.originalPosition.y;
                point.textContent = pointNumber - 20;
            } else {
                point.textContent = pointNumber + 10;
                this.drop = true;
            }
        } else if (this.x + this.radius > this.table.width + this.holes[0].radius && this.velocity.x === 0 && this.velocity.y === 0) {
            if (this.stick) {
                this.velocity.x = 0;
                this.velocity.y = 0;
                this.x = this.originalPosition.x;
                this.y = this.originalPosition.y;
                point.textContent = pointNumber - 20;
            } else {
                point.textContent = pointNumber + 10;
                this.drop = true;
            }
        }

        if (this.y - this.radius < this.holes[0].x && this.velocity.x === 0 && this.velocity.y === 0) {
            if (this.stick) {
                this.velocity.x = 0;
                this.velocity.y = 0;
                this.x = this.originalPosition.x;
                this.y = this.originalPosition.y;
                point.textContent = pointNumber - 20;
            } else {
                point.textContent = pointNumber + 10;
                this.drop = true;
            }
        } else if (this.y + this.radius > this.table.height + this.holes[0].radius && this.velocity.x === 0 && this.velocity.y === 0) {
            if (this.stick) {
                this.velocity.x = 0;
                this.velocity.y = 0;
                this.x = this.originalPosition.x;
                this.y = this.originalPosition.y;
                point.textContent = pointNumber - 20;
            } else {
                point.textContent = pointNumber + 10;
                this.drop = true;
            }
        }

        //Add Ring
        if (this.rings.length !== 0) {
            for (let i = 0; i < this.rings.length; i++) {
                this.rings[i].update();
            }
            this.rings = this.rings.filter(ring => {
                return ring.a === 0 ? false : true;
            })
        }

        if (this.velocity.x !== 0 || this.velocity.y !== 0) {
            const position = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
            if (Math.abs(position - this.beforePostion) > 20) {
                this.rings.push(new Ring(this.game, this.x, this.y, this.radius, this.color))
                this.beforePostion = position
            }
        }

        this.draw();
    }
};

export default Ball;
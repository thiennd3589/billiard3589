// import utils from './utils'

// const canvas = document.querySelector('canvas')
// const c = canvas.getContext('2d')

// canvas.width = innerWidth
// canvas.height = innerHeight

// const mouse = {
//   x: innerWidth / 2,
//   y: innerHeight / 2
// }

// const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// // Event Listeners
// addEventListener('mousemove', (event) => {
//   mouse.x = event.clientX
//   mouse.y = event.clientY

// })

// addEventListener('resize', () => {
//   canvas.width = innerWidth
//   canvas.height = innerHeight

//   init()
// });

// addEventListener('click', () => {
//   const angle = getAngleBetweenMouseAndWhiteBall(mouse.x, mouse.y, ball2.x, ball2.y);
//   ball2.velocity.x = 3 * Math.cos(angle);
//   ball2.velocity.y = 3 * Math.sin(angle);
// })

// function getAngleBetweenMouseAndWhiteBall(mouseX, mouseY, whiteBallX, whiteBallY) {
//   const xDist = whiteBallX - mouseX
//   const yDist = whiteBallY - mouseY

//   const cosin = (xDist) / Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
//   return yDist > 0 ? Math.acos(cosin) : -Math.acos(cosin);
// }

// function getDistance(x1, y1, x2, y2) {
//   let xDistance = x2 - x1;
//   let yDistance = y2 - y1;
//   return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
// }

// function rotate(velocity, angle) {
//   const rotatedVelocity = {
//     x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
//     y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
//   }

//   return rotatedVelocity
// }

// function resolveCollision(particle, otherParticale) {
//   const xVelocityDiff = particle.velocity.x - otherParticale.velocity.y;
//   const yVelocityDiff = particle.velocity.y - otherParticale.velocity.y;

//   const xDist = otherParticale.x - particle.x;
//   const yDist = otherParticale.y - particle.y;

//   if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
//     const angle = -Math.atan2(yDist, xDist);

//     const m1 = particle.mass;
//     const m2 = otherParticale.mass;

//     const u1 = rotate(particle.velocity, angle);
//     const u2 = rotate(otherParticale.velocity, angle);

//     const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
//     const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

//     const vFinal1 = rotate(v1, -angle);
//     const vFinal2 = rotate(v2, -angle);

//     particle.velocity.x = vFinal1.x;
//     particle.velocity.y = vFinal1.y;

//     otherParticale.velocity.x = vFinal2.x;
//     otherParticale.velocity.y = vFinal2.y;
//   }
// }

// // Objects
// class Ball {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.velocity = {
//       x: 0,
//       y: 0
//     };
//     this.mass = 1;
//     this.radius = 30;
//   }

//   draw() {
//     c.beginPath();
//     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//     c.strokeStyle = 'blue';
//     c.stroke();
//     c.closePath();
//   }

//   update() {
//     for (let i = 0; i < balls.length; i++) {
//       if (this === balls[i]) continue;
//       if (getDistance(this.x, this.y, balls[i].x, balls[i].y) - this.radius - balls[i].radius < 0) {
//         resolveCollision(this, balls[i]);
//       }
//     }

//     this.x += this.velocity.x;
//     this.y += this.velocity.y;

//     if (this.x - this.radius < 0 || this.x + this.radius > innerWidth) {
//       this.velocity.x = - this.velocity.x;
//     };

//     if (this.y - this.radius < 0 || this.y + this.radius > innerHeight) {
//       this.velocity.y = - this.velocity.y;
//     };

//     this.draw();
//   }
// };

// class WhiteBall extends Ball {
//   constructor(x, y) {
//     super(x, y);
//   }
// }

// let balls;

// let ball2 = new WhiteBall(100, 500);

// const init = () => {
//   balls = [];
//   balls.push(ball2);

//   for (let i = 0; i < 5; i++) {
//     let x = utils.randomIntFromRange(30, canvas.width - 30)
//     let y = utils.randomIntFromRange(30, canvas.height - 30)

//     if (x === ball2.x || y === ball2.y) {
//       let x = utils.randomIntFromRange(30, canvas.width - 30)
//       let y = utils.randomIntFromRange(30, canvas.height - 30)
//     }
//     if (i !== 0) {
//       for (let j = 0; j < balls.length; j++) {
//         if (getDistance(x, y, balls[j].x, balls[j].y) - 30 * 2 < 0) {
//           x = utils.randomIntFromRange(30, canvas.width - 30)
//           y = utils.randomIntFromRange(30, canvas.height - 30)

//           j = -1;
//         }
//       }
//     }

//     balls.push(new Ball(x, y))
//   }

// };

// function animate() {
//   requestAnimationFrame(animate)
//   c.clearRect(0, 0, canvas.width, canvas.height)
//   for (let i = 0; i < balls.length; i++) {
//     balls[i].update();
//   }
// }

// init()
// animate()
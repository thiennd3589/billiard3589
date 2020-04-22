import utils from './utils';
import Ball from './ball';
import ForceBar from './forceBar';
import Stick from './stick';
import Hole from './hole';
import Table from './table';
import Sound from './sound';

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d');
const sound = new Sound('/assets/sound/stay.mp3');
const isMobie = utils.isMobile();
//Set table size

if (innerWidth > innerHeight) {
	canvas.width = innerWidth / Math.sqrt(2) + 100;
	canvas.height = canvas.width * 142 / 284;
	document.querySelector('body').style.padding = `30px`;
	document.querySelector('body').style.paddingRight = `${(innerWidth - canvas.width) / 2}px`;
	document.querySelector('.controls').style.height = `${canvas.height}px`;

} else {
	canvas.height = innerHeight / Math.sqrt(2) + 100;
	canvas.width = canvas.height * 142 / 284;
	document.querySelector('body').style.padding = `50px`;
	document.querySelector('body').style.paddingRight = `${(innerWidth - canvas.width) / 2}px`;
	document.querySelector('.controls').style.height = `${canvas.height}px`;
}

const game = {
	canvas: canvas,
	context: c
}

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
}

let balls;
let ball2;
let forceBar;
let stick;
let holes;
let table;
let point = 0;
//mobile variable
let force = false;
let angle;



// Event Listeners

addEventListener('resize', () => {
	if (innerWidth > innerHeight) {
		canvas.width = innerWidth / Math.sqrt(2) + 100;
		canvas.height = canvas.width * 142 / 284;
		document.querySelector('body').style.padding = `50px`;
		document.querySelector('body').style.paddingRight = `${(innerWidth - canvas.width) / 2}px`;
		document.querySelector('.controls').style.height = `${canvas.height}px`;

	} else {
		canvas.height = innerHeight / Math.sqrt(2) + 100;
		canvas.width = canvas.height * 142 / 284;
		document.querySelector('body').style.padding = `50px`;
		document.querySelector('body').style.paddingRight = `${(innerWidth - canvas.width) / 2}px`;
		document.querySelector('.controls').style.height = `${canvas.height}px`;

	}

	init()
});

// addEventListener('click', (event) => {
//   const angle = utils.getAngleBetweenMouseAndWhiteBall(mouse.x, mouse.y, ball2.x, ball2.y);
//   const force = distance * 0.05;
//   ball2.velocity.x = force * Math.cos(angle);
//   ball2.velocity.y = force * Math.sin(angle);
// })

if (!isMobie) {
	canvas.addEventListener('mousemove', (event) => {
		mouse.x = event.offsetX
		mouse.y = event.offsetY

		const stickPosition = utils.getPositionOfStick(ball2, stick, mouse);

		stick.rotate = stickPosition.rotateAngle;
	})


	canvas.addEventListener('mousedown', () => {
		forceBar.isForce = true;
		stick.isForce = true;
	});

	canvas.addEventListener('mouseup', () => {
		stick.isForce = false;
		forceBar.isForce = false;
		//ForceBar
		let force = forceBar.width * 0.05;
		const angle = utils.getAngleBetweenMouseAndWhiteBall(mouse.x, mouse.y, ball2.x, ball2.y);
		if (innerHeight > innerWidth) force *= 2;
		ball2.velocity.x = force * Math.cos(angle);
		ball2.velocity.y = force * Math.sin(angle);
	})
} else {
	canvas.addEventListener('click', () => {
		if (!force) {
			//Set stick position
			mouse.x = event.offsetX
			mouse.y = event.offsetY

			const stickPosition = utils.getPositionOfStick(ball2, stick, mouse);

			stick.rotate = stickPosition.rotateAngle;
			////
			forceBar.isForce = true;
			stick.isForce = true;
			angle = utils.getAngleBetweenMouseAndWhiteBall(mouse.x, mouse.y, ball2.x, ball2.y);
			force = true;
		} else {
			stick.isForce = false;
			forceBar.isForce = false;
			//ForceBar
			let forceWidth = forceBar.width * 0.05;
			if (innerHeight > innerWidth) force *= 2;
			ball2.velocity.x = forceWidth * Math.cos(angle);
			ball2.velocity.y = forceWidth * Math.sin(angle);
			force = false
		}
	})
}

//Controls event
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', () => {
	init();
})

let mute = true;
const startButton = document.querySelector('.start');
startButton.addEventListener('click', () => {
	mute = !mute;
	if (mute) {
		sound.stop();
	} else {
		sound.play();
	}
})

//Init game

const init = () => {

	sound.play();
	balls = [];
	holes = [];
	point = 0;
	const ballRadius = Math.sqrt(canvas.width * canvas.height / (474 * Math.PI));
	const holeRadius = ballRadius + 15;
	//Set border-radius for canvas
	canvas.style.borderRadius = `${holeRadius}px`
	//End
	const holeColor = '#bbe1fa';
	let coefficient;
	if (innerWidth > innerHeight) {
		coefficient = 5;
	} else {

	}
	// const tableDistance = Math.sqrt(Math.pow(holeRadius,2)-Math.pow(holeRadius-5,2)/4)*Math.sqrt(5);
	const tableDistance = holeRadius * 2;
	const tableCoordinate = {
		x: tableDistance / 2,
		y: tableDistance / 2,
		width: canvas.width - tableDistance,
		height: canvas.height - tableDistance,
	}

	table = new Table(game, tableCoordinate.x, tableCoordinate.y, tableCoordinate.width, tableCoordinate.height, '#1b262c')
	ball2 = new Ball(game, canvas.width / 2, 600, ballRadius, 'rgb(156, 188, 209)', balls, null, holes, table, 'rgb(188, 228, 255)');
	forceBar = new ForceBar(game, false);
	stick = new Stick(game, ball2);
	ball2.stick = stick;

	//Set ball position
	if (innerHeight > innerWidth) {
		ball2.x = canvas.width / 2;
		ball2.y = canvas.height - table.height / 5;
		ball2.originalPosition = {
			x: ball2.x,
			y: ball2.y
		}
		for (let i = 5; i > 0; i--) {
			for (let j = 0; j < i; j++) {
				const x = canvas.width / 2 - (i + 1) * ballRadius;
				balls.push(new Ball(game, x + ballRadius * 2 * (j + 1), 400 - ballRadius * 2 * (i + 1), ballRadius, 'rgba(15,76,117,1)', balls, null, holes, table, 'rgba(187,225,250,1)'));
			}
		}
	} else {
		ball2.x = table.width / 5;
		ball2.y = canvas.height / 2;
		ball2.originalPosition = {
			x: ball2.x,
			y: ball2.y
		}
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < i + 1; j++) {
				const y = canvas.height / 2 - (i + 3) * ballRadius;
				balls.push(new Ball(game, canvas.width - ballRadius * 2 * 10 + ballRadius * 2 * (i + 1), y + ballRadius * 2 * (j + 1), ballRadius, 'rgba(15,76,117,1)', balls, null, holes, table, 'rgba(187,225,250,1)'));
			}
		}
	}
	balls.push(ball2);

	// Set hole position 
	const pi = Math.PI;
	if (innerHeight < innerWidth) {
		holes.push(new Hole(game, holeRadius, holeRadius, holeRadius, holeColor, pi / 2, pi * 2, true));
		holes.push(new Hole(game, canvas.width - holeRadius, holeRadius, holeRadius, holeColor, pi, 5 / 2 * pi, true));
		holes.push(new Hole(game, canvas.width / 2, holeRadius, holeRadius, holeColor, pi, 2 * pi, false));
		holes.push(new Hole(game, holeRadius, canvas.height - holeRadius, holeRadius, holeColor, 0, 3 / 2 * pi, true));
		holes.push(new Hole(game, canvas.width / 2, canvas.height - holeRadius, holeRadius, holeColor, 0, pi, false));
		holes.push(new Hole(game, canvas.width - holeRadius, canvas.height - holeRadius, holeRadius, holeColor, -pi / 2, pi, true));
	} else {
		holes.push(new Hole(game, holeRadius, holeRadius, holeRadius, holeColor, pi / 2, 2 * pi, true));
		holes.push(new Hole(game, canvas.width - holeRadius, canvas.height - holeRadius, holeRadius, holeColor, -pi / 2, pi, true));
		holes.push(new Hole(game, canvas.width - holeRadius, holeRadius, holeRadius, holeColor, pi, 5 / 2 * pi, true));
		holes.push(new Hole(game, holeRadius, canvas.height - holeRadius, holeRadius, holeColor, 0, 3 / 2 * pi, true));
		holes.push(new Hole(game, holeRadius, canvas.height / 2, holeRadius, holeColor, pi / 2, 3 / 2 * pi, false));
		holes.push(new Hole(game, canvas.width - holeRadius, canvas.height / 2, holeRadius, holeColor, -pi / 2, pi / 2, false))
	}



};

//Animate
function animate() {
	requestAnimationFrame(animate)

	c.clearRect(0, 0, canvas.width, canvas.height)
	table.update();
	for (let i = 0; i < balls.length; i++) {
		balls[i].update();
	}
	forceBar.update();
	stick.update();
	for (let i = 0; i < holes.length; i++) {
		holes[i].update();
	}
	balls = balls.filter(ball => {
		return !ball.drop;
	})

}

init();
animate();

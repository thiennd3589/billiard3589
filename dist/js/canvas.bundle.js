/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/ball.js":
/*!************************!*\
  !*** ./src/js/ball.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var utils = __webpack_require__(/*! ./utils */ "./src/js/utils.js");

var Ring = __webpack_require__(/*! ./ring */ "./src/js/ring.js");

var hits = 0;

var Ball = /*#__PURE__*/function () {
  function Ball(game, x, y, radius, color, balls, stick, holes, table, lightColor) {
    _classCallCheck(this, Ball);

    this.game = game;
    this.x = x;
    this.y = y;
    this.originalPosition = {
      x: x,
      y: y
    };
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
    this.lightColor = lightColor;
  }

  _createClass(Ball, [{
    key: "draw",
    value: function draw() {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      this.context.fillStyle = this.color;
      this.context.fill();
      this.context.closePath(); //light

      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius - 5, -Math.PI / 4, 0, false);
      this.context.lineWidth = 2;
      this.context.strokeStyle = this.lightColor;
      this.context.stroke();
      this.context.closePath();
    }
  }, {
    key: "update",
    value: function update() {
      var point = document.querySelector('.number');
      var pointNumber = parseInt(point.textContent); //Collission Detection

      for (var i = 0; i < this.balls.length; i++) {
        if (this === this.balls[i]) continue;

        if (utils.getDistance(this.x, this.y, this.balls[i].x, this.balls[i].y) - this.radius - this.balls[i].radius < 0) {
          utils.resolveCollision(this, this.balls[i]);
        }
      } //Add Friction


      var velocityAngle = Math.atan(Math.abs(this.velocity.y / this.velocity.x));

      if (this.velocity.x > 0) {
        this.velocity.x -= this.friction * Math.cos(velocityAngle);

        if (this.velocity.x < 0) {
          this.velocity.x = 0;
        }
      } else if (this.velocity.x < 0) {
        this.velocity.x += this.friction * Math.cos(velocityAngle);

        if (this.velocity.x > 0) {
          this.velocity.x = 0;
        }
      }

      if (this.velocity.y > 0) {
        this.velocity.y -= this.friction * Math.sin(velocityAngle);

        if (this.velocity.y < 0) {
          this.velocity.y = 0;
        }
      } else if (this.velocity.y < 0) {
        this.velocity.y += this.friction * Math.sin(velocityAngle);

        if (this.velocity.y > 0) {
          this.velocity.y = 0;
        }
      } //Stick Collision


      if (!this.stick) {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
      } else {
        if (this.stick.dRectY === 0) {
          this.x += this.velocity.x;
          this.y += this.velocity.y;
        }
      } //Holes collission


      if (this.holes) {
        for (var _i = 0; _i < this.holes.length; _i++) {
          if (utils.getDistance(this.x, this.y, this.holes[_i].x, this.holes[_i].y) < this.holes[_i].radius) {
            this.holeCollison = true;

            if (this.holes[_i].coner) {
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
            } else if (utils.getDistance(this.x, this.y, this.holes[_i].x, this.holes[_i].y) < this.holes[_i].radius - this.radius) {
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
      } //Prevent overflow


      if (this.holeCollison) {
        this.velocity = this.velocity;
      } else {
        if (this.x - this.radius < this.table.x || this.x + this.radius > this.table.width + this.holes[0].radius) {
          this.velocity.x = -this.velocity.x;
        }

        if (this.y - this.radius < this.table.y || this.y + this.radius > this.table.height + this.holes[0].radius) {
          this.velocity.y = -this.velocity.y;
        }
      }

      ; //Prevent stuck 

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
      } //Add Ring


      if (this.rings.length !== 0) {
        for (var _i2 = 0; _i2 < this.rings.length; _i2++) {
          this.rings[_i2].update();
        }

        this.rings = this.rings.filter(function (ring) {
          return ring.a === 0 ? false : true;
        });
      }

      if (this.velocity.x !== 0 || this.velocity.y !== 0) {
        var position = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));

        if (Math.abs(position - this.beforePostion) > 20) {
          this.rings.push(new Ring(this.game, this.x, this.y, this.radius, this.color));
          this.beforePostion = position;
        }
      }

      this.draw();
    }
  }]);

  return Ball;
}();

;
/* harmony default export */ __webpack_exports__["default"] = (Ball);

/***/ }),

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ball */ "./src/js/ball.js");
/* harmony import */ var _forceBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./forceBar */ "./src/js/forceBar.js");
/* harmony import */ var _forceBar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_forceBar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stick__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stick */ "./src/js/stick.js");
/* harmony import */ var _stick__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_stick__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hole__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hole */ "./src/js/hole.js");
/* harmony import */ var _hole__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_hole__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./table */ "./src/js/table.js");
/* harmony import */ var _sound__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sound */ "./src/js/sound.js");
/* harmony import */ var _sound__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_sound__WEBPACK_IMPORTED_MODULE_6__);







var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var sound = new _sound__WEBPACK_IMPORTED_MODULE_6___default.a('/assets/sound/stay.mp3');
var isMobie = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.isMobile(); //Set table size

if (innerWidth > innerHeight) {
  canvas.width = innerWidth / Math.sqrt(2) + 100;
  canvas.height = canvas.width * 142 / 284;
  document.querySelector('body').style.padding = "30px";
  document.querySelector('body').style.paddingRight = "".concat((innerWidth - canvas.width) / 2, "px");
  document.querySelector('.controls').style.height = "".concat(canvas.height, "px");
} else {
  canvas.height = innerHeight / Math.sqrt(2) + 100;
  canvas.width = canvas.height * 142 / 284;
  document.querySelector('body').style.padding = "50px";
  document.querySelector('body').style.paddingRight = "".concat((innerWidth - canvas.width) / 2, "px");
  document.querySelector('.controls').style.height = "".concat(canvas.height, "px");
}

var game = {
  canvas: canvas,
  context: c
};
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};
var balls;
var ball2;
var forceBar;
var stick;
var holes;
var table;
var point = 0; //mobile variable

var force = false;
var angle; // Event Listeners

addEventListener('resize', function () {
  if (innerWidth > innerHeight) {
    canvas.width = innerWidth / Math.sqrt(2) + 100;
    canvas.height = canvas.width * 142 / 284;
    document.querySelector('body').style.padding = "50px";
    document.querySelector('body').style.paddingRight = "".concat((innerWidth - canvas.width) / 2, "px");
    document.querySelector('.controls').style.height = "".concat(canvas.height, "px");
  } else {
    canvas.height = innerHeight / Math.sqrt(2) + 100;
    canvas.width = canvas.height * 142 / 284;
    document.querySelector('body').style.padding = "50px";
    document.querySelector('body').style.paddingRight = "".concat((innerWidth - canvas.width) / 2, "px");
    document.querySelector('.controls').style.height = "".concat(canvas.height, "px");
  }

  init();
}); // addEventListener('click', (event) => {
//   const angle = utils.getAngleBetweenMouseAndWhiteBall(mouse.x, mouse.y, ball2.x, ball2.y);
//   const force = distance * 0.05;
//   ball2.velocity.x = force * Math.cos(angle);
//   ball2.velocity.y = force * Math.sin(angle);
// })

if (!isMobie) {
  canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
    var stickPosition = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.getPositionOfStick(ball2, stick, mouse);
    stick.rotate = stickPosition.rotateAngle;
  });
  canvas.addEventListener('mousedown', function () {
    forceBar.isForce = true;
    stick.isForce = true;
  });
  canvas.addEventListener('mouseup', function () {
    stick.isForce = false;
    forceBar.isForce = false; //ForceBar

    var force = forceBar.width * 0.05;
    var angle = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.getAngleBetweenMouseAndWhiteBall(mouse.x, mouse.y, ball2.x, ball2.y);
    if (innerHeight > innerWidth) force *= 2;
    ball2.velocity.x = force * Math.cos(angle);
    ball2.velocity.y = force * Math.sin(angle);
  });
} else {
  canvas.addEventListener('click', function () {
    if (!force) {
      //Set stick position
      mouse.x = event.offsetX;
      mouse.y = event.offsetY;
      var stickPosition = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.getPositionOfStick(ball2, stick, mouse);
      stick.rotate = stickPosition.rotateAngle; ////

      forceBar.isForce = true;
      stick.isForce = true;
      angle = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.getAngleBetweenMouseAndWhiteBall(mouse.x, mouse.y, ball2.x, ball2.y);
      force = true;
    } else {
      stick.isForce = false;
      forceBar.isForce = false; //ForceBar

      var forceWidth = forceBar.width * 0.05;
      if (innerHeight > innerWidth) force *= 2;
      ball2.velocity.x = forceWidth * Math.cos(angle);
      ball2.velocity.y = forceWidth * Math.sin(angle);
      force = false;
    }
  });
} //Controls event


var restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', function () {
  init();
});
var mute = true;
var startButton = document.querySelector('.start');
startButton.addEventListener('click', function () {
  mute = !mute;

  if (mute) {
    sound.stop();
  } else {
    sound.play();
  }
}); //Init game

var init = function init() {
  sound.play();
  balls = [];
  holes = [];
  point = 0;
  var ballRadius = Math.sqrt(canvas.width * canvas.height / (474 * Math.PI));
  var holeRadius = ballRadius + 15; //Set border-radius for canvas

  canvas.style.borderRadius = "".concat(holeRadius, "px"); //End

  var holeColor = '#bbe1fa';
  var coefficient;

  if (innerWidth > innerHeight) {
    coefficient = 5;
  } else {} // const tableDistance = Math.sqrt(Math.pow(holeRadius,2)-Math.pow(holeRadius-5,2)/4)*Math.sqrt(5);


  var tableDistance = holeRadius * 2;
  var tableCoordinate = {
    x: tableDistance / 2,
    y: tableDistance / 2,
    width: canvas.width - tableDistance,
    height: canvas.height - tableDistance
  };
  table = new _table__WEBPACK_IMPORTED_MODULE_5__["default"](game, tableCoordinate.x, tableCoordinate.y, tableCoordinate.width, tableCoordinate.height, '#1b262c');
  ball2 = new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](game, canvas.width / 2, 600, ballRadius, 'rgb(156, 188, 209)', balls, null, holes, table, 'rgb(188, 228, 255)');
  forceBar = new _forceBar__WEBPACK_IMPORTED_MODULE_2___default.a(game, false);
  stick = new _stick__WEBPACK_IMPORTED_MODULE_3___default.a(game, ball2);
  ball2.stick = stick; //Set ball position

  if (innerHeight > innerWidth) {
    ball2.x = canvas.width / 2;
    ball2.y = canvas.height - table.height / 5;
    ball2.originalPosition = {
      x: ball2.x,
      y: ball2.y
    };

    for (var i = 5; i > 0; i--) {
      for (var j = 0; j < i; j++) {
        var x = canvas.width / 2 - (i + 1) * ballRadius;
        balls.push(new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](game, x + ballRadius * 2 * (j + 1), 400 - ballRadius * 2 * (i + 1), ballRadius, 'rgba(15,76,117,1)', balls, null, holes, table, 'rgba(187,225,250,1)'));
      }
    }
  } else {
    ball2.x = table.width / 5;
    ball2.y = canvas.height / 2;
    ball2.originalPosition = {
      x: ball2.x,
      y: ball2.y
    };

    for (var _i = 0; _i < 5; _i++) {
      for (var _j = 0; _j < _i + 1; _j++) {
        var y = canvas.height / 2 - (_i + 3) * ballRadius;
        balls.push(new _ball__WEBPACK_IMPORTED_MODULE_1__["default"](game, canvas.width - ballRadius * 2 * 10 + ballRadius * 2 * (_i + 1), y + ballRadius * 2 * (_j + 1), ballRadius, 'rgba(15,76,117,1)', balls, null, holes, table, 'rgba(187,225,250,1)'));
      }
    }
  }

  balls.push(ball2); // Set hole position 

  var pi = Math.PI;

  if (innerHeight < innerWidth) {
    holes.push(new _hole__WEBPACK_IMPORTED_MODULE_4___default.a(game, holeRadius, holeRadius, holeRadius, holeColor, pi / 2, pi * 2, true));
    holes.push(new _hole__WEBPACK_IMPORTED_MODULE_4___default.a(game, canvas.width - holeRadius, holeRadius, holeRadius, holeColor, pi, 5 / 2 * pi, true));
    holes.push(new _hole__WEBPACK_IMPORTED_MODULE_4___default.a(game, canvas.width / 2, holeRadius, holeRadius, holeColor, pi, 2 * pi, false));
    holes.push(new _hole__WEBPACK_IMPORTED_MODULE_4___default.a(game, holeRadius, canvas.height - holeRadius, holeRadius, holeColor, 0, 3 / 2 * pi, true));
    holes.push(new _hole__WEBPACK_IMPORTED_MODULE_4___default.a(game, canvas.width / 2, canvas.height - holeRadius, holeRadius, holeColor, 0, pi, false));
    holes.push(new _hole__WEBPACK_IMPORTED_MODULE_4___default.a(game, canvas.width - holeRadius, canvas.height - holeRadius, holeRadius, holeColor, -pi / 2, pi, true));
  } else {
    holes.push(new _hole__WEBPACK_IMPORTED_MODULE_4___default.a(game, holeRadius, holeRadius, holeRadius, holeColor, pi / 2, 2 * pi, true));
    holes.push(new _hole__WEBPACK_IMPORTED_MODULE_4___default.a(game, canvas.width - holeRadius, canvas.height - holeRadius, holeRadius, holeColor, -pi / 2, pi, true));
    holes.push(new _hole__WEBPACK_IMPORTED_MODULE_4___default.a(game, canvas.width - holeRadius, holeRadius, holeRadius, holeColor, pi, 5 / 2 * pi, true));
    holes.push(new _hole__WEBPACK_IMPORTED_MODULE_4___default.a(game, holeRadius, canvas.height - holeRadius, holeRadius, holeColor, 0, 3 / 2 * pi, true));
    holes.push(new _hole__WEBPACK_IMPORTED_MODULE_4___default.a(game, holeRadius, canvas.height / 2, holeRadius, holeColor, pi / 2, 3 / 2 * pi, false));
    holes.push(new _hole__WEBPACK_IMPORTED_MODULE_4___default.a(game, canvas.width - holeRadius, canvas.height / 2, holeRadius, holeColor, -pi / 2, pi / 2, false));
  }
}; //Animate


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  table.update();

  for (var i = 0; i < balls.length; i++) {
    balls[i].update();
  }

  forceBar.update();
  stick.update();

  for (var _i2 = 0; _i2 < holes.length; _i2++) {
    holes[_i2].update();
  }

  balls = balls.filter(function (ball) {
    return !ball.drop;
  });
}

init();
animate();

/***/ }),

/***/ "./src/js/forceBar.js":
/*!****************************!*\
  !*** ./src/js/forceBar.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ForceBar = /*#__PURE__*/function () {
  function ForceBar(game) {
    _classCallCheck(this, ForceBar);

    this.game = game;
    this.x = 0;
    this.y = this.game.canvas.height - 10;
    this.width = 200;
    this.height = 10;
    this.context = this.game.context;
    this.dx = 5;
    this.color = '#bbe1fa';
    this.isForce = false;
  }

  _createClass(ForceBar, [{
    key: "draw",
    value: function draw() {
      this.context.fillStyle = this.color;
      this.context.fillRect(this.x, this.y, this.width, this.height);
    }
  }, {
    key: "update",
    value: function update() {
      if (this.isForce && this.width < this.game.canvas.width) {
        this.width += this.dx;
      } else {
        this.width = 0;
      }

      this.draw();
    }
  }]);

  return ForceBar;
}();

module.exports = ForceBar;

/***/ }),

/***/ "./src/js/hole.js":
/*!************************!*\
  !*** ./src/js/hole.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var utils = __webpack_require__(/*! ./utils */ "./src/js/utils.js");

var Hole = /*#__PURE__*/function () {
  function Hole(game, x, y, radius, color, start, end, coner) {
    _classCallCheck(this, Hole);

    this.game = game;
    this.context = this.game.context;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.start = start;
    this.end = end;
    this.coner = coner;
    this.smallColor = '#3282b8';
  }

  _createClass(Hole, [{
    key: "draw",
    value: function draw() {
      //Large Hole
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, this.start, this.end, false);
      this.context.fillStyle = this.color;
      this.context.fill();
      this.context.closePath(); //Small Hole

      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius - 5, this.start, this.end, false);
      this.context.fillStyle = this.smallColor;
      this.context.fill();
      this.context.closePath();
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
    }
  }]);

  return Hole;
}();

module.exports = Hole;

/***/ }),

/***/ "./src/js/ring.js":
/*!************************!*\
  !*** ./src/js/ring.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ring = /*#__PURE__*/function () {
  function Ring(game, x, y, radius, color) {
    _classCallCheck(this, Ring);

    var colors = color.slice(5, color.length - 1).split(',');
    this.r = colors[0];
    this.g = colors[1];
    this.b = colors[2];
    this.a = 0.3;
    var orinalX = x;
    var orinalY = y;
    this.game = game;
    this.context = this.game.context;
    this.x = orinalX;
    this.y = orinalY;
    this.radius = radius;
    this.color = "rgba(".concat(this.r, ",").concat(this.g, ",").concat(this.b, ",").concat(this.a, ")");
    this.dRadius = 1;
    this.dOpacity = 0.01;
  }

  _createClass(Ring, [{
    key: "draw",
    value: function draw() {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      this.context.strokeStyle = this.color;
      this.context.stroke();
      this.context.closePath();
    }
  }, {
    key: "update",
    value: function update() {
      if (this.a > 0) {
        this.radius += this.dRadius;
        this.a -= this.dOpacity;
      }

      if (this.a < 0) {
        this.a = 0;
      }

      this.draw();
    }
  }]);

  return Ring;
}();

module.exports = Ring;

/***/ }),

/***/ "./src/js/sound.js":
/*!*************************!*\
  !*** ./src/js/sound.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sound = /*#__PURE__*/function () {
  function Sound(src) {
    _classCallCheck(this, Sound);

    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }

  _createClass(Sound, [{
    key: "play",
    value: function play() {
      this.sound.play();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.sound.pause();
    }
  }]);

  return Sound;
}();

module.exports = Sound;

/***/ }),

/***/ "./src/js/stick.js":
/*!*************************!*\
  !*** ./src/js/stick.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Stick = /*#__PURE__*/function () {
  function Stick(game, whiteBall) {
    _classCallCheck(this, Stick);

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

  _createClass(Stick, [{
    key: "draw",
    value: function draw() {
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
  }, {
    key: "update",
    value: function update() {
      this.draw();
    }
  }]);

  return Stick;
}();

module.exports = Stick;

/***/ }),

/***/ "./src/js/table.js":
/*!*************************!*\
  !*** ./src/js/table.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Table = /*#__PURE__*/function () {
  function Table(game, x, y, width, height, color) {
    _classCallCheck(this, Table);

    this.game = game;
    this.context = this.game.context;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  _createClass(Table, [{
    key: "draw",
    value: function draw() {
      this.context.fillStyle = this.color;
      this.context.fillRect(this.x, this.y, this.width, this.height);
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
    }
  }]);

  return Table;
}();

/* harmony default export */ __webpack_exports__["default"] = (Table);

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function isMobile() {
  var check = false;

  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
}

;

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getPositionOfStick(whiteBall, stick, mouse) {
  var angle = getAngleBetweenMouseAndWhiteBall(mouse.x, mouse.y, whiteBall.x, whiteBall.y);
  var rotateAngle = 0;

  if (angle > 0) {
    rotateAngle = Math.PI / 2 + angle;
  } else if (angle < 0) {
    var beta = Math.PI / 2 - Math.PI - angle;
    rotateAngle = 2 * Math.PI - beta;
  }

  var distance = whiteBall.radius;
  var stickPosition = {
    dist: distance,
    rotateAngle: rotateAngle
  };
  return stickPosition;
}

function getAngleBetweenMouseAndWhiteBall(mouseX, mouseY, whiteBallX, whiteBallY) {
  var xDist = whiteBallX - mouseX;
  var yDist = whiteBallY - mouseY;
  var cosin = xDist / Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
  return yDist > 0 ? Math.acos(cosin) : -Math.acos(cosin);
}

function getDistance(x1, y1, x2, y2) {
  var xDistance = x2 - x1;
  var yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function rotate(velocity, angle) {
  var rotatedVelocity = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };
  return rotatedVelocity;
}

function resolveCollision(particle, otherParticale) {
  var xVelocityDiff = particle.velocity.x - otherParticale.velocity.y;
  var yVelocityDiff = particle.velocity.y - otherParticale.velocity.y;
  var xDist = otherParticale.x - particle.x;
  var yDist = otherParticale.y - particle.y;

  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    var angle = -Math.atan2(yDist, xDist);
    var m1 = particle.mass;
    var m2 = otherParticale.mass;
    var u1 = rotate(particle.velocity, angle);
    var u2 = rotate(otherParticale.velocity, angle);
    var v1 = {
      x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
      y: u1.y
    };
    var v2 = {
      x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
      y: u2.y
    };
    var vFinal1 = rotate(v1, -angle);
    var vFinal2 = rotate(v2, -angle);
    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;
    otherParticale.velocity.x = vFinal2.x;
    otherParticale.velocity.y = vFinal2.y;
  }
}

module.exports = {
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  getAngleBetweenMouseAndWhiteBall: getAngleBetweenMouseAndWhiteBall,
  getDistance: getDistance,
  resolveCollision: resolveCollision,
  getPositionOfStick: getPositionOfStick,
  isMobile: isMobile
};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map
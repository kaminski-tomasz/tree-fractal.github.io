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
/******/ 	return __webpack_require__(__webpack_require__.s = "../node_modules/ts-loader/index.js?!./app/tree-fractal/tree-fractal.worker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/ts-loader/index.js?!./app/tree-fractal/tree-fractal.worker.ts":
/*!***********************************************************************************!*\
  !*** ../node_modules/ts-loader??ref--3!./app/tree-fractal/tree-fractal.worker.ts ***!
  \***********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tree_fractal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tree-fractal */ "./app/tree-fractal/tree-fractal.ts");
/* harmony import */ var _screen_canvas_painter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../screen/canvas-painter */ "./app/screen/canvas-painter.ts");


class TreeFractalWorker {
    constructor() {
        this.ctx = self;
        this.ctx.addEventListener('message', (event) => {
            switch (event.data.msg) {
                case 'init':
                    this.initTreeFractal(event);
                    break;
                case 'draw':
                    this.drawTreeFractal(event);
                    break;
            }
        });
    }
    initTreeFractal(event) {
        this.getCanvas(event);
        this.createCanvasPainter();
        this.createTreeFractal();
        this.drawTreeFractal(event);
    }
    getCanvas(event) {
        this.canvas = event.data.canvas;
        if (event.data.width && event.data.height) {
            this.resizeCanvas(event.data.width, event.data.height);
        }
    }
    resizeCanvas(width, height) {
        if (this.canvas.width !== width ||
            this.canvas.height !== height) {
            this.canvas.width = width;
            this.canvas.height = height;
        }
    }
    drawTreeFractal(event) {
        const tree = event.data.tree;
        if (this.treeFractal) {
            const [width, height] = [event.data.width, event.data.height];
            if (width && height) {
                this.resizeCanvas(width, height);
                this.treeFractal.resize(width, height);
                this.canvasPainter.resize(width, height);
            }
            requestAnimationFrame(() => this.treeFractal.draw(tree));
        }
    }
    createTreeFractal() {
        this.treeFractal = new _tree_fractal__WEBPACK_IMPORTED_MODULE_0__["TreeFractal"](this.canvasPainter, this.canvas.width, this.canvas.height, () => this.notifyDrawingFinished());
    }
    createCanvasPainter() {
        this.canvasPainter = new _screen_canvas_painter__WEBPACK_IMPORTED_MODULE_1__["CanvasPainter"](this.canvas.getContext('2d'), this.canvas.width, this.canvas.height);
    }
    notifyDrawingFinished() {
        this.ctx.postMessage({ msg: 'finished' });
    }
}
new TreeFractalWorker();


/***/ }),

/***/ "./app/screen/canvas-painter.ts":
/*!**************************************!*\
  !*** ./app/screen/canvas-painter.ts ***!
  \**************************************/
/*! exports provided: CanvasPainter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasPainter", function() { return CanvasPainter; });
class CanvasPainter {
    constructor(canvasCtx, canvasWidth, canvasHeight) {
        this.canvasCtx = canvasCtx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }
    resize(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }
    drawLine(x1, y1, x2, y2, color = "#FFFFFF") {
        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(x1, y1);
        this.canvasCtx.lineTo(x2, y2);
        this.canvasCtx.strokeStyle = color;
        this.canvasCtx.stroke();
        this.canvasCtx.closePath();
    }
    setLineWidth(width) {
        this.canvasCtx.lineWidth = width;
    }
    clearScreen(color) {
        this.canvasCtx.fillStyle = color;
        this.canvasCtx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
}


/***/ }),

/***/ "./app/tree-fractal/tree-fractal.ts":
/*!******************************************!*\
  !*** ./app/tree-fractal/tree-fractal.ts ***!
  \******************************************/
/*! exports provided: TreeFractal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeFractal", function() { return TreeFractal; });
/* harmony import */ var _turtle_turtle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../turtle/turtle */ "./app/turtle/turtle.ts");

class TreeFractal {
    constructor(screenPainter, screenWidth, screenHeight, drawFinished = () => { }) {
        this.screenPainter = screenPainter;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.drawFinished = drawFinished;
        this.turtle = this.createTurtle();
    }
    resize(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.turtle = this.createTurtle();
    }
    draw(tree) {
        this.setModel(tree);
        this.clearScreen();
        this.resetTurtle();
        this.drawTree(this.getInitialSize() * tree.root, tree.depth);
        this.drawFinished();
    }
    createTurtle() {
        return new _turtle_turtle__WEBPACK_IMPORTED_MODULE_0__["Turtle"](this.screenPainter, [
            this.screenWidth / 3,
            this.screenHeight / 2 + this.getInitialSize()
        ]);
    }
    setModel(tree) {
        this.tree = tree;
    }
    drawTree(length, level) {
        if (level > 0) {
            this.turtle.move(length);
            this.drawBranches(length, level);
            this.setBranchWidth(level);
            this.setBranchColor(level);
            this.turtle.show();
            this.turtle.move(-length);
            this.turtle.hide();
        }
    }
    setBranchWidth(level) {
        const maxWidth = Math.min(10, this.getInitialSize() / 15);
        const width = maxWidth * level / this.tree.depth;
        this.turtle.setLineWidth(width);
    }
    setBranchColor(level) {
        const minFraction = 0.06;
        const opacity = minFraction + (1 - minFraction) * (level / this.tree.depth);
        const branchColor = `rgba(255, 255, 255, ${opacity})`;
        this.turtle.setColor(branchColor);
    }
    drawBranches(length, level) {
        [
            [this.tree.angle1, this.tree.grow1],
            [this.tree.angle2, this.tree.grow2]
        ].forEach(([angle, grow]) => {
            this.turtle.turn(angle);
            this.drawTree(grow * length, level - 1);
            this.turtle.turn(-angle);
        });
    }
    getInitialSize() {
        return this.screenHeight / 6;
    }
    clearScreen() {
        this.turtle.clear();
    }
    resetTurtle() {
        this.turtle.reset();
        this.turtle.hide();
        this.turtle.turn(-90);
        this.turtle.move(this.getInitialSize() * this.tree.root);
        this.turtle.turn(180);
    }
}


/***/ }),

/***/ "./app/turtle/turtle.ts":
/*!******************************!*\
  !*** ./app/turtle/turtle.ts ***!
  \******************************/
/*! exports provided: Turtle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Turtle", function() { return Turtle; });
class Turtle {
    constructor(painter, start) {
        this.painter = painter;
        this.start = start;
        this.drawing = true;
        this.color = "#FFFFFF";
        this.angle = 0;
        this.reset();
    }
    reset() {
        this.position = this.start;
        this.angle = 0;
    }
    show() {
        this.drawing = true;
    }
    hide() {
        this.drawing = false;
    }
    turn(degrees) {
        const radians = degrees * Math.PI / 180;
        this.angle = this.angle - radians;
    }
    move(distance) {
        const [x, y] = this.position;
        const [nextX, nextY] = this.nextPosition(distance);
        if (this.drawing) {
            this.painter.drawLine(x, y, nextX, nextY, this.color);
        }
        this.position = [nextX, nextY];
    }
    setColor(color) {
        this.color = color;
    }
    setLineWidth(width) {
        this.painter.setLineWidth(width);
    }
    clear(color = "#000000") {
        this.painter.clearScreen(color);
    }
    nextPosition(distance) {
        const [x, y] = this.position;
        return [
            x + distance * Math.cos(this.angle),
            y + distance * Math.sin(this.angle),
        ];
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL3RyZWUtZnJhY3RhbC90cmVlLWZyYWN0YWwud29ya2VyLnRzIiwid2VicGFjazovLy8uL2FwcC9zY3JlZW4vY2FudmFzLXBhaW50ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3RyZWUtZnJhY3RhbC90cmVlLWZyYWN0YWwudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3R1cnRsZS90dXJ0bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBNkM7QUFDWTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHlEQUFXO0FBQzFDO0FBQ0E7QUFDQSxpQ0FBaUMsb0VBQWE7QUFDOUM7QUFDQTtBQUNBLDhCQUE4QixrQkFBa0I7QUFDaEQ7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDekRBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDekJBO0FBQUE7QUFBQTtBQUEwQztBQUNuQztBQUNQLGdGQUFnRixFQUFFO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFEQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsUUFBUTtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzRUE7QUFBQTtBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJmNjczYWI2NTlhM2IzZTAwODEzOC53b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuLi9ub2RlX21vZHVsZXMvdHMtbG9hZGVyL2luZGV4LmpzPyEuL2FwcC90cmVlLWZyYWN0YWwvdHJlZS1mcmFjdGFsLndvcmtlci50c1wiKTtcbiIsImltcG9ydCB7IFRyZWVGcmFjdGFsIH0gZnJvbSBcIi4vdHJlZS1mcmFjdGFsXCI7XG5pbXBvcnQgeyBDYW52YXNQYWludGVyIH0gZnJvbSBcIi4uL3NjcmVlbi9jYW52YXMtcGFpbnRlclwiO1xuY2xhc3MgVHJlZUZyYWN0YWxXb3JrZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmN0eCA9IHNlbGY7XG4gICAgICAgIHRoaXMuY3R4LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQuZGF0YS5tc2cpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdpbml0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0VHJlZUZyYWN0YWwoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdkcmF3JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VHJlZUZyYWN0YWwoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGluaXRUcmVlRnJhY3RhbChldmVudCkge1xuICAgICAgICB0aGlzLmdldENhbnZhcyhldmVudCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQ2FudmFzUGFpbnRlcigpO1xuICAgICAgICB0aGlzLmNyZWF0ZVRyZWVGcmFjdGFsKCk7XG4gICAgICAgIHRoaXMuZHJhd1RyZWVGcmFjdGFsKGV2ZW50KTtcbiAgICB9XG4gICAgZ2V0Q2FudmFzKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZXZlbnQuZGF0YS5jYW52YXM7XG4gICAgICAgIGlmIChldmVudC5kYXRhLndpZHRoICYmIGV2ZW50LmRhdGEuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUNhbnZhcyhldmVudC5kYXRhLndpZHRoLCBldmVudC5kYXRhLmhlaWdodCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzaXplQ2FudmFzKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FudmFzLndpZHRoICE9PSB3aWR0aCB8fFxuICAgICAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ICE9PSBoZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZHJhd1RyZWVGcmFjdGFsKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRyZWUgPSBldmVudC5kYXRhLnRyZWU7XG4gICAgICAgIGlmICh0aGlzLnRyZWVGcmFjdGFsKSB7XG4gICAgICAgICAgICBjb25zdCBbd2lkdGgsIGhlaWdodF0gPSBbZXZlbnQuZGF0YS53aWR0aCwgZXZlbnQuZGF0YS5oZWlnaHRdO1xuICAgICAgICAgICAgaWYgKHdpZHRoICYmIGhlaWdodCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplQ2FudmFzKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJlZUZyYWN0YWwucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzUGFpbnRlci5yZXNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy50cmVlRnJhY3RhbC5kcmF3KHRyZWUpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjcmVhdGVUcmVlRnJhY3RhbCgpIHtcbiAgICAgICAgdGhpcy50cmVlRnJhY3RhbCA9IG5ldyBUcmVlRnJhY3RhbCh0aGlzLmNhbnZhc1BhaW50ZXIsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQsICgpID0+IHRoaXMubm90aWZ5RHJhd2luZ0ZpbmlzaGVkKCkpO1xuICAgIH1cbiAgICBjcmVhdGVDYW52YXNQYWludGVyKCkge1xuICAgICAgICB0aGlzLmNhbnZhc1BhaW50ZXIgPSBuZXcgQ2FudmFzUGFpbnRlcih0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG4gICAgbm90aWZ5RHJhd2luZ0ZpbmlzaGVkKCkge1xuICAgICAgICB0aGlzLmN0eC5wb3N0TWVzc2FnZSh7IG1zZzogJ2ZpbmlzaGVkJyB9KTtcbiAgICB9XG59XG5uZXcgVHJlZUZyYWN0YWxXb3JrZXIoKTtcbiIsImV4cG9ydCBjbGFzcyBDYW52YXNQYWludGVyIHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXNDdHgsIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQpIHtcbiAgICAgICAgdGhpcy5jYW52YXNDdHggPSBjYW52YXNDdHg7XG4gICAgICAgIHRoaXMuY2FudmFzV2lkdGggPSBjYW52YXNXaWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXNIZWlnaHQgPSBjYW52YXNIZWlnaHQ7XG4gICAgfVxuICAgIHJlc2l6ZShjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY2FudmFzV2lkdGggPSBjYW52YXNXaWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXNIZWlnaHQgPSBjYW52YXNIZWlnaHQ7XG4gICAgfVxuICAgIGRyYXdMaW5lKHgxLCB5MSwgeDIsIHkyLCBjb2xvciA9IFwiI0ZGRkZGRlwiKSB7XG4gICAgICAgIHRoaXMuY2FudmFzQ3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmNhbnZhc0N0eC5tb3ZlVG8oeDEsIHkxKTtcbiAgICAgICAgdGhpcy5jYW52YXNDdHgubGluZVRvKHgyLCB5Mik7XG4gICAgICAgIHRoaXMuY2FudmFzQ3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICAgIHRoaXMuY2FudmFzQ3R4LnN0cm9rZSgpO1xuICAgICAgICB0aGlzLmNhbnZhc0N0eC5jbG9zZVBhdGgoKTtcbiAgICB9XG4gICAgc2V0TGluZVdpZHRoKHdpZHRoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzQ3R4LmxpbmVXaWR0aCA9IHdpZHRoO1xuICAgIH1cbiAgICBjbGVhclNjcmVlbihjb2xvcikge1xuICAgICAgICB0aGlzLmNhbnZhc0N0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5jYW52YXNDdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXNXaWR0aCwgdGhpcy5jYW52YXNIZWlnaHQpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFR1cnRsZSB9IGZyb20gXCIuLi90dXJ0bGUvdHVydGxlXCI7XG5leHBvcnQgY2xhc3MgVHJlZUZyYWN0YWwge1xuICAgIGNvbnN0cnVjdG9yKHNjcmVlblBhaW50ZXIsIHNjcmVlbldpZHRoLCBzY3JlZW5IZWlnaHQsIGRyYXdGaW5pc2hlZCA9ICgpID0+IHsgfSkge1xuICAgICAgICB0aGlzLnNjcmVlblBhaW50ZXIgPSBzY3JlZW5QYWludGVyO1xuICAgICAgICB0aGlzLnNjcmVlbldpZHRoID0gc2NyZWVuV2lkdGg7XG4gICAgICAgIHRoaXMuc2NyZWVuSGVpZ2h0ID0gc2NyZWVuSGVpZ2h0O1xuICAgICAgICB0aGlzLmRyYXdGaW5pc2hlZCA9IGRyYXdGaW5pc2hlZDtcbiAgICAgICAgdGhpcy50dXJ0bGUgPSB0aGlzLmNyZWF0ZVR1cnRsZSgpO1xuICAgIH1cbiAgICByZXNpemUoc2NyZWVuV2lkdGgsIHNjcmVlbkhlaWdodCkge1xuICAgICAgICB0aGlzLnNjcmVlbldpZHRoID0gc2NyZWVuV2lkdGg7XG4gICAgICAgIHRoaXMuc2NyZWVuSGVpZ2h0ID0gc2NyZWVuSGVpZ2h0O1xuICAgICAgICB0aGlzLnR1cnRsZSA9IHRoaXMuY3JlYXRlVHVydGxlKCk7XG4gICAgfVxuICAgIGRyYXcodHJlZSkge1xuICAgICAgICB0aGlzLnNldE1vZGVsKHRyZWUpO1xuICAgICAgICB0aGlzLmNsZWFyU2NyZWVuKCk7XG4gICAgICAgIHRoaXMucmVzZXRUdXJ0bGUoKTtcbiAgICAgICAgdGhpcy5kcmF3VHJlZSh0aGlzLmdldEluaXRpYWxTaXplKCkgKiB0cmVlLnJvb3QsIHRyZWUuZGVwdGgpO1xuICAgICAgICB0aGlzLmRyYXdGaW5pc2hlZCgpO1xuICAgIH1cbiAgICBjcmVhdGVUdXJ0bGUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVHVydGxlKHRoaXMuc2NyZWVuUGFpbnRlciwgW1xuICAgICAgICAgICAgdGhpcy5zY3JlZW5XaWR0aCAvIDMsXG4gICAgICAgICAgICB0aGlzLnNjcmVlbkhlaWdodCAvIDIgKyB0aGlzLmdldEluaXRpYWxTaXplKClcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIHNldE1vZGVsKHRyZWUpIHtcbiAgICAgICAgdGhpcy50cmVlID0gdHJlZTtcbiAgICB9XG4gICAgZHJhd1RyZWUobGVuZ3RoLCBsZXZlbCkge1xuICAgICAgICBpZiAobGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnR1cnRsZS5tb3ZlKGxlbmd0aCk7XG4gICAgICAgICAgICB0aGlzLmRyYXdCcmFuY2hlcyhsZW5ndGgsIGxldmVsKTtcbiAgICAgICAgICAgIHRoaXMuc2V0QnJhbmNoV2lkdGgobGV2ZWwpO1xuICAgICAgICAgICAgdGhpcy5zZXRCcmFuY2hDb2xvcihsZXZlbCk7XG4gICAgICAgICAgICB0aGlzLnR1cnRsZS5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLnR1cnRsZS5tb3ZlKC1sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy50dXJ0bGUuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldEJyYW5jaFdpZHRoKGxldmVsKSB7XG4gICAgICAgIGNvbnN0IG1heFdpZHRoID0gTWF0aC5taW4oMTAsIHRoaXMuZ2V0SW5pdGlhbFNpemUoKSAvIDE1KTtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBtYXhXaWR0aCAqIGxldmVsIC8gdGhpcy50cmVlLmRlcHRoO1xuICAgICAgICB0aGlzLnR1cnRsZS5zZXRMaW5lV2lkdGgod2lkdGgpO1xuICAgIH1cbiAgICBzZXRCcmFuY2hDb2xvcihsZXZlbCkge1xuICAgICAgICBjb25zdCBtaW5GcmFjdGlvbiA9IDAuMDY7XG4gICAgICAgIGNvbnN0IG9wYWNpdHkgPSBtaW5GcmFjdGlvbiArICgxIC0gbWluRnJhY3Rpb24pICogKGxldmVsIC8gdGhpcy50cmVlLmRlcHRoKTtcbiAgICAgICAgY29uc3QgYnJhbmNoQ29sb3IgPSBgcmdiYSgyNTUsIDI1NSwgMjU1LCAke29wYWNpdHl9KWA7XG4gICAgICAgIHRoaXMudHVydGxlLnNldENvbG9yKGJyYW5jaENvbG9yKTtcbiAgICB9XG4gICAgZHJhd0JyYW5jaGVzKGxlbmd0aCwgbGV2ZWwpIHtcbiAgICAgICAgW1xuICAgICAgICAgICAgW3RoaXMudHJlZS5hbmdsZTEsIHRoaXMudHJlZS5ncm93MV0sXG4gICAgICAgICAgICBbdGhpcy50cmVlLmFuZ2xlMiwgdGhpcy50cmVlLmdyb3cyXVxuICAgICAgICBdLmZvckVhY2goKFthbmdsZSwgZ3Jvd10pID0+IHtcbiAgICAgICAgICAgIHRoaXMudHVydGxlLnR1cm4oYW5nbGUpO1xuICAgICAgICAgICAgdGhpcy5kcmF3VHJlZShncm93ICogbGVuZ3RoLCBsZXZlbCAtIDEpO1xuICAgICAgICAgICAgdGhpcy50dXJ0bGUudHVybigtYW5nbGUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0SW5pdGlhbFNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjcmVlbkhlaWdodCAvIDY7XG4gICAgfVxuICAgIGNsZWFyU2NyZWVuKCkge1xuICAgICAgICB0aGlzLnR1cnRsZS5jbGVhcigpO1xuICAgIH1cbiAgICByZXNldFR1cnRsZSgpIHtcbiAgICAgICAgdGhpcy50dXJ0bGUucmVzZXQoKTtcbiAgICAgICAgdGhpcy50dXJ0bGUuaGlkZSgpO1xuICAgICAgICB0aGlzLnR1cnRsZS50dXJuKC05MCk7XG4gICAgICAgIHRoaXMudHVydGxlLm1vdmUodGhpcy5nZXRJbml0aWFsU2l6ZSgpICogdGhpcy50cmVlLnJvb3QpO1xuICAgICAgICB0aGlzLnR1cnRsZS50dXJuKDE4MCk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFR1cnRsZSB7XG4gICAgY29uc3RydWN0b3IocGFpbnRlciwgc3RhcnQpIHtcbiAgICAgICAgdGhpcy5wYWludGVyID0gcGFpbnRlcjtcbiAgICAgICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgICAgICB0aGlzLmRyYXdpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbG9yID0gXCIjRkZGRkZGXCI7XG4gICAgICAgIHRoaXMuYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5zdGFydDtcbiAgICAgICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgfVxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuZHJhd2luZyA9IHRydWU7XG4gICAgfVxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xuICAgIH1cbiAgICB0dXJuKGRlZ3JlZXMpIHtcbiAgICAgICAgY29uc3QgcmFkaWFucyA9IGRlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgICB0aGlzLmFuZ2xlID0gdGhpcy5hbmdsZSAtIHJhZGlhbnM7XG4gICAgfVxuICAgIG1vdmUoZGlzdGFuY2UpIHtcbiAgICAgICAgY29uc3QgW3gsIHldID0gdGhpcy5wb3NpdGlvbjtcbiAgICAgICAgY29uc3QgW25leHRYLCBuZXh0WV0gPSB0aGlzLm5leHRQb3NpdGlvbihkaXN0YW5jZSk7XG4gICAgICAgIGlmICh0aGlzLmRyYXdpbmcpIHtcbiAgICAgICAgICAgIHRoaXMucGFpbnRlci5kcmF3TGluZSh4LCB5LCBuZXh0WCwgbmV4dFksIHRoaXMuY29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBbbmV4dFgsIG5leHRZXTtcbiAgICB9XG4gICAgc2V0Q29sb3IoY29sb3IpIHtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIH1cbiAgICBzZXRMaW5lV2lkdGgod2lkdGgpIHtcbiAgICAgICAgdGhpcy5wYWludGVyLnNldExpbmVXaWR0aCh3aWR0aCk7XG4gICAgfVxuICAgIGNsZWFyKGNvbG9yID0gXCIjMDAwMDAwXCIpIHtcbiAgICAgICAgdGhpcy5wYWludGVyLmNsZWFyU2NyZWVuKGNvbG9yKTtcbiAgICB9XG4gICAgbmV4dFBvc2l0aW9uKGRpc3RhbmNlKSB7XG4gICAgICAgIGNvbnN0IFt4LCB5XSA9IHRoaXMucG9zaXRpb247XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB4ICsgZGlzdGFuY2UgKiBNYXRoLmNvcyh0aGlzLmFuZ2xlKSxcbiAgICAgICAgICAgIHkgKyBkaXN0YW5jZSAqIE1hdGguc2luKHRoaXMuYW5nbGUpLFxuICAgICAgICBdO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
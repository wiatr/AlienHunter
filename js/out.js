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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


 var Game = __webpack_require__(1);

 var blink = document.getElementById('blink');
 var blinkA = document.getElementById('blinkA');
 var board = document.getElementById("board");
 var intro = document.querySelector(".intro");
 var intro1 = document.querySelector(".intro1");
 var end = document.getElementById("end");


 document.addEventListener("keyup", function(event){
    event.preventDefault();
         if (event.keyCode == 32) {
                blink.style.display = "none";
                blinkA.style.display = "none";
                intro.style.display = "none";
                intro1.style.display = "none";
                board.style.display = "block";

                var game = new Game();
                game.showFurry();
                game.showCoin();
                game.startGame();
               
                document.addEventListener('keydown', function(event){
                    game.turnFurry(event);
                 });
            
               
        } if (event.keyCode == 27) {
            window.location = "index.html"
        } 

 });

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Furry = __webpack_require__(2);
var Coin = __webpack_require__(3);

var Game = function(){
    var self = this;

    this.board = document.querySelectorAll("#board div")
    this.furry = new Furry()
    this.coin = new Coin ()
    this.score = 0;
    this.speed = 270;

    this.index = function(x,y) {
        return x + (y * 10);
    };

    this.showFurry = function(){
            this.hideVisibleFurry();
            this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
        };

    this.hideVisibleFurry = function() {
        var findFurry = document.querySelector('.furry');

        if (findFurry) {
                findFurry.classList.remove('furry');
        }   
    }

    this.showCoin = function  (){
            this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
        };


     self.moveFurry = function() {
         if(self.furry.direction === "right") {
             self.furry.x = self.furry.x + 1;
         } else if ( self.furry.direction === 'left') {
             self.furry.x = self.furry.x - 1;
         } else if ( this.furry.direction === 'up') {
             self.furry.y = self.furry.y + 1;
         } else if ( self.furry.direction === 'down') {
             self.furry.y = self.furry.y - 1;
         } 

         this.gameOver();
         self.showFurry();
         this.checkCoinCollision();

     }


        this.turnFurry = function(event) {
                 switch (event.which) {
                     case 37:
                         this.furry.direction = 'left';
                         break;
                     case 38 :
                         this.furry.direction = 'down';
                         break;
                     case 39:
                         this.furry.direction = 'right';
                         break;
                     case 40:
                         this.furry.direction = 'up';
                         break;
                 }
             }

        this.checkCoinCollision = function() {
            if (this.coin.x === this.furry.x && this.coin.y === this.furry.y) {

             var removeCoin = document.querySelector('.coin');

             removeCoin.classList.remove('coin');
             this.score++;
             var result = document.querySelector('#score strong');
             result.innerText = this.score;
             this.coin = new Coin();
             this.showCoin();
           }
        }

       
        this.gameOver = function() {
            var findFurry = document.querySelector('.furry');
            if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
                clearInterval(this.move);
                self.hideVisibleFurry();
                this.idSetInterval = clearInterval; 
   
               document.querySelector('#board').classList.add('invisible');
                 document.querySelector('#over').classList.remove('invisible')
                 board.style.display = "none";
                 blinkE.style.display = "block";
                 end.style.display = "block";
                 this.speed = 5000;
                 self.moveFurry = function() {
                   self.furry.x = self.furry.x
                   self.furry.y = self.furry.y
                }
                this.showFurry = function(){
                    this.hideVisibleFurry();
                };
            } 
        }
           this.startGame = function(){
               this.idSetInterval = setInterval(function() {
               self.moveFurry()
               },this.speed);
           }
   
       };


module.exports = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var Furry = function(){
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

module.exports = Furry;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Coin = function(){
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

module.exports = Coin;


/***/ })
/******/ ]);
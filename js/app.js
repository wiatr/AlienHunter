
 var Game = require('./game.js');

 var blink = document.getElementById('blink');
 var blinkA = document.getElementById('blinkA');
 var board = document.getElementById("board");

 document.addEventListener("keyup", function(event){
    event.preventDefault();
         if (event.keyCode == 32) {
                blink.style.display = "none"
                blinkA.style.display = "none"
                board.style.display = "block"

                var game = new Game();
                game.showFurry();
                game.showCoin();
                game.startGame();
                game.moveFurry();
            
                document.addEventListener('keydown', function(event){
                game.turnFurry(event);
             });
        } if (event.keyCode == 27) {
            window.location = "index.html"
        }
 });
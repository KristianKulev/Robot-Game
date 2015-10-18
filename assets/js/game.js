function Game(){
    var field = new Field('playingField');
    var robot = new Robot();
    var canvas = field.canvas;
    var currentCoords;
    var firedShots = [];
    var circles = [];
    this.play = function(){

        //add Listeners for the events in the game

        canvas.addEventListener("mousemove", function(e){
            currentCoords = field.getCursorPosition(e);

            //rotate the robot on mousemove

            robot.rotate(currentCoords);
        }, false);

        canvas.addEventListener("contextmenu", function(e){
            e.preventDefault();
            currentCoords = field.getCursorPosition(e);

            //create new circle and travel the robot to the event location

            var cr = new Circle('playingField', currentCoords, 20);
            cr.draw();
            circles.push(cr);

            robot.travel(currentCoords);
        }, false);

        canvas.addEventListener("click", function(e){
            var to = field.getCursorPosition(e);

            //create new missile on the robot position and travel it to the event position

            var missile = new Missile(robot.position)
            missile.rotate(to);
            missile.travel(to);
            firedShots.push(missile);
        }, false);

        //start tha game loop

        this.gameLoop();
    };

    this.gameLoop = function(){

        field.clear();
        robot.render();

        //render all active missiles and circles

        if(firedShots.length){
            for(var i = 0; i < firedShots.length; i++){
                var missile = firedShots[i];
                missile.render();
                if (!missile.isTraveling && !missile.isExploading) {
                    missile.explode();
                }
                if(missile.isExploaded){
                    missile = null;
                    firedShots.splice(i, 1);
                }
            }
        }

        for(var k = 0; k < circles.length; k++){
            circles[k].render();
            if(circles[k].toEnlarge == false){
                circles.splice(k, 1);
            }
        }

        //request next frame

        requestAnimationFrame(this.gameLoop.bind(this));
    };

}

(function loadGame(){


    var startButton =  document.getElementById('startButton');
    startButton.addEventListener('click', function(){

        //hide the menu div

        var menuDiv = document.getElementById('outerDiv');
        menuDiv.className += ' animateToOutside';

        setTimeout(function(){
            menuDiv.className += ' displayNone';
        }, 500);

        //initiate the game

        var game = new Game();
        game.play();
    }, false)
})();


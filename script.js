'use strict'

var ballBorderWidth = 50;

function newBall() {
    var ball = document.createElement('div');
    ball.classList.add('ball');
    ball.style.borderWidth = ballBorderWidth + 'px';
    ball.style.bottom = 0;
    ball.style.left = Math.random() * (parseInt(window.innerWidth) - ballBorderWidth * 2) + 'px';
    document.body.appendChild(ball);

    var pos = 0;
    var posMax = parseInt(window.innerHeight);

    var timer = setInterval(move, 10);
    function move() {
        if (pos == posMax) {
            clearInterval(timer);
            document.body.removeChild(ball);
            newBall();
        } else {
            pos++;
            ball.style.bottom = pos + 'px';
        }
    }

    ball.addEventListener('click', function() {
        document.body.removeChild(ball);
        newBall();
    })
}

newBall();

// TODO:
// - fix error: clean up interval when baloon destroyed by click
// - start button
// - use mousedown event intead of click for baloon shooting
// - each new baloon moves fater
// - add destroyed baloons counter
// - allow ganer to make 3 mistakes, not 1
// - add baloon destroy animation
// - add decrease lives animation
// - add "game over" scene
// - store best result in local storage
// - host web app in github pages or equivalent
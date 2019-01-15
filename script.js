'use strict'

var ballRadius = 50;

function newBall() {
    var field = document.querySelector('.field');
    var ball = document.createElement('div');
    ball.classList.add('ball');
    ball.style.borderWidth = ballRadius + 'px';
    ball.style.bottom = -(ballRadius * 2) + 'px';
    ball.style.left = Math.random() * (parseInt(window.innerWidth) - ballRadius * 2) + 'px';
    field.appendChild(ball);

    var yPos = -ball.offsetHeight;
    var yPosMax = parseInt(field.offsetHeight);
    var fps = 60;
    var stepFloatUp = 3;

    var requestID;

    function move() {
        if (yPos <= yPosMax) {
            requestID = requestAnimationFrame(move);
            yPos += stepFloatUp;
            ball.style.bottom = yPos + 'px';          
        } else {
            cancelAnimationFrame(requestID);
            removeBall();
            newBall();
        }
    }

    move();

    function removeBall() {
        field.removeChild(ball);
    }

    ball.addEventListener('click', function() {
        cancelAnimationFrame(requestID);
        removeBall();
        newBall();
    });


    // function move() {
    //     if (yPos < yPosMax) {
    //         setTimeout(function() {
    //             requestAnimationFrame(move);
    //             yPos += stepFloatUp;
    //             ball.style.bottom = yPos + 'px';
    //         }, 1000 / fps);
    //     } else {
    //         removeBall();
    //         newBall();
    //     }
    // }

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
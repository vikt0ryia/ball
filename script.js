'use strict';

(function() {
    var life = 3;
    var score = 0;
    var counter = document.querySelector('.score__counter');
    var buttonStart = document.querySelector('.button');
    var hearts = document.querySelectorAll('.heart');

    counter.innerHTML = score;

    buttonStart.addEventListener('click', function() {
        buttonStart.style.display = 'none';
        newBall();
    });

    function newBall() {
        var field = document.querySelector('.field');
        var ball = document.createElement('div');
        ball.classList.add('ball');
        var ballWidth = 150;
        
        ball.style.bottom = -ballWidth + 'px';
        ball.style.left = Math.random() * (window.innerWidth - ballWidth) + 'px';
        field.appendChild(ball);

        var yPos = -ballWidth;
        var yPosMax = parseInt(field.offsetHeight);
        var stepFloatUp = 3;

        var requestID;

        function move() {
            if (life) {
                if (yPos <= yPosMax) {
                    requestID = requestAnimationFrame(move);
                    yPos += stepFloatUp;
                    ball.style.bottom = yPos + 'px';          
                } else {
                    cancelAnimationFrame(requestID);
                    removeBall();
                    decreaseLife();
                    newBall();
                }
            } else {
                location.reload();
            }           
        }

        move();

        function decreaseLife() {
            life--;
            hearts[life].style.fill = '#333333';
        }

        function removeBall() {
            field.removeChild(ball);
        }

        ball.addEventListener('click', function() {
            score++;
            counter.innerHTML = score;
            cancelAnimationFrame(requestID);
            removeBall();
            newBall();
            console.log(score);
        });
    }

})();



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
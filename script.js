'use strict';

(function() {
    var life;
    var score;
    var stepFloatUp;
    var counter = document.querySelector('.score__counter');
    var buttonStart = document.querySelector('.button');
    var hearts = document.querySelectorAll('.heart');
    var gameOver = document.querySelector('.game-over');
    var finalScore = document.querySelector('.game-over__score span');
    var bestScore = document.querySelector('.game-over__best-score span');

    buttonStart.addEventListener('click', function() {
        buttonStart.style.display = 'none';
        gameOver.style.display = 'none';
        life = 3;
        score = 0;
        stepFloatUp = 3;
        counter.innerHTML = score;
        hearts.forEach(function (item) {
            item.style.fill = 'red';
        });
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
                    stepFloatUp = 3;
                    newBall();
                }
            } else {
                cancelAnimationFrame(requestID);
                removeBall();
                gameOver.style.display = 'block';
                finalScore.textContent = score;

                if (!localStorage.getItem('bestScore') || localStorage.getItem('bestScore') < score) {
                    localStorage.setItem('bestScore', score);
                } 
              
                bestScore.textContent = localStorage.getItem('bestScore');
                buttonStart.style.display = 'inline-block';
                buttonStart.style.marginTop = '40px';
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

        ball.addEventListener('mousedown', function() {
            score++;
            counter.innerHTML = score;
            stepFloatUp += 0.2;
            cancelAnimationFrame(requestID);
            removeBall();
            newBall();
        });
    }

})();

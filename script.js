document.addEventListener('DOMContentLoaded', () => {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const body = document.querySelector('body');
    const alert = document.getElementById('alert');
    const scoreElement = document.getElementById('score');

    let jumping = false;
    let gravity = 0.9;
    let gameover = false;
    let dinopy = 0;
    let obstaclesJumped = 0;
    let score = 0;
    let obstacleInterval;

    // Eventos de entrada
    document.addEventListener('keyup', jumpcontrol);
    document.addEventListener('touchend', jumpcontrol); // Adicionando evento de toque

    // Controle de salto
    function jumpcontrol(e) {
        if (e.keyCode == 32 || e.type === 'touchend') {
            if (!jumping && !gameover) {
                jumping = true;
                jump();
            }
        }
    }

    function jump() {
        let count = 0;
        let timerId = setInterval(function () {
            // Caindo
            if (count == 15) {
                clearInterval(timerId);
                let downTimerId = setInterval(function () {
                    if (count == 0) {
                        clearInterval(downTimerId);
                        jumping = false;
                    }
                    dinopy -= 5;
                    count--;
                    dinopy = dinopy * gravity;
                    dino.style.bottom = dinopy + 'px';
                }, 20);
            }
            // Subindo
            dinopy += 30;
            count++;
            dinopy = dinopy * gravity;
            dino.style.bottom = dinopy + 'px';
        }, 20);
    }

    function createObstacle() {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        grid.appendChild(obstacle);
        let obstaclepx = 1000;
        obstacle.style.left = obstaclepx + 'px';

        obstacleInterval = setInterval(function () {
            // Colisão com o jogador
            if (obstaclepx > 0 && obstaclepx < 60 && dinopy < 60) {
                clearInterval(obstacleInterval);
                alert.innerHTML = 'Game Over!';
                gameover = true;
                gameOver();
            }

            obstaclepx -= 10;
            obstacle.style.left = obstaclepx + 'px';

            if (obstaclepx < 0) {
                obstaclesJumped++;
                score = obstaclesJumped;
                displayScore();
                clearInterval(obstacleInterval);
                grid.removeChild(obstacle);
                createObstacle();
            }
        }, 20);
    }

    function displayScore() {
        scoreElement.innerHTML = `Score: ${score}`;
    }

    function restartGame() {
        location.reload();
    }

    function gameOver() {
        clearInterval(obstacleInterval);
        while (grid.firstChild) {
            grid.removeChild(grid.lastChild);
        }
        setTimeout(restartGame, 2000);
    }

    function startGame() {
        createObstacle();
        jump();
    }

    startGame();
});

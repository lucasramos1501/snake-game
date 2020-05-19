let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let pointHtml = document.getElementById("point");

let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "up";

let food = {
    x: Math.floor(Math.random() * 16) * box,
    y: Math.floor(Math.random() * 16) * box,
    audio: new Audio("./music/bite.ogg"),
    points: 0,
}

function createBG() {
    context.fillStyle = "#111";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (let count = 0; count < snake.length; count++) {
        context.fillStyle = "#06c258";
        context.fillRect(snake[count].x, snake[count].y, box - 5, box - 5);
    }
}

function createFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = "left";
    if (event.keyCode == 38 && direction != 'down') direction = "up";
    if (event.keyCode == 39 && direction != 'left') direction = "right";
    if (event.keyCode == 40 && direction != 'up') direction = "down";
}

function frequencyGame() {
    let frequency = 10000;

    return frequency
}
function startGame() {
    if (snake[0].x > 15 * box) snake[0].x = 0;
    if (snake[0].x < 0 * box) snake[0].x = 16 * box;
    if (snake[0].y > 15 * box) snake[0].y = 0;
    if (snake[0].y < 0) snake[0].y = 16 * box;

    for (let count = 1; count < snake.length; count++) {
        if (snake[0].x == snake[count].x && snake[0].y == snake[count].y) {
            clearInterval(game);
            alert("GameOver - Para tentar novamente aperte F5");
        }
    }

    createBG();
    createSnake();
    createFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }
    else {
        food.audio.volume = 0.05;
        food.audio.play();
        food.points += 1;
        food.x = Math.floor(Math.random() * 16) * box;
        food.y = Math.floor(Math.random() * 16) * box;

        pointHtml.innerHTML = food.points;
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    snake.unshift(newHead);
}

let game = setInterval(startGame, 100);

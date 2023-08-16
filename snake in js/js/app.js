document.addEventListener('keydown', keyPush)

const canvas = document.querySelector('canvas')
const title = document.querySelector('h1')

const ctx = canvas.getContext('2d')
const snakeSize = 50;
let snakeSpeed = snakeSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;
let gameIsRunning = true;
let velocityX = 1;
let velocityY = 0;
let foodPosX = 0;
let foodPosY = 0;
let snakeLength = 4;
const tileCountX = canvas.width / snakeSize;
const tileCountY = canvas.height / snakeSize;
const fps = 15;
let score = 0;
let tail = [{}]

function gameLoop() {
if(gameIsRunning) {
drawStuff();
moveStuff();
setTimeout(gameLoop, 1000 / fps);
}
}
resetFood();
gameLoop();

function moveStuff(){
    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;
    if (snakePosX > (canvas.width - snakeSize)) {
        snakePosX = 0;
    }
    if (snakePosX < 0) {
        snakePosX = canvas.width;
    }
    if (snakePosY > (canvas.height - snakeSize)) {
        snakePosY = 0;
    }
    if (snakePosY < 0) {
        snakePosY = canvas.height;
    }
    tail.forEach((snakePart) => {
        if (snakePosX === snakePart.x && snakePosY === snakePart.y) {
        gameOver();
        }
    });


    tail.push({x: snakePosX, y: snakePosY});
    tail = tail.slice(-1 * snakeLength);
    if (snakePosX === foodPosX && snakePosY === foodPosY) {
        title.textContent = ++score;
        snakeLength++;
        resetFood()
}
}

function drawStuff(){
rectangle('#ffd21f', 0, 0, canvas.width, canvas.height )
drawGrid()
rectangle('#00bfff', foodPosX, foodPosY, snakeSize, snakeSize)
tail.forEach(snakePart =>
rectangle('#555', snakePart.x, snakePart.y, snakeSize, snakeSize)
);
rectangle('black', snakePosX, snakePosY, snakeSize, snakeSize)
}

function rectangle(color, x, y, width, height){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}
function resetFood(){
    if(snakeLength === tileCountX * tileCountY){
        gameOver();
    }
    foodPosX = Math.floor(Math.random() * tileCountX ) * snakeSize;
    foodPosY = Math.floor(Math.random() * tileCountY ) * snakeSize;
    if (tail.some(snakePart => snakePart.x === foodPosX && snakePart.y === foodPosY) ){
    resetFood();

    }
}
function keyPush(event) {
    switch(event.key) {
        case 'w':
        if (velocityY !== 1){
        velocityX = 0;
        velocityY = -1;
        }
        break;
        case 'a':
        if (velocityX !== 1){
        velocityX = -1;
        velocityY = 0;
        }
        break;
        case 's':
        if (velocityY !== -1){
        velocityX = 0;
        velocityY = 1;
        }
        break;
        case 'd':
        if (velocityX !== -1){
        velocityX = 1;
        velocityY = 0;
        }
        break;
        default:
        if(!gameIsRunning) location.reload();
        break;
    }
}

function drawGrid(){
    for(let i = 0; i < tileCountX; i++){
        for(let j = 0; j < tileCountY; j++){
            rectangle(
                'white',
                snakeSize * i,
                snakeSize * j,
                snakeSize - 1,
                snakeSize -1
            );
        }
    }
}
 function gameOver(){
    title.innerHTML = `💀<strong> ${score} </strong>💀`;
    gameIsRunning = false
 }
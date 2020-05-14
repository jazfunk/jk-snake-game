let canvas;
let canvasDisplay;

let unitSize = 20;
let snakeX = 20;
let snakeY = 40;
let snakeSpeedX = 20;
let snakeSpeedY = 20;

let myTimer;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);

window.onload = () => {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
};

function keyDownHandler(e) {
  e.preventDefault();

  clearSnakeDirectionValues();
  clearInterval(myTimer);

  let framesPerSecond = 10;

  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;

    myTimer = setInterval(() => {
      createGameObjects();
      moveSnakeHorizontal();
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;

    myTimer = setInterval(() => {
      createGameObjects();
      moveSnakeHorizontal();
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Up" || e.key === "ArrowUp") {
    upPressed = true;

    myTimer = setInterval(() => {
      createGameObjects();
      moveSnakeVertical();
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Down" || e.key === "ArrowDown") {
    downPressed = true;

    myTimer = setInterval(() => {
      createGameObjects();
      moveSnakeVertical();
    }, 1000 / framesPerSecond);
  }
}

function moveSnakeHorizontal() {
  if (snakeX < 0 || snakeX > canvas.width) {
    snakeSpeedX = -snakeSpeedX;
    // clearInterval(myTimer);
    // clearSnakeDirectionValues();
    createApple();

  }
  if (leftPressed) {
    if (snakeX >= unitSize) {
      snakeX -= snakeSpeedX;
    }
  }
  if (rightPressed) {
    if (snakeX <= canvas.width) {
      snakeX += snakeSpeedX;
    }
  }

}

function moveSnakeVertical() {  
  if (snakeY < 0 || snakeY > canvas.height - unitSize) {
    snakeSpeedY = -snakeSpeedY;
    // clearInterval(myTimer);
    // clearSnakeDirectionValues();
    createApple();
  }
  if (downPressed) {
    snakeY += snakeSpeedY;
    // if (snakeY < canvas.height - unitSize) {
    // }
  }
  if (upPressed) {
    snakeY -= snakeSpeedY;
    // if (snakeY >= unitSize) {
    // }
  }
}
function clearSnakeDirectionValues() {
  rightPressed = false;
  leftPressed = false;
  upPressed = false;
  downPressed = false;
}

function createGrid() {
  let gridColor = "#8EE4AF";
  // let gridColor = "#379683";
  for (let row = 0; row < canvas.height; row += 20) {
    for (let col = 0; col < canvas.width; col += 20) {
      createRectangle(col + 20, row, 1, 20, gridColor);
      createRectangle(col, row + 20, 20, 1, gridColor);
    }
  }
}

function createGameObjects() {
  // Game background
  createRectangle(0, 0, canvas.width, canvas.height, "#5CDB95");

  createGrid();
  
  // Snake Head
  createRectangle(snakeX, snakeY, unitSize, unitSize, "#05386B");
}

function createRectangle(leftX, topY, width, height, createColor) {
  canvasContext.fillStyle = createColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function createApple() {

  let randomX = Math.floor(Math.random()*40)*20;
  let randomY = Math.floor(Math.random()*30)*20;

  console.log(Math.floor(Math.random()*40)*20);
  console.log(Math.floor(Math.random()*30)*20);
  console.log(randomX, randomY);

  createRectangle(randomX, randomY, unitSize, unitSize, "#379683");
  

}
let canvas;
let canvasDisplay;

let snakeHeadSize = 20;
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

function clearSnakeDirectionValues() {
  rightPressed = false;
  leftPressed = false;
  upPressed = false;
  downPressed = false;
}

function keyDownHandler(e) {
  e.preventDefault();

  clearSnakeDirectionValues();
  clearInterval(myTimer);

  let framesPerSecond = 10;

  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;

    myTimer = setInterval(() => {
      drawGameObjects();
      moveSnakeHorizontal();
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;

    myTimer = setInterval(() => {
      drawGameObjects();
      moveSnakeHorizontal();
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Up" || e.key === "ArrowUp") {
    upPressed = true;

    myTimer = setInterval(() => {
      drawGameObjects();
      moveSnakeVertical();
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Down" || e.key === "ArrowDown") {
    downPressed = true;

    myTimer = setInterval(() => {
      drawGameObjects();
      moveSnakeVertical();
    }, 1000 / framesPerSecond);
  }
}

window.onload = () => {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
};

function createRectangle(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function drawGrid() {
  let gridColor = "#8EE4AF";
  // let gridColor = "#379683";
  for (let row = 0; row < canvas.height; row += 20) {
    for (let col = 0; col < canvas.width; col += 20) {
      createRectangle(col + 20, row, 1, 20, gridColor);
      createRectangle(col, row + 20, 20, 1, gridColor);
    }
  }
}

function drawGameObjects() {
  // Game background
  createRectangle(0, 0, canvas.width, canvas.height, "#5CDB95");

  drawGrid();

  // Header
  // createRectangle(0, 0, canvas.width, 20, "#05386B");

  // Snake Head
  createRectangle(snakeX, snakeY, snakeHeadSize, snakeHeadSize, "#05386B");
}

function moveSnakeHorizontal() {
  if (snakeX < 0 || snakeX > canvas.width - 40) {
    clearInterval(myTimer);
    clearSnakeDirectionValues();
  }
  if (leftPressed) {
    if (snakeX >= snakeHeadSize) {
      snakeX -= snakeSpeedX;
    }
  }
  if (rightPressed) {
    if (snakeX <= canvas.width - snakeHeadSize) {
      snakeX += snakeSpeedX;
    }
  }

}

function moveSnakeVertical() {  
  if (snakeY < 0 || snakeY > canvas.height - snakeHeadSize) {
    clearInterval(myTimer);
    clearSnakeDirectionValues();
  }
  if (downPressed) {
    if (snakeY < canvas.height - snakeHeadSize) {
      snakeY += snakeSpeedY;
    }
  }
  if (upPressed) {
    if (snakeY >= snakeHeadSize) {
      snakeY -= snakeSpeedY;
    }
  }
}

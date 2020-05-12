let canvas;
let canvasDisplay;

let snakeX = 5;
let snakeY = 25;
let snakeSpeedX = 5;
let snakeSpeedY = 5;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
  let framesPerSecond = 30;

  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
    // moveSnakeHorizontal();
  }
  if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
    // moveSnakeHorizontal();
  }

  if (e.key === "Up" || e.key === "ArrowUp") {
    upPressed = true;
    // moveSnakeVertical();
  }

  if (e.key === "Down" || e.key === "ArrowDown") {
    downPressed = true;
    // moveSnakeVertical();
  }
}

window.onload = () => {
  canvas = document.getElementById("gameCanvas");
  canvasDisplay = canvas.getContext("2d");

  let framesPerSecond = 30;
  setInterval(() => {
    drawGameObjects();
    moveSnakeHorizontal();
    moveSnakeVertical();
  }, 1000 / framesPerSecond);
};

function createRectangle(leftX, topY, width, height, drawColor) {
  canvasDisplay.fillStyle = drawColor;
  canvasDisplay.fillRect(leftX, topY, width, height);
}

function drawGrid() {
  let gridColor = "#8EE4AF";
  for (let row = 0; row < canvas.width; row += 20) {
    for (let col = 20; col < canvas.width; col += 20) {
      createRectangle(row, col - 20, 20, 1, gridColor);
      createRectangle(col, row - 20, 1, 20, gridColor);
    }
  }
}

function drawGameObjects() {
  // Game background
  createRectangle(0, 0, canvas.width, canvas.height, "#5CDB95");

  // Draw Grid Lines
  drawGrid();

  // Header
  createRectangle(0, 0, canvas.width, 20, "#05386B");

  // Snake Head
  createRectangle(snakeX, snakeY, 10, 10, "#05386B");
}

function moveSnakeHorizontal() {
    snakeX += snakeSpeedX;

    if (snakeX < 5) {
      snakeSpeedX = -snakeSpeedX;
    }

    if (snakeX > canvas.width - 15) {
      snakeSpeedX = -snakeSpeedX;
    }
}

function moveSnakeVertical() {
  snakeY += snakeSpeedY;

  if (snakeY < 25) {
    snakeSpeedY = -snakeSpeedY;
  }

  if (snakeY > canvas.height - 15) {
    snakeSpeedY = -snakeSpeedY;
  }
}

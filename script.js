let canvas;
let canvasDisplay;

let snakeX = 50;
let snakeY = 50;
let snakeSpeedX = 15;
let snakeSpeedY = 15;

window.onload = () => {
  canvas = document.getElementById("gameCanvas");
  canvasDisplay = canvas.getContext("2d");

  let framesPerSecond = 30;
  setInterval(() => {
    // set the game off here
    drawGameObjects();
    moveSnake();
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

function moveSnake() {
  snakeX += snakeSpeedX;

  if (snakeX < 0) {
    snakeSpeedX = -snakeSpeedX;
  }

  if (snakeX > canvas.width) {
    snakeSpeedX = -snakeSpeedX;
  }

  if (snakeY < 0) {
    snakeSpeedY = -snakeSpeedY;
  }

  if (ballY > canvas.height) {
    snakeSpeedY = -snakeSpeedY;
  }
}

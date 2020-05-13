let canvas;
let canvasDisplay;

let snakeHeadSize = 20;
let snakeX = 40;
let snakeY = 40;
let snakeSpeedX = 10;
let snakeSpeedY = 10;

let myTimer;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
  let framesPerSecond = 30;

  if (e.key === "Right" || e.key === "ArrowRight") {
    
    clearInterval(myTimer);
    
    rightPressed = true;
    
    myTimer = setInterval(() => {
      // drawGameObjects();
      moveSnakeHorizontal();      
    }, 1000 / framesPerSecond);
    // moveSnakeHorizontal();
  }
  if (e.key === "Left" || e.key === "ArrowLeft") {
    
    clearInterval(myTimer);

    leftPressed = true;

    myTimer = setInterval(() => {
      drawGameObjects();
      moveSnakeHorizontal();      
    }, 1000 / framesPerSecond);
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
  canvasContext = canvas.getContext("2d");

  // let framesPerSecond = 30;
  // myTimer = setInterval(() => {
  //   drawGameObjects();
  //   moveSnakeHorizontal();
  //   moveSnakeVertical();
  // }, 1000 / framesPerSecond);
};


function createRectangle(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
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
  createRectangle(snakeX, snakeY, snakeHeadSize, snakeHeadSize, "#05386B");
}

function moveSnakeHorizontal() {
  snakeX += snakeSpeedX;

  if (snakeX < 2 || snakeX > canvas.width - 22) {
    // clearInterval(myTimer);
    snakeSpeedX = -snakeSpeedX;
  }

  // if (snakeX > canvas.width - 22) {
  //   // clearInterval(myTimer);
  //   snakeSpeedX = -snakeSpeedX;
  // }

  if (leftPressed) {
    // snakeX -= snakeSpeedX;
  }
  if (rightPressed) {
    // snakeX += snakeSpeedX;
  }
}

function moveSnakeVertical() {
  if (snakeY < 22) {
    // clearInterval(myTimer);
    snakeSpeedY = -snakeSpeedY;
  }

  if (snakeY > canvas.height - 22) {
    // clearInterval(myTimer);
    snakeSpeedY = -snakeSpeedY;
  }

  // if (downPressed) {
  //   snakeY += snakeSpeedY;
  // }
  // if (upPressed) {
  //   snakeY -= snakeSpeedY;
  // }
}

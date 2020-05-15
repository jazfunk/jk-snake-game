let canvas;
let canvasDisplay;

let segmentSize = 20;
let snakeX = 20;
let snakeY = 40;
let snakeSpeedX = 20;
let snakeSpeedY = 20;

let appleX = 0;
let appleY = 0;

let myTimer;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let appleEaten = false;

document.addEventListener("keydown", keyDownHandler, false);

window.onload = () => {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  randomAppleLocation();
  createGameObjects();
};

function keyDownHandler(e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }

  clearSnakeDirectionValues();
  clearInterval(myTimer);

  let framesPerSecond = 5;

  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
    createGameObjects();
    moveSnakeHorizontal();
    myTimer = setInterval(() => {
      createGameObjects();
      moveSnakeHorizontal();
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
    createGameObjects();
    moveSnakeHorizontal();
    myTimer = setInterval(() => {
      createGameObjects();
      moveSnakeHorizontal();
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Up" || e.key === "ArrowUp") {
    upPressed = true;
    createGameObjects();
    moveSnakeVertical();
    myTimer = setInterval(() => {
      createGameObjects();
      moveSnakeVertical();
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Down" || e.key === "ArrowDown") {
    downPressed = true;
    createGameObjects();
    moveSnakeVertical();
    myTimer = setInterval(() => {
      createGameObjects();
      moveSnakeVertical();
    }, 1000 / framesPerSecond);
  }
}

function moveSnakeHorizontal() {
  if (snakeX < 0 || snakeX > canvas.width) {
    snakeSpeedX = -snakeSpeedX;
    resetGame();
  }
  if (leftPressed) {
    if (snakeX >= 0) {
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
  if (snakeY < 0 || snakeY > canvas.height) {
    snakeSpeedY = -snakeSpeedY;
    resetGame();
  }
  if (downPressed) {
    if (snakeY <= canvas.height) {
      snakeY += snakeSpeedY;
    }
  }
  if (upPressed) {
    if (snakeY >= 0) {
      snakeY -= snakeSpeedY;
    }
  }
}
function clearSnakeDirectionValues() {
  rightPressed = false;
  leftPressed = false;
  upPressed = false;
  downPressed = false;
}

function resetGame() {
  clearInterval(myTimer);
  clearSnakeDirectionValues();
  displayGameOver();
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
  createRectangle(snakeX, snakeY, segmentSize, segmentSize, "#05386B");

  createApple();

  checkForApple();
}

function createRectangle(leftX, topY, width, height, createColor) {
  canvasContext.fillStyle = createColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function createApple() {
  createRectangle(appleX, appleY, segmentSize, segmentSize, "#379683");
}

function randomAppleLocation() {
  appleX = Math.floor(Math.random() * 40) * 20;
  appleY = Math.floor(Math.random() * 30) * 20;
}

function checkForApple() {
  if (snakeX === appleX && snakeY === appleY) {
    clearInterval(myTimer);
    console.log("Apple Eaten");
  }
}

function displayGameOver() {
  canvasContext.font = "72px Unknown Font, sans-serif";
  canvasContext.fillStyle = "#05386B";
  let displayText = "Game Over";
  let displayTextSize = canvasContext.measureText(displayText);
  canvasContext.fillText(
    displayText,
    canvas.width / 2 - displayTextSize.width / 2,
    canvas.height / 2 - 36
  );
}

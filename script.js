let canvas = document.getElementById("gameCanvas");
let canvasContext = canvas.getContext("2d");

let segmentSize = 20;
let snakeX = canvas.width / 2;
let snakeY = canvas.height / 2;
let snakeSpeedX = 20;
let snakeSpeedY = 20;

const snake = [
  { x: canvas.width / 2, y: canvas.height / 2 },
  { x: canvas.width / 2, y: (canvas.height / 2) + segmentSize}
]

let appleX = 0;
let appleY = 0;

let myTimer;

let rightArrowKey = false;
let leftArrowKey = false;
let upArrowKey = false;
let downArrowyKey = false;

document.addEventListener("keydown", keyDownHandler, false);

window.onload = () => {
  generateRandomAppleLocation();
  renderGameObjects();
};

function keyDownHandler(e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }

  clearSnakeDirectionValues();
  clearInterval(myTimer);

  let framesPerSecond = 5;

  if (e.key === "Right" || e.key === "ArrowRight") {
    rightArrowKey = true;
    runHorizontalMethods();
    myTimer = setInterval(() => {
      runHorizontalMethods();
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Left" || e.key === "ArrowLeft") {
    leftArrowKey = true;
    runHorizontalMethods();
    myTimer = setInterval(() => {
      runHorizontalMethods();
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Up" || e.key === "ArrowUp") {
    upArrowKey = true;
    runVerticalMethods();
    myTimer = setInterval(() => {
      runVerticalMethods();
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Down" || e.key === "ArrowDown") {
    downArrowyKey = true;
    runVerticalMethods();
    myTimer = setInterval(() => {
      runVerticalMethods();
    }, 1000 / framesPerSecond);
  }
}

function runHorizontalMethods() {
  renderGameObjects();
  moveSnakeHorizontal();
}

function runVerticalMethods() {
  renderGameObjects();
  moveSnakeVertical();
}

function moveSnakeHorizontal() {
  if (
    snakeX < 0 ||
    snakeX > canvas.width ||
    snakeY < 0 ||
    snakeY >= canvas.height
  ) {
    endGame();
  }

  if (snakeY >= 0) {
    if (leftArrowKey && snakeX >= 0) {
      snakeX -= snakeSpeedX;
    }
    if (rightArrowKey && snakeX <= canvas.width) {
      snakeX += snakeSpeedX;
    }
  }
}

function moveSnakeVertical() {
  if (
    snakeY < 0 ||
    snakeY > canvas.height ||
    snakeX < 0 ||
    snakeX >= canvas.width
  ) {
    endGame();
  }

  if (snakeX >= 0) {
    if (downArrowyKey && snakeY <= canvas.height) {
      snakeY += snakeSpeedY;
    }
    if (upArrowKey && snakeY >= 0) {
      snakeY -= snakeSpeedY;
    }
  }
}

function clearSnakeDirectionValues() {
  rightArrowKey = false;
  leftArrowKey = false;
  upArrowKey = false;
  downArrowyKey = false;
}

function endGame() {
  clearInterval(myTimer);
  clearSnakeDirectionValues();
  displayGameOver();
}

function renderBackground() {
  renderRectangle(0, 0, canvas.width, canvas.height, "#5CDB95");
}

function renderGrid() {
  let gridColor = "#8EE4AF";
  for (let row = 0; row < canvas.height; row += 20) {
    for (let col = 0; col < canvas.width; col += 20) {
      renderRectangle(col + 20, row, 1, 20, gridColor);
      renderRectangle(col, row + 20, 20, 1, gridColor);
    }
  }
}

function renderSnake() {

  // snake.forEach((segment) => {
  //   renderRectangle(segment.x, segment.y, segmentSize, segmentSize, "#05386B");
  // });

  renderRectangle(snakeX, snakeY, segmentSize, segmentSize, "#05386B");
}

function renderGameObjects() {
  renderBackground();
  renderGrid();
  renderSnake();
  renderApple();

  if (isSnakeEatingApple()) {
    console.log("Apple Eaten");
    generateRandomAppleLocation();
  }
}

function renderRectangle(leftX, topY, width, height, renderColor) {
  canvasContext.fillStyle = renderColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function renderApple() {
  renderRectangle(appleX, appleY, segmentSize, segmentSize, "#379683");
}

function generateRandomAppleLocation() {
  appleX = Math.floor(Math.random() * 40) * 20;
  appleY = Math.floor(Math.random() * 30) * 20;
}

function isSnakeEatingApple() {
  return snakeX === appleX && snakeY === appleY;
}

function displayGameOver() {
  canvasContext.font = "52px Unknown Font, sans-serif";
  canvasContext.fillStyle = "#05386B";
  let displayText = "Game Over";
  let displayTextSize = canvasContext.measureText(displayText);
  canvasContext.fillText(
    displayText,
    canvas.width / 2 - displayTextSize.width / 2,
    canvas.height / 2
  );
}

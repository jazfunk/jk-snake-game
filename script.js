let canvas;
let canvasDisplay;

let unitSize = 20;
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

};

function keyDownHandler(e) {
  e.preventDefault();

  clearSnakeDirectionValues();
  clearInterval(myTimer);

  let framesPerSecond = 20;

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

  createApple();

  checkForApple();

}



function createRectangle(leftX, topY, width, height, createColor) {
  canvasContext.fillStyle = createColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function createApple() {  
  createRectangle(appleX, appleY, unitSize, unitSize, "#379683");
}

function randomAppleLocation() {
  appleX = Math.floor(Math.random()*40)*20;
  appleY = Math.floor(Math.random()*30)*20;
}

function checkForApple() {
  if (snakeX === appleX && snakeY === appleY) {
    clearInterval(myTimer);
    console.log("Apple Eaten");
  }

}
let canvas;
let canvasDisplay;

let segmentSize = 20;
let snakeX = 20;
let snakeY = 40;
let snakeSpeedX = 20;
let snakeSpeedY = 20;

let snakeSegments = 1;
let snake = [];

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
    horizontalRoutine();
    myTimer = setInterval(() => {
      horizontalRoutine();
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
    horizontalRoutine();
    myTimer = setInterval(() => {
      horizontalRoutine();
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Up" || e.key === "ArrowUp") {
    upPressed = true;
    verticalRoutine();
    myTimer = setInterval(() => {
      verticalRoutine();
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Down" || e.key === "ArrowDown") {
    downPressed = true;
    verticalRoutine();
    myTimer = setInterval(() => {
      verticalRoutine();
    }, 1000 / framesPerSecond);
  }
}

function horizontalRoutine() {
  createGameObjects();
  moveSnakeHorizontal();
}

function verticalRoutine() {
  createGameObjects();
  moveSnakeVertical();
}

function moveSnakeHorizontal() {
  if (
    snakeX < 0 ||
    snakeX > canvas.width ||
    snakeY < 0 ||
    snakeY >= canvas.height
  ) {
    resetGame();
  }

  if (snakeY >= 0) {
    if (leftPressed && snakeX >= 0) {
      snakeX -= snakeSpeedX;
    }
    if (rightPressed && snakeX <= canvas.width) {
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
    resetGame();
  }

  if (snakeX >= 0) {
    if (downPressed && snakeY <= canvas.height) {
      snakeY += snakeSpeedY;
    }
    if (upPressed && snakeY >= 0) {
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
  for (let row = 0; row < canvas.height; row += 20) {
    for (let col = 0; col < canvas.width; col += 20) {
      createRectangle(col + 20, row, 1, 20, gridColor);
      createRectangle(col, row + 20, 20, 1, gridColor);
    }
  }
}

// function displaySnake() {
//   snake.forEach((segment) => {
//     segment.segmentX = 
//   });
// }

function createSnake() {

  createRectangle(snakeX, snakeY, segmentSize, segmentSize, "#05386B");

//   2nd attempt to increase snake size by one, by creating a class and adding to 
//   an object array
//   Each time an apple is eaten, the snakeSegements variable is incremented by one
//   in another method.
//   Look each snakeSegment and build a SnakeSegment object, then
//   add it to the snake[] object "array".

//   for(let i = 0; i <= snakeSegments - 1; i++) {
//     let offsetX = i * 20;
//     let offsetY = i *20;

//     // let segment = new SnakeSegment();

//     // segment.segmentX = snakeX;
//     // segment.segmentY = snakeY;
//     // segment.width = segmentSize;
//     // segment.height = segmentSize;

//     // if (i = 1) {
//     //   segment.head = true;
//     //   segment.segmentColor = "#5CDB95";
//     // } else {
//     //   segment.head = false;
//     //   segment.segmentColor = "#05386B";
//     // }

//     // if (upPressed) {
//     //   segment.direction = 0;
//     // }
//     // if (rightPressed) {
//     //   segment.direction = 1;
//     // }
//     // if (downPressed) {
//     //   segment.direction = 2;
//     // }
//     // if (leftPressed) {
//     //   segment.direction = 3;
//     // }

//     // snake.push(segment);





//  1st attempt to increase snake size after eating apple //

//    This increase the snake by one, but it shifts the 
//    entire snake as one piece, so wrong approach
    
//     if (leftPressed) {
//       createRectangle(snakeX + offsetX, snakeY, segmentSize, segmentSize, "#05386B");    
//     }
//     if (rightPressed) {
//       createRectangle(snakeX - offsetX, snakeY, segmentSize, segmentSize, "#05386B");    
//     }
//     if (downPressed) {
//       createRectangle(snakeX, snakeY - offsetY, segmentSize, segmentSize, "#05386B");    
//     }
//     if (upPressed) {
//       createRectangle(snakeX, snakeY + offsetY, segmentSize, segmentSize, "#05386B");    
//     }       
//   }
// }
}

function createGameObjects() {  
  createRectangle(0, 0, canvas.width, canvas.height, "#5CDB95");

  createGrid();

  createSnake();

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
    snakeSegments++;
    console.log("Apple Eaten");
    randomAppleLocation();
  }
}

function displayGameOver() {
  canvasContext.font = "52px Unknown Font, sans-serif";
  canvasContext.fillStyle = "#05386B";
  let displayText = "Game Over";
  let displayTextSize = canvasContext.measureText(displayText);
  canvasContext.fillText(
    displayText,
    (canvas.width / 2) - (displayTextSize.width / 2),
    (canvas.height / 2)
  );
}

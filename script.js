let canvas = document.getElementById("gameCanvas");
let canvasContext = canvas.getContext("2d");

let segmentSize = 20;
let snakeX = canvas.width / 2;
let snakeY = canvas.height / 2;
let snakeSpeed = 20;

let snakeSpeedX = 20;
let snakeSpeedY = 20;

const snake = [
  {
    x: canvas.width / 2,
    y: canvas.height / 2,
    direction: null,
    pivotX: null,
    pixvotY: null,
    color: null,
  },
  {
    x: canvas.width / 2,
    y: canvas.height / 2 + segmentSize,
    direction: null,
    pivotX: null,
    pixvotY: null,
    color: null,
  },
];

let nextPivotPoint = [];
let snakeHeadDirection = null;

let appleX = 0;
let appleY = 0;

let myTimer;

// 0 = Up
// 1 = Right
// 2 = Down
// 3 = Left


document.addEventListener("keydown", keyDownHandler, false);

window.onload = () => {
  generateRandomAppleLocation();
  renderGameObjects();
};

function keyDownHandler(e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }

  clearInterval(myTimer);

  const framesPerSecond = 5;
  if (e.key === "Up" || e.key === "ArrowUp") {
    // renderGameObjects();
    // moveSnake(0);
    myTimer = setInterval(() => {
      renderGameObjects();
      moveSnake(0);
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Right" || e.key === "ArrowRight") {
    // renderGameObjects();
    // moveSnake(1);
    myTimer = setInterval(() => {
      renderGameObjects();
      moveSnake(1);
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Down" || e.key === "ArrowDown") {
    // renderGameObjects();
    // moveSnake(2);
    myTimer = setInterval(() => {
      renderGameObjects();
      moveSnake(2);
    }, 1000 / framesPerSecond);
  }

  if (e.key === "Left" || e.key === "ArrowLeft") {
    // renderGameObjects();
    // moveSnake(3);
    myTimer = setInterval(() => {
      renderGameObjects();
      moveSnake(3);
    }, 1000 / framesPerSecond);
  }
}

function moveSnake(direction) {
  snake.forEach((segment) => {
    if (segment.direction === null) {
      segment.direction = direction;
    }

    if (segment === snake[0]) {
      if (segment.direction !== direction) {
        snakeHeadDirection = direction;
        segment.direction = direction;
        nextPivotPoint[0] = segment.x;
        nextPivotPoint[1] = segment.y;
      }
    }

    //  Check to see if we're at the next pivot point
    if (segment.x === nextPivotPoint[0] && segment.y === nextPivotPoint[1]) {
      segment.direction = direction;
    }

    if (segment.pivotX === null && segment.pivotY === null) {
      if (nextPivotPoint === null) {
        segment.pivotX = nextPivotPoint[0];
        segment.pivotY = nextPivotPoint[1];
      }
    }
   

    switch (segment.direction) {
      case 0:
        // Move Up
        segment.y -= snakeSpeed;
        break;
      case 1:
        // Move Right
        segment.x += snakeSpeed;
        break;
      case 2:
        // Move Down
        segment.y += snakeSpeed;
        break;
      case 3:
        // Move Left
        segment.x -= snakeSpeed;
        break;
      default:
    }
  });
  renderSnake(snake);


  //  Reset for next view with values set above

}

function renderSnake(snake) {
  snake.forEach((segment) => {
    if (segment === snake[0]) {
      segment.color = "#5CDB95";
    } else {
      segment.color = "#05386B";
    }

    renderRectangle(
      segment.x,
      segment.y,
      segmentSize,
      segmentSize,
      segment.color
    );
  });
}

// function moveSnakeHorizontal() {
//   snake.forEach((segment) => {
//     if (segment.y >= 0) {
//       if (leftArrowKey && segment.x >= 0) {
//         segment.x -= snakeSpeedX;
//       }
//       if (rightArrowKey && segment.x <= canvas.width) {
//         segment.x += snakeSpeedX;
//       }
//     }
//   });
// }

// function moveSnakeVertical() {
//   snake.forEach((segment) => {
//     if (segment.x >= 0) {
//       if (upArrowKey && segment.y >= 0) {
//         segment.y -= snakeSpeedY;
//       }
//       if (downArrowKey && segment.y <= canvas.height) {
//         segment.y += snakeSpeedY;
//       }
//     }
//   });
// }

// function clearSnakeDirectionValues() {
//   rightArrowKey = false;
//   leftArrowKey = false;
//   upArrowKey = false;
//   downArrowKey = false;
// }

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

function renderSnakeOLD() {
  snake.forEach((segment) => {
    renderRectangle(segment.x, segment.y, segmentSize, segmentSize, "#05386B");
  });
}

function renderGameObjects() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  renderBackground();
  renderGrid();
  renderSnake;
  // renderSnakeOLD();
  renderApple();

  if (isSnakeEatingApple()) {
    console.log("Apple Eaten");
    let newSnakeSegment = [{ x: appleX, y: appleY }];
    snake.push(newSnakeSegment);
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
  // let newSnakeSegment = [{ x: appleX, y: appleY }];
  // snake.push[newSnakeSegment];
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

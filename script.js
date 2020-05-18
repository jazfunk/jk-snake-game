let canvas = document.getElementById("gameCanvas");
let canvasContext = canvas.getContext("2d");

let segmentSize = 20;
let snakeX = canvas.width / 2;
let snakeY = canvas.height / 2;
let snakeSpeed = 20;

const snake = [
  {
    x: canvas.width / 2,
    y: canvas.height / 2,
    direction: null,
    pivotX: null,
    pivotY: null,
    pivotDirection: null,
    color: null,
  },
  {
    x: canvas.width / 2,
    y: canvas.height / 2 + segmentSize,
    direction: null,
    pivotX: null,
    pivotY: null,
    pivotDirection: null,
    color: null,
  },
  {
    x: canvas.width / 2,
    y: canvas.height / 2 + segmentSize * 2,
    direction: null,
    pivotX: null,
    pivotY: null,
    pivotDirection: null,
    color: null,
  },
  {
    x: canvas.width / 2,
    y: canvas.height / 2 + segmentSize * 3,
    direction: null,
    pivotX: null,
    pivotY: null,
    pivotDirection: null,
    color: null,
  },
];

let nextPivotPoint = [];

let appleX = 0;
let appleY = 0;

let myTimer;

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

  const FRAMES_PER_SECOND = 5;
  let direction = null;

  if (e.key === "Up" || e.key === "ArrowUp") {
    direction = 0;
  }

  if (e.key === "Right" || e.key === "ArrowRight") {
    direction = 1;
  }

  if (e.key === "Down" || e.key === "ArrowDown") {
    direction = 2;
  }

  if (e.key === "Left" || e.key === "ArrowLeft") {
    direction = 3;
  }

  if (direction !== null) {
    renderGameObjects();
    myTimer = setInterval(() => {
      moveSnake(direction);
      renderGameObjects();
    }, 1000 / FRAMES_PER_SECOND);
  }
}

function moveSnake(direction) {
  snake.forEach((segment) => {
    // Initialize direction
    if (segment.direction === null) {
      segment.direction = direction;
    }

    // Set snake head direction and pivot points if changing directions
    if (segment === snake[0]) {
      if (segment.direction !== direction) {
        segment.direction = direction;
        nextPivotPoint[0] = segment.x;
        nextPivotPoint[1] = segment.y;
      }
    }

    //  Check to see if we're at the next pivot point
    if (segment.x === nextPivotPoint[0] && segment.y === nextPivotPoint[1]) {
      if (segment.pivotDirection !== null) {
        segment.direction = segment.pivotDirection;
      }
    }

    // Set next pivot x, y.
    if (segment.pivotX === null && segment.pivotY === null) {
      if (nextPivotPoint.length > 0) {
        segment.pivotX = nextPivotPoint[0];
        segment.pivotY = nextPivotPoint[1];
        segment.pivotDirection = direction;
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
}

function renderSnake(snake) {
  snake.forEach((segment) => {
    if (segment === snake[0]) {
      segment.color = "#379683";
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
  renderSnake(snake);
  renderApple();

  if (isSnakeEatingApple()) {

    // if lastSegment.direction is up/right/down/left
    // push new object to snake array with
    // coordinates that put it at the end of the snake.
    // Tricky because you have to determine the direction of
    // the last segment.

    const lastSegment = snake.slice(-1)[0];
    let newSegmentX = lastSegment.x;
    let newSegmentY = lastSegment.y;
    switch (lastSegment.direction) {
      case 0:
        newSegmentY += segmentSize;
        break;
      case 1:
        newSegmentX -= segmentSize;
        break;
      case 2:
        newSegmentY -= segmentSize;
        break;
      case 3:
        newSegmentX += segmentSize;
        break;
      default:
    }

    console.log("Apple Eaten");
    snake.push({
      x: newSegmentX,
      y: newSegmentY,
      direction: null,
      pivotX: null,
      pivotY: null,
      pivotDirection: null,
      color: "#05386B",
    });
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
  return snake[0].x === appleX && snake[0].y === appleY;
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

let canvas = document.getElementById("gameCanvas");
let canvasContext = canvas.getContext("2d");

const SEGMENT_SIZE = 20;
const SNAKE_SPEED = 20;

const snake = [
  {
    x: canvas.width / 2,
    y: canvas.height / 2,
    color: null,
  },
  {
    x: canvas.width / 2,
    y: canvas.height / 2 + SEGMENT_SIZE,
    color: null,
  },
  {
    x: canvas.width / 2,
    y: canvas.height / 2 + SEGMENT_SIZE * 2,
    color: null,
  },
  {
    x: canvas.width / 2,
    y: canvas.height / 2 + SEGMENT_SIZE * 3,
    color: null,
  },
];

let appleX = 0;
let appleY = 0;

let myTimer;

window.onload = () => {
  generateRandomAppleLocation();
  renderGameObjects();
};

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
  clearInterval(myTimer);

  const FRAMES_PER_SECOND = 5;
  let direction = null;

  if (e.key === "Up" || e.key === "ArrowUp") {
    direction = "up";
  }

  if (e.key === "Right" || e.key === "ArrowRight") {
    direction = "right";
  }

  if (e.key === "Down" || e.key === "ArrowDown") {
    direction = "down";
  }

  if (e.key === "Left" || e.key === "ArrowLeft") {
    direction = "left";
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
  let currentSegment = [];
  let nextSegment = [];

  snake.forEach((segment) => {
    currentSegment[0] = segment.x;
    currentSegment[1] = segment.y;

    if (segment !== snake[0]) {
      segment.x = nextSegment[0];
      segment.y = nextSegment[1];
    } else {
      switch (direction) {
        case "up":
          segment.y -= SNAKE_SPEED;
          break;
        case "right":
          segment.x += SNAKE_SPEED;
          break;
        case "down":
          segment.y += SNAKE_SPEED;
          break;
        case "left":
          segment.x -= SNAKE_SPEED;
          break;
        default:
      }
    }
    nextSegment[0] = currentSegment[0];
    nextSegment[1] = currentSegment[1];
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
      SEGMENT_SIZE,
      SEGMENT_SIZE,
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

function renderGameObjects() {
  renderBackground();
  renderGrid();
  renderSnake(snake);
  renderApple();

  if (isSnakeEatingApple()) {
    const lastSegment = snake.slice(-1)[0];
    let newSegmentX = lastSegment.x;
    let newSegmentY = lastSegment.y;
    switch (lastSegment.direction) {
      case "up":
        newSegmentY += SEGMENT_SIZE;
        break;
      case "right":
        newSegmentX -= SEGMENT_SIZE;
        break;
      case "down":
        newSegmentY -= SEGMENT_SIZE;
        break;
      case "left":
        newSegmentX += SEGMENT_SIZE;
        break;
      default:
    }

    // Increment apple counter
    console.log("Apple Eaten");

    snake.push({
      x: newSegmentX,
      y: newSegmentY,
      color: lastSegment.color,
    });
    generateRandomAppleLocation();
  }
}

function renderRectangle(leftX, topY, width, height, renderColor) {
  canvasContext.fillStyle = renderColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function renderApple() {
  renderRectangle(appleX, appleY, SEGMENT_SIZE, SEGMENT_SIZE, "#379683");
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

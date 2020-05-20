let canvas = document.getElementById("gameCanvas");
let canvasContext = canvas.getContext("2d");

const SEGMENT_SIZE = 20;
const SNAKE_SPEED = 20;
const snake = [];

let appleX = 0;
let appleY = 0;
let score = 0;

let myTimer;
let gameOver = false;
let currentDirection = null;

window.onload = () => {
  startGame();
};

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("click", () => {
    if (gameOver) {
      startGame();
    }
  });

function startGame() {
  gameOver = false;
  initializeSnake();
  generateRandomAppleLocation();
  renderGameObjects();
}

function initializeSnake() {  
  snake.length = 0;
  snake.push(
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
    }
  );
}

function keyDownHandler(e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
  clearInterval(myTimer);

  const FRAMES_PER_SECOND = 10;
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
      if (gameOver === false) {
        moveSnake(direction);
        renderGameObjects();
      }
    }, 1000 / FRAMES_PER_SECOND);
  }
}

function moveSnake(direction) {
  let currentSegment = [];
  let nextSegment = [];

  snake.forEach((segment) => {
    if (gameOver) {
      return;
    } else {
      currentSegment[0] = segment.x;
      currentSegment[1] = segment.y;

      if (segment !== snake[0]) {
        segment.x = nextSegment[0];
        segment.y = nextSegment[1];
      } else {
        if (detectCollision(segment)) {
          endGame();
          return;
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
      }

      if (gameOver === false) {
        nextSegment[0] = currentSegment[0];
        nextSegment[1] = currentSegment[1];
      }
    }
  });
}

function detectCollision(snakeHead) {
  if (
    snakeHead.x < 0 ||
    snakeHead.x === canvas.width ||
    snakeHead.y < 0 ||
    snakeHead.y === canvas.height
  ) {
    return true;
  }

  let hitSelf = false;
  snake.forEach((segment) => {
    if (segment !== snake[0]) {
      if (segment.x === snakeHead.x && segment.y === snakeHead.y) {
        hitSelf = true;
      }
    }
  });

  return hitSelf;
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

function renderScore() {
  score++;
  let scoreDisplay = document.getElementById("score-board");
  scoreDisplay.innerText = `Apples Eaten:  ${score}`;
}

function renderGameObjects() {
  if (gameOver) {
    return;
  }
  renderBackground();
  renderGrid();
  renderSnake(snake);
  renderApple();

  if (isSnakeEatingApple()) {
    const lastSegment = snake.slice(-1)[0];

    snake.push({
      x: lastSegment.x,
      y: lastSegment.y,
      color: lastSegment.color,
    });

    renderScore();
    generateRandomAppleLocation();
  }
}

function renderRectangle(leftX, topY, width, height, renderColor) {
  canvasContext.fillStyle = renderColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function generateRandomAppleLocation() {
  appleX = Math.floor(Math.random() * 40) * 20;
  appleY = Math.floor(Math.random() * 30) * 20;
}

function renderApple() {
  renderRectangle(appleX, appleY, SEGMENT_SIZE, SEGMENT_SIZE, "#379683");
}

function isSnakeEatingApple() {
  return snake[0].x === appleX && snake[0].y === appleY;
}

function endGame() {
  clearInterval(myTimer);
  displayGameOver();
  gameOver = true;
}

function displayGameOver() {
  canvasContext.font = "38px Unknown Font, sans-serif";
  canvasContext.fillStyle = "#05386B";
  let displayText = "Game Over - Click anywhere to play again.";
  let displayTextSize = canvasContext.measureText(displayText);
  canvasContext.fillText(
    displayText,
    canvas.width / 2 - displayTextSize.width / 2,
    canvas.height / 2
  );
}
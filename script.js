let canvas = GameBoard.canvas;
let canvasContext = canvas.getContext("2d");

const FRAMES_PER_SECOND = 10;
const SNAKE_SPEED = 20;
const snake = [];

let appleX = 0;
let appleY = 0;
let score = 0;

let currentIntervalID;
let gameOver = false;
let currentDirection = null;

window.onload = () => {
  startGame();
};

document.addEventListener("keydown", function(e) {
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }

  if (e.key === "Up" || e.key === "ArrowUp") {
    currentDirection = "up";
  }

  if (e.key === "Right" || e.key === "ArrowRight") {
    currentDirection = "right";
  }

  if (e.key === "Down" || e.key === "ArrowDown") {
    currentDirection = "down";
  }

  if (e.key === "Left" || e.key === "ArrowLeft") {
    currentDirection = "left";
  }
});

document.addEventListener("click", () => {
  if (gameOver) {
    startGame();
  }
});

const startGame = () => {
  gameOver = false;
  initializeSnake();
  generateRandomAppleLocation();
  runGameLoop();
  currentIntervalID = setInterval(runGameLoop, 1000 / FRAMES_PER_SECOND);
};

const runGameLoop = () => {
  if (gameOver === false) {
    moveSnake(currentDirection);
    if (isSnakeTouchingBoundary() || isSnakeTouchingItself()) {
      endGame();
    }
    if (gameOver === false) {
      GameBoard.renderGameObjects();
      checkForSnakeEatingApple();
    }
  }
};

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
      y: canvas.height / 2 + GameBoard.SEGMENT_SIZE,
      color: null,
    },
    {
      x: canvas.width / 2,
      y: canvas.height / 2 + GameBoard.SEGMENT_SIZE * 2,
      color: null,
    },
    {
      x: canvas.width / 2,
      y: canvas.height / 2 + GameBoard.SEGMENT_SIZE * 3,
      color: null,
    }
  );
}

function moveSnake(direction) {
  let currentSegment = [];
  let nextSegment = [];

  snake.forEach((segment) => {
    currentSegment[0] = segment.x;
    currentSegment[1] = segment.y;

    if (!direction) {
      return;
    }

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

function isSnakeTouchingItself() {
  let hitSelf = false;

  snake.forEach((segment) => {
    if (segment !== snake[0]) {
      if (segment.x === snake[0].x && segment.y === snake[0].y) {
        hitSelf = true;
      }
    }
  });

  return hitSelf;
}

function isSnakeTouchingBoundary() {
  return (
    snake[0].x < 0 ||
    snake[0].x === canvas.width ||
    snake[0].y < 0 ||
    snake[0].y === canvas.height
  );
}

const checkForSnakeEatingApple = () => {
  if (isSnakeEatingApple()) {
    const lastSegment = snake.slice(-1)[0];

    snake.push({
      x: lastSegment.x,
      y: lastSegment.y,
      color: lastSegment.color,
    });

    score++;
    GameBoard.renderScore(score);
    generateRandomAppleLocation();
  }
};

function generateRandomAppleLocation() {
  appleX = Math.floor(Math.random() * 40) * 20;
  appleY = Math.floor(Math.random() * 30) * 20;
}

function isSnakeEatingApple() {
  return snake[0].x === appleX && snake[0].y === appleY;
}

function endGame() {
  clearInterval(currentIntervalID);
  displayGameOver();
  currentDirection = null;
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
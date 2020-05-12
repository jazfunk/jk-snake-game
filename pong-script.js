let canvas;
let canvasDisplay;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 15;
let ballSpeedY = 4;

let player1Score = 0;
let player2Score = 0;
const WINNING_SCORE = 3;

let showingWinScreen = false;

let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_THICKENESS = 10;
const PADDLE_HEIGHT = 100;

function calculateMousePos(e) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = e.clientX - rect.left - root.scrollLeft;
  let mouseY = e.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY,
  };
}

function handleMouseClick(e) {
  if (showingWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
  }
}

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasDisplay = canvas.getContext("2d");

  let framesPerSecond = 30;
  setInterval(() => {
    moveEverything();
    drawGameObjects();
  }, 1000 / framesPerSecond);

  canvas.addEventListener("mousedown", handleMouseClick);

  canvas.addEventListener("mousemove", (e) => {
    let mousePos = this.calculateMousePos(e);
    paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
  });
};

function ballReset() {
  if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
    showingWinScreen = true;
  }
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function computerMovement() {
  let paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2;
  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 6;
  } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= 6;
  }
}

function moveEverything() {
  if (showingWinScreen) {
    return;
  }
  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player2Score++;
      ballReset();
    }
  }
  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player1Score++;
      ballReset();
    }
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawNet() {
  for (let i = 0; i < canvas.height; i+=40) {
    colorRect(canvas.width/2 - 1, i, 2, 20, 'white');
  }
}

function drawGameObjects() {
  colorRect(0, 0, canvas.width, canvas.height, "black");
  canvasDisplay.fillStyle = "white";
  if (showingWinScreen) {
    if (player1Score >= WINNING_SCORE) {
      canvasDisplay.fillText("Left Player Won!", 350, 200);
      showingWinScreen = true;
    } else if (player2Score >= WINNING_SCORE)
    canvasDisplay.fillText("Right Player Won!", 350, 200);
    canvasDisplay.fillText("Click to continue", 350, 500);
    return;
  }

  drawNet();
  
  colorRect(0, paddle1Y, PADDLE_THICKENESS, PADDLE_HEIGHT, "white");

  colorRect(
    canvas.width - PADDLE_THICKENESS,
    paddle2Y,
    PADDLE_THICKENESS,
    PADDLE_HEIGHT,
    "white"
  );

  colorCircle(ballX, ballY, 10, "white");

  canvasDisplay.fillText(player1Score, 100, 100);
  canvasDisplay.fillText(player2Score, canvas.width - 100, 100);
}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasDisplay.fillStyle = drawColor;
  canvasDisplay.beginPath();
  canvasDisplay.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasDisplay.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasDisplay.fillStyle = drawColor;
  canvasDisplay.fillRect(leftX, topY, width, height);
}

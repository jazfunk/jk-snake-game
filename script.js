let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 15;
let ballSpeedY = 4;

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

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  let framesPerSecond = 30;
  setInterval(() => {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);

  canvas.addEventListener("mousemove", (e) => {
    let mousePos = this.calculateMousePos(e);
    paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
  });
};

function ballReset() {
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function computerMovement() {
  let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
  if (paddle2YCenter < ballY - 35)   {
    paddle2Y += 6;
  } else if(paddle2YCenter > ballY + 35) {
    paddle2Y -= 6;
  }
}

function moveEverything() {
  computerMovement();
  
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
    } else {
      ballReset();
    }
  }
  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
    } else {
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

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, "black");

  colorRect(0, paddle1Y, PADDLE_THICKENESS, PADDLE_HEIGHT, "white");

  colorRect(
    canvas.width - PADDLE_THICKENESS,
    paddle2Y,
    PADDLE_THICKENESS,
    PADDLE_HEIGHT,
    "white"
  );

  colorCircle(ballX, ballY, 10, "white");
}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

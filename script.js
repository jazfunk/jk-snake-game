let canvas;
let canvasContext;
let ballX = 50;
let ballSpeedX = 15;

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  let framesPerSecond = 30;
  setInterval(() => {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);
};

function moveEverything() {
  ballX += ballSpeedX;
  if (ballX > canvas.width) {
    ballSpeedX = -ballSpeedX;
  }

}

function drawEverything() {
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = "white";
  canvasContext.fillRect(0, 200, 10, 100);

  canvasContext.fillStyle = "red";
  canvasContext.fillRect(200, 200, 50, 25);

  const canvasMiddle = canvas.width / 2;

  canvasContext.fillStyle = "green";
  canvasContext.fillRect(ballX, 100, 10, 10);
}

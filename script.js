let canvas;
let canvasDisplay;

let snakeX = 50;
let snakeY = 50;


window.onload = () => {
  canvas = document.getElementById("gameCanvas");
  canvasDisplay = canvas.getContext("2d");

  let framesPerSecond = 30;
  setInterval(() => {
    // set the game off here
    drawGameObjects();
  }, 1000 / framesPerSecond);
};

function createRectangle(leftX, topY, width, height, drawColor) {
  canvasDisplay.fillStyle = drawColor;
  canvasDisplay.fillRect(leftX, topY, width, height);
}

function drawGameObjects() {
  createRectangle(0, 0, canvas.width, canvas.height, "#5CDB95");

  createRectangle(50, 50, 10, 10, "#05386B");
}

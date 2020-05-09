let canvas;
let canvasContext;
let ballX = 50;


window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  drawEverything();
  drawEverything();
  drawEverything();


};

function drawEverything() {  
  ballX += 10

  console.log(ballX);
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = "red";
  canvasContext.fillRect(200, 200, 50, 25);

  const canvasMiddle = canvas.width / 2;

  canvasContext.fillStyle = "green";
  canvasContext.fillRect(ballX, 250, 330, 10);
}

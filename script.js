let canvas;
let canvasContext;

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = "red";
  canvasContext.fillRect(200, 200, 50, 25);

  canvasContext.fillStyle = "green";
  canvasContext.fillRect(230, 230, 10, 25);
};

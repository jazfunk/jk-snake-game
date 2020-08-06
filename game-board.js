// IIFE
const GameBoard = (function () {
  const SEGMENT_SIZE = 20;

  const canvas = document.getElementById("gameCanvas");

  const renderRectangle = (leftX, topY, width, height, renderColor) => {
    canvasContext.fillStyle = renderColor;
    canvasContext.fillRect(leftX, topY, width, height);
  };

  const renderBackground = () => {
    renderRectangle(0, 0, canvas.width, canvas.height, "#5CDB95");
  };

  const renderGrid = () => {
    let gridColor = "#8EE4AF";
    for (let row = 0; row < canvas.height; row += 20) {
      for (let col = 0; col < canvas.width; col += 20) {
        renderRectangle(col + 20, row, 1, 20, gridColor);
        renderRectangle(col, row + 20, 20, 1, gridColor);
      }
    }
  };

  const renderSnake = (snake) => {
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
  };

  const renderApple = (appleX, appleY) => {
    renderRectangle(appleX, appleY, SEGMENT_SIZE, SEGMENT_SIZE, "#379683");
  };

  const renderScore = (score) => {
    let scoreDisplay = document.getElementById("score-board");
    scoreDisplay.innerText = `Apples Eaten:  ${score}`;
  };

  
function renderGameObjects() {
  renderBackground();
  renderGrid();
  renderSnake(snake);
  renderApple(appleX, appleY);
  renderScore(score);  
}

  return {
    canvas,
    renderScore,
    renderGameObjects,
    SEGMENT_SIZE
  };
})();

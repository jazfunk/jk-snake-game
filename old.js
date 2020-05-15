

//   // 2nd attempt to increase snake size by one, by creating a class and adding to 
//   // an object array
//   // Each time an apple is eaten, the snakeSegements variable is incremented by one
//   // in another method.
//   // Look at each snakeSegment and build a SnakeSegment object, then
//   // add it to the snake[] object "array".

//   for(let i = 0; i <= snakeSegments - 1; i++) {
//     let offsetX = i * 20;
//     let offsetY = i *20;

//     let segment = new SnakeSegment();

//     segment.segmentX = snakeX;
//     segment.segmentY = snakeY;
//     segment.width = segmentSize;
//     segment.height = segmentSize;

//     if (i = 1) {
//       segment.head = true;
//       segment.segmentColor = "#5CDB95";
//     } else {
//       segment.head = false;
//       segment.segmentColor = "#05386B";
//     }

//     if (upArrowKey) {
//       segment.direction = 0;
//     }
//     if (rightArrowKey) {
//       segment.direction = 1;
//     }
//     if (downArrowyKey) {
//       segment.direction = 2;
//     }
//     if (leftArrowKey) {
//       segment.direction = 3;
//     }

//     snake.push(segment);




// // //  1st attempt to increase snake size after eating apple //
// // //    This increase the snake by one, but it shifts the 
// // //    entire snake as one piece, so wrong approach
    
// //     if (leftArrowKey) {
// //       renderRectangle(snakeX + offsetX, snakeY, segmentSize, segmentSize, "#05386B");    
// //     }
// //     if (rightArrowKey) {
// //       renderRectangle(snakeX - offsetX, snakeY, segmentSize, segmentSize, "#05386B");    
// //     }
// //     if (downArrowyKey) {
// //       renderRectangle(snakeX, snakeY - offsetY, segmentSize, segmentSize, "#05386B");    
// //     }
// //     if (upArrowKey) {
// //       renderRectangle(snakeX, snakeY + offsetY, segmentSize, segmentSize, "#05386B");    
// //     }       
//   }
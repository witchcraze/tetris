import { Game } from './core/Game';
import { Renderer } from './graphics/Renderer';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 20;

const game = new Game(BOARD_WIDTH, BOARD_HEIGHT);
const renderer = new Renderer('tetrisCanvas', CELL_SIZE);

// Game loop placeholder
function gameLoop() {
  // game.update();
  // renderer.clearCanvas();
  // renderer.drawBoard(game.board);
  // if (game.currentTetromino) {
  //   renderer.drawTetromino(game.currentTetromino);
  // }
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

// Event listener for keyboard input placeholder
document.addEventListener('keydown', (event) => {
  // game.handleInput(event.key);
});

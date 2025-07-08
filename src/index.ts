import { Game } from './core/Game';
import { Renderer } from './graphics/Renderer';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 20;

const game = new Game(BOARD_WIDTH, BOARD_HEIGHT);
const renderer = new Renderer('tetrisCanvas', CELL_SIZE);

let lastTime = 0;
const GAME_SPEED = 500; // Milliseconds per game update

function gameLoop(currentTime: number) {
  if (game.isGameOver()) {
    // Display Game Over message
    renderer.drawGameOver();
    return; // Stop the game loop
  }

  if (!lastTime) lastTime = currentTime;
  const deltaTime = currentTime - lastTime;

  if (deltaTime > GAME_SPEED) {
    game.update();
    lastTime = currentTime;
  }

  renderer.clearCanvas();
  renderer.drawBoard(game.board);
  if ((game as any).currentTetromino) {
    renderer.drawTetromino((game as any).currentTetromino);
  }

  requestAnimationFrame(gameLoop);
}

// Start the game loop
game.start();
gameLoop(0);

// Event listener for keyboard input
document.addEventListener('keydown', (event) => {
  if (game.isGameOver() && event.key === 'r') {
    game.start();
    gameLoop(0);
  } else {
    game.handleInput(event.key);
  }
});

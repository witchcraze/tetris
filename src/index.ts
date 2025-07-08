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
  if (!lastTime) lastTime = currentTime;
  const deltaTime = currentTime - lastTime;

  if (deltaTime > GAME_SPEED) {
    game.update();
    lastTime = currentTime;
  }

  renderer.clearCanvas();
  renderer.drawBoard(game.board);
  // Assuming currentTetromino is public or has a getter in Game class
  // For now, we'll directly access it for simplicity in this example
  // In a real game, you might pass it via a render method or getter
  if ((game as any).currentTetromino) {
    renderer.drawTetromino((game as any).currentTetromino);
  }

  requestAnimationFrame(gameLoop);
}

// Start the game loop
game.start();
gameLoop(0);

// Event listener for keyboard input placeholder
document.addEventListener('keydown', (event) => {
  // game.handleInput(event.key);
});

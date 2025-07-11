import { Game } from './core/Game';
import { Renderer } from './graphics/Renderer';
import { LocalStorageManager } from './utils/LocalStorageManager';
import { UIManager } from './ui/UIManager';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 20;

const game = new Game(
  BOARD_WIDTH,
  BOARD_HEIGHT,
  (linesCleared: number) => {
    // Logic to get the actual cleared line indices from the board if needed
    // For now, we'll just pass the number of lines cleared.
    // A more robust solution would involve passing the actual row indices from Board.ts
    // For a simple visual effect, we can assume the bottom-most cleared lines.
    const clearedLineIndices: number[] = [];
    for (let i = 0; i < linesCleared; i++) {
      clearedLineIndices.push(BOARD_HEIGHT - 1 - i); // Assuming lines are cleared from bottom up
    }
    renderer.triggerLineClearAnimation(clearedLineIndices);
  },
  (level: number) => {
    renderer.triggerLevelUpAnimation();
  }
);
const renderer = new Renderer('tetrisCanvas', 'nextCanvas', 'holdCanvas', CELL_SIZE);
const uiManager = new UIManager(game, renderer);

let lastTime = 0;

function gameLoop(currentTime: number) {
  if (game.isGameOver()) {
    uiManager.showGameOver();
    uiManager.showMainMenu(); // Show main menu on game over
    return; // Stop the game loop
  }

  if (!lastTime) lastTime = currentTime;
  const deltaTime = currentTime - lastTime;

  if (deltaTime > game.getDropSpeed()) {
    game.update();
    lastTime = currentTime;
  }

  renderer.clearGameCanvas();
  renderer.drawBoard(game.board);
  if (game.currentTetromino) {
    const ghostPosition = game.getGhostTetrominoPosition();
    if (ghostPosition) {
      renderer.drawGhostTetromino(game.currentTetromino, ghostPosition.y);
    }
    renderer.drawTetromino(game.currentTetromino);
  }
  if (game.nextTetrominos.length > 0) {
    renderer.drawNextTetrominos(game.nextTetrominos);
  }
  if (game.holdTetromino) {
    renderer.drawHoldTetromino(game.holdTetromino);
  }

  uiManager.updateScore(game.getScore());
  uiManager.updateHighScore(game.getHighScore());
  uiManager.updateLevel(game.getLevel());

  renderer.drawLevelUpAnimation(); // Draw level up animation if active

  requestAnimationFrame(gameLoop);
}

// Event listener for keyboard input
document.addEventListener('keydown', (event) => {
  if (game.isGameOver() && event.key === 'r') {
    game.start();
    uiManager.hideGameOver();
    uiManager.hideMainMenu(); // Hide main menu on game start
    gameLoop(0);
  } else {
    if (event.key === ' ') {
      game.hardDrop();
    } else {
      game.handleInput(event.key);
    }
  }
});

// Initial setup
uiManager.showMainMenu(); // Show main menu initially
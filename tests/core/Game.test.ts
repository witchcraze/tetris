import { Game } from '../../src/core/Game';
import { Board } from '../../src/core/Board';
import { Tetromino } from '../../src/core/Tetromino';

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game(10, 20);
    game.start();
  });

  it('should initialize score to 0', () => {
    expect(game.getScore()).toBe(0);
  });

  // Helper to fill a line on the game's board
  const fillLine = (y: number) => {
    for (let x = 0; x < game.board.width; x++) {
      game.board.grid[y][x] = 1;
    }
  };

  it('should add score for single line clear', () => {
    fillLine(19); // Fill the bottom line on game.board
    const tetromino = new Tetromino(0, 18, 'I'); // Place just above the filled line
    game.board.placeTetromino(tetromino);
    const linesCleared = game.board.clearLines();
    game['score'] += game['getScoreForLines'](linesCleared); // Manually add score
    expect(game.getScore()).toBe(100);
  });

  it('should add score for double line clear', () => {
    fillLine(19);
    fillLine(18);
    const tetromino = new Tetromino(0, 17, 'I'); // Place just above the filled lines
    game.board.placeTetromino(tetromino);
    const linesCleared = game.board.clearLines();
    game['score'] += game['getScoreForLines'](linesCleared);
    expect(game.getScore()).toBe(300);
  });

  it('should add score for triple line clear', () => {
    fillLine(19);
    fillLine(18);
    fillLine(17);
    const tetromino = new Tetromino(0, 16, 'I'); // Place just above the filled lines
    game.board.placeTetromino(tetromino);
    const linesCleared = game.board.clearLines();
    game['score'] += game['getScoreForLines'](linesCleared);
    expect(game.getScore()).toBe(500);
  });

  it('should add score for tetris (four line clear)', () => {
    fillLine(19);
    fillLine(18);
    fillLine(17);
    fillLine(16);
    const tetromino = new Tetromino(0, 15, 'I'); // Place just above the filled lines
    game.board.placeTetromino(tetromino);
    const linesCleared = game.board.clearLines();
    game['score'] += game['getScoreForLines'](linesCleared);
    expect(game.getScore()).toBe(800);
  });

  it('should add score for hard drop (no line clear)', () => {
    game.currentTetromino = new Tetromino(0, 0, 'I'); // Start at top
    const initialY = game.currentTetromino.y;
    const ghostY = game.getGhostTetrominoPosition()?.y || 0; // Get the expected final Y
    game.hardDrop();
    const distanceDropped = ghostY - initialY;
    expect(game.getScore()).toBe(distanceDropped * 2); // Should be 36
  });

  it('getGhostTetrominoPosition should return correct ghostY', () => {
    game.currentTetromino = new Tetromino(0, 0, 'I'); // Start at top
    const ghostPosition = game.getGhostTetrominoPosition();
    expect(ghostPosition?.y).toBe(18); // Should drop to y=18
  });
});
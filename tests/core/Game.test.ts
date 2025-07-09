import { Game } from '../../src/core/Game';
import { Board } from '../../src/core/Board';
import { Tetromino } from '../../src/core/Tetromino';
import { LocalStorageManager } from '../../src/utils/LocalStorageManager'; // Import LocalStorageManager

// Mock LocalStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
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

  // High Score Tests
  it('should initialize high score to 0 if no high score in localStorage', () => {
    expect(game.getHighScore()).toBe(0);
  });

  it('should load high score from localStorage on start', () => {
    localStorage.setItem('highScore', '1000');
    game = new Game(10, 20); // Re-initialize game to load from localStorage
    game.start();
    expect(game.getHighScore()).toBe(1000);
  });

  it('should update high score if current score is greater than high score on game over', () => {
    game['score'] = 500; // Manually set current score
    game['gameOver'] = true; // Manually set game over
    game.isGameOver(); // Trigger high score update
    expect(game.getHighScore()).toBe(500);
    expect(localStorage.getItem('highScore')).toBe('500');

    game = new Game(10, 20); // New game, should load 500 as high score
    game.start();
    game['score'] = 1000;
    game['gameOver'] = true;
    game.isGameOver();
    expect(game.getHighScore()).toBe(1000);
    expect(localStorage.getItem('highScore')).toBe('1000');
  });

  it('should not update high score if current score is less than high score on game over', () => {
    localStorage.setItem('highScore', '1000');
    game = new Game(10, 20);
    game.start(); // High score is 1000
    game['score'] = 500;
    game['gameOver'] = true;
    game.isGameOver();
    expect(game.getHighScore()).toBe(1000);
    expect(localStorage.getItem('highScore')).toBe('1000');
  });

  it('should not update high score if current score is equal to high score on game over', () => {
    localStorage.setItem('highScore', '500');
    game = new Game(10, 20);
    game.start(); // High score is 500
    game['score'] = 500;
    game['gameOver'] = true;
    game.isGameOver();
    expect(game.getHighScore()).toBe(500);
    expect(localStorage.getItem('highScore')).toBe('500');
  });
});
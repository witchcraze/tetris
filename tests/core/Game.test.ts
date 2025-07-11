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
  let mockTetrominoIndex: number;
  const mockTetrominoSequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z', 'I', 'J', 'L', 'O', 'S', 'T', 'Z'];

  beforeEach(() => {
    mockTetrominoIndex = 0; // Reset for each test
    localStorageMock.clear();
    game = new Game(10, 20);

    // Mock the generateRandomTetromino method directly on the game instance
    jest.spyOn(game as any, 'generateRandomTetromino').mockImplementation(() => {
      const type = mockTetrominoSequence[mockTetrominoIndex % mockTetrominoSequence.length];
      mockTetrominoIndex++;
      return new Tetromino(Math.floor(game.board.width / 2) - 2, 0, type);
    });

    game.start(); // Start the game for each test
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Clean up mocks after each test
  });

  it('should initialize score to 0', () => {
    expect(game.getScore()).toBe(0);
    expect(game.getLevel()).toBe(1);
  });

  // Helper to fill a line on the game's board
  const fillLine = (y: number) => {
    for (let x = 0; x < game.board.width; x++) {
      game.board.grid[y][x] = 'test_color';
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
    const ghostY = game.getGhostTetrominoPosition()?.y || 0;
    game.hardDrop();
    const distanceDropped = ghostY - initialY;
    expect(game.getScore()).toBe(distanceDropped * 2);
  });

  it('getGhostTetrominoPosition should return correct ghostY', () => {
    game.currentTetromino = new Tetromino(0, 0, 'I');
    const ghostPosition = game.getGhostTetrominoPosition();
    expect(ghostPosition?.y).toBe(18);
  });

  // High Score Tests
  it('should initialize high score to 0 if no high score in localStorage', () => {
    expect(game.getHighScore()).toBe(0);
  });

  it('should load high score from localStorage on start', () => {
    localStorage.setItem('highScore', '1000');
    game = new Game(10, 20);
    game.start();
    expect(game.getHighScore()).toBe(1000);
  });

  it('should update high score if current score is greater than high score on game over', () => {
    game['score'] = 500;
    game['gameOver'] = true;
    game.isGameOver();
    expect(game.getHighScore()).toBe(500);
    expect(localStorage.getItem('highScore')).toBe('500');

    game = new Game(10, 20);
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
    game.start();
    game['score'] = 500;
    game['gameOver'] = true;
    game.isGameOver();
    expect(game.getHighScore()).toBe(1000);
    expect(localStorage.getItem('highScore')).toBe('1000');
  });

  it('should not update high score if current score is equal to high score on game over', () => {
    localStorage.setItem('highScore', '500');
    game = new Game(10, 20);
    game.start();
    game['score'] = 500;
    game['gameOver'] = true;
    game.isGameOver();
    expect(game.getHighScore()).toBe(500);
    expect(localStorage.getItem('highScore')).toBe('500');
  });

  // Level Tests
  it('should initialize level to 1', () => {
    expect(game.getLevel()).toBe(1);
  });

  it('should increase level based on score', () => {
    game['score'] = 900;
    game.currentTetromino = new Tetromino(0, 0, 'I');
    fillLine(19);
    game.hardDrop();
    expect(game.getLevel()).toBe(2);

    game['score'] = 1900;
    game.currentTetromino = new Tetromino(0, 0, 'I');
    fillLine(19);
    game.hardDrop();
    expect(game.getLevel()).toBe(3);
  });

  it('should return correct drop speed based on level', () => {
    game['level'] = 1;
    expect(game.getDropSpeed()).toBe(500);

    game['level'] = 2;
    expect(game.getDropSpeed()).toBe(450);

    game['level'] = 10;
    expect(game.getDropSpeed()).toBe(50);

    game['level'] = 11;
    expect(game.getDropSpeed()).toBe(50);
  });

  it('should initialize nextTetrominos with 3 tetrominos on start', () => {
    expect(game.nextTetrominos).toHaveLength(3);
    expect(game.nextTetrominos[0]).toBeInstanceOf(Tetromino);
    expect(game.nextTetrominos[1]).toBeInstanceOf(Tetromino);
    expect(game.nextTetrominos[2]).toBeInstanceOf(Tetromino);
  });

  it('spawnTetromino should shift current and add new to nextTetrominos', () => {
    const initialNextTetrominos = game.nextTetrominos.map(t => t.getType());
    const initialCurrentTetrominoType = game.currentTetromino?.getType();

    game.spawnTetromino();

    expect(game.currentTetromino?.getType()).toEqual(initialNextTetrominos[0]);
    expect(game.nextTetrominos).toHaveLength(3);
    expect(game.nextTetrominos[0].getType()).toEqual(initialNextTetrominos[1]);
    expect(game.nextTetrominos[1].getType()).toEqual(initialNextTetrominos[2]);
    expect(game.nextTetrominos[2]).toBeInstanceOf(Tetromino);
  });

  it('should handle holdTetromino swap correctly with nextTetrominos', () => {
    const initialCurrentType = game.currentTetromino?.getType();
    const initialNextTetrominosTypes = game.nextTetrominos.map(t => t.getType());

    // First hold: current goes to hold, next becomes current
    game.handleInput('c');
    expect(game.holdTetromino?.getType()).toEqual(initialCurrentType);

    const nextTetrominosTypesAfterFirstHold = game.nextTetrominos.map(t => t.getType());
    const currentTetrominoAfterFirstHold = game.currentTetromino; // Keep the object reference

    // Manually allow holding again for the test
    game['canHold'] = true; // Access private property for testing

    // Second hold: held goes to current, current goes to held
    game.handleInput('c');
    expect(game.holdTetromino?.getType()).toEqual(currentTetrominoAfterFirstHold?.getType());
    expect(game.currentTetromino?.getType()).toEqual(initialCurrentType);
    expect(game.nextTetrominos.map(t => t.getType())).toEqual(nextTetrominosTypesAfterFirstHold);
  });
});

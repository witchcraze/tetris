import { Board } from '../../src/core/Board';
import { Tetromino } from '../../src/core/Tetromino'; // Import Tetromino

describe('Board', () => {
  let board: Board;

  beforeEach(() => {
    board = new Board(10, 20); // Create a fresh board for each test
  });

  it('should create a board with the specified dimensions', () => {
    expect(board.width).toBe(10);
    expect(board.height).toBe(20);
    expect(board.grid.length).toBe(20);
    expect(board.grid[0].length).toBe(10);
  });

  it('should not collide with empty space', () => {
    const tetromino = new Tetromino(0, 0, 'I');
    expect(board.checkCollision(tetromino, 0, 1)).toBe(false); // Should not collide when moving down
  });

  it('should collide with bottom boundary', () => {
    const tetromino = new Tetromino(0, 19, 'I'); // Place at the very bottom
    expect(board.checkCollision(tetromino, 0, 20)).toBe(true); // Should collide if moving one step down
  });

  it('should collide with left boundary', () => {
    const tetromino = new Tetromino(0, 0, 'I');
    expect(board.checkCollision(tetromino, -1, 0)).toBe(true);
  });

  it('should collide with right boundary', () => {
    const tetromino = new Tetromino(9, 0, 'I'); // Place at the very right
    expect(board.checkCollision(tetromino, 10, 0)).toBe(true);
  });

  it('should collide with existing blocks', () => {
    board.grid[0][0] = 'test_color'; // Place a block at (0,0)
    const tetromino = new Tetromino(0, 0, 'O'); // O-tetromino is 2x2
    expect(board.checkCollision(tetromino, 0, 0)).toBe(true); // Should collide with the existing block
  });
});
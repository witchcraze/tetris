export class Board {
  private width: number;
  private height: number;
  private grid: (number | null)[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = Array(height).fill(null).map(() => Array(width).fill(null));
  }

  // Placeholder for methods like:
  // - checkCollision(tetromino: Tetromino, x: number, y: number): boolean
  // - placeTetromino(tetromino: Tetromino, x: number, y: number): void
  // - clearLines(): number
  // - isGameOver(): boolean
}

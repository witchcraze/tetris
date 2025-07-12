import { Tetromino } from './Tetromino';

export class Board {
  public width: number;
  public height: number;
  public grid: (string | null)[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = Array(height).fill(null).map(() => Array(width).fill(null));
  }

  checkCollision(tetromino: Tetromino, newX: number, newY: number): boolean {
    const shape = tetromino.getShape();
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const boardX = newX + x;
          const boardY = newY + y;

          // Check boundaries (left, right, bottom)
          if (boardX < 0 || boardX >= this.width || boardY >= this.height) {
            return true; // Collision with wall or floor
          }
          // Check collision with existing blocks (only if within top boundary)
          if (boardY >= 0 && this.grid[boardY][boardX] !== null) {
            return true; // Collision with existing block
          }
        }
      }
    }
    return false;
  }

  placeTetromino(tetromino: Tetromino): void {
    const shape = tetromino.getShape();
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          this.grid[tetromino.y + y][tetromino.x + x] = tetromino.getSkinColor(); // Store the color
        }
      }
    }
  }

  clear(): void {
    this.grid = Array(this.height).fill(null).map(() => Array(this.width).fill(null));
  }

  clearLines(): number {
    let linesCleared = 0;
    const newGrid: (string | null)[][] = Array(this.height).fill(null).map(() => Array(this.width).fill(null));
    let newRow = this.height - 1;

    for (let y = this.height - 1; y >= 0; y--) {
      if (this.grid[y].every(cell => cell !== null)) {
        linesCleared++;
      } else {
        newGrid[newRow] = this.grid[y];
        newRow--;
      }
    }
    this.grid = newGrid;
    return linesCleared;
  }

  // Placeholder for methods like:
  // - isGameOver(): boolean
}

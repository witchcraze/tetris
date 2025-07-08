import { Board } from '../core/Board';

export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cellSize: number;

  constructor(canvasId: string, cellSize: number) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.cellSize = cellSize;
  }

  drawBoard(board: Board): void {
    for (let y = 0; y < board.height; y++) {
      for (let x = 0; x < board.width; x++) {
        if (board.grid[y][x] !== 0) { // Assuming 0 is empty
          this.ctx.fillStyle = 'gray'; // Placeholder color
          this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }
  }

  drawTetromino(tetromino: Tetromino): void {
    const shape = tetromino.getShape();
    const color = 'red'; // Placeholder color

    this.ctx.fillStyle = color;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          this.ctx.fillRect(
            (tetromino.x + x) * this.cellSize,
            (tetromino.y + y) * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawGameOver(): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, this.canvas.height / 2 - 30, this.canvas.width, 60);
    this.ctx.fillStyle = 'white';
    this.ctx.font = '30px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 2 + 10);
  }
}

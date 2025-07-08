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

  // Placeholder for methods like:
  // - drawBoard(board: Board): void
  // - drawTetromino(tetromino: Tetromino): void
  // - clearCanvas(): void
}

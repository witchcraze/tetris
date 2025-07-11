import { Board } from '../core/Board';
import { Tetromino } from '../core/Tetromino';

export class Renderer {
  private gameCanvas: HTMLCanvasElement;
  private gameCtx: CanvasRenderingContext2D;
  private nextCanvas: HTMLCanvasElement;
  private nextCtx: CanvasRenderingContext2D;
  private holdCanvas: HTMLCanvasElement;
  private holdCtx: CanvasRenderingContext2D;
  private cellSize: number;

  constructor(gameCanvasId: string, nextCanvasId: string, holdCanvasId: string, cellSize: number) {
    this.gameCanvas = document.getElementById(gameCanvasId) as HTMLCanvasElement;
    this.gameCtx = this.gameCanvas.getContext('2d')!;
    this.nextCanvas = document.getElementById(nextCanvasId) as HTMLCanvasElement;
    this.nextCtx = this.nextCanvas.getContext('2d')!;
    this.holdCanvas = document.getElementById(holdCanvasId) as HTMLCanvasElement;
    this.holdCtx = this.holdCanvas.getContext('2d')!;
    this.cellSize = cellSize;
  }

  drawBoard(board: Board): void {
    for (let y = 0; y < board.height; y++) {
      for (let x = 0; x < board.width; x++) {
        if (board.grid[y][x] !== null) {
          this.gameCtx.fillStyle = board.grid[y][x] as string;
          this.gameCtx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }
  }

  drawTetromino(tetromino: Tetromino): void {
    const shape = tetromino.getShape();
    const color = tetromino.getColor();

    this.gameCtx.fillStyle = color;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          this.gameCtx.fillRect(
            (tetromino.x + x) * this.cellSize,
            (tetromino.y + y) * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }
  }

  clearGameCanvas(): void {
    this.gameCtx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
  }

  clearNextCanvas(): void {
    this.nextCtx.clearRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
  }

  clearHoldCanvas(): void {
    this.holdCtx.clearRect(0, 0, this.holdCanvas.width, this.holdCanvas.height);
  }

  drawGameOver(): void {
    this.gameCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.gameCtx.fillRect(0, this.gameCanvas.height / 2 - 30, this.gameCanvas.width, 60);
    this.gameCtx.fillStyle = 'white';
    this.gameCtx.font = '30px Arial';
    this.gameCtx.textAlign = 'center';
    this.gameCtx.fillText('Game Over', this.gameCanvas.width / 2, this.gameCanvas.height / 2 + 10);
  }

  drawNextTetrominos(tetrominos: Tetromino[]): void {
    this.clearNextCanvas(); // Clear before drawing
    let currentOffsetY = 0; // Start from top of nextCanvas
    for (const tetromino of tetrominos) {
      const shape = tetromino.getShape();
      const color = tetromino.getColor();

      this.nextCtx.fillStyle = color;
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x] !== 0) {
            this.nextCtx.fillRect(
              x * this.cellSize,
              (currentOffsetY + y) * this.cellSize,
              this.cellSize,
              this.cellSize
            );
          }
        }
      }
      currentOffsetY += shape.length + 1; // Move down for the next tetromino, +1 for spacing
    }
  }

  drawHoldTetromino(tetromino: Tetromino): void {
    this.clearHoldCanvas(); // Clear before drawing
    const shape = tetromino.getShape();
    const color = tetromino.getColor();

    this.holdCtx.fillStyle = color;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          this.holdCtx.fillRect(
            x * this.cellSize,
            y * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }
  }

  drawScore(score: number): void {
    // Score is now handled by UIManager, no longer drawn on canvas
  }

  drawHighScore(highScore: number): void {
    // High Score is now handled by UIManager, no longer drawn on canvas
  }

  drawLevel(level: number): void {
    // Level is now handled by UIManager, no longer drawn on canvas
  }

  drawGhostTetromino(tetromino: Tetromino, ghostY: number): void {
    const shape = tetromino.getShape();
    const color = 'rgba(255, 255, 255, 0.3)'; // Transparent white

    this.gameCtx.fillStyle = color;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          this.gameCtx.fillRect(
            (tetromino.x + x) * this.cellSize,
            (ghostY + y) * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }
  }
}
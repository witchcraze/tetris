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
  private lineClearAnimationStartTime: number | null = null;
  private lineClearAnimationLines: number[] = [];
  private levelUpAnimationStartTime: number | null = null;
  private backgroundImage: HTMLImageElement | null = null;

  constructor(gameCanvasId: string, nextCanvasId: string, holdCanvasId: string, cellSize: number) {
    this.gameCanvas = document.getElementById(gameCanvasId) as HTMLCanvasElement;
    this.gameCtx = this.gameCanvas.getContext('2d')!;
    this.nextCanvas = document.getElementById(nextCanvasId) as HTMLCanvasElement;
    this.nextCtx = this.nextCanvas.getContext('2d')!;
    this.holdCanvas = document.getElementById(holdCanvasId) as HTMLCanvasElement;
    this.holdCtx = this.holdCanvas.getContext('2d')!;
    this.cellSize = cellSize;
  }

  public setBackgroundImage(imageUrl: string | null): void {
    if (imageUrl) {
      this.backgroundImage = new Image();
      this.backgroundImage.src = imageUrl;
      this.backgroundImage.onload = () => {
        // Image loaded, force redraw if necessary
      };
    } else {
      this.backgroundImage = null;
    }
  }

  private drawBackground(): void {
    if (this.backgroundImage) {
      this.gameCtx.drawImage(this.backgroundImage, 0, 0, this.gameCanvas.width, this.gameCanvas.height);
    }
  }

  drawBoard(board: Board): void {
    const now = performance.now();
    const animationDuration = 200; // ms

    for (let y = 0; y < board.height; y++) {
      for (let x = 0; x < board.width; x++) {
        // Line clear animation
        if (this.lineClearAnimationStartTime !== null && this.lineClearAnimationLines.includes(y)) {
          const elapsed = now - this.lineClearAnimationStartTime;
          if (elapsed < animationDuration) {
            // Flash effect: alternate between clear and filled
            if (Math.floor(elapsed / 50) % 2 === 0) {
              this.gameCtx.fillStyle = 'white'; // Flash color
              this.gameCtx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
            } else {
              // Draw original block or clear
              if (board.grid[y][x] !== null) {
                this.gameCtx.fillStyle = board.grid[y][x] as string;
                this.gameCtx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
              } else {
                this.gameCtx.clearRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
              }
            }
          } else {
            // Animation finished, reset
            this.lineClearAnimationStartTime = null;
            this.lineClearAnimationLines = [];
          }
        } else {
          // Normal drawing
          if (board.grid[y][x] !== null) {
            this.gameCtx.fillStyle = board.grid[y][x] as string;
            this.gameCtx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
          } else {
            this.gameCtx.clearRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
          }
        }
      }
    }
  }

  drawTetromino(tetromino: Tetromino): void {
    const shape = tetromino.getShape();
    const color = tetromino.getSkinColor(); // Use getSkinColor()

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
    this.drawBackground(); // Draw background after clearing
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
      const color = tetromino.getSkinColor(); // Use getSkinColor()

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
    const color = tetromino.getSkinColor(); // Use getSkinColor()

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

  public triggerLineClearAnimation(lines: number[]): void {
    this.lineClearAnimationLines = lines;
    this.lineClearAnimationStartTime = performance.now();
  }

  public triggerLevelUpAnimation(): void {
    this.levelUpAnimationStartTime = performance.now();
  }

  public drawLevelUpAnimation(): void {
    if (this.levelUpAnimationStartTime === null) return;

    const now = performance.now();
    const animationDuration = 1000; // 1 second
    const elapsed = now - this.levelUpAnimationStartTime;

    if (elapsed < animationDuration) {
      this.gameCtx.save();
      this.gameCtx.fillStyle = 'rgba(255, 255, 255, ' + (1 - elapsed / animationDuration) * 0.5 + ')'; // Fading white flash
      this.gameCtx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

      this.gameCtx.fillStyle = 'white';
      this.gameCtx.font = 'bold 60px Arial';
      this.gameCtx.textAlign = 'center';
      this.gameCtx.textBaseline = 'middle';
      this.gameCtx.fillText('LEVEL UP!', this.gameCanvas.width / 2, this.gameCanvas.height / 2);
      this.gameCtx.restore();
    } else {
      this.levelUpAnimationStartTime = null;
    }
  }
}
import { Board } from '../core/Board';
import { Tetromino } from '../core/Tetromino';
import {
  LINE_CLEAR_ANIMATION_DURATION,
  LINE_CLEAR_FLASH_INTERVAL,
  GAME_OVER_OVERLAY_ALPHA,
  GAME_OVER_TEXT_FONT_SIZE,
  LEVEL_UP_ANIMATION_DURATION,
  LEVEL_UP_FLASH_ALPHA,
  LEVEL_UP_TEXT_FONT_SIZE,
} from '../constants';

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
  private needsRedraw: boolean = true;

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

  public setNeedsRedraw(): void {
    this.needsRedraw = true;
  }

  drawBoard(board: Board): void {
    const now = performance.now();
    const animationDuration = LINE_CLEAR_ANIMATION_DURATION; // ms

    // Clear the entire canvas only if a full redraw is needed
    if (this.needsRedraw) {
      this.clearGameCanvas();
      this.needsRedraw = false;
    }

    for (let y = 0; y < board.height; y++) {
      for (let x = 0; x < board.width; x++) {
        // Line clear animation
        if (this.lineClearAnimationStartTime !== null && this.lineClearAnimationLines.includes(y)) {
          const elapsed = now - this.lineClearAnimationStartTime;
          if (elapsed < animationDuration) {
            // Flash effect: alternate between clear and filled
            if (Math.floor(elapsed / LINE_CLEAR_FLASH_INTERVAL) % 2 === 0) {
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
            this.needsRedraw = true; // Force redraw after animation
          }
        } else {
          // Normal drawing
          if (board.grid[y][x] !== null) {
            this.gameCtx.fillStyle = board.grid[y][x] as string;
            this.gameCtx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
          } else {
            // Only clear if the cell was previously drawn (not null)
            // This is a simplification; a true dirty rect would track previous state
            this.gameCtx.clearRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
          }
        }
      }
    }
  }

  private drawBlock(ctx: CanvasRenderingContext2D, x: number, y: number, color: string): void {
    ctx.fillStyle = color;
    ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
  }

  drawTetromino(tetromino: Tetromino): void {
    const shape = tetromino.getShape();
    const color = tetromino.getSkinColor();

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          this.drawBlock(this.gameCtx, tetromino.x + x, tetromino.y + y, color);
        }
      }
    }
  }

  drawNextTetrominos(tetrominos: Tetromino[]): void {
    this.clearNextCanvas(); // Clear before drawing
    let currentOffsetY = 0; // Start from top of nextCanvas
    for (const tetromino of tetrominos) {
      const shape = tetromino.getShape();
      const color = tetromino.getSkinColor();

      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x] !== 0) {
            this.drawBlock(this.nextCtx, x, currentOffsetY + y, color);
          }
        }
      }
      currentOffsetY += shape.length + 1; // Move down for the next tetromino, +1 for spacing
    }
  }

  drawHoldTetromino(tetromino: Tetromino): void {
    this.clearHoldCanvas(); // Clear before drawing
    const shape = tetromino.getShape();
    const color = tetromino.getSkinColor();

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          this.drawBlock(this.holdCtx, x, y, color);
        }
      }
    }
  }

  drawGhostTetromino(tetromino: Tetromino, ghostY: number): void {
    const shape = tetromino.getShape();
    const color = 'rgba(255, 255, 255, 0.3)'; // Transparent white

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          this.drawBlock(this.gameCtx, tetromino.x + x, ghostY + y, color);
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
    const animationDuration = LEVEL_UP_ANIMATION_DURATION; // 1 second
    const elapsed = now - this.levelUpAnimationStartTime;

    if (elapsed < animationDuration) {
      this.gameCtx.save();
      this.gameCtx.fillStyle = `rgba(255, 255, 255, ${ (1 - elapsed / animationDuration) * LEVEL_UP_FLASH_ALPHA})`; // Fading white flash
      this.gameCtx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

      this.gameCtx.fillStyle = 'white';
      this.gameCtx.font = `bold ${LEVEL_UP_TEXT_FONT_SIZE}px Arial`;
      this.gameCtx.textAlign = 'center';
      this.gameCtx.textBaseline = 'middle';
      this.gameCtx.fillText('LEVEL UP!', this.gameCanvas.width / 2, this.gameCanvas.height / 2);
      this.gameCtx.restore();
    } else {
      this.levelUpAnimationStartTime = null;
    }
  }
}
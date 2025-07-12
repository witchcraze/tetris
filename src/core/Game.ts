import { Board } from './Board';
import { Tetromino } from './Tetromino';
import { LocalStorageManager } from '../utils/LocalStorageManager';
import {
  INITIAL_NEXT_TETROMINOS_COUNT,
  BASE_DROP_SPEED,
  DROP_SPEED_DECREMENT_PER_LEVEL,
  LEVEL_UP_SCORE_THRESHOLD,
  SCORE_SINGLE_LINE,
  SCORE_DOUBLE_LINE,
  SCORE_TRIPLE_LINE,
  SCORE_TETRIS,
  SCORE_HARD_DROP_PER_CELL,
  LOCAL_STORAGE_HIGH_SCORE_KEY,
  TETROMINO_TYPES,
  DEFAULT_SKIN,
  GRAYSCALE_SKIN,
} from '../constants';

export class Game {
  public board: Board;
  public currentTetromino: Tetromino | null = null; // Made public for now for easier access in index.ts
  public nextTetrominos: Tetromino[] = []; // Made public for easier access in index.ts
  public holdTetromino: Tetromino | null = null; // Made public for easier access in index.ts
  private canHold: boolean = true;
  private score: number = 0;
  private highScore: number = 0;
  private level: number = 1;
  private gameOver: boolean = false;

  private onLineClearCallback: ((lines: number) => void) | null = null;
  private onLevelUpCallback: ((level: number) => void) | null = null;
  private currentSkin: { [key: string]: string } = DEFAULT_SKIN; // Default skin

  constructor(
    boardWidth: number,
    boardHeight: number,
    onLineClear?: (lines: number) => void,
    onLevelUp?: (level: number) => void
  ) {
    this.board = new Board(boardWidth, boardHeight);
    if (onLineClear) {
      this.onLineClearCallback = onLineClear;
    }
    if (onLevelUp) {
      this.onLevelUpCallback = onLevelUp;
    }
  }

  public setTetrominoSkin(skinName: string): void {
    switch (skinName) {
      case 'default':
        this.currentSkin = DEFAULT_SKIN;
        break;
      case 'grayscale':
        this.currentSkin = GRAYSCALE_SKIN;
        break;
      default:
        // Assume skinName is a single color to apply to all
        this.currentSkin = TETROMINO_TYPES.reduce((acc, type) => ({ ...acc, [type]: skinName }), {});
        break;
    }
    // Re-apply skin to current and next tetrominos if they exist
    if (this.currentTetromino) {
      this.currentTetromino = new Tetromino(this.currentTetromino.x, this.currentTetromino.y, this.currentTetromino.getType(), this.currentSkin);
    }
    this.nextTetrominos = this.nextTetrominos.map(t => new Tetromino(t.x, t.y, t.getType(), this.currentSkin));
    if (this.holdTetromino) {
      this.holdTetromino = new Tetromino(this.holdTetromino.x, this.holdTetromino.y, this.holdTetromino.getType(), this.currentSkin);
    }
  }

  start(): void {
    this.gameOver = false;
    this.score = 0;
    this.level = 1;
    this.highScore = parseInt(LocalStorageManager.loadItem(LOCAL_STORAGE_HIGH_SCORE_KEY) || '0');
    this.board.clear();
    this.holdTetromino = null;
    this.canHold = true;
    this.nextTetrominos = []; // Initialize as empty array
    for (let i = 0; i < INITIAL_NEXT_TETROMINOS_COUNT; i++) { // Generate 3 next tetrominos
      this.nextTetrominos.push(this.generateRandomTetromino());
    }
    this.spawnTetromino();
  }

  update(): void {
    console.time("Game.update");
    if (this.gameOver) return;

    if (this.currentTetromino) {
      const newY = this.currentTetromino.y + 1;
      if (!this.board.checkCollision(this.currentTetromino, this.currentTetromino.x, newY)) {
        this.currentTetromino.move(0, 1);
      } else {
        this.board.placeTetromino(this.currentTetromino);
        console.time("Board.clearLines");
        const linesCleared = this.board.clearLines();
        console.timeEnd("Board.clearLines");
        if (linesCleared > 0 && this.onLineClearCallback) {
          this.onLineClearCallback(linesCleared);
        }
        this.score += this.getScoreForLines(linesCleared);
        this.checkLevelUp();
        this.spawnTetromino();
      }
    }
    console.timeEnd("Game.update");
  }

  private getScoreForLines(lines: number): number {
    switch (lines) {
      case 1:
        return SCORE_SINGLE_LINE;
      case 2:
        return SCORE_DOUBLE_LINE;
      case 3:
        return SCORE_TRIPLE_LINE;
      case 4:
        return SCORE_TETRIS;
      default:
        return 0;
    }
  }

  private checkLevelUp(): void {
    const newLevel = Math.floor(this.score / LEVEL_UP_SCORE_THRESHOLD) + 1;
    if (newLevel > this.level) {
      this.level = newLevel;
      if (this.onLevelUpCallback) {
        this.onLevelUpCallback(this.level);
      }
    }
  }

  public getLevel(): number {
    return this.level;
  }

  public getDropSpeed(): number {
    // Adjust speed based on level (e.g., faster for higher levels)
    // Base speed: 500ms, decrease by 50ms per level
    return Math.max(50, BASE_DROP_SPEED - (this.level - 1) * DROP_SPEED_DECREMENT_PER_LEVEL);
  }

  spawnTetromino(): void {
    this.currentTetromino = this.nextTetrominos.shift() || null; // Get the first tetromino from the queue
    this.nextTetrominos.push(this.generateRandomTetromino()); // Add a new tetromino to the end of the queue

    if (this.currentTetromino && this.board.checkCollision(this.currentTetromino, this.currentTetromino.x, this.currentTetromino.y)) {
      this.gameOver = true;
    }
    this.canHold = true;
  }

  private generateRandomTetromino(): Tetromino {
    const randomType = TETROMINO_TYPES[Math.floor(Math.random() * TETROMINO_TYPES.length)];
    return new Tetromino(Math.floor(this.board.width / 2) - 2, 0, randomType, this.currentSkin);
  }

  handleInput(key: string): void {
    if (this.gameOver || !this.currentTetromino) return;

    let newX = this.currentTetromino.x;
    let newY = this.currentTetromino.y;

    switch (key) {
      case 'ArrowLeft':
        newX--;
        break;
      case 'ArrowRight':
        newX++;
        break;
      case 'ArrowDown':
        newY++;
        break;
      case 'ArrowUp':
        // Attempt to rotate
        const originalShape = this.currentTetromino.getShape();
        this.currentTetromino.rotate();
        if (this.board.checkCollision(this.currentTetromino, newX, newY)) {
          // If collision, revert rotation (simple approach for now)
          this.currentTetromino.setShape(originalShape); // Need a setShape method in Tetromino
        }
        break;
      case 'c': // Hold tetromino
        if (this.canHold) {
          if (this.holdTetromino) {
            // Swap current with held
            const temp = this.currentTetromino;
            this.currentTetromino = this.holdTetromino;
            this.holdTetromino = temp;
            this.currentTetromino.x = Math.floor(this.board.width / 2) - 2;
            this.currentTetromino.y = 0;
          } else {
            // Hold current and spawn new
            this.holdTetromino = this.currentTetromino;
            this.spawnTetromino();
          }
          this.canHold = false;
        }
        break;
    }

    if (!this.board.checkCollision(this.currentTetromino, newX, newY)) {
      this.currentTetromino.move(newX - this.currentTetromino.x, newY - this.currentTetromino.y);
    }
  }

  public isGameOver(): boolean {
    if (this.gameOver) {
      if (this.score > this.highScore) {
        this.highScore = this.score;
        LocalStorageManager.saveItem(LOCAL_STORAGE_HIGH_SCORE_KEY, this.highScore.toString());
      }
    }
    return this.gameOver;
  }

  public getScore(): number {
    return this.score;
  }

  public getHighScore(): number {
    return this.highScore;
  }

  public getGhostTetrominoPosition(): { x: number, y: number } | null {
    if (!this.currentTetromino) return null;

    let ghostY = this.currentTetromino.y;
    while (!this.board.checkCollision(this.currentTetromino, this.currentTetromino.x, ghostY + 1)) {
      ghostY++;
    }
    return { x: this.currentTetromino.x, y: ghostY };
  }

  public hardDrop(): void {
    if (this.gameOver || !this.currentTetromino) return;

    const initialY = this.currentTetromino.y;
    const ghostPosition = this.getGhostTetrominoPosition();
    if (ghostPosition) {
      this.currentTetromino.y = ghostPosition.y;
      const distanceDropped = this.currentTetromino.y - initialY;
      this.score += distanceDropped * SCORE_HARD_DROP_PER_CELL; // Score for hard drop (2 points per cell dropped)
      this.board.placeTetromino(this.currentTetromino);
      const linesCleared = this.board.clearLines();
      this.score += this.getScoreForLines(linesCleared);
      this.checkLevelUp();
      this.spawnTetromino();
    }
  }
}

import { Board } from './Board';
import { Tetromino } from './Tetromino';
import { LocalStorageManager } from '../utils/LocalStorageManager';

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

  private tetrominoTypes = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  private onLineClearCallback: ((lines: number) => void) | null = null;
  private onLevelUpCallback: ((level: number) => void) | null = null;
  private currentSkin: { [key: string]: string } = {
    'I': 'cyan',
    'J': 'blue',
    'L': 'orange',
    'O': 'yellow',
    'S': 'lime',
    'T': 'purple',
    'Z': 'red',
  }; // Default skin

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
    // In a real scenario, you would load skin data from a predefined set
    // For now, we'll use a simple mapping or assume skinName is a color
    switch (skinName) {
      case 'default':
        this.currentSkin = {
          'I': 'cyan',
          'J': 'blue',
          'L': 'orange',
          'O': 'yellow',
          'S': 'lime',
          'T': 'purple',
          'Z': 'red',
        };
        break;
      case 'grayscale':
        this.currentSkin = {
          'I': '#808080',
          'J': '#808080',
          'L': '#808080',
          'O': '#808080',
          'S': '#808080',
          'T': '#808080',
          'Z': '#808080',
        };
        break;
      // Add more cases for different skins
      default:
        // Assume skinName is a single color to apply to all
        this.currentSkin = {
          'I': skinName,
          'J': skinName,
          'L': skinName,
          'O': skinName,
          'S': skinName,
          'T': skinName,
          'Z': skinName,
        };
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
    this.highScore = parseInt(LocalStorageManager.loadItem('highScore') || '0');
    this.board.clear();
    this.holdTetromino = null;
    this.canHold = true;
    this.nextTetrominos = []; // Initialize as empty array
    for (let i = 0; i < 3; i++) { // Generate 3 next tetrominos
      this.nextTetrominos.push(this.generateRandomTetromino());
    }
    this.spawnTetromino();
  }

  update(): void {
    if (this.gameOver) return;

    if (this.currentTetromino) {
      const newY = this.currentTetromino.y + 1;
      if (!this.board.checkCollision(this.currentTetromino, this.currentTetromino.x, newY)) {
        this.currentTetromino.move(0, 1);
      } else {
        this.board.placeTetromino(this.currentTetromino);
        const linesCleared = this.board.clearLines();
        if (linesCleared > 0 && this.onLineClearCallback) {
          this.onLineClearCallback(linesCleared);
        }
        this.score += this.getScoreForLines(linesCleared);
        this.checkLevelUp();
        this.spawnTetromino();
      }
    }
  }

  private getScoreForLines(lines: number): number {
    switch (lines) {
      case 1:
        return 100;
      case 2:
        return 300;
      case 3:
        return 500;
      case 4:
        return 800;
      default:
        return 0;
    }
  }

  private checkLevelUp(): void {
    const newLevel = Math.floor(this.score / 1000) + 1;
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
    return Math.max(50, 500 - (this.level - 1) * 50);
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
    const randomType = this.tetrominoTypes[Math.floor(Math.random() * this.tetrominoTypes.length)];
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
        LocalStorageManager.saveItem('highScore', this.highScore.toString());
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
      this.score += distanceDropped * 2; // Score for hard drop (2 points per cell dropped)
      this.board.placeTetromino(this.currentTetromino);
      const linesCleared = this.board.clearLines();
      this.score += this.getScoreForLines(linesCleared);
      this.checkLevelUp();
      this.spawnTetromino();
    }
  }
}

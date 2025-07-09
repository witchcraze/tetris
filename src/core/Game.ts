import { Board } from './Board';
import { Tetromino } from './Tetromino';

export class Game {
  private board: Board;
  public currentTetromino: Tetromino | null = null; // Made public for now for easier access in index.ts
  public nextTetromino: Tetromino | null = null; // Made public for easier access in index.ts
  public holdTetromino: Tetromino | null = null; // Made public for easier access in index.ts
  private canHold: boolean = true;
  private score: number = 0;
  private gameOver: boolean = false;

  private tetrominoTypes = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

  constructor(boardWidth: number, boardHeight: number) {
    this.board = new Board(boardWidth, boardHeight);
  }

  start(): void {
    this.gameOver = false;
    this.score = 0;
    this.board.clear();
    this.holdTetromino = null;
    this.canHold = true;
    this.nextTetromino = this.generateRandomTetromino();
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
        this.score += this.getScoreForLines(linesCleared);
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

  spawnTetromino(): void {
    this.currentTetromino = this.nextTetromino;
    this.nextTetromino = this.generateRandomTetromino();

    if (this.currentTetromino && this.board.checkCollision(this.currentTetromino, this.currentTetromino.x, this.currentTetromino.y)) {
      this.gameOver = true;
    }
    this.canHold = true;
  }

  private generateRandomTetromino(): Tetromino {
    const randomType = this.tetrominoTypes[Math.floor(Math.random() * this.tetrominoTypes.length)];
    return new Tetromino(Math.floor(this.board.width / 2) - 2, 0, randomType);
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
    return this.gameOver;
  }

  public getScore(): number {
    return this.score;
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

    const ghostPosition = this.getGhostTetrominoPosition();
    if (ghostPosition) {
      this.currentTetromino.y = ghostPosition.y;
      this.board.placeTetromino(this.currentTetromino);
      const linesCleared = this.board.clearLines();
      this.score += this.getScoreForLines(linesCleared);
      this.spawnTetromino();
    }
  }
}

import { Board } from './Board';
import { Tetromino } from './Tetromino';

export class Game {
  private board: Board;
  public currentTetromino: Tetromino | null = null; // Made public for now for easier access in index.ts
  private nextTetromino: Tetromino | null = null;
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
        this.spawnTetromino();
      }
    }
  }

  spawnTetromino(): void {
    const randomType = this.tetrominoTypes[Math.floor(Math.random() * this.tetrominoTypes.length)];
    const newTetromino = new Tetromino(Math.floor(this.board.width / 2) - 2, 0, randomType);

    if (this.board.checkCollision(newTetromino, newTetromino.x, newTetromino.y)) {
      this.gameOver = true;
    } else {
      this.currentTetromino = newTetromino;
    }
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
      // case 'ArrowUp': // For rotation, will be implemented later
      //   break;
    }

    if (!this.board.checkCollision(this.currentTetromino, newX, newY)) {
      this.currentTetromino.move(newX - this.currentTetromino.x, newY - this.currentTetromino.y);
    }
  }
}

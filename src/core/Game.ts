import { Board } from './Board';
import { Tetromino } from './Tetromino';

export class Game {
  private board: Board;
  private currentTetromino: Tetromino | null = null;
  private nextTetromino: Tetromino | null = null;
  private score: number = 0;
  private gameOver: boolean = false;

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
      // Move tetromino down
      // For now, just a placeholder for actual movement logic
      // This will be refined in later issues
    }
  }

  spawnTetromino(): void {
    // For now, just a placeholder for actual tetromino spawning logic
    // This will be refined in later issues
    this.currentTetromino = new Tetromino(0, 0, 'I'); // Example: 'I' tetromino at (0,0)
  }

  handleInput(key: string): void {
    // Placeholder for input handling
  }
}

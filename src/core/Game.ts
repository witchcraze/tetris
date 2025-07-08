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

  // Placeholder for methods like:
  // - start(): void
  // - update(): void
  // - handleInput(key: string): void
  // - spawnTetromino(): void
}

export class Tetromino {
  public x: number;
  public y: number;
  private shape: number[][];
  private type: string;

  constructor(x: number, y: number, type: string) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.shape = this.getInitialShape(type);
  }

  private getInitialShape(type: string): number[][] {
    switch (type) {
      case 'I':
        return [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
      case 'J':
        return [[1, 0, 0], [1, 1, 1], [0, 0, 0]];
      case 'L':
        return [[0, 0, 1], [1, 1, 1], [0, 0, 0]];
      case 'O':
        return [[1, 1], [1, 1]];
      case 'S':
        return [[0, 1, 1], [1, 1, 0], [0, 0, 0]];
      case 'T':
        return [[0, 1, 0], [1, 1, 1], [0, 0, 0]];
      case 'Z':
        return [[1, 1, 0], [0, 1, 1], [0, 0, 0]];
      default:
        return [];
    }
  }

  move(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
  }

  getShape(): number[][] {
    return this.shape;
  }

  // Placeholder for rotate(): void
}

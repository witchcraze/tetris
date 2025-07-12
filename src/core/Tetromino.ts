export class Tetromino {
  public x: number;
  public y: number;
  private shape: number[][];
  private type: string;
  private skin: { [key: string]: string }; // Add skin property

  constructor(x: number, y: number, type: string, skin: { [key: string]: string }) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.shape = this.getInitialShape(type);
    this.skin = skin; // Assign skin
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

  getSkinColor(): string {
    return this.skin[this.type] || 'gray'; // Return color based on skin
  }

  move(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
  }

  rotate(): void {
    if (this.type === 'I') {
      // I-tetromino has special rotation
      if (this.shape.length === 4 && this.shape[1][0] === 1) { // Horizontal I
        this.shape = [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
        ];
      } else { // Vertical I
        this.shape = [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
      }
    } else {
      const N = this.shape.length;
      const newShape: number[][] = Array.from({ length: N }, () => Array(N).fill(0));

      for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
          newShape[x][N - 1 - y] = this.shape[y][x];
        }
      }
      this.shape = newShape;
    }
  }

  getShape(): number[][] {
    return this.shape;
  }

  setShape(newShape: number[][]): void {
    this.shape = newShape;
  }

  getType(): string {
    return this.type;
  }
}

export class Tetromino {
  public x: number;
  public y: number;
  private shape: number[][];
  private type: string;
  private color: string;

  constructor(x: number, y: number, type: string) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.shape = this.getInitialShape(type);
    this.color = this.getColorForType(type);
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

  private getColorForType(type: string): string {
    switch (type) {
      case 'I': return 'cyan';
      case 'J': return 'blue';
      case 'L': return 'orange';
      case 'O': return 'yellow';
      case 'S': return 'lime';
      case 'T': return 'purple';
      case 'Z': return 'red';
      default: return 'gray';
    }
  }

  getColor(): string {
    return this.color;
  }

  move(dx: number, dy: number): void {
    this.x += dx;
    this.y += dy;
  }

  rotate(): void {
    // Transpose the matrix
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < y; x++) {
        [this.shape[y][x], this.shape[x][y]] = [this.shape[x][y], this.shape[y][x]];
      }
    }

    // Reverse the order of the columns
    this.shape.forEach(row => row.reverse());
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

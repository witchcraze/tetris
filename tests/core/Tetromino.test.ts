import { Tetromino } from '../../src/core/Tetromino';

describe('Tetromino', () => {
  it('should create a tetromino', () => {
    const tetromino = new Tetromino(0, 0, 'I', {});
    expect(tetromino).toBeInstanceOf(Tetromino);
    expect(tetromino.x).toBe(0);
    expect(tetromino.y).toBe(0);
    expect(tetromino.getType()).toBe('I');
  });

  it('should return correct shape for I tetromino', () => {
    const tetromino = new Tetromino(0, 0, 'I', {});
    expect(tetromino.getShape()).toEqual([[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]]);
  });

  it('should return correct shape for J tetromino', () => {
    const tetromino = new Tetromino(0, 0, 'J', {});
    expect(tetromino.getShape()).toEqual([[1, 0, 0], [1, 1, 1], [0, 0, 0]]);
  });

  it('should return correct shape for L tetromino', () => {
    const tetromino = new Tetromino(0, 0, 'L', {});
    expect(tetromino.getShape()).toEqual([[0, 0, 1], [1, 1, 1], [0, 0, 0]]);
  });

  it('should return correct shape for O tetromino', () => {
    const tetromino = new Tetromino(0, 0, 'O', {});
    expect(tetromino.getShape()).toEqual([[1, 1], [1, 1]]);
  });

  it('should return correct shape for S tetromino', () => {
    const tetromino = new Tetromino(0, 0, 'S', {});
    expect(tetromino.getShape()).toEqual([[0, 1, 1], [1, 1, 0], [0, 0, 0]]);
  });

  it('should return correct shape for T tetromino', () => {
    const tetromino = new Tetromino(0, 0, 'T', {});
    expect(tetromino.getShape()).toEqual([[0, 1, 0], [1, 1, 1], [0, 0, 0]]);
  });

  it('should return correct shape for Z tetromino', () => {
    const tetromino = new Tetromino(0, 0, 'Z', {});
    expect(tetromino.getShape()).toEqual([[1, 1, 0], [0, 1, 1], [0, 0, 0]]);
  });

  it('should return empty shape for unknown tetromino type', () => {
    const tetromino = new Tetromino(0, 0, 'UNKNOWN', {});
    expect(tetromino.getShape()).toEqual([]);
  });

  it('should move tetromino', () => {
    const tetromino = new Tetromino(0, 0, 'I', {});
    tetromino.move(1, 2);
    expect(tetromino.x).toBe(1);
    expect(tetromino.y).toBe(2);
  });

  it('should rotate I tetromino from horizontal to vertical', () => {
    const tetromino = new Tetromino(0, 0, 'I', {});
    tetromino.rotate();
    expect(tetromino.getShape()).toEqual([
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ]);
  });

  it('should rotate I tetromino from vertical to horizontal', () => {
    const tetromino = new Tetromino(0, 0, 'I', {});
    // Manually set to vertical shape
    tetromino.setShape([
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ]);
    tetromino.rotate();
    expect(tetromino.getShape()).toEqual([
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  it('should rotate J tetromino', () => {
    const tetromino = new Tetromino(0, 0, 'J', {});
    tetromino.rotate();
    expect(tetromino.getShape()).toEqual([
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ]);
  });

  it('should rotate L tetromino', () => {
    const tetromino = new Tetromino(0, 0, 'L', {});
    tetromino.rotate();
    expect(tetromino.getShape()).toEqual([
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ]);
  });

  it('should rotate O tetromino (no change)', () => {
    const tetromino = new Tetromino(0, 0, 'O', {});
    tetromino.rotate();
    expect(tetromino.getShape()).toEqual([[1, 1], [1, 1]]);
  });

  it('should rotate S tetromino', () => {
    const tetromino = new Tetromino(0, 0, 'S', {});
    tetromino.rotate();
    expect(tetromino.getShape()).toEqual([
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ]);
  });

  it('should rotate T tetromino', () => {
    const tetromino = new Tetromino(0, 0, 'T', {});
    tetromino.rotate();
    expect(tetromino.getShape()).toEqual([
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ]);
  });

  it('should rotate Z tetromino', () => {
    const tetromino = new Tetromino(0, 0, 'Z', {});
    tetromino.rotate();
    expect(tetromino.getShape()).toEqual([
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ]);
  });

  it('should return the type of the tetromino', () => {
    const tetromino = new Tetromino(0, 0, 'T', {});
    expect(tetromino.getType()).toBe('T');
  });

  it('should return the skin color of the tetromino', () => {
    const skin = { 'I': 'red' };
    const tetromino = new Tetromino(0, 0, 'I', skin);
    expect(tetromino.getSkinColor()).toBe('red');
  });

  it('should return gray if skin color is not defined for type', () => {
    const skin = { 'J': 'blue' };
    const tetromino = new Tetromino(0, 0, 'I', skin);
    expect(tetromino.getSkinColor()).toBe('gray');
  });
});
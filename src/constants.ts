export const INITIAL_NEXT_TETROMINOS_COUNT = 3;
export const BASE_DROP_SPEED = 500; // ms
export const DROP_SPEED_DECREMENT_PER_LEVEL = 50; // ms
export const LEVEL_UP_SCORE_THRESHOLD = 1000;

export const SCORE_SINGLE_LINE = 100;
export const SCORE_DOUBLE_LINE = 300;
export const SCORE_TRIPLE_LINE = 500;
export const SCORE_TETRIS = 800;
export const SCORE_HARD_DROP_PER_CELL = 2;

export const LOCAL_STORAGE_HIGH_SCORE_KEY = 'highScore';

export const TETROMINO_TYPES = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

export const DEFAULT_SKIN = {
  'I': 'cyan',
  'J': 'blue',
  'L': 'orange',
  'O': 'yellow',
  'S': 'lime',
  'T': 'purple',
  'Z': 'red',
};

export const GRAYSCALE_SKIN = {
  'I': '#808080',
  'J': '#808080',
  'L': '#808080',
  'O': '#808080',
  'S': '#808080',
  'T': '#808080',
  'Z': '#808080',
};

export const TETROMINO_SHAPES: { [key: string]: number[][] } = {
  'I': [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  'J': [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
  'L': [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
  'O': [[1, 1], [1, 1]],
  'S': [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  'T': [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
  'Z': [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
};

export const LINE_CLEAR_ANIMATION_DURATION = 200; // ms
export const LINE_CLEAR_FLASH_INTERVAL = 50; // ms

export const GAME_OVER_OVERLAY_ALPHA = 0.7;
export const GAME_OVER_TEXT_FONT_SIZE = 30;

export const LEVEL_UP_ANIMATION_DURATION = 1000; // ms
export const LEVEL_UP_FLASH_ALPHA = 0.5;
export const LEVEL_UP_TEXT_FONT_SIZE = 60;

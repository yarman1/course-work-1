const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const field = [];
const FIELD_SIZE = {
  height: 22,
  width: 10,
}
const START_CHARS = {
  startCol: 3,
  startRow: 0,
  startRowI: 1,
}

for (let i = 0; i < FIELD_SIZE.height; i++) {
  field[i] = [];
  for (let j = 0; j < FIELD_SIZE.width; j++) {
    field[i][j] = 0;
  }
}

const FIGURES_NAMES = ['J', 'L', 'I', 'O', 'Z', 'S', 'T'];

const FIGURES = {
  J: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
  L: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
  I: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  O: [
      [0, 0, 0],
      [0, 1, 1],
      [0, 1, 1],
    ],
  Z: [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],
  S: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
  T: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 1],
    ],  
};

const FIGURES_COLORS = {
  J: '#1717eb',
  L: '#ebb538',
  I: '#34ebd5',
  O: '#f5ef4c',
  Z: '#e32222',
  S: '#39eb1a',
  T: '#e01aeb',
};

const randomInt = max => Math.floor(Math.random() * max);

const randomSequence = namesConst => {
  const names = [];
  namesConst.forEach(el => names.push(el));
  const res = [];
  let randValue;
  while (names.length) {
    randValue = randomInt(names.length - 1);
    res.push(names[randValue]);
    names.splice(randValue, 1);
  }
  return res;
};

console.log(randomSequence(FIGURES_NAMES));

const nextFigure = sequence => {
  const name = sequence.shift();
  const matrix = FIGURES[name];
  const col = START_CHARS.startCol;
  const row = name === 'I' ? 
    START_CHARS.startRowI :
    START_CHARS.startRow;
  return {name: name, matrix: matrix, col: col, row: row};
};
console.log(nextFigure(randomSequence(FIGURES_NAMES)));

/*ctx.strokeStyle = 'white';
ctx.lineWidth = 10;


ctx.strokeRect(240, 50, 320, 640);  */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const field = [];
const FIELD_SIZE = {
  height: 22,
  width: 10,
}

for (let i = 0; i < FIELD_SIZE.height; i++) {
  field[i] = [];
  for (let j = 0; j < FIELD_SIZE.width; j++) {
    field[i][j] = 0;
  }
}
console.dir(field);

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

const randomSequence = names => {
  const res = [];
  let randValue, name;
  while (names.length) {
    randValue = randomInt(names.length - 1);
    res.push(names[randValue]);
    names.splice(randValue, 1);
  }
  return res;
};

console.log(randomSequence(FIGURES_NAMES));
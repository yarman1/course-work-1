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
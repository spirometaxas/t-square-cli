const getWidth = function(n) {
  return Math.pow(2, n + 3) - 4;
}

const getSquareWidth = function(n) {
  return Math.pow(2, n + 2);
}

const getHeight = function(n) {
  return Math.pow(2, n + 2) - 2;
}

const getSquareHeight = function(n) {
  return Math.pow(2, n + 1);
}

const createBoard = function(w, h) {
  let board = [];
  for (let i = 0; i < h; i++) {
    let row = [];
    for (let j = 0; j < w; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}

const drawSquare = function(board, pos, scale, character) {
  var startX = pos.x - parseInt(getSquareWidth(scale) / 2.0);
  var startY = pos.y - parseInt(getSquareHeight(scale) / 2.0); 
  for (let i = 0; i < getSquareHeight(scale); i++) {
    for (let j = 0; j < getSquareWidth(scale); j++) {
      board[startY + i][startX + j] = character;
    }
  }
}

const cantor = function(n, scale, board, pos, character) {
  drawSquare(board, pos, scale, character);

  if (n === 0) {
    return;
  }

  cantor(n - 1, scale - 1, board, { x: pos.x + getSquareWidth(scale - 1), y: pos.y + getSquareHeight(scale - 1) }, character);
  cantor(n - 1, scale - 1, board, { x: pos.x - getSquareWidth(scale - 1), y: pos.y - getSquareHeight(scale - 1) }, character);
  cantor(n - 1, scale - 1, board, { x: pos.x + getSquareWidth(scale - 1), y: pos.y - getSquareHeight(scale - 1) }, character);
  cantor(n - 1, scale - 1, board, { x: pos.x - getSquareWidth(scale - 1), y: pos.y + getSquareHeight(scale - 1) }, character);
}

const draw = function(board) {
  var result = '\n ';
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      result += board[board.length - i - 1][j];
    }
    result += '\n ';
  }
  return result;
}

const create = function(n, scale, character = '\u001b[7m \u001b[0m') {
  if (n === undefined || n < 0) {
    return '';
  }
  if (scale === undefined || scale < n) {
    scale = n;
  }

  if (character && character !== '\u001b[7m \u001b[0m' && character.length > 1) {
    character = '\u001b[7m \u001b[0m';
  }

  const board = createBoard(getWidth(scale), getHeight(scale));
  cantor(n, scale, board, { x: parseInt(getWidth(scale) / 2.0), y: parseInt(getHeight(scale) / 2.0) }, character);
  return draw(board);
}

module.exports = {
  create: create
};
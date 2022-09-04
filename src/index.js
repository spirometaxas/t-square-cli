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

const drawSquare = function(board, pos, size, character) {
  var startX = pos.x - parseInt(getSquareWidth(size) / 2.0);
  var startY = pos.y - parseInt(getSquareHeight(size) / 2.0); 
  for (let i = 0; i < getSquareHeight(size); i++) {
    for (let j = 0; j < getSquareWidth(size); j++) {
      if (character) {
        board[startY + i][startX + j] = character;
      } else {
        board[startY + i][startX + j] = '\u001b[7m \u001b[0m';
      }
    }
  }
}

const cantor = function(n, size, board, pos, character) {
  drawSquare(board, pos, size, character);

  if (n === 0) {
    return;
  }

  cantor(n - 1, size - 1, board, { x: pos.x + getSquareWidth(size - 1), y: pos.y + getSquareHeight(size - 1) }, character);
  cantor(n - 1, size - 1, board, { x: pos.x - getSquareWidth(size - 1), y: pos.y - getSquareHeight(size - 1) }, character);
  cantor(n - 1, size - 1, board, { x: pos.x + getSquareWidth(size - 1), y: pos.y - getSquareHeight(size - 1) }, character);
  cantor(n - 1, size - 1, board, { x: pos.x - getSquareWidth(size - 1), y: pos.y + getSquareHeight(size - 1) }, character);
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

const create = function(n, config) {
  if (n === undefined || n < 0) {
    return '';
  }
  
  let size = n;
  if (config && config.size && config.size > n) {
    size = config.size;
  }

  const character = config !== undefined && config.character !== undefined && config.character.length === 1 ? config.character : undefined;

  const board = createBoard(getWidth(size), getHeight(size));
  cantor(n, size, board, { x: parseInt(getWidth(size) / 2.0), y: parseInt(getHeight(size) / 2.0) }, character);
  return draw(board);
}

module.exports = {
  create: create
};
const { v4: uuidv4 } = require('uuid');

class Board {
  constructor({ id = uuidv4(), title = '', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static createBoard(board) {
    const { title, columns } = board;

    const newBoard = {
      id: this.id,
      title,
      columns,
    };

    return new Board(newBoard);
  }
}

module.exports = Board;

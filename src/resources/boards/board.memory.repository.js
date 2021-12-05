const boards = require('../../dataBase/boards.db');

let allBoards = [...boards];
const getAllBoards = () => allBoards;

const addNewBoard = async (board) => {
  allBoards = await [...allBoards, board];
};

const findBoard = (boardId) => allBoards.find((u) => u.id === boardId);

const deleteBoard = async (boardId) => {
  allBoards = await allBoards.filter((u) => u.id !== boardId);
};

const updateBoard = async (boardId, updatedData) => {
  allBoards = await allBoards.map((board) =>
    board.id === boardId ? { id: boardId, ...updatedData } : board
  );
};

module.exports = {
  getAllBoards,
  addNewBoard,
  findBoard,
  deleteBoard,
  updateBoard,
};

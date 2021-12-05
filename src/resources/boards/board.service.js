const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const { getAllBoards } = boardsRepo;

const addNewBoard = (board) => boardsRepo.addNewBoard(board);

const findBoard = (id) => boardsRepo.findBoard(id);

const deleteBoardById = (id) => boardsRepo.deleteBoard(id);

const updateBoardById = (id, data) => boardsRepo.updateBoard(id, data);

const deleteBoardTasks = (boardId) => tasksRepo.deleteBoardTasks(boardId);

module.exports = {
  getAllBoards,
  addNewBoard,
  findBoard,
  deleteBoardById,
  updateBoardById,
  deleteBoardTasks,
};

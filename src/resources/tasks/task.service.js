const tasksRepo = require('./task.memory.repository');

const { getAllTasks } = tasksRepo;

const addNewTask = (board) => tasksRepo.addNewBoard(board);

const findTask = (id) => tasksRepo.findBoard(id);

const deleteTaskById = (id) => tasksRepo.deleteBoard(id);

const updateTaskById = (id, data) => tasksRepo.updateBoard(id, data);

module.exports = {
  getAllTasks,
  addNewTask,
  findTask,
  deleteTaskById,
  updateTaskById,
};

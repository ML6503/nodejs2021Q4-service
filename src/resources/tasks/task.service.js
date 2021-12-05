const tasksRepo = require('./task.memory.repository');

const { getAllTasks } = tasksRepo;

const addNewTask = (task) => tasksRepo.addNewTask(task);

const findTask = (id) => tasksRepo.findTask(id);

const deleteTaskById = (id) => tasksRepo.deleteTask(id);

const updateTaskById = (id, data) => tasksRepo.updateTask(id, data);

module.exports = {
  getAllTasks,
  addNewTask,
  findTask,
  deleteTaskById,
  updateTaskById,
};

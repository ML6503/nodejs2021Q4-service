const tasks = require('../../dataBase/boards.db');

let allTasks = [...tasks];
const getAllTasks = () => allTasks;

const addNewTask = async (board) => {
  allTasks = await [...allTasks, board];
};

const findTask = (taskId) => allTasks.find((t) => t.id === taskId);

const deleteTask = async (taskId) => {
  allTasks = await allTasks.filter((t) => t.id !== taskId);
};

const updateTask = async (taskId, updatedData) => {
  allTasks = await allTasks.map((task) =>
    task.id === taskId ? { id: taskId, ...updatedData } : task
  );
};

module.exports = {
  getAllTasks,
  addNewTask,
  findTask,
  deleteTask,
  updateTask,
};

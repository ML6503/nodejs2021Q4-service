const tasks = require('../../dataBase/tasks.db');

let allTasks = [...tasks];
const getAllTasks = () => allTasks;

const addNewTask = async (task) => {
  allTasks = await [...allTasks, task];
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

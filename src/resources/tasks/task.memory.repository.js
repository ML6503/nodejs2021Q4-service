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

const unassignUserTasks = async (userId) => {
  allTasks = await allTasks.map((task) => {
    let updatedTask;
    if (task.userId === userId) {
      updatedTask = { ...task };
      updatedTask.userId = null;
    }
    return task.userId === userId ? updatedTask : task;
  });
};

const deleteBoardTasks = async (boardId) => {
  allTasks = await allTasks.filter((t) => t.boardId !== boardId);
};

module.exports = {
  getAllTasks,
  addNewTask,
  findTask,
  deleteTask,
  updateTask,
  unassignUserTasks,
  deleteBoardTasks,
};

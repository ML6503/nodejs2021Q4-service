"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRepo = void 0;
const tasks_db_1 = require("../../dataBase/tasks.db");
let allTasks = [...tasks_db_1.tasks];
const getAllTasks = () => allTasks;
const addNewTask = (task) => {
    allTasks = [...allTasks, task];
};
const findTask = (taskId) => allTasks.find((t) => t.id === taskId);
const deleteTask = (taskId) => {
    allTasks = allTasks.filter((t) => t.id !== taskId);
};
const updateTask = async (taskId, updatedData) => {
    allTasks = allTasks.map((task) => task.id === taskId ? { id: taskId, ...updatedData } : task);
};
const unassignUserTasks = (userId) => {
    allTasks = allTasks.map((task) => {
        // let updatedTask;
        if (task.userId === userId) {
            // updatedTask = { ...task };
            // updatedTask.userId = null;
            task.userId = null;
        }
        // return task!.userId === userId ? updatedTask : task;
        return task;
    });
};
const deleteBoardTasks = (boardId) => {
    allTasks = allTasks.filter((t) => t.boardId !== boardId);
};
exports.tasksRepo = {
    getAllTasks,
    addNewTask,
    findTask,
    deleteTask,
    updateTask,
    unassignUserTasks,
    deleteBoardTasks,
};

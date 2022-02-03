"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksService = void 0;
const task_memory_repository_1 = require("./task.memory.repository");
const { getAllTasks } = task_memory_repository_1.tasksRepo;
const addNewTask = (task) => task_memory_repository_1.tasksRepo.addNewTask(task);
const findTask = (id) => task_memory_repository_1.tasksRepo.findTask(id);
const deleteTaskById = (id) => task_memory_repository_1.tasksRepo.deleteTask(id);
const updateTaskById = (id, data) => task_memory_repository_1.tasksRepo.updateTask(id, data);
exports.tasksService = {
    getAllTasks,
    addNewTask,
    findTask,
    deleteTaskById,
    updateTaskById,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksService = void 0;
const task_memory_repository_1 = require("./task.memory.repository");
const { getAllTasks } = task_memory_repository_1.tasksRepo;
/**
 *  calls tasks repo to add new task
 * @param  task - task object with the type ITask
 * @returns tasksRepo.addNewTask function with task id in param
 */
const addNewTask = (task) => task_memory_repository_1.tasksRepo.addNewTask(task);
/**
 * calls tasks repo to find task
 * @param id - task id with type string
 * @returns tasksRepo.findTask function with task id in param
 */
const findTask = (id) => task_memory_repository_1.tasksRepo.findTask(id);
/**
 * calls tasks repo to delete task by id
 * @param  id - task id type string
 * @returns tasksRepo.deleteTask function with task id in param
 * that @returns whether task type ITask or undefined
 */
const deleteTaskById = (id) => task_memory_repository_1.tasksRepo.deleteTask(id);
/**
 * calls tasks repo to update task by id
 * and with new data received in params
 * @param id - task id type string
 * @param task - updated task details object with type ITask
 * @returns tasksRepo.updateTask function with id and task details
 */
const updateTaskById = (id, data) => task_memory_repository_1.tasksRepo.updateTask(id, data);
exports.tasksService = {
    getAllTasks,
    addNewTask,
    findTask,
    deleteTaskById,
    updateTaskById,
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.addTask = exports.getTask = exports.getTasks = void 0;
const task_service_1 = require("./task.service");
const task_model_1 = __importDefault(require("./task.model"));
const tasks = task_service_1.tasksService.getAllTasks;
const { addNewTask, findTask, deleteTaskById, updateTaskById } = task_service_1.tasksService;
const getTasks = (_req, reply) => {
    tasks();
    reply.send(tasks());
};
exports.getTasks = getTasks;
const getTask = async (req, reply) => {
    const { taskId } = req.params;
    const task = findTask(taskId);
    if (!task) {
        reply.code(404).send({ message: `Task with id ${taskId} not found` });
    }
    reply.send(task);
};
exports.getTask = getTask;
const addTask = async (req, reply) => {
    const { boardId } = req.params;
    const newTaskData = req.body;
    newTaskData.boardId = boardId;
    const newTask = new task_model_1.default(newTaskData);
    await addNewTask({ ...newTask });
    reply.code(201).send({ ...newTask });
};
exports.addTask = addTask;
const deleteTask = (req, reply) => {
    const { taskId } = req.params;
    const task = findTask(taskId);
    if (!task) {
        reply.code(404).send({ message: `Task with id ${taskId} not found` });
    }
    deleteTaskById(taskId);
    reply.send({ message: `The task ${taskId} has been deleted` });
};
exports.deleteTask = deleteTask;
const updateTask = async (req, reply) => {
    const { taskId } = req.params;
    const updatedTaskData = req.body;
    await updateTaskById(taskId, updatedTaskData);
    const task = findTask(taskId);
    reply.send(task);
};
exports.updateTask = updateTask;

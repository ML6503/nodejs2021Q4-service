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
/**
 * Promislike function calls get all tasks func and send these tasks in Fastify server reply
 * @param _req - unused optional factory FastifyRequest
 * @param reply - FastifyReply
 */
const getTasks = async (_req, reply) => {
    tasks();
    await reply.send(tasks());
};
exports.getTasks = getTasks;
/**
 * Promislike function that get Task id from param and
 * calls findTask func with it
 * if task is found it send thi stask with the reply
 * otherwise send error message and code 404
 * @param req - FastifyRequest with Params type IGetTaskParam
 * @param reply - FastifyReply
 */
const getTask = async (req, reply) => {
    const { taskId } = req.params;
    const task = findTask(taskId);
    if (!task) {
        await reply.code(404).send({ message: `Task with id ${taskId} not found` });
    }
    await reply.send(task);
};
exports.getTask = getTask;
/**
 * Promislike function that get task details from request param
 * and  board id from request body, assign to this task board id and
 * create new user with applying Task class
 * add this task by addNewUser function
 * and send new task in reply and the code 201
 * @param req - FastifyRequest with Params type IGetBoardParam and Body type ITask
 * @param reply - FastifyReply
 */
const addTask = async (req, reply) => {
    const { boardId } = req.params;
    const newTaskData = req.body;
    newTaskData.boardId = boardId;
    const newTask = new task_model_1.default(newTaskData);
    addNewTask({ ...newTask });
    await reply.code(201).send({ ...newTask });
};
exports.addTask = addTask;
/**
 * Promislike function that gets task id from request param
 * find a task by its id
 * if no task  then reply code is 404 and sends error message
 * if task is found it calls function to delete task
 * then send message that task with id has been removed
 
 * @param req - FastifyRequest with Params type IGetTaskParam
 * @param reply - FastifyReply
 */
const deleteTask = async (req, reply) => {
    const { taskId } = req.params;
    const task = findTask(taskId);
    if (!task) {
        await reply.code(404).send({ message: `Task with id ${taskId} not found` });
    }
    deleteTaskById(taskId);
    await reply.send({ message: `The task ${taskId} has been deleted` });
};
exports.deleteTask = deleteTask;
/**
 * Promislike function that gets task id and updated task object
 * in request params
 * calls function to update task with these details
 * then find updated task by id
 * and send reply with task updated details
 * @param req - FastifyRequest with Params type IGetTaskParam and Body type ITask
 * @param reply - FastifyReply
 */
const updateTask = async (req, reply) => {
    const { taskId } = req.params;
    const updatedTaskData = req.body;
    updateTaskById(taskId, updatedTaskData);
    const task = findTask(taskId);
    await reply.send(task);
};
exports.updateTask = updateTask;

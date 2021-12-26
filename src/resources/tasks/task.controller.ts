import { FastifyReply, FastifyRequest } from 'fastify';
import { tasksService } from './task.service';
import Task from './task.model';
import { IGetBoardParam, IGetTaskParam, ITask } from '../../common/interfaces';
import customLogger from '../../utils/customLogger';
import { DBError } from '../../utils/DBError';

const tasks = tasksService.getAllTasks;
const { addNewTask, findTask, deleteTaskById, updateTaskById } = tasksService;

/**
 * Promislike function calls get all tasks func and send these tasks in Fastify server reply
 * @param _req - unused optional factory FastifyRequest
 * @param reply - FastifyReply
 */
export const getTasks = async (
  _req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const allTasks = tasks();
    await reply.send(allTasks);
  } catch (e) {
    customLogger.error(e, 'Failed to get all tasks from DB');
    throw new DBError(500, 'An error occurred while fetching tasks');
  }
};
/**
 * Promislike function that get Task id from param and
 * calls findTask func with it
 * if task is found it send thi stask with the reply
 * otherwise send error message and code 404
 * @param req - FastifyRequest with Params type IGetTaskParam
 * @param reply - FastifyReply
 */
export const getTask = async (
  req: FastifyRequest<{ Params: IGetTaskParam }>,
  reply: FastifyReply
) => {
  customLogger.info('Fetching single task from DB');
  try {
    const { taskId } = req.params;
    const task: ITask | undefined = findTask(taskId);
    if (!task) {
      customLogger.warn('no task found with id provided');
      await reply
        .code(404)
        .send({ message: `Task with id ${taskId} not found` });
    }
    customLogger.debug('task found, sending it to client');
    await reply.send(task);
  } catch (e) {
    customLogger.error(e, 'Failed to get a single task');
    throw new DBError(500, 'An error occurred while updating user');
  }
};

/**
 * Promislike function that get task details from request param
 * and  board id from request body, assign to this task board id and
 * create new user with applying Task class
 * add this task by addNewUser function
 * and send new task in reply and the code 201
 * @param req - FastifyRequest with Params type IGetBoardParam and Body type ITask
 * @param reply - FastifyReply
 */
export const addTask = async (
  req: FastifyRequest<{ Params: IGetBoardParam; Body: ITask }>,
  reply: FastifyReply
) => {
  const { boardId } = req.params;
  const newTaskData = req.body;
  newTaskData.boardId = boardId;
  customLogger.info(`Adding new task to board id ${boardId} at DB`);
  try {
    const newTask = new Task(newTaskData);
    addNewTask({ ...newTask });
    customLogger.debug(' Task added,sending it to client');
    await reply.code(201).send({ ...newTask });
  } catch (e) {
    customLogger.error(e, 'Failed to add task to the board at DB');
    throw new DBError(500, 'An error occurred while adding task');
  }
};

/**
 * Promislike function that gets task id from request param
 * find a task by its id
 * if no task  then reply code is 404 and sends error message
 * if task is found it calls function to delete task
 * then send message that task with id has been removed
 
 * @param req - FastifyRequest with Params type IGetTaskParam
 * @param reply - FastifyReply
 */
export const deleteTask = async (
  req: FastifyRequest<{ Params: IGetTaskParam }>,
  reply: FastifyReply
) => {
  const { taskId } = req.params;
  const task: ITask | undefined = findTask(taskId);

  if (!task) {
    await reply.code(404).send({ message: `Task with id ${taskId} not found` });
  }
  deleteTaskById(taskId);
  await reply.send({ message: `The task ${taskId} has been deleted` });
};

/**
 * Promislike function that gets task id and updated task object
 * in request params
 * calls function to update task with these details
 * then find updated task by id
 * and send reply with task updated details
 * @param req - FastifyRequest with Params type IGetTaskParam and Body type ITask
 * @param reply - FastifyReply
 */
export const updateTask = async (
  req: FastifyRequest<{ Params: IGetTaskParam; Body: ITask }>,
  reply: FastifyReply
) => {
  const { taskId } = req.params;
  const updatedTaskData = req.body;

  updateTaskById(taskId, updatedTaskData);

  const task: ITask | undefined = findTask(taskId);
  await reply.send(task);
};

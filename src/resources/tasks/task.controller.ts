import { FastifyReply, FastifyRequest } from 'fastify';
import { tasksService } from './task.service';
import Task from './task.model';
import { IGetBoardParam, IGetTaskParam, ITask } from '../../common/interfaces';

const tasks = tasksService.getAllTasks;
const { addNewTask, findTask, deleteTaskById, updateTaskById } = tasksService;

/**
 * Promislike function calls get all tasks func and send these tasks in Fastify server reply
 * @param  {FastifyRequest} _req unused factory fastify request
 * @param  {FastifyReply} reply
 */
export const getTasks = async (
  _req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  tasks();
  await reply.send(tasks());

};
/**
 * Promislike function that get Task id from param and
 * calls findTask func with it
 * if task is found it send thi stask with the reply
 * otherwise send error message and code 404
 * @param  {FastifyRequest<{Params:IGetTaskParam}>} req
 * @param  {FastifyReply} reply
 */
export const getTask = async (
  req: FastifyRequest<{ Params: IGetTaskParam }>,
  reply: FastifyReply
) => {
  const { taskId } = req.params;
  const task: ITask | undefined = findTask(taskId);
  if (!task) {
    await reply.code(404).send({ message: `Task with id ${taskId} not found` });
  }
  await reply.send(task);
};

/**
 * Promislike function that get task details from request param
 * and  board id from request body, assign to this task board id and
 * create new user with applying Task class
 * add this task by addNewUser function
 * and send new task in reply and the code 201
 * @param  {FastifyRequest<{Params:IGetBoardParam;Body:ITask}>} req
 * @param  {FastifyReply} reply
 */
export const addTask = async (
  req: FastifyRequest<{ Params: IGetBoardParam; Body: ITask }>,
  reply: FastifyReply
) => {
  const { boardId } = req.params;
  const newTaskData = req.body;
  newTaskData.boardId = boardId;
  const newTask = new Task(newTaskData);
  addNewTask({ ...newTask });
  await reply.code(201).send({ ...newTask });
};

/**
 * Promislike function that gets task id from request param
 * find a task by its id
 * if no task  then reply code is 404 and sends error message
 * if task is found it calls function to delete task
 * then send message that task with id has been removed
 
 * @param  {FastifyRequest<{Params:IGetTaskParam}>} req
 * @param  {FastifyReply} reply
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
 * @param  {FastifyRequest<{Params:IGetTaskParam;Body:ITask}>} req
 * @param  {FastifyReply} reply
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

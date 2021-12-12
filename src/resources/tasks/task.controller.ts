import { FastifyReply, FastifyRequest } from 'fastify';
import { tasksService } from './task.service';
import Task from './task.model';
import { IGetBoardParam, IGetTaskParam, ITask } from '../../common/interfaces';

const tasks = tasksService.getAllTasks;
const { addNewTask, findTask, deleteTaskById, updateTaskById } = tasksService;

export const getTasks = async (
  _req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  tasks();
  await reply.send(tasks());
};

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

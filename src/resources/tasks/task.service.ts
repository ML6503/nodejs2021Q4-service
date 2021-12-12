import { ITask } from 'common/interfaces';
import { tasksRepo } from './task.memory.repository';

const { getAllTasks } = tasksRepo;

const addNewTask = (task: ITask) => tasksRepo.addNewTask(task);

const findTask = (id: string) => tasksRepo.findTask(id);

const deleteTaskById = (id: string) => tasksRepo.deleteTask(id);

const updateTaskById = (id: string, data: ITask) =>
  tasksRepo.updateTask(id, data);

export const tasksService = {
  getAllTasks,
  addNewTask,
  findTask,
  deleteTaskById,
  updateTaskById,
};

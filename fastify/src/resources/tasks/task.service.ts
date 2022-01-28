import { ITask } from '../../common/interfaces';
import { tasksRepo } from './task.memory.repository';

const { getAllTasks } = tasksRepo;

/**
 *  calls tasks repo to add new task
 * @param  task - task object with the type ITask
 * @returns tasksRepo.addNewTask function with task id in param
 */
const addNewTask = async (task: ITask) => {
  const addedTask = await tasksRepo.addNewTask(task);
  return addedTask;
};

/**
 * calls tasks repo to find task
 * @param id - task id with type string
 * @returns tasksRepo.findTask function with task id in param
 */
const findTask = async (id: string) => {
  const task = await tasksRepo.findTask(id);
  return task;
};

/**
 * calls tasks repo to delete task by id
 * @param  id - task id type string
 * @returns tasksRepo.deleteTask function with task id in param
 * that @returns whether task type ITask or undefined 
 */
const deleteTaskById = async (id: string) => {
  const deletedTask = await tasksRepo.deleteTask(id);
  return deletedTask;
};

/**
 * calls tasks repo to update task by id
 * and with new data received in params
 * @param id - task id type string
 * @param task - updated task details object with type ITask
 * @returns tasksRepo.updateTask function with id and task details
 */
const updateTaskById = async(id: string, data: ITask) => {
  const updatedTask = await tasksRepo.updateTask(id, data);
  return updatedTask;
};
  
export const tasksService = {
  getAllTasks,
  addNewTask,
  findTask,
  deleteTaskById,
  updateTaskById,
};

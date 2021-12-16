import { ITask } from '../../common/interfaces';
import { tasksRepo } from './task.memory.repository';

const { getAllTasks } = tasksRepo;

/**
 *  calls tasks repo to add new task
 * @param  {task} task with the @type ITask
 * @returns tasksRepo.addNewTask function with task id in param
 */
const addNewTask: (param: ITask) => void = (task: ITask) => tasksRepo.addNewTask(task);

/**
 * calls tasks repo to find task
 * @param  {id} id of the task with @type string
 * @returns tasksRepo.findTask function with task id in param
 */
const findTask : (param: string) =>  ITask | undefined= (id: string) => tasksRepo.findTask(id);

/**
 * calls tasks repo to delete task by id
 * @param  {id} id of the task @type string
 * @returns tasksRepo.deleteTask function with task id in param
 * that @returns whether task @type ITask or undefined 
 */
const deleteTaskById: (param: string) => void = (id: string) => tasksRepo.deleteTask(id);

/**
 * calls tasks repo to update task by id
 * and with new data received in params
 * @param  {id} id of the task @type string
 * @param  {data} task new details with @type ITask
 * @returns tasksRepo.updateTask function with id and task details
 */
const updateTaskById: (param1: string, param2: ITask) => void = (id: string, data: ITask) =>
  tasksRepo.updateTask(id, data);

export const tasksService = {
  getAllTasks,
  addNewTask,
  findTask,
  deleteTaskById,
  updateTaskById,
};

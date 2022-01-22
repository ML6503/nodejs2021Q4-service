import { getRepository } from 'typeorm';
import Task from '../../entity/Task';
import { ITask } from '../../common/interfaces';
import TaskModel from './task.model';


/**
 * function to return all tasks taken from Data Base
 * @returns all tasks or empty array if none
 */

const getAllTasks = async () => {
  // const allUsers = await userRepository.find();
  const allTasks = await getRepository(Task).find();
  return allTasks.map(task => new TaskModel(task));
};

/**
 * add new task to all tasks
 * @param task - new task object type ITask
 * reassign all tasks with new task data
 */

const addNewTask = async (taskDetails: ITask) => {
  
  const task= new Task();
    task.title = taskDetails.title;
    task.description = taskDetails.description;
    task.order = taskDetails.order;
    task.userId = taskDetails.userId;
    task.columnId = taskDetails.columnId;
    task.boardId = taskDetails.boardId;

  const addedTask = await getRepository(Task).save(task);
  return addedTask;
  
};

/**
 * find task by id
 * @param  taskId - task id type string
 * @returns task with provided id from all tasks
 */
const findTask = async (taskId: string) => {
  const singleTask = await getRepository(Task).findOne( {id: taskId} );
  return singleTask;
};

/**
 * delete task by id
 * @param  taskId - task id type string
 * all tasks except the one found by id got from param
 */

const deleteTask = async (taskId: string) => {
  
  const singleTask = await getRepository(Task).findOne({ id: taskId });
  if(singleTask) {
    await getRepository(Task).delete({ id: taskId });
    const allRemainingTasks = await getAllTasks(); 
   return allRemainingTasks;
  }
    throw new Error('Task not found');
  
};
/**
 * update task details with data incoming in param by id
 * @param  taskId - task id type string
 * @param updatedData -task details object type ITask
 * @returns all tasks, where task with id from param got now updated data
 */

const updateTask =  async (taskId: string, updatedData: ITask) => {
  
  const taskRepository = getRepository(Task);

  const singleTask = await taskRepository.findOne({ id: taskId});
  if(singleTask) {
   await taskRepository.update({ id: taskId }, updatedData);
   const allTasksWzUpdated = await getAllTasks(); 
   return allTasksWzUpdated;
  }
  throw new Error('Task not found');
};

/**
 * delete tasks from board
 * @param boardId - board id type string to be deleted
 * @returns all tasks except those with board id from param
 */

export const tasksRepo = {
  getAllTasks,
  addNewTask,
  findTask,
  deleteTask,
  updateTask
};

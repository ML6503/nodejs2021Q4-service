import { ITask } from '../../common/interfaces';
import { tasks } from '../../dataBase/tasks.db';

let allTasks: Array<ITask> | [] = [...tasks];

/**
 * function to return all tasks taken from Data Base
 * @returns all tasks or empty array if none
 */
const getAllTasks: () => ITask[] | [] = () => allTasks;

/**
 * add new task to all tasks
 * @param  {ITask} task
 * reassign all tasks with new task data
 */
const addNewTask = (task: ITask) => {
  allTasks = [...allTasks, task];
};

/**
 * find task by id
 * @param  {string} taskId
 * @returns task with provided id from all tasks 
 */
const findTask = (taskId: string) => allTasks.find((t) => t.id === taskId);

/**
 * delet task by id
 * @param  {string} taskId
 * all tasks except the one found by id got from param
 */
const deleteTask = (taskId: string) => {
  allTasks = allTasks.filter((t) => t.id !== taskId);
};

/**
 * update task details with data incoming in param by id
 * @param  {string} taskId
 * @param  {ITask} updatedData of a task
 * @returns all tasks, where task with id from param got now updated data
 */
const updateTask = (taskId: string, updatedData: ITask) => {
  allTasks = allTasks.map((task) =>
    task.id === taskId ? { id: taskId, ...updatedData } : task
  );
};

/**
 * assign null as userId in all tasks
 * that deleted user was assigned initally
 * @param  {string} userId
 * @returns in all tasks initila or updated task 
 *  with  userId  === null if user id same as in param
 */
const unassignUserTasks = (userId: string) => {
  allTasks = allTasks.map((task) => {
    let updatedTask;
    if (task.userId === userId) {
      updatedTask = { ...task };
      updatedTask.userId = null;
      // task.userId = null;
      return updatedTask;
    }
    // return task!.userId === userId ? updatedTask : task;

    return task;
  });
};

/**
 * delete tasks from board
 * @param  {string} boardId that has been deleted
 * @returns all tasks except those with board id from param
 */
const deleteBoardTasks = (boardId: string) => {
  allTasks = allTasks.filter((t) => t.boardId !== boardId);
};

export const tasksRepo = {
  getAllTasks,
  addNewTask,
  findTask,
  deleteTask,
  updateTask,
  unassignUserTasks,
  deleteBoardTasks,
};

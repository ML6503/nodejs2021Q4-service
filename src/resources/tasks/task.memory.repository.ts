import { getRepository } from 'typeorm';
import Task from '../../entity/Task';
import { ITask } from '../../common/interfaces';
// import { tasks } from '../../dataBase/tasks.db';

// let allTasks: Array<ITask> | [] = [...tasks];

/**
 * function to return all tasks taken from Data Base
 * @returns all tasks or empty array if none
 */
// const getAllTasks: () => ITask[] | [] = () => allTasks;
const getAllTasks = async () => {
  // const allUsers = await userRepository.find();
  const allTasks = await getRepository(Task).find();
  return allTasks;
};
/**
 * add new task to all tasks
 * @param task - new task object type ITask
 * reassign all tasks with new task data
 */
// const addNewTask = (task: ITask) => {
//   allTasks = [...allTasks, task];
// };

const addNewTask = async (taskDetails: ITask) => {
  // allUsers = [...allUsers, user];
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
// const findTask = (taskId: string) => allTasks.find((t) => t.id === taskId);
const findTask = async (taskId: string) => {
  // allUsers.find((u) => u.id === userId);
  const singleTask = await getRepository(Task).findOne( {id: taskId} );
  return singleTask;
};

/**
 * delete task by id
 * @param  taskId - task id type string
 * all tasks except the one found by id got from param
 */
// const deleteTask = (taskId: string) => {
//   allTasks = allTasks.filter((t) => t.id !== taskId);
// };
const deleteTask = async (taskId: string) => {
  // allUsers = allUsers.filter((u) => u.id !== userId);
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
// const updateTask = (taskId: string, updatedData: ITask) => {
//   allTasks = allTasks.map((task) =>
//     task.id === taskId ? { id: taskId, ...updatedData } : task
//   );
// };
const updateTask =  async (taskId: string, updatedData: ITask) => {
  // allUsers = allUsers.map((user) =>
  //   user.id === userId ? { id: userId, ...updatedData } : user
  // );
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
 * assign null as userId in all tasks
 * that deleted user was assigned initally
 * @param  userId - user id type string
 * @returns in all tasks initila or updated task
 *  with  userId  === null if user id same as in param
 */
// const unassignUserTasks = (userId: string) => {
//   allTasks = allTasks.map((task) => {
//     let updatedTask;
//     if (task.userId === userId) {
//       updatedTask = { ...task };
//       updatedTask.userId = null;
//       // task.userId = null;
//       return updatedTask;
//     }
//     // return task!.userId === userId ? updatedTask : task;

//     return task;
//   });
// };

// const unassignUserTasks = async (userId: string) => {
//   const updatedTasks = await getRepository(Task).find({ where: userId});
// };

/**
 * delete tasks from board
 * @param boardId - board id type string to be deleted
 * @returns all tasks except those with board id from param
 */
// const deleteBoardTasks = (boardId: string) => {
//   allTasks = allTasks.filter((t) => t.boardId !== boardId);
// };


export const tasksRepo = {
  getAllTasks,
  addNewTask,
  findTask,
  deleteTask,
  updateTask,
  // unassignUserTasks,
  // deleteBoardTasks,
};

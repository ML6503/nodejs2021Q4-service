import { ITask } from '../../common/interfaces';
import { tasks } from '../../dataBase/tasks.db';

let allTasks: Array<ITask> | [] = [...tasks];
const getAllTasks: () => ITask[] | [] = () => allTasks;

const addNewTask = (task: ITask) => {
  allTasks = [...allTasks, task];
};

const findTask = (taskId: string) => allTasks.find((t) => t.id === taskId);

const deleteTask = (taskId: string) => {
  allTasks = allTasks.filter((t) => t.id !== taskId);
};

const updateTask = async (taskId: string, updatedData: ITask) => {
  allTasks = allTasks.map((task) =>
    task.id === taskId ? { id: taskId, ...updatedData } : task
  );
};

const unassignUserTasks = (userId: string) => {
  allTasks = allTasks.map((task) => {
    // let updatedTask;
    if (task.userId === userId) {
      // updatedTask = { ...task };
      // updatedTask.userId = null;
      task.userId = null;
    }
    // return task!.userId === userId ? updatedTask : task;
    return task;
  });
};

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

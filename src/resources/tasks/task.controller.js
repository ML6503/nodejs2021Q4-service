const tasksService = require('./task.service');
const Task = require('./task.model');

const tasks = tasksService.getAllTasks;
const { addNewTask, findTask, deleteTaskById, updateTaskById } = tasksService;

const getTasks = async (req, reply) => {
  await tasks();
  reply.send(tasks());
};

const getTask = async (req, reply) => {
  const { taskId } = req.params;
  const task = await findTask(taskId);
  if (!task) {
    reply.code(404).send({ message: `Task with id ${taskId} not found` });
  }
  reply.send(task);
};

const addTask = async (req, reply) => {
  const { boardId } = req.params;
  const newTaskData = req.body;
  newTaskData.boardId = boardId;
  const newTask = Task.createTask(newTaskData);
  await addNewTask({ ...newTask });
  reply.code(201).send({ ...newTask });
};

const deleteTask = async (req, reply) => {
  const { taskId } = req.params;
  const task = await findTask(taskId);

  if (!task) {
    reply.code(404).send({ message: `Task with id ${taskId} not found` });
  }
  await deleteTaskById(taskId);
  reply.send({ message: `The task ${taskId} has been deleted` });
};

const updateTask = async (req, reply) => {
  const { taskId } = req.params;
  const updatedTaskData = req.body;

  await updateTaskById(taskId, updatedTaskData);

  const task = await findTask(taskId);
  reply.send(task);
};

module.exports = {
  getTasks,
  getTask,
  addTask,
  deleteTask,
  updateTask,
};

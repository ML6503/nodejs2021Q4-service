const {
  getTasks,
  getTask,
  addTask,
  deleteTask,
  updateTask,
} = require('./task.controller');

const TaskProps = {
  title: { type: 'string' },
  order: { type: 'integer' },
  description: { type: 'string' },
  userId: { type: 'string' },
  boardId: { type: 'string' },
  columnId: { type: 'string' },
};

const TaskSchema = {
  type: 'object',
  properties: TaskProps,
};

const getTasksOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: TaskSchema,
      },
    },
  },
  handler: getTasks,
};

const getTaskOpts = {
  schema: {
    response: {
      200: TaskSchema,
    },
  },
  handler: getTask,
};

const postTaskOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['order', 'boardId', 'columnId'],
      properties: TaskProps,
    },
    response: {
      201: TaskSchema,
    },
  },
  handler: addTask,
};

const deleteTaskOpts = {
  schema: {
    response: {
      204: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteTask,
};

const updateTaskOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['boardId', 'columnId', 'order'],
      properties: TaskProps,
    },
    response: {
      200: TaskSchema,
    },
  },
  handler: updateTask,
};

// task(-s) routes
const tasksRoutes = (fastify, options, done) => {
  // get all tasks
  fastify.get('/boards/:boardId/tasks', getTasksOpts);

  // get single board
  fastify.get('/boards/:boardId/tasks/:taskId', getTaskOpts);

  // add board
  fastify.post('/boards/:boardId/tasks', postTaskOpts);

  // delete user
  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts);

  // update board
  fastify.put('/boards/:boardId/tasks/:taskId', updateTaskOpts);

  done();
};

module.exports = tasksRoutes;

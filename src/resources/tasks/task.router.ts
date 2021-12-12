import { FastifyError, FastifyInstance, FastifyServerOptions } from 'fastify';
import {
  getTasks,
  getTask,
  addTask,
  deleteTask,
  updateTask,
} from './task.controller';

const TaskProps = {
  id: { type: 'string' },
  title: { type: 'string' },
  order: { type: 'integer' },
  description: { type: 'string' },
  userId: { type: 'string', nullable: true },
  boardId: { type: 'string', nullable: true },
  columnId: { type: 'string', nullable: true },
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
      required: ['order', 'boardId'],
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
      // required: ['boardId', 'columnId', 'order'],
      required: ['boardId', 'order'],
      properties: TaskProps,
    },
    response: {
      200: TaskSchema,
    },
  },
  handler: updateTask,
};

// task(-s) routes
const tasksRoutes = (
  fastify: FastifyInstance,
  _options: FastifyServerOptions,
  done: (err?: FastifyError) => void
) => {
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

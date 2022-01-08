import { FastifyInstance, FastifyServerOptions } from 'fastify';
import {
  getTasks,
  getTask,
  addTask,
  deleteTask,
  updateTask,
} from './task.controller';

// tasks properties for task Schema
const TaskProps = {
  id: { type: 'string' },
  title: { type: 'string' },
  order: { type: 'integer' },
  description: { type: 'string' },
  userId: { type: 'string', nullable: true },
  boardId: { type: 'string', nullable: true },
  columnId: { type: 'string', nullable: true },
};

// Task Schema for the route
const TaskSchema = {
  type: 'object',
  properties: TaskProps,
};

// task options for specific routes
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
/**
 * tasks Routes use Fastify factory function
 * for the standard fastify routes creation
 * with optional FastifyServerOptions and call back
 * @param  fastify - FastifyInstance
 * @param  _options - optional server options
 * @param   done - callback function
  * @returns 5 tasks routes methods: get (all and one task),
  * post and delete single task by id
 */
export const tasksRoutes = (
  fastify: FastifyInstance,
  _options: FastifyServerOptions,
  done: () => void
) => {

  /**
   * Fastify factory method to get all tasks on board
   * by using path, specific Schema and handler
   * 'boardId/tasks' - board tasks path
   * getTasksOptsroute route options with get tasks Schema and handler
   */
  fastify.get('/boards/:boardId/tasks', getTasksOpts);

  /**
   * Fastify factory method to get single task on board
   * by using path, specific Schema and handler
   * '/boards/:boardId/tasks/:taskId' -  '../:taskId' path to task by id
   * getTasksOptsroute  - route options with get tasks Schema and handler
   */
  fastify.get('/boards/:boardId/tasks/:taskId', getTaskOpts);

  /**
   * Fastify factory to add task to board
   * by path, specific Schema and handler
   * '/boards/:boardId/tasks' - board tasks path
   * postTaskOpts route options with get tasks Schema and handler
   */
  fastify.post('/boards/:boardId/tasks', postTaskOpts);

  /**
   * * Fastify factory method that is used to delete task
   * by path, specific Schema and handler
   * /boards/:boardId/tasks/:taskId' - boards path to task by id
   * deleteTaskOpts - route options with delete task Schema and handler
   */
  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts);
  
  /**
   * Fastify factory method used to update task
   * by path, specific Schema and handler
   * '/boards/:boardId/tasks/:taskId' - boards path to task by id
   * updateTaskOpts - route options with update User Schema and handler
   */
  fastify.put('/boards/:boardId/tasks/:taskId', updateTaskOpts);

  done();
};

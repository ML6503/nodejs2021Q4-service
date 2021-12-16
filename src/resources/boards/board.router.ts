import { FastifyInstance, FastifyServerOptions } from 'fastify';

import {
  getBoards,
  getBoard,
  addBoard,
  deleteBoard,
  updateBoard,
} from './board.controller';

const TaskSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'integer' },
    description: { type: 'integer' },
    userId: { type: 'string' },
    boardId: { type: 'string' },
    columnId: { type: 'string' },
  },
};

const ColumnSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'integer' },
    tasks: {
      type: 'array',
      items: TaskSchema,
    },
    boardId: { type: 'string' },
  },
};

const BoardSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: ColumnSchema,
    },
  },
};

// boards options for specific routes
const getBoardsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: BoardSchema,
      },
    },
  },
  handler: getBoards,
};

const getBoardOpts = {
  schema: {
    response: {
      200: BoardSchema,
    },
  },
  handler: getBoard,
};

const postBoardOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'columns'],
      properties: {
        title: { type: 'string' },
        columns: {
          type: 'array',
          required: ['title', 'order'],
          properties: {
            title: { type: 'string' },
            order: { type: 'integer' },
          },
        },
      },
    },
    response: {
      201: BoardSchema,
    },
  },
  handler: addBoard,
};

const deleteBoardOpts = {
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
  handler: deleteBoard,
};

const updateBoardOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'columns'],
      properties: {
        title: { type: 'string' },
        columns: {
          type: 'array',
          required: ['id', 'title', 'order'],
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            order: { type: 'integer' },
          },
        },
      },
    },
    response: {
      200: BoardSchema,
    },
  },
  handler: updateBoard,
};

/**
 * board routes use Fastify factory function for the standard fastify routes creation
 * with optional FastifyServerOptions and call back
 * @param  fastify - FastifyInstance
 * @param  _opts - optional FastifyServerOptions
 * @param  done - call back function
 */
export const boardsRoutes = (
  fastify: FastifyInstance,
  _opts: FastifyServerOptions,
  done: () => void
) => {
  /**
   * Fastify factory get method that is used here to get all users
   * by using path, specific Schema and handler
   * '/boards' -  boards path
   * getBoardsOpts - boards options with get boards Schema and handler
   */
  fastify.get('/boards', getBoardsOpts);

  /**
   * Fastify factory get method that is used to get a single board
   * by using path, specific Schema and handler
   * '/boards/:boardId' -  path for board by id
   * getBoardOptsboards - options with get single board Schema and handler
   */
  fastify.get('/boards/:boardId', getBoardOpts);

  /**
   * Fastify factory post method that is used to add board
   * by path, specific Schema and handler
   * '/boards' - boards path
   * postBoardOpts - boards options with Board Post Schema and handler
   */
  fastify.post('/boards', postBoardOpts);

  /**
   * Fastify factory delete method that is used to delete board
   * by path, specific Schema and handler
   * '/boards/:boardId' board path by its id
   * deleteBoardOpts - board options with Board delete Schema and handler
   */
  fastify.delete('/boards/:boardId', deleteBoardOpts);

  /**
   * Fastify factory put method used to update board
   * by path, specific Schema and handler
   * '/boards/:boardId' - singel board path
   * updateBoardOptsoute - options with update board Schema and handler
   */
  fastify.put('/boards/:boardId', updateBoardOpts);

  done();
};

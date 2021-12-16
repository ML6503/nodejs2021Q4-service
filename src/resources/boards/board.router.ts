import {
  FastifyInstance,
  FastifyServerOptions,
  RequestGenericInterface,
} from 'fastify';

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

// export interface IBoardPluginOptions {
//   IBoardPluginOption: object;
// }

// export interface requestBoardIdGeneric extends RequestGenericInterface {
//   Querystring: {
//     boardId: string;
//   };
// }

/**
 * board routes use Fastify factory function for the standard fastify routes creation
 * with optional FastifyServerOptions and call back
 * @param  {FastifyInstance} fastify
 * @param  {FastifyServerOptions} _opts
 * @param  {()=>void} done
 */
export const boardsRoutes = (
  fastify: FastifyInstance,
  _opts: FastifyServerOptions,
  done: () => void
) => {
  /**
   * Fastify factory get method that is used here to get all users
   * by using path, specific Schema and handler
   * @param  {'/boards'} '/boards' path
   * @param  {} getBoardsOpts boards options with get boards Schema and handler
   */
  fastify.get('/boards', getBoardsOpts);

  /**
   * Fastify factory get method that is used to get a single board
   * by using path, specific Schema and handler
   * @param  {'/boards/:boardId'} '/boards/:boardId' path for board by id
   * @param  {} getBoardOptsboards options with get single board Schema and handler
   */
  fastify.get('/boards/:boardId', getBoardOpts);

  /**
   * Fastify factory post method that is used to add board
   * by path, specific Schema and handler
   * @param  {'/boards'} '/boards' path
   * @param  {} postBoardOpts boards options with Board Post Schema and handler
   */
  fastify.post('/boards', postBoardOpts);

  /**
   * Fastify factory delete method that is used to delete board
   * by path, specific Schema and handler
   * @param  {'/boards/:boardId'} '/board/' path by its id
   * @param  {} deleteBoardOpts board options with Board delete Schema and handler
   */
  fastify.delete('/boards/:boardId', deleteBoardOpts);

 /**
   * Fastify factory put method used to update board
   * by path, specific Schema and handler
   * @param  {b/boards/:boardId'} /boards/:boardId' path
   * @param  {} updateBoardOptsoute options with update board Schema and handler
   */
  fastify.put('/boards/:boardId', updateBoardOpts);

  done();
};

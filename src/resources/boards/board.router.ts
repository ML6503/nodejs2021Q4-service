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

export interface IBoardPluginOptions {
  IBoardPluginOption: object;
}

export interface requestBoardIdGeneric extends RequestGenericInterface {
  Querystring: {
    boardId: string;
  };
}

// board(-s) routes
export const boardsRoutes = (
  fastify: FastifyInstance,
  _opts: FastifyServerOptions,
  done: () => void
) => {
  // get all boards
  fastify.get('/boards', getBoardsOpts);

  // get single board
  fastify.get('/boards/:boardId', getBoardOpts);

  // add board
  fastify.post('/boards', postBoardOpts);

  // delete user
  fastify.delete('/boards/:boardId', deleteBoardOpts);

  // update board
  fastify.put('/boards/:boardId', updateBoardOpts);

  done();
};

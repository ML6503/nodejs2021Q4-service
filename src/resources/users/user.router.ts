import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from 'fastify';
import { Repository } from 'typeorm';
import { IGetUserParam } from '../../common/interfaces';
import Board from '../../entity/Board';
import Task from '../../entity/Task';
import User from '../../entity/User';

import {
  // getUsers,
  // getUser,
  addUser,
  deleteUser,
  updateUser,
} from './user.controller';

export interface Db {
  users: Repository<User>;
  boards: Repository<Board>;
  tasks: Repository<Task>;
}
// Declaration merging
declare module 'fastify' {
  // eslint-disable-next-line no-shadow
  export interface FastifyInstance {
    db: Db;
  }
}

// User schema to exclude secret fields like "password"
const UserSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

// user's options for specific routes
const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: UserSchema,
      },
    },
  },
  // handler: getUsers,
};

const getUserOpts = {
  schema: {
    response: {
      200: UserSchema,
    },
  },
  // handler: getUser,
};

const postUserOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'login', 'password'],
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: UserSchema,
    },
  },
  handler: addUser,
};

const deleteUserOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteUser,
};

const updateUserOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'login', 'password'],
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      200: UserSchema,
    },
  },
  handler: updateUser,
};

/**
 * users Routes use Fastify factory function for the standard fastify routes creation
 * with optional FastifyServerOptions and call back
 * @param fastify - FastifyInstance
 * @param _options - FastifyServerOptions
 * @param  done - callback function
 * @returns 5 users routes methods: get (all and one user), post and delete one user by id
 */
export const usersRoutes = (
  fastify: FastifyInstance,
  _options: FastifyServerOptions,
  done: () => void
) => {
  /**
   * Fastify factory method that is used here to get all users
   * by using path, specific Schema and handler
   * '/users' -  users path
   * getUsersOpts - route options with get users Schema and handler
   */
  // fastify.get('/users', getUsersOpts);

  fastify.get(
    '/users',
    getUsersOpts,
    async (_req: FastifyRequest, reply: FastifyReply) => {
      const allUsers = await fastify.db.users.find(User);

      await reply.send(allUsers);
    }
  );

  /**
   * Fastify factory method that is used to get a single user
   * by using path, specific Schema and handler
   * '/users/:userId' - userId path
   * getUserOpts - route options with get User Schema and handler
   */
  // fastify.get('/users/:userId', getUserOpts);

  fastify.get(
    '/users/:userId',
    getUserOpts,
    async (
      req: FastifyRequest<{
        Params: IGetUserParam;
      }>,
      reply: FastifyReply
    ) => {
      const user = await fastify.db.users.findOne(req.params.userId);

      return reply.send(user);
    }
  );

  /**
   * Fastify factory method that is used to add user
   * by path, specific Schema and handler
   * '/users' -  users path
   * postUserOpts - route options with UserPostSchema and handler
   */
  fastify.post('/users', postUserOpts);

  /**
   * Fastify factory method that is used to delete user
   * by path, specific Schema and handler
   * '/users/:userId' - userId path
   * deleteUserOpts - route options with delete User Schema and handler
   */
  fastify.delete('/users/:userId', deleteUserOpts);

  /**
   * Fastify factory method used to update user
   * by path, specific Schema and handler
   * '/users/:userId' -  user path by id
   * updateUserOpts - route options with update User Schema and handler
   */
  fastify.put('/users/:userId', updateUserOpts);

  done();
};

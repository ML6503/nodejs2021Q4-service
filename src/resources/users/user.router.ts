import { FastifyInstance, FastifyServerOptions } from 'fastify';
import {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
} from './user.controller';

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
  handler: getUsers,
};

const getUserOpts = {
  schema: {
    response: {
      200: UserSchema,
    },
  },
  handler: getUser,
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

// user(-s) routes
/**
 * usersRoutes uses Fastify factory function for the standard fastify routes creation
 * with optional FastifyServerOptions and call back
 * @param  {FastifyInstance} fastify
 * @param  {FastifyServerOptions} _options
 * @param  {()=>void} done
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
   * @param  {} '/users' path
   * @param  {} getUsersOpts route options with get users Schema and handler
   */
  fastify.get('/users', getUsersOpts);

  /**
   * Fastify factory method that is used to get a single user
   * by using path, specific Schema and handler
   * @param  {userId'} '/users/:userId' path
   * @param  {} getUserOpts route options with get User Schema and handler
   */
  fastify.get('/users/:userId', getUserOpts);

  // add user
  /**
   * Fastify factory method that is used to post user
   * by path, specific Schema and handler
   * @param  {} '/users' path 
   * @param  {} postUserOpts route options with UserPostSchema and handler
   */
  fastify.post('/users', postUserOpts);

  // delete user
  /**
   * Fastify factory method that is used to delete user
   * by path, specific Schema and handler
   * @param  {userId'} '/users/:userId' path
   * @param  {} deleteUserOpts route options with delete User Schema and handler
   */
  fastify.delete('/users/:userId', deleteUserOpts);

  // update user
  /**
   *Fastify factory method that is used to update user
   * by path, specific Schema and handler
   * @param  {userId'} '/users/:userId' path
   * @param  {} updateUserOpts route options with update User Schema and handler
   */
  fastify.put('/users/:userId', updateUserOpts);

  done();
};

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
export const usersRoutes = (
  fastify: FastifyInstance,
  _options: FastifyServerOptions,
  done: () => void
) => {
  // get all users
  fastify.get('/users', getUsersOpts);

  // get single user
  fastify.get('/users/:userId', getUserOpts);

  // add user
  fastify.post('/users', postUserOpts);

  // delete user
  fastify.delete('/users/:userId', deleteUserOpts);

  // update user
  fastify.put('/users/:userId', updateUserOpts);

  done();
};

// const router = require('express').Router();
// const User = require('./user.model');
const {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
} = require('../../controllers/users');

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
const usersRoutes = (fastify, options, done) => {
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

module.exports = usersRoutes;

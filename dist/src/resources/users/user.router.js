"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const user_controller_1 = require("./user.controller");
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
    handler: user_controller_1.getUsers,
};
const getUserOpts = {
    schema: {
        response: {
            200: UserSchema,
        },
    },
    handler: user_controller_1.getUser,
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
    handler: user_controller_1.addUser,
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
    handler: user_controller_1.deleteUser,
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
    handler: user_controller_1.updateUser,
};
// user(-s) routes
const usersRoutes = (fastify, _options, done) => {
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
exports.usersRoutes = usersRoutes;

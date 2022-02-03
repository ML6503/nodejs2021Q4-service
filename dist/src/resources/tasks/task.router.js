"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRoutes = void 0;
const task_controller_1 = require("./task.controller");
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
    handler: task_controller_1.getTasks,
};
const getTaskOpts = {
    schema: {
        response: {
            200: TaskSchema,
        },
    },
    handler: task_controller_1.getTask,
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
    handler: task_controller_1.addTask,
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
    handler: task_controller_1.deleteTask,
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
    handler: task_controller_1.updateTask,
};
// task(-s) routes
const tasksRoutes = (fastify, _options, done) => {
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
exports.tasksRoutes = tasksRoutes;
